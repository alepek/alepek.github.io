if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/)) {
	$(document).alton({
		fullSlideContainer: 'full', // Tell Alton the full height container
		singleSlideClass: 'slide', // Tell Alton the full height slide class
		useSlideNumbers: true, // Set to false if you don't want to use pagination
		slideNumbersBorderColor: '#ccc', // Set the outside color of the pagination items (also used for active)
		slideNumbersColor: 'transparent', // Set the inner color of the pagination items (not active)
		bodyContainer: 'pageWrapper', // Tell Alton the body class
	});
}

$(document).ready(function() {

});
