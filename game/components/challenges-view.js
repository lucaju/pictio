//modules
import $ from 'jquery';
import challengesMustache from './challenges.html';


export default function (context) {

	const app = context;

	//reset gameState
	app.resetGameState();

	const pageData = {
		title: app.i18next.t('challenges.page.title'),
		inverseColour: app.interface.inverseClass(),
		challenges:  app.mechanics.challenges
	};

	const challengesHTML = challengesMustache(pageData);

	$(challengesHTML).appendTo($('#view'));

	$('#challenges').localize();

	//emit to socker IO
	app.socket.emit('interface', {
		view: 'challenges'
	});

	// get challenges
	// $.each(app.gameVariables.challenges, function (i, challenge) {
	let i = 0;
	for (let challenge of app.mechanics.challenges) {

		let card = $(`#${challenge.short}`);

		card.css('cursor', 'pointer');

		//button controll
		card.click(function () {
			$('#challenges').animate({
				marginTop: '-100',
				opacity: 0,
			}, 1500, function () {
				app.gameState.currentChallenge = challenge.name;
				app.interface.changeView('challenge');
			});

		});

		app.socket.emit('interface', {
			view: 'choose-chalenge'
		});	


		//visual initial state
		let cDelay = 400 + (i * 100) + (Math.random() * 200);
		let ctop = -500 + (Math.random() * 1000);

		card.css('left', -1500);
		card.css('top', ctop);

		card.delay(cDelay).animate({
			top: 0,
			left: 0,
		}, {
			duration: 1000,
			specialEasing: {
				width: 'linear',
				height: 'easeOutBounce'
			}
		});

	}
	// });

	//animation
	function enterAnimation() {
		$('#challenges').css('opacity', 0);
		$('#challenges').css('marginTop', 100);
	
		$('#challenges').animate({
			marginTop: 0,
			opacity: 1,
		}, 1100);
	}

	enterAnimation();
}