//modules
import $ from 'jquery';
import ee from 'event-emitter';
import QRCode from 'qrcode';

import challengeMustache from './challenge.html';
import challengeQRcodeMustache from './challenge-qrcode.html';


function ChallengeView() {

	let app;

	//emitter
	ee(this);

	app = undefined;
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


	this.init = async (context) => {

		//setup
		app = context;

		this.challenge = app.getChallenge(app.gameState.currentChallenge);
		this.currentDrawChallenge = pickDrawCategory();

		app.gameState.currentCategory = this.currentDrawChallenge;

		const categorySlug = this.currentDrawChallenge.replace(/\s/g, '-').toLowerCase();

		const externalCardURL = `http://www.gamepictio.com/card/${app.socket.id}`;
		
		const qrCode = await QRCode.toDataURL(externalCardURL);

		//data
		this.pageData = {
			name: app.i18next.t(`challenges.challenges.${this.challenge.short}.name`),
			short: this.challenge.short,
			description: app.i18next.t(`challenges.challenges.${this.challenge.short}.description`),
			draw: app.i18next.t('challenges.page.draw'),
			drawCategory: app.i18next.t(`categories.${categorySlug}`),
			categorySlug: categorySlug,
			time: this.challenge.time,
			ready: app.i18next.t('challenges.page.ready'),
			back: app.i18next.t('challenges.page.back'),
			inverseColour: app.interface.inverseClass(),
			onePlayer: app.gameState.players == 1,
			qrcodeText: app.i18next.t('challenges.page.qrcodeText'),
			noPhoneText: app.i18next.t('challenges.page.page.no-phone-text'),
			externalCardURL: externalCardURL,
			qrcode: qrCode
		};

		//buid page
		const challengeHTML = challengeMustache(this.pageData);
		$(challengeHTML).appendTo($('#view'));

		app.speak(`${app.i18next.t('challenges.speak.the-challenge-is')} ${this.pageData.name}`);

		let toSpeak;

		if (app.gameState.players === 1 || app.gameState.noPhone) {

			toSpeak = `${app.i18next.t('challenges.speak.you-must-draw')} ${this.pageData.time} ${app.i18next.t('challenges.speak.seconds')}`;
			app.speak(toSpeak);

			toSpeak = `${app.i18next.t('challenges.speak.are-you-ready')}`;
			app.speak(toSpeak);

			$('.uk-card').click(this, callGame);

			//animation
			showDrawingCard({delay:1000});

		} else if (app.gameState.players === 2) {

			app.speak(app.i18next.t('challenges.page.qrcodeText'));
			$('#drawing-card').css('display','none');
			$('#back').click(this, goBack);

			showQRCodeCard();
			
		}
		
		//translate
		translate();

		//home button
		$('#home-button').click(() => {
			homeButton('home');
		});

		//emit to socker IO
		emitToDashboard({
			name: this.pageData.name,
			short: this.pageData.short,
			description: this.pageData.description,
			drawCategory: this.pageData.drawCategory,
			time: this.pageData.time,
			colourClass: this.pageData.inverseColour,
			players: app.gameState.players
		});

		if (app.gameState.players > 1) {
			if (app.virtualCardRegistered) {
				emitToCard({
					action: 'new',
				});
			}

			app.socket.on('card', cardListeners);
		}

		enterAnimation();

	};

	const pickDrawCategory = () => {
		//pick a draw category
		const filteredCatetories = filterCategories(this.challenge.code);
		const randomDraw = filteredCatetories[Math.floor(Math.random() * filteredCatetories.length)];
		return randomDraw.Category; // save current draw category
	};

	//-- Filter category by cahllenge code 
	const filterCategories = (code) => {

		let filteredCat = [];

		//loop categories draw
		for (let cat of app.mechanics.catChallenges) {

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

	const translate = () => {
		$('#challenge').localize();
	};

	const callGame = () => {
		const duration = 1500;

		$('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, () => {
			this.emit('changeView', {
				source: 'challenge',
				target:'game'
			});
		});
	};

	//comming from the card (on another device)
	const cardListeners = (card) => {

		if (card.action == 'start') {

			app.virtualCardRegistered = true;

			emitToCard({
				action: 'new',
			});

		} else if (card.action == 'play') {

			const duration = 1500;

			$('#challenge').animate({
				marginTop: '-100',
				opacity: 0,
			}, duration, () => {
				this.emit('changeView', {
					source: 'challenge',
					target:'game'
				});
			});
		}
	};

	const homeButton = () => {
		$('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			this.emit('changeView', {
				source: 'challenge',
				target:'home'
			});
		});

		emitToCard({
			action: 'wait',
		});

		//emit to socker IO
		emitToDashboard({
			view: 'waiting'
		});
	};

	const goBack = () => {
		const duration = 1500;

		emitToCard({
			action: 'wait',
		});

		$('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, () => {
			this.emit('changeView', {
				source: 'challenge',
				target:'challenges'
			});
		});
	};

	//animation
	const enterAnimation = () => {

		const duration = 1500;

		const container = $('#challenge');
		container.css('opacity', 0);
		container.css('marginTop', 100);

		//animation
		container.animate({
			marginTop: 0,
			opacity: 1,
		}, duration);

	};

	const showDrawingCard = ({delay}) => {

		$('#play').click(this, callGame);

		const duration = 1500;

		const card = $('#drawing-card');
		const cardHeight = card.height();
		card.css('height', 0);
		card.css('opacity', 0);

		card.delay(delay).animate({
			height: cardHeight,
			opacity: 1,
		}, duration);
	};

	const showQRCodeCard = () => {

		const duration = 1500;

		//buid page
		const QRCardHTML = challengeQRcodeMustache(this.pageData);
		$(QRCardHTML).appendTo($('#card'));

		$('#no-phone-bt').click(this, noPhoneAction);

		const card = $('#qrcode-card');
		// const qRCardBody = $('#qrcode-card-body');

		// const cardHeight = card.height();
		// const cardBodyHeight = qRCardBody.outerHeight();

		card.css('height', 0);
		card.css('opacity', 0);

		const cardFooter = $('#no-phone-footer');
		cardFooter.css('display','none');
		cardFooter.css('opacity', 0);

		const cardHeader = $('#no-phone-header');
		cardHeader.css('display','none');
		cardHeader.css('opacity', 0);

		card.delay(1000).animate({
			height: 182, //cardBodyHeight - 25,
			opacity: 1,
		}, duration, () => {
			noPhoneFooter();
		});

		const noPhoneFooter = () => {
		
			const duration = 1500;
			const delay = 1000;
	
			const card = $('#qrcode-card');
			const cardHeight = card.height();
	
			const cardFooter = $('#no-phone-footer');
	
			card.delay(delay).animate({
				height: cardHeight + 65
			}, duration);
	
			cardFooter.css('display','block');
			cardFooter.delay(delay).animate({
				opacity: 1,
			}, duration);
		};
	};

	const noPhoneAction = () => {

		app.gameState.noPhone = true;

		const duration = 1500;

		const QRcard = $('#qrcode-card');

		QRcard.animate({
			height: 0,
			opacity: 1,
		}, duration, () => {
			QRcard.css('display','none');
			$('#drawing-card').css('display','block');
			showDrawingCard({delay:0});
		});
	};

	const emitToCard = ({
		type = 'card',
		view = 'challenge',
		action = 'new',
		room = app.socket.id,
		name = this.pageData.name,
		short = this.pageData.short,
		draw = this.pageData.draw,
		drawCategory = this.pageData.drawCategory,
		time = this.pageData.time,
		ready = this.pageData.ready
	}) => {
		app.socket.emit(type, {view, action, room, name, short, draw, drawCategory, time, ready});
	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'challenge',
		room = app.socket.id,
		name = '',
		short = '',
		description = '',
		drawCategory = '',
		time = 0,
		colourClass = '',
		players = 0
	}) => {
		app.socket.emit(type, {view, room, name, short, description, drawCategory, time, colourClass, players});
	};
	

}

export default new ChallengeView();