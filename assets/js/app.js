var app = new Vue({
	el: '#app',
	data: {
		uriToDictionary: 'assets/dictionary/en-gb.json',
		dictionary: [],
		passphrases: [""],
		passphraseSettings: {
			length: 5,
			seperator: ' '
		},
		dropDown: {
			value: 1,
			placeholder: 'Number',
			selectionActive: false,
		},
		notify: {
			notifcations: [],
			autohideTimeout: 5000
		}
	},
	methods: {
		loadApp: function () {
			this.fetchDictionary(function () {
				app.generatePassphrase();
			});
		},
		fetchDictionary: function (callback) {
			this.$http.get(this.uriToDictionary).then(response => {
				this.dictionary = response.body;
				return callback();
			});
		},
		generatePassphrase: function () {
			this.passphrases = [];
			for (i = 0; i < this.dropDown.value; i++)
			{
				passphraseWords = [];
				for (ii = 0; ii < this.passphraseSettings.length; ii++)
				{
					passphraseWords.push(this.dictionary[Math.floor(Math.random() * this.dictionary.length)]);
				}
				this.passphrases.push(passphraseWords.join(this.passphraseSettings.seperator));
			}
		},
		selectAndCopyPassphrase: function (event) {
			var sel, range;
			if (window.getSelection && document.createRange) { //Browser compatibility
				sel = window.getSelection();
				if (sel.toString() == '') { //no text selection
					window.setTimeout(function () {
						range = document.createRange(); //range object
						range.selectNodeContents(event.target); //sets Range
						sel.removeAllRanges(); //remove all ranges from selection
						sel.addRange(range);//add Range to a Selection.
						app.copySelectedText();
					},1);
				}
			} else if (document.selection) { //older ie
				sel = document.selection.createRange();
				if (sel.text == '') { //no text selection
					range = document.body.createTextRange();//Creates TextRange object
					range.moveToElementText(event.target);//sets Range
					range.select(); //make selection.
					app.copySelectedText();
				}
			}
		},
		copySelectedText: function () {
			var copied = document.execCommand('copy');
			if (copied)
			{
				this.createNotification("Passphrase Copied!");
			}
		},

		// DropDown Box
		dropDownActivate: function (event) {
			this.dropDown.selectionActive = true;
			return false;
		},
		dropDownSelection: function (event) {
			this.dropDown.placeholder = 'Number - ' + event.target.innerText;
			this.dropDown.value = event.target.innerText;
			setTimeout(function(){
				app.dropDown.selectionActive = false;
			}, 1);
		},

		// Custom Notifcations
		createNotification: function (text) {
			var key = this.notify.notifcations.length;
			var notification = `
				<div class="notifyjs-wrapper notifyjs-hidable">
					<div class="notifyjs-container">
						<div class="notifyjs-copied-base notifyjs-copied-error">
							<span data-notify-text="">` + text +`</span>
						</div>
					</div>
				</div>`;

			this.notify.notifcations.push({key: key, notification: notification});

			setTimeout( function() {
				app.notify.notifcations.pop();
			}, this.notify.autohideTimeout);
		}
	},
	computed: {
		// DropDown Box
		dropDownCSS: function () {
			return {
				'active' : this.dropDown.selectionActive
			}
		},
		dropDownOptionsCSS: function () {
			return {
				'display' : (this.dropDown.selectionActive ? 'block' : 'none')
			}
		}
	}
});

app.loadApp();