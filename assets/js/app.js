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
				this.generatePassphrase();
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
		}
	}
});

app.loadApp();
