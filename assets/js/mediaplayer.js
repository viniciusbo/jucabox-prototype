(function() {
	function MediaPlayer() {
		// Objects
		this.$songList = null;
		this.$currentSong = null;
		this.$progressBar = null;

		this.currentSongIndex = 0;
		this.currentTime = 0;
		this.isPlaying = false;
		this.playerTimeInterval = null;

		this.init();
	};

	MediaPlayer.prototype = EventEmitter.prototype;

	MediaPlayer.prototype._updateProgressBar = function() {
		this.currentTime++;

		var songLength = this._convertToTime(this.$currentSong.data('song-length'));

		this.$progressBar.width(this.currentTime / songLength * 100 + '%');
		this.$progressBar.find('.player-progress-bar-label').text(this._convertToLength(this.currentTime));

		if (this.currentTime == songLength) {
			this.nextSong();
		}

		console.log(this.currentTime);
	};

	MediaPlayer.prototype._convertToTime = function(length) {
		var time = 0;
		var split = length.split(':');

		time = parseInt(split[0] * 60) + parseInt(split[1]);

		return time;
	};

	MediaPlayer.prototype._convertToLength = function(time) {
		return Math.floor(time / 60) + ':' + (time % 60);
	}

	MediaPlayer.prototype.init = function() {
		var self = this;

		$(document).ready(function() {
			self.$songList = $('.player-song-list');
			self.$progressBar = $('.player-progress-bar');
		});
	};

	MediaPlayer.prototype.nextSong = function() {
		this.stop();

		this.currentSongIndex++;

		this.$songList
			.find('.active')
			.removeClass('active')
			.next()
			.addClass('active');

		this.play();
	};

	MediaPlayer.prototype.prevSong = function() {
		this.stop();

		this.currentSongIndex--;

		this.$songList
			.find('.active')
			.removeClass('active')
			.prev()
			.addClass('active');

		this.play();
	};

	MediaPlayer.prototype.play = function() {
		this.isPlaying = true;

		this.$currentSong = this.$songList.find('li').eq(this.currentSongIndex);

		if (this.playerTimeInterval > 0)
			clearInterval(this.playerTimeInterval);

		this.playerTimeInterval = setInterval(this._updateProgressBar.bind(this), 1000);
	};

	MediaPlayer.prototype.pause = function() {
		this.isPlaying = false;
	};

	MediaPlayer.prototype.stop = function() {
		this.isPlaying = false;
		this.currentTime = 0;

		if (this.playerTimeInterval > 0)
			clearInterval(this.playerTimeInterval);
	};

	window.MediaPlayer = new MediaPlayer();
})();