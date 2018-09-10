//modules
import $ from 'jquery';
import challengeMustache from './challenge.html';


function challengeView () {

	this.app;

	this.pageData = {
		name: '',
		short: '',
		description: '',
		draw: '',
		drawCategory: '',
		categorySlug: '',
		time: 0,
		ready: '',
		colourClass: ''
	};

	this.init = function(context) {
		this.app = context;
		this.update();
	};

	this.update = function(data) {
		const challengeHTML = challengeMustache(data);
		$('#view').html(challengeHTML);
		this.animation();
	};


	//animation
	this.animation = function() {
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
		}, 1500);

		card.delay(1000).animate({
			height: cardHeight,
			opacity: 1,
		}, 1500);
	}

	

}

export default new challengeView();