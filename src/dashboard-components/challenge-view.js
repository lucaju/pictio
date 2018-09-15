//modules
import $ from 'jquery';
import challengeMustache from './challenge.html';


function challengeView () {

	this.init = function() {
		this.update();
	};

	this.update = function(data) {
		
		//build page
		const challengeHTML = challengeMustache(data);
		$('#view').html(challengeHTML);

		//animation
		this.animation();
	};
	

	//animation
	this.animation = function() {
		const duration = 1500;

		let container = $('#challenge');
		container.css('opacity', 0);
		container.css('marginTop', 100);

		let card = $('.uk-card');
		let cardHeight = card.height();
		card.css('height', 0);
		card.css('opacity', 0);

		//animation
		container.animate({
			marginTop: 0,
			opacity: 1,
		}, duration);

		card.delay(1000).animate({
			height: cardHeight,
			opacity: 1,
		}, duration);
	};

}

export default new challengeView();