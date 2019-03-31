//modules
import $ from 'jquery';
import ee from 'event-emitter';
import hasListeners from 'event-emitter/has-listeners';
import easytimer from 'easytimer/dist/easytimer.min';
import ProgressBar from 'progressbar.js';

import gameMustache from './game.html';

import canvasPaper from './canvas-view';
import magentaAI from './magentaAI';


function GameView() {

	//emitter
	ee(this);

	let progressBar;

	this.app = undefined;
	this.challenge = undefined;
	this.timer = undefined;
	this.pageData = {
		time: 0,
		clear: '',
		play: '',
		back: '',
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

		$('.uk-offcanvas-content').hide();

		const gameHTML = gameMustache(this.pageData);
		$(gameHTML).appendTo($('#app'));

		$('#home-button').click(() => {
			this.homeButton('home');
		});

		//translate
		this.translate();

		//set button actions
		$('#start-drawing-overlay').click(this, this.start);
		$('#clear-drawing').click(this, this.clear);

		if (!this.initiated) {
			this.initiated = true;
			this.addListeners();
		}

		//animation
		this.enterAnimation();

		//emit to socker IO
		this.emitToDashboard({
			type: 'interface',
			view: 'game',
			challenge: this.app.gameState.currentChallenge
		});

		this.app.speak('Touch on play to start.');

	};

	this.translate = function () {
		$('#game').localize();
	};

	this.updatePage = function (guess) {
		$('#guess')[0].innerHTML = guess;
		$('#container-guess').fadeIn('fast');
		$('#container-guess').fadeOut('slow');
	};

	this.addListeners = function () {
		const _this = this;

		this.canvasPaper.on('drawing', function (ets, ink) {
			_this.magentaAI.read(ets, ink);
		});

		this.magentaAI.on('guess', function (guess) {
			_this.updatePage(guess);

			_this.emitToCard({
				action: 'updateGuess',
				guess: guess
			});
		});

		this.magentaAI.on('stop', function () {
			_this.canvasPaper.stop();
			_this.timer.stop();
		});

		if (!hasListeners(this.magentaAI, 'win')) {
			this.magentaAI.on('win', function () {
				$('.uk-offcanvas-content').show();
				$('#game').remove();
				_this.emit('changeView', {
					source: 'game',
					target: 'post-game'
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

		_this.emitToCard({
			action: 'start'
		});

	};


	this.clear = function (e) {
		const _this = e.data;

		$('#guess')[0].innerHTML = '...';
		_this.canvasPaper.clearCanvas();

		_this.emitToCard({
			action: 'updateGuess',
			guess: '...'
		});

		//emit to socker IO
		_this.emitToDashboard({
			type: 'guess',
			view: 'game',
			action: 'clear',
			attempt: '...',
		});
	};

	this.homeButton = function () {
		this.timer.stop();
		this.app.gameState.attempts = [];
		this.canvasPaper.clearCanvas();

		$('.uk-offcanvas-content').show();
		$('#game').remove();
		this.emit('changeView', {
			source: 'game',
			target: 'home'
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

		progressBar = new ProgressBar.SemiCircle('#progress', {
			strokeWidth: 12,
			color: '#FFEA82',
			duration: 1400,
			svgStyle: null,
			text: {
				value: '',
				alignToBottom: true,
			},
			from: {
				color: '#ED6A5A'
			},
			to: {
				color: '#FFEA82'
			},
			// Set default step function for all animate calls
			step: (state, bar) => {
				bar.path.setAttribute('stroke', state.color);

				if ((timeLeftSeconds + 1) === 0) {
					bar.setText('');
				} else {
					bar.setText(`${timeLeftSeconds + 1}'`);
				}

				bar.text.style.color = state.color;
			}
		});


		this.timer.addEventListener('secondTenthsUpdated', function () {

			const min = _this.timer.getTimeValues().minutes;
			const sec = _this.timer.getTimeValues().seconds;
			const tsec = _this.timer.getTimeValues().secondTenths;

			timeLeftSeconds = (min * 60) + sec;

			const timeLeftSecondsTeeth = (min * 60 * 10) + (sec * 10) + tsec;
			timeLeftPercent = (timeLeftSecondsTeeth / challengeTime) * 10;

			progressBar.set(timeLeftPercent / 100); // Number from 0.0 to 1.0

			//IO - emit timer
			if (_this.app.IOon) {
				_this.app.socket.emit('timer', {
					view: 'game',
					timer: timeLeftSeconds,
					timerPercentage: timeLeftPercent
				});

				_this.emitToCard({
					action: 'updateTime',
					time: timeLeftSeconds
				});
			}
		});

		this.timer.addEventListener('targetAchieved', function () {
			$('.uk-offcanvas-content').show();
			$('#game').remove();
			_this.emit('changeView', {
				source: 'game',
				target: 'post-game'
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

	this.emitToCard = function ({
		type = 'card',
		view = 'challenge',
		action = 'new',
		name = '',
		short = '',
		draw = '',
		drawCategory = '',
		time = 0,
		ready = '',
		guess = ''
	}) {
		if (this.app.IOon) {
			this.app.socket.emit(type, {
				view: view,
				action: action,
				name: name,
				short: short,
				draw: draw,
				drawCategory: drawCategory,
				time: time,
				ready: ready.pageData,
				guess: guess
			});
		}
	};

	this.emitToDashboard = function ({
		type = 'interface',
		view = 'game',
		challenge = '',
		action = '',
		attempt = ''
	}) {

		if (this.app.IOon) {
			this.app.socket.emit(type, {
				view: view,
				challenge: challenge,
				action: action,
				attempt: attempt
			});
		}
	};

}

export default new GameView();