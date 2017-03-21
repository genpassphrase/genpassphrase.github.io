var app = new Vue({
	el: '#app',
	data: {
		uriToDictionary: 'assets/dictionary/en-gb.json',
		dictionary: [],
		passphrase: '',
		passphraseSettings: {
			length: 5,
			seperator: ' '
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
			passphraseWords = [];
			for (i = 0; i < this.passphraseSettings.length; i++)
			{
				passphraseWords.push(this.dictionary[Math.floor(Math.random() * this.dictionary.length)]);
			}
			this.passphrase = passphraseWords.join(this.passphraseSettings.seperator);
		},
		selectAndCopyPassphrase: function (event) {
			var sel, range;
			if (window.getSelection && document.createRange) { //Browser compatibility
				sel = window.getSelection();
				if (sel.toString() == '') { //no text selection
					window.setTimeout(function(){
						range = document.createRange(); //range object
						range.selectNodeContents(event.target); //sets Range
						sel.removeAllRanges(); //remove all ranges from selection
						sel.addRange(range);//add Range to a Selection.
						this.copySelectedText();
					},1);
				}
			} else if (document.selection) { //older ie
				sel = document.selection.createRange();
				if (sel.text == '') { //no text selection
					range = document.body.createTextRange();//Creates TextRange object
					range.moveToElementText(event.target);//sets Range
					range.select(); //make selection.
					this.copySelectedText();
				}
			}
		},
		copySelectedText: function () {
			var copied = document.execCommand('copy');
		}
	}
});

app.loadApp();
