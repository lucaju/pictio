//modules
import $ from 'jquery';
import gameMustache from './game.html';

import loadingbar from '@loadingio/loading-bar';
import '@loadingio/loading-bar/dist/loading-bar.css';


function gameView () {

	this.app = undefined;
	this.timerTracker = undefined;

	this.pageData = {
		colourClass: ''
	};

	this.init = function(context) {

		this.app = context;
		this.pageData.colourClass = this.app.interface.inverseClass();

		//build page
		const gameHTML = gameMustache(this.pageData);
		$('#view').html(gameHTML);

		//animate
		this.animation();

		//upadate
		this.update();

		//timer
		this.timerTracker = new loadingbar('#ldBar');
		$('.ldBar-label').remove();
		this.timerTracker.set(100);
	};

	this.update = function(data) {
		
	};

	this.clear = function() {
		$('#guess')[0].innerHTML = '...';
	};

	this.guess = function(attempt) {
		$('#guess')[0].innerHTML = attempt;
	};

	this.timer = function(data) {
		this.timerTracker.set(data.timerPercentage);
	};


	//animation
	this.animation = function() {

		const duration = 1500;

		let container = $('#game');
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

export default new gameView();