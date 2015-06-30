$(document).ready(function() {
	// light weight mobile detection that should cover a majority of cases
	var isMobile = function() {
		return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/);
	}

	// Animate the page
	setTimeout(function() {
		$('.container').removeClass('not-loaded');
	}, 100);
	setTimeout(function() {
		$('.second-wave').removeClass('not-loaded');
	}, 400);
});
