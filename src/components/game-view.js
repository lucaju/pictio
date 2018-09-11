//modules
import $ from 'jquery';
import gameMustache from './game.html';


export default function (context) {

	const app = context;

	const challenge = app.getChallenge(app.gameState.currentChallenge);

	const pageData = {
		time: challenge.time,
		clear: app.i18next.t('game.page.clear'),
		play: app.i18next.t('game.page.play'),
		back: app.i18next.t('game.page.back'),
		showBackButton: false,
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

		$('#guess')[0].innerHTML = '...';
		app.clearDrawing();
	

		if(app.IOon) {
			app.socket.emit('guess', {
				view: 'game',
				action: 'clear',
				attempt: '...',
			});
		}

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

	if(app.IOon) {
		app.socket.emit('interface', {
			view: 'game'
		});
	}

}