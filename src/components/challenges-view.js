//modules
import $ from 'jquery';
import ee from 'event-emitter';

import challengesMustache from './challenges.html';


function ChallengesView() {

	let app;

	//emitter
	ee(this);

	app = undefined;
	this.pageData = {
		title: '',
		inverseColour: undefined,
		challenges: undefined
	};

	this.init = (context) => {
		
		app = context;

		const challenges = [];
		for (const challenge of app.mechanics.challenges) {
			if (challenge.players > 1) {
				challenges.push(challenge);
			}
		}

		//data
		this.pageData = {
			title: app.i18next.t('challenges.page.title'),
			inverseColour: app.interface.inverseClass(),
			challenges: challenges
		};

		//build page
		const challengesHTML = challengesMustache(this.pageData);
		$(challengesHTML).appendTo($('#view'));


		//home button
		$('#home-button').click(() => {
			homeButton('home');
		});

		// get challenges
		getChallenges();

		//transalate
		translate();

		//emit to socker IO
		emitToDashboard({
			message: app.i18next.t('challenges.dashboard.selecting'),
		});

		app.speak(app.i18next.t('challenges.speak.pick-a-challenge'));

		//animation
		enterAnimation();
	};

	const translate = () => {
		$('#challenges').localize();
	};

	const getChallenges = () => {

		// const _this = this;
		const duration = 1000;

		//loop
		let i = 0;
		for (const challenge of this.pageData.challenges) {

			const card = $(`#${challenge.short}`);
			card.data({
				short: challenge.short,
				name:challenge.name
			});
			card.click(this, challengeButtonAction);

			//visual initial state
			let cDelay = 400 + (i * 100) + (Math.random() * 200);
			let ctop = -500 + (Math.random() * 1000);

			card.css('cursor', 'pointer');
			card.css('left', -1500);
			card.css('top', ctop);

			card.delay(cDelay).animate({
				top: 0,
				left: 0,
			}, {
				duration: duration,
				specialEasing: {
					width: 'linear',
					height: 'easeOutBounce'
				}
			});
		}
	};

	const homeButton = () => {
		$('#challenges').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			this.emit('changeView', {
				source: 'challenges',
				target:'home'
			});
		});

		emitToDashboard({
			view: 'waiting'
		});
	};

	const challengeButtonAction = (e) => {
		const card = $(e.currentTarget);
		const challengeName = card.data('name');

		$('#challenges').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			app.gameState.currentChallenge = challengeName;
			this.emit('changeView', {
				source: 'challenges',
				target:'challenge'
			});
		});
	};

	//animation
	const enterAnimation = () => {

		const duration = 1100;

		$('#challenges').css('opacity', 0);
		$('#challenges').css('marginTop', 100);

		$('#challenges').animate({
			marginTop: 0,
			opacity: 1,
		}, duration);
	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'challenges',
		room = app.socket.id,
		message = ''
	}) => {
		app.socket.emit(type, {view, room, message});
	};

}

export default new ChallengesView();