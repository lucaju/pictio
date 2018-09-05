//modules
import $ from 'jquery';
import gameMustache from './game.html';


export default function (context) {

	const app = context;

	const challenge = app.getChallenge(app.gameState.currentChallenge);

	const pageData = {
		time: challenge.time,
		clear: 'Clear',
		play: 'Play',
		back: 'Back',
		showBackButton: true,
		inverseColour: app.interface.inverseClass()
	};

	const gameHTML = gameMustache(pageData);

	$(gameHTML).appendTo($('#view'));

	$('#game').localize();
	
	$('#start-drawing-overlay').click(function () {
		$('#start-drawing-overlay').remove();
		app.startDrawing();
	});

	$('#clear-drawing').click(function () {
		console.log('clear');
		$('#guess')[0].innerHTML = '...';
		app.magentaAI.clearCanvas();

		app.socket.emit('guess', {
			view: 'game',
			action: 'clear',
			attempt: '...',
		});
	});


	$('#back').click(function () {
		// app.gameStape.timer.stop();
		// app.gameState.attemps = [];
		$('#game').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, function () {
			console.log('back');
			app.interface.changeView('challenge');
		});
	});


	//animation
	function enterAnimation() {
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
		}, 1500);


		card.delay(1000).animate({
			height: cardHeight,
			opacity: 1,
		}, 1500);
	}

	enterAnimation();

	app.socket.emit('interface', {
		view: 'show-game',
		action: 'initiate',
		challenge: app.gameState,
	});

}