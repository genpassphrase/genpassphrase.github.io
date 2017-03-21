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
			this.fetchDictionary();
			if (this.dictionary.length > 1)
			{
				this.generatePassphrase();
			}
		},
		fetchDictionary: function () {
			this.$http.get(this.uriToDictionary).then(response => {
				this.dictionary = response.body;
			});
		},
		generatePassphrase: function () {
			passphraseWords = [];
			for (i=0; i < this.passphraseSettings.length; i++)
			{
				passphraseWords.push(dictionary[Math.floor(Math.random()*dictionary.length)]);
			}
			passphrase = passphraseWords.join(this.passphraseSettings.seperator);
		}
	}
});

app.loadApp();
