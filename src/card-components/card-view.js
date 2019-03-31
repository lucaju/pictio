//modules
import $ from 'jquery';
import cardMustache from './card.html';


export default function cardView (context) {

	const app = context;

	let pageData = {};

	this.init = function() {
		// this.update();
	};

	this.update = function(data) {

		if (!data) data = {action: 'new'};

		if (data.action == 'new') {
			pageData = data;	
			//build page
			const challengeHTML = cardMustache(pageData);
			
			$('#view').html(challengeHTML);

			//animation
			this.animation();

			// $('.uk-card').click(this, this.callGame);
			if (data.action == 'new') $('#play').click(this, this.callGame);
			
		} else if (data.action == 'start') {
			this.startGame(data);
		} else if (data.action == 'updateGuess') {
			this.updateGuess(data);
		} else if (data.action == 'updateTime') {
			this.updatTime(data);
		} else if (data.action == 'postGame') {
			this.endGame(data);
		}
	};

	this.startGame = function updateGame() {
		$('#play').remove();
	};

	this.updateGuess = function updateGame(data) {
		$('#guess').html(data.guess);
	};

	this.updatTime = function updateGame(data) {
		$('#time').html(`${data.time + 1}s`);
	};

	this.endGame = function updateGame(data) {
		$('#time').html('');
		$('#guess').html(data.guess);
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

	this.callGame = () => {
		$('#play').remove();
		$('#guess').html('...');
		
		emitToGame({
			name: pageData.name,
			actio: 'play',
			drawCategory: pageData.drawCategory,
		});
	};
	
	const emitToGame = function emitToGame({
		type = 'card',
		view = 'challenge',
		name = '',
		action = 'play',
		drawCategory = ''
	}) {
		app.socket.emit(type, {
			view: view,
			name: name,
			action: action,
			drawCategory: drawCategory
		});
	};

}