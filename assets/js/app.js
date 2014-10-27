(function() {
	$(document).ready(function() {
		$('#do-next-song').on('click', function(e) {
			e.preventDefault();

			JucaBox.trigger('song.next');
		});

		$('#do-prev-song').on('click', function(e) {
			e.preventDefault();

			JucaBox.trigger('song.prev');
		});

		$('#do-play-stop-song').on('click', function(e) {
			e.preventDefault();

			JucaBox.trigger('song.play');
		});
	});

	JucaBox.on('search', function(query) {
		console.log(query);

		page('/search');
	});

	JucaBox.on('song.next', function() {
		MediaPlayer.nextSong();
	});

	JucaBox.on('song.prev', function() {
		MediaPlayer.prevSong();
	});

	JucaBox.on('song.play', function() {
		MediaPlayer.play();
	});

	JucaBox.on('play', function() {
		page('/play');
	});
})();