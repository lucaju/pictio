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

	let app;

	//emitter
	ee(this);

	let progressBar;

	app = undefined;
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


	this.init = (context) => {

		app = context;

		//setup
		this.canvasPaper.init(app);
		this.magentaAI.init(app);

		//set challenge
		this.challenge = app.getChallenge(app.gameState.currentChallenge);

		//Page data
		this.pageData = {
			time: this.challenge.time,
			clear: app.i18next.t('game.page.clear'),
			play: app.i18next.t('game.page.play'),
			back: app.i18next.t('game.page.back'),
			showBackButton: false,
			inverseColour: app.interface.inverseClass()
		};

		//Build page

		$('.uk-offcanvas-content').hide();

		const gameHTML = gameMustache(this.pageData);
		$(gameHTML).appendTo($('#app'));

		$('#home-button').click(() => {
			homeButton('home');
		});

		//translate
		translate();

		//set button actions
		$('#start-drawing-overlay').click(this, start);
		$('#clear-drawing').click(this, clear);

		if (!this.initiated) {
			this.initiated = true;
			this.addListeners();
		}

		//animation
		enterAnimation();

		//emit to socker IO
		emitToDashboard({
			type: 'interface',
			view: 'game',
			challenge: app.gameState.currentChallenge
		});

		app.speak(app.i18next.t('game.speak.play'));

	};

	const translate = () => {
		$('#game').localize();
	};

	const updatePage = (guess) => {
		$('#guess')[0].innerHTML = guess;
		$('#container-guess').fadeIn('fast');
		$('#container-guess').fadeOut('slow');
	};

	this.addListeners = () => {

		this.canvasPaper.on('drawing', (ets, ink) => {
			this.magentaAI.read(ets, ink);
		});

		this.magentaAI.on('guess', (guess) => {
			updatePage(guess);

			emitToCard({
				action: 'updateGuess',
				guess: guess
			});
		});

		this.magentaAI.on('stop', () => {
			this.canvasPaper.stop();
			this.timer.stop();
		});

		if (!hasListeners(this.magentaAI, 'win')) {
			this.magentaAI.on('win', () => {
				$('.uk-offcanvas-content').show();
				$('#game').remove();
				this.emit('changeView', {
					source: 'game',
					target: 'post-game'
				});
			});
		}

	};

	const start = (e) => {

		$(e.currentTarget).remove();

		app.gameState.attempts = [];

		timeGame();
		this.canvasPaper.startCanvas();

		emitToCard({
			action: 'start'
		});
	};

	const clear = () => {

		$('#guess')[0].innerHTML = '...';
		this.canvasPaper.clearCanvas();

		emitToCard({
			action: 'updateGuess',
			guess: '...'
		});

		//emit to socker IO
		emitToDashboard({
			type: 'guess',
			view: 'game',
			action: 'clear',
			attempt: '...',
		});
	};

	const homeButton = () => {
		this.timer.stop();
		app.gameState.attempts = [];
		this.canvasPaper.clearCanvas();

		emitToCard({
			action: 'wait',
		});

		emitToDashboard({
			view: 'waiting'
		});

		$('.uk-offcanvas-content').show();
		$('#game').remove();
		this.emit('changeView', {
			source: 'game',
			target: 'home'
		});
	};

	// --- set timer for game
	const timeGame = () => {

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


		this.timer.addEventListener('secondTenthsUpdated', () => {

			const min = this.timer.getTimeValues().minutes;
			const sec = this.timer.getTimeValues().seconds;
			const tsec = this.timer.getTimeValues().secondTenths;

			timeLeftSeconds = (min * 60) + sec;

			const timeLeftSecondsTeeth = (min * 60 * 10) + (sec * 10) + tsec;
			timeLeftPercent = (timeLeftSecondsTeeth / challengeTime) * 10;

			progressBar.set(timeLeftPercent / 100); // Number from 0.0 to 1.0

			//IO - emit timer
			app.socket.emit('timer', {
				view: 'game',
				timer: timeLeftSeconds,
				timerPercentage: timeLeftPercent
			});

			emitToCard({
				action: 'updateTime',
				time: timeLeftSeconds
			});
			
		});

		this.timer.addEventListener('targetAchieved', () => {
			$('.uk-offcanvas-content').show();
			$('#game').remove();
			this.emit('changeView', {
				source: 'game',
				target: 'post-game'
			});
		});
	};

	//animation
	const enterAnimation = () => {
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

	const emitToCard = ({
		type = 'card',
		view = 'challenge',
		action = 'new',
		room = app.socket.id,
		time = 0,
		guess = ''
	}) => {
		app.socket.emit(type, {view, action, room, name, time, guess: guess});
	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'game',
		room = app.socket.id,
		challenge = '',
		action = '',
		attempt = ''
	}) => {
		app.socket.emit(type, {view, room, challenge, action, attempt});
	};

}

export default new GameView();