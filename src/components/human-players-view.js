//modules
import $ from 'jquery';
import ee from 'event-emitter';

import playerssMustache from './human-players.html';


function PartnersView() {

	//emitter
	ee(this);

	this.app = undefined;
	this.pageData = {
		title: '',
		playersOptions: [],
		inverseColour: undefined,
		individualAccent: false
	};

	this.init = function (context) {

		const _this = this;

		this.app = context;

		//data
		this.pageData = {
			title: this.app.i18next.t('players.page.title'),
			playersOptions: [
				{
					name: this.app.i18next.t('players.playersOptions.onePlayer'),
					slug: this.app.i18next.t('players.playersOptions.onePlayer').toLowerCase().replace(/\s+/g, '-'),
					colour: 'background-yellow'
				},{
					name: this.app.i18next.t('players.playersOptions.twoPlayers'),
					slug:  this.app.i18next.t('players.playersOptions.twoPlayers').toLowerCase().replace(/\s+/g, '-'),
					colour: 'uk-button-primary',
					extraIcon: true
				}
			],
			inverseColour: this.app.interface.inverseClass(),
			individualAccent: false
		};

		this.app.speak(this.pageData.title);

		//build page
		const playersHTML = playerssMustache(this.pageData);
		$(playersHTML).appendTo($('#view'));

		$('#home-button').click(() => {
			this.homeButton('home');
		});

		//buttons human players
		for (const option of this.pageData.playersOptions) {
			const bt = $(`#${option.slug}`);
			// bt.click(this,this.done);

			bt.click(() =>{

				// this.playerSpeak(option.name);
				

				let target;
				if (option.slug == '1-human-player') {
					this.app.gameState.currentChallenge = 'Blind Drawing with Left/Right Hand';
					this.app.gameState.players = 1;
					target = 'challenge';
					this.app.speak('Allright then.');
				} else {
					this.app.gameState.players = 2;
					target = 'challenges';
					this.app.speak('Great.');
				}

				this.exitAnimation(target);
			});
		}

		//translate
		// this.translate();

		this.app.artyom.on([this.pageData.done]).then(function () {
			_this.doneSpeak();
		});

		//animation
		this.enterAnimation();

		//emit to socker IO
		this.emitToDashboard({
			message: this.app.i18next.t('players.dashboard.message'),
		});

		//pre-select first option
		// this.changePersona(this.app.getPersona(this.pageData.playersOptions[0].slug));
	};

	this.translate = function() {
		$('#human-players').localize();
	};

	this.enterAnimation = function () {
		const duration = 1500;

		$('#partner-choice').css('opacity', 0);
		$('#partner-choice').css('marginTop', 100);

		$('#partner-choice').animate({
			marginTop: 0,
			opacity: 1,
		}, duration);
	};

	this.doneSpeak = function() {
		this.exitAnimation();
	};

	this.homeButton = function() {
		$('#human-players').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			this.emit('changeView', {
				source: 'players',
				target:'home'
			});
		});
	};

	this.exitAnimation = function (target) {
		const _this = this;
		const duration = 1500;

		$('#human-players').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, function () {
			_this.emit('changeView', {
				source: 'players',
				target:target
			});
		});
	};

	this.speak = function(msg) {
		//speack
		this.app.speak(msg);
	};

	this.emitToDashboard = function({
		type = 'interface',
		view = 'players',
		colour = '',
		message = ''
	}) {

		if (this.app.IOon) {
			this.app.socket.emit(type, {
				view: view,
				colour: colour,
				message: message,
			});
		}
	};

}

export default new PartnersView();