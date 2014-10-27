(function() {
	function JucaBox() {
		this.playInterval = null;
		this.currentAlbum = null;
		this.currentSongIndex = 0;
		this.currentTime = 0;
		this.searchQuery = null;
		this.recognition = null;
	};

	JucaBox.prototype = EventEmitter.prototype;

	JucaBox.prototype._parseRecognition = function(event) {
		var resultsLength = event.results.length;
		var lastResult = event.results[resultsLength - 1][0];
		var lastTranscript = lastResult.transcript.trim();

		console.log(lastTranscript);

		var match = lastTranscript.match(/quero ouvir .*/)

		if (match) {
			this.trigger('search', match);
		}

		if (lastTranscript == 'tocar') {
			this.trigger('play');
		}

		// Song controls
		if (lastTranscript == 'próxima' || lastTranscript == 'próximo' || lastTranscript == 'próxima música') {
			this.trigger('song.next');
		} else if (lastTranscript == 'música anterior') {
			this.trigger('song.prev');
		} else if (lastTranscript == 'parar música') {
			this.trigger('song.stop');
		} else if (lastTranscript == 'tocar música') {
			this.trigger('song.play');
		}
	};

	JucaBox.prototype.listen = function() {
		var self = this;

		self.recognition = new webkitSpeechRecognition();
		self.recognition.lang = 'pt-BR';
		self.recognition.continuous = true;
		self.recognition.onresult = self._parseRecognition.bind(this);
		self.recognition.onstart = function() {
			self.trigger('listen.start');
		};

		self.recognition.start();
	};

	window.JucaBox = new JucaBox();
})();