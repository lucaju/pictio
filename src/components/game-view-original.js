//modules
import $ from 'jquery';
import ee from 'event-emitter';
import hasListeners from 'event-emitter/has-listeners';
import easytimer from 'easytimer/dist/easytimer.min';
import loadingbar from '@loadingio/loading-bar';

import gameMustache from './game.html';

import canvasPaper from './canvas-view';
import magentaAI from './magentaAI';

import '@loadingio/loading-bar/dist/loading-bar.css';


function GameView() {

	//emitter
	ee(this);

	this.app = undefined;
	this.challenge = undefined;
	this.timer = undefined;
	this.pageData = {
		time: 0,
		clear: '',
		play: '',
		back: '',
		showBackButton: false,
		inverseColour: undefined
	};
	this.canvasPaper = new canvasPaper();
	this.magentaAI = new magentaAI();

	this.initiated = false;


	this.init = function (context) {

		this.app = context;

		//setup
		this.canvasPaper.init(this.app);
		this.magentaAI.init(this.app);

		//set challenge
		this.challenge = this.app.getChallenge(this.app.gameState.currentChallenge);

		//Page data
		this.pageData = {
			time: this.challenge.time,
			clear: this.app.i18next.t('game.page.clear'),
			play: this.app.i18next.t('game.page.play'),
			back: this.app.i18next.t('game.page.back'),
			showBackButton: false,
			inverseColour: this.app.interface.inverseClass()
		};

		//Build page
		const gameHTML = gameMustache(this.pageData);
		$(gameHTML).appendTo($('#view'));

		$('#home-button').click(() => {
			this.homeButton('home');
		});

		//translate
		this.translate();

		//set button actions
		$('#start-drawing-overlay').click(this, this.start);
		$('#clear-drawing').click(this, this.clear);
		if (this.pageData.showBackButton) $('#back').click(this, this.back);

		if (!this.initiated) {
			this.initiated = true;
			this.addListeners();
		}

		//animation
		this.enterAnimation();

		//emit to socker IO
		this.emitToDashboard({
			type: 'interface',
			view: 'game'
		});

		this.app.speak('Touch on play to start.');

	};

	this.translate = function () {
		$('#game').localize();
	};

	this.updatePage = function (guess) {
		$('#guess')[0].innerHTML = guess;
	};

	this.addListeners = function () {
		const _this = this;

		this.canvasPaper.on('drawing', function (ets, ink) {
			_this.magentaAI.read(ets, ink);
		});

		this.magentaAI.on('guess', function (guess) {
			_this.updatePage(guess);
		});

		this.magentaAI.on('stop', function () {
			_this.canvasPaper.stop();
			_this.timer.stop();
		});

		if (!hasListeners(this.magentaAI,'win')) {
			this.magentaAI.on('win', function () {
				_this.emit('changeView', {
					source: 'game',
					target:'post-game'
				});
			});
		}

	};

	this.start = function (e) {
		const _this = e.data;

		$(e.currentTarget).remove();

		_this.app.gameState.attempts = [];

		_this.timeGame();
		_this.canvasPaper.startCanvas();

	};


	this.clear = function (e) {
		const _this = e.data;

		$('#guess')[0].innerHTML = '...';
		_this.canvasPaper.clearCanvas();

		//emit to socker IO
		_this.emitToDashboard({
			type: 'guess',
			view: 'game',
			action: 'clear',
			attempt: '...',
		});
	};

	this.homeButton = function() {
		$('#game').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			this.emit('changeView', {
				source: 'game',
				target:'home'
			});
		});
	};

	this.back = function (e) {
		const _this = e.data;
		const duration = 1500;

		$('#game').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, function () {
			_this.app.interface.changeView({
				source: 'game',
				target:'challenge'
			});
		});

	};

	// --- set timer for game
	this.timeGame = function () {

		const _this = this;
		const challengeTime = this.challenge.time;

		this.timer = new easytimer(); // reset timer

		this.timer.start({
			countdown: true,
			precision: 'secondTenths',
			startValues: {
				seconds: challengeTime
			}
		}); // start timer countdown

		let timeLeftSeconds = challengeTime;
		let timeLeftPercent = 100; // %

		//loading bar
		let timerTracker = new loadingbar('#ldBar');
		timerTracker.set(timeLeftPercent);
		$('.ldBar-label').remove(); // remove label

		// $('#timer #number').html(challengeTime + 's');

		this.timer.addEventListener('secondTenthsUpdated', function (e) {

			const min = _this.timer.getTimeValues().minutes;
			const sec = _this.timer.getTimeValues().seconds;
			const tsec = _this.timer.getTimeValues().secondTenths;

			timeLeftSeconds = (min * 60) + sec;
			// $('#timer #number').html(timeLeftSeconds + 's');

			const timeLeftSecondsTeeth = (min * 60 * 10) + (sec * 10) + tsec;
			timeLeftPercent = (timeLeftSecondsTeeth / challengeTime) * 10;

			timerTracker.set(timeLeftPercent);

			//IO - emit timer
			if (_this.app.IOon) {
				_this.app.socket.emit('timer', {
					view: 'game',
					timer: timeLeftSeconds + 's',
					timerPercentage: timeLeftPercent
				});
			}
		});

		this.timer.addEventListener('targetAchieved', function (e) {
			_this.emit('changeView', {
				source: 'game',
				target:'post-game'
			});
		});
	};

	//animation
	this.enterAnimation = function () {
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

	this.emitToDashboard = function ({
		type = 'interface',
		view = 'game',
		action = '',
		attempt = ''
	}) {

		if (this.app.IOon) {
			this.app.socket.emit(type, {
				view: view,
				action: action,
				attempt: attempt
			});
		}
	};

}

export default new GameView();