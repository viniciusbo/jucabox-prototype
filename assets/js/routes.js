(function() {
	page.base('/jucabox-prototype');

	page('/', load, index);
	page('/search', load, search);
	page('/play', load, play);
	page('*', notFound);
	page();

	function load(ctx, next) {
		$(document).ready(function() {
			var $currentView = $('.view-active');
			var $targetView = $('[data-route="' + ctx.path + '"]');

			// If target view is current one, do nothing
			if ($targetView.hasClass('view-active'))
				return;

			$currentView
				.removeClass('view-active')
				.addClass('magictime vanishOut')
				.one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', currentViewDone);

			function currentViewDone(e) {
				$(this)
					.addClass('view-inactive')
					.removeClass('magictime vanishOut');

				// Remove scrollbar
				$('body, html').css('overflow', 'hidden');

				$targetView
					.removeClass('view-inactive')
					.addClass('view-active magictime puffIn')
					.one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', targetViewDone);
			}

			function targetViewDone(e) {
				$(this).removeClass('magictime puffIn');

				// Show scrollbar
				$('body, html').css('overflow', 'auto');
			}
		});

		next();
	}

	function index() {
		$(function() {

		});
	}

	function search() {

	}

	function play() {

	}

	function notFound() {
		page('/');
	}
})();