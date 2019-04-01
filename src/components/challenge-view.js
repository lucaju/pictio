//modules
import $ from 'jquery';
import ee from 'event-emitter';

import challengeMustache from './challenge.html';


function ChallengeView() {

	//emitter
	ee(this);

	this.app = undefined;
	this.challenge = undefined;
	this.currentDrawChallenge = undefined;
	this.pageData = {
		name: '',
		short: '',
		description: '',
		draw: '',
		drawCategory: '',
		categorySlug: '',
		time: 0,
		ready: '',
		back: '',
		inverseColour: undefined,
	};

	this.init = function (context) {

		//setup
		this.app = context;
		this.challenge = this.app.getChallenge(this.app.gameState.currentChallenge);
		this.currentDrawChallenge = this.pickDrawCategory();

		this.app.gameState.currentCategory = this.currentDrawChallenge;

		const categorySlug = this.currentDrawChallenge.replace(/\s/g, '-').toLowerCase();

		const externalCardURL = 'gamepictio.com/card';
		const accesCardText = `${this.app.i18next.t('challenges.page.access')} ${externalCardURL} ${this.app.i18next.t('challenges.page.on-device')}`;

		//data
		this.pageData = {
			name: this.app.i18next.t(`challenges.challenges.${this.challenge.short}.name`),
			short: this.challenge.short,
			description: this.app.i18next.t(`challenges.challenges.${this.challenge.short}.description`),
			draw: this.app.i18next.t('challenges.page.draw'),
			drawCategory: this.app.i18next.t(`categories.${categorySlug}`),
			categorySlug: categorySlug,
			time: this.challenge.time,
			ready: this.app.i18next.t('challenges.page.ready'),
			back: this.app.i18next.t('challenges.page.back'),
			inverseColour: this.app.interface.inverseClass(),
			onePlayer: this.app.gameState.players == 1,
			accessCard: accesCardText,
			access: this.app.i18next.t('challenges.page.access'),
			onDevice: this.app.i18next.t('challenges.page.on-device'),
			externalCardURL: externalCardURL
		};

		//buid page
		const challengeHTML = challengeMustache(this.pageData);
		$(challengeHTML).appendTo($('#view'));

		this.app.speak(`${this.app.i18next.t('challenges.speak.the-challenge-is')} ${this.pageData.name}`);

		let toSpeak;

		if (this.app.gameState.players === 1) {

			toSpeak = `${this.app.i18next.t('challenges.speak.you-must-draw')} ${this.pageData.drawCategory} ${this.app.i18next.t('challenges.speak.in')} ${this.pageData.time} ${this.app.i18next.t('challenges.speak.seconds')}`;
			this.app.speak(toSpeak);

			toSpeak = `${this.app.i18next.t('challenges.speak.are-you-ready')}`;
			this.app.speak(toSpeak);

			$('.uk-card').click(this, this.callGame);
			$('#play').click(this, this.callGame);
		} else if (this.app.gameState.players === 2) {
			this.app.speak(this.app.i18next.t('challenges.speak.access-card'));
			$('#back').click(this, this.back);
		}
		

		//translate
		this.translate();


		//home button
		$('#home-button').click(() => {
			this.homeButton('home');
		});

		//emit to socker IO
		if (this.app.gameState.players > 1) {
			this.emitToCard({
				action: 'new',
				name: this.pageData.name,
				short: this.pageData.short,
				draw: this.pageData.draw,
				drawCategory: this.pageData.drawCategory,
				time: this.pageData.time,
				ready: this.pageData.ready
			});
		}

		//emit to socker IO
		this.emitToDashboard({
			name: this.pageData.name,
			short: this.pageData.short,
			description: this.pageData.description,
			drawCategory: this.pageData.drawCategory,
			time: this.pageData.time,
			colourClass: this.pageData.inverseColour,
			players: this.app.gameState.players
		});

		//animation
		this.enterAnimation();

	};

	this.pickDrawCategory = function () {
		//pick a draw category
		const filteredCatetories = this.filterCategories(this.challenge.code);
		const randomDraw = filteredCatetories[Math.floor(Math.random() * filteredCatetories.length)];
		return randomDraw.Category; // save current draw category
	};

	//-- Filter category by cahllenge code 
	this.filterCategories = function (code) {

		let filteredCat = [];

		//loop categories draw
		for (let cat of this.app.mechanics.catChallenges) {
			// $.each(catChallenges, function(i,cat) {

			// if category fits in only one challenge
			if (cat.Challenge.length == 1) {
				if (cat.Challenge == code) filteredCat.push(cat);

				// cartegory fits into more than one category
			} else {

				//split comma separated cateories
				let chArray = cat.Challenge.split(',');

				//loop
				for (let chall of chArray) {
					if (chall == code) filteredCat.push(cat);
				}

			}
		}

		return filteredCat;
	};

	this.translate = function () {
		$('#challenge').localize();
	};

	this.callGame = function (e) {
		const _this = e.data;
		const duration = 1500;

		$('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, function () {
			_this.emit('changeView', {
				source: 'challenge',
				target:'game'
			});
		});
	};

	//comming from the card (on another device)
	this.ready = function ready(data) {

		const _this = this;
		const duration = 1500;

		$('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, function () {
			_this.emit('changeView', {
				source: 'challenge',
				target:'game'
			});
		});
	};

	this.homeButton = function() {
		$('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			this.emit('changeView', {
				source: 'challenge',
				target:'home'
			});
		});

		this.emitToCard({
			action: 'new',
		});

		//emit to socker IO
		if (this.app.IOon) {
			this.emitToDashboard({
				view: 'waiting',
				message: '',
			});
		}
	};

	this.back = function (e) {
		const _this = e.data;
		const duration = 1500;

		_this.emitToCard({
			action: 'new',
		});

		$('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, function () {
			_this.emit('changeView', {
				source: 'challenge',
				target:'challenges'
			});
		});
	};

	//animation
	this.enterAnimation = function () {

		const duration = 1500;

		let container = $('#challenge');
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
		ready = ''
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
				ready: ready
			});
		}
	};

	this.emitToDashboard = function ({
		type = 'interface',
		view = 'challenge',
		name = '',
		short = '',
		description = '',
		drawCategory = '',
		time = 0,
		colourClass = '',
		players = 0
	}) {
		if (this.app.IOon) {
			this.app.socket.emit(type, {
				view: view,
				name: name,
				short: short,
				description: description,
				drawCategory: drawCategory,
				time: time,
				colourClass: colourClass,
				players
			});
		}
	};

}

export default new ChallengeView();