//modules
import $ from 'jquery';
import ee from 'event-emitter';

import challengesMustache from './challenges.html';


function ChallengesView() {

	//emitter
	ee(this);

	this.app = undefined;
	this.pageData = {
		title: '',
		inverseColour: undefined,
		challenges: undefined
	};

	this.init = function (context) {
		this.app = context;

		//reset gameState
		this.app.resetGameState();

		//data
		this.pageData = {
			title: this.app.i18next.t('challenges.page.title'),
			inverseColour: this.app.interface.inverseClass(),
			challenges: this.app.mechanics.challenges
		};

		//build page
		const challengesHTML = challengesMustache(this.pageData);
		$(challengesHTML).appendTo($('#view'));

		// get challenges
		this.getChallenges();

		//transalate
		this.translate();

		//emit to socker IO
		this.emitToDashboard({
			message: this.app.i18next.t('challenges.dashboard.selecting'),
		});

		//animation
		this.enterAnimation();

	};

	this.translate = function() {
		$('#challenges').localize();
	};

	this.getChallenges = function() {

		// const _this = this;
		const duration = 1000;

		//loop
		let i = 0;
		for (let challenge of this.app.mechanics.challenges) {

			let card = $(`#${challenge.short}`);
			card.data({
				short: challenge.short,
				name:challenge.name
			});
			card.click(this,this.challengeButtonAction);

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

	this.challengeButtonAction = function(e) {
		const _this = e.data;
		const card = $(e.currentTarget);
		const challengeName = card.data('name');

		$('#challenges').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, function () {
			_this.app.gameState.currentChallenge = challengeName;
			_this.emit('changeView', 'challenge');
		});
	};

	//animation
	this.enterAnimation = function () {

		const duration = 1100;

		$('#challenges').css('opacity', 0);
		$('#challenges').css('marginTop', 100);

		$('#challenges').animate({
			marginTop: 0,
			opacity: 1,
		}, duration);
	};

	this.emitToDashboard = function({
		type = 'interface',
		view = 'challenges',
		message = ''
	}) {

		if (this.app.IOon) {
			this.app.socket.emit(type, {
				view: view,
				message: message,
			});
		}
	};

}

export default new ChallengesView();