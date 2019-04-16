//modules
import $ from 'jquery';
import ee from 'event-emitter';

import postgameMustache from './postgame.html';


function PostGameView() {

	let app;

	//emitter
	ee(this);

	this.pageData = {
		inverseColour: undefined,
		success: false,
		status: '',
		supposedPhrase: '',
		itis: '',
		category: '',
		back: '',
		bestGuessPhrase: ''
	};

	this.init = (context) => {

		app = context;

		//collect and transform information
		const status = app.gameState.success ? 'success' : 'wrong';
		const category = app.gameState.currentCategory;

		//slug - because JSON notation doesn't work well with spaces
		let categorySlug = category.replace(/\s/g, '-').toLowerCase();

		//page data
		this.pageData = {
			inverseColour: app.interface.inverseClass(),
			success: app.gameState.success,
			status: app.i18next.t(`postgame.${status}`),
			supposedPhrase: app.i18next.t('postgame.supposed'),
			itis: app.i18next.t('postgame.it-is'),
			category: app.i18next.t(`categories.${categorySlug}`),
			back: app.i18next.t('postgame.back'),
			bestGuessPhrase: app.i18next.t('postgame.best-guesses')
		};

		//build page
		const postgameHTML = postgameMustache(this.pageData);
		$(postgameHTML).appendTo($('#view'));

		$('#home-button').click(() => {
			homeButton('home');
		});

		// get limited list of best guess
		const list = app.getBestGuesses();
		const guessList = $('#view').find('.tags'); //DOM

		for (let guess of list) {
			const slug = guess.replace(/\s/g, '-').toLowerCase();
			const translation = app.i18next.t(`categories.${slug}`);
			guessList.append(`<span class="uk-label uk-label-primary" data-i18n="categories.${slug}">${translation}</span>\n`);	
		}

		//translate
		translate();

		//speak
		speak();

		//action
		$('#back').click(this, back);

		emitToCard({
			action: 'postGame',
			time: -1,
			guess: this.pageData.status
		});

		//emit to socker IO
		emitToDashboard({
			inverseColour: this.pageData.inverseColour,
			success:this.pageData.success,
			status: this.pageData.status,
			supposedPhrase: this.pageData.supposedPhrase,
			itis: this.pageData.itis,
			category: this.pageData.category,
			bestGuessPhrase: this.pageData.bestGuessPhrase,
			bestGuesses: list
		});

	};

	const translate = () => {
		$('postgame').localize();
	};

	const homeButton = () => {

		emitToCard({
			action: 'wait',
		});

		emitToDashboard({
			view: 'waiting'
		});

		$('#postgame').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			this.emit('changeView', {
				source: 'post-game',
				target:'home'
			});
		});
	};

	const back = () => {
		const duration = 1500;

		emitToCard({
			action: 'wait',
		});

		emitToDashboard({
			view: 'waiting'
		});

		$('#postgame').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, () => {
			this.emit('changeView', {
				source: 'post-game',
				target:'players'
			});
		});

	};

	const speak = () => {
		//speak
		let speech = '';
		if (app.gameState.success) {
			speech = `${this.pageData.status}. ${this.pageData.itis} ${this.pageData.category}.`;
		} else {
			speech = `${this.pageData.status}. ${this.pageData.supposedPhrase} ${this.pageData.category}.`;
		}

		app.speak(speech, app.language);
	};

	const emitToCard = ({
		type = 'card',
		view = 'challenge',
		action = 'postGame',
		room = app.socket.id,
		name = '',
		short = '',
		draw = '',
		drawCategory = '',
		time = 0,
		guess = ''
	}) => {
		app.socket.emit(type, {view, action, room, name, short, draw, drawCategory, time, guess});
	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'post-game',
		room = app.socket.id,
		inverseColour = '',
		success = false,
		status = '',
		supposedPhrase = '',
		itis = '',
		category = '',
		bestGuessPhrase = '',
		bestGuesses = ''
	}) => {
		app.socket.emit(type, {view, room, inverseColour, success, status, supposedPhrase, itis, category, bestGuessPhrase, bestGuesses});
	};

}

export default new PostGameView();