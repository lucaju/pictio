//modules
import $ from 'jquery';
import easytimer from 'easytimer'; 

import loadingbar from '@loadingio/loading-bar';

import gameMustache from './game.html';

import canvasPaper from './canvas-view';
import magentaAI from './magentaAI';

import '@loadingio/loading-bar/dist/loading-bar.css';


function GameView() {

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




	this.init = function (context) {

		this.app = context;

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

		//generate the page
		const gameHTML = gameMustache(this.pageData);
		$(gameHTML).appendTo($('#view'));

		//translate the page
		$('#game').localize();

		//set button actions
		this.setStart();
		this.setClear();
		this.addListeners();
		if (this.pageData.showBackButton) this.setBack();

		//animation
		this.enterAnimation();

		//IO
		if (this.app.IOon) {
			this.app.socket.emit('interface', {
				view: 'game'
			});
		}


	};

	this.updatePage = function(guess) {
		$('#guess')[0].innerHTML = guess;
	};

	this.addListeners = function() {
		const _this = this;

		this.canvasPaper.on('drawing', function (ets,ink) {
			_this.magentaAI.read(ets,ink);
		});


		this.magentaAI.on('guess', function (guess) {
			_this.updatePage(guess);
		});

		this.magentaAI.on('stop', function (guess) {
			_this.timer.stop();
		});

	};

	this.setStart = function () {
		const _this = this;

		$('#start-drawing-overlay').click(function () {
			$('#start-drawing-overlay').remove();

			_this.app.gameState.attempts = [];

			_this.timeGame();
			_this.canvasPaper.startCanvas();
		});
	};


	this.setClear = function () {
		const _this = this;

		$('#clear-drawing').click(function () {

			$('#guess')[0].innerHTML = '...';
			_this.canvasPaper.clearCanvas();


			if (_this.app.IOon) {
				_this.app.socket.emit('guess', {
					view: 'game',
					action: 'clear',
					attempt: '...',
				});
			}

		});
	};

	this.setBack = function () {
		const _this = this;

		$('#back').click(function () {
			$('#game').animate({
				marginTop: '-100',
				opacity: 0,
			}, 1500, function () {
				_this.app.interface.changeView('challenge');
			});
		});

	};

	// --- set timer for game
	this.timeGame = function () {

		const _this = this;

		const challengeTime = this.challenge.time;

		this.timer  = new easytimer(); // reset timer

		this.timer .start({
			countdown: true,
			precision: 'secondTenths',
			startValues: {
				seconds: challengeTime
			}
		}); // start timer countdown

		let timeLeftSeconds = challengeTime;
		let timeLeftPercent = 100;// %

		//loading bar
		let timerTracker = new loadingbar('#ldBar');
		timerTracker.set(timeLeftPercent);
		$('.ldBar-label').remove(); // remove label

		// $('#timer #number').html(challengeTime + 's');

		this.timer.addEventListener('secondTenthsUpdated', function (e) {

			const min = _this.timer.getTimeValues().minutes;
			const sec = _this.timer.getTimeValues().seconds;
			const tsec = _this.timer.getTimeValues().secondTenths;

			timeLeftSeconds = (min*60) + sec;
			// $('#timer #number').html(timeLeftSeconds + 's');

			const timeLeftSecondsTeeth = (min*60*10) + (sec*10) + tsec;
			timeLeftPercent = (timeLeftSecondsTeeth / challengeTime)*10;

			timerTracker.set(timeLeftPercent);

			//IO - emit timer
			if(_this.app.IOon) {
				_this.app.socket.emit('timer', {
					view: 'game',
					timer: timeLeftSeconds + 's',
					timerPercentage: timeLeftPercent
				});
			}
		});

		this.timer.addEventListener('targetAchieved', function (e) {
			_this.app.interface.changeView('post-game');
		});
	};

	//animation
	this.enterAnimation = function () {
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
	};

}

export default new GameView();