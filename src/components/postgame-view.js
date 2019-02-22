//modules
import $ from 'jquery';
import ee from 'event-emitter';

import postgameMustache from './postgame.html';


function PostGameView() {

	//emitter
	ee(this);

	this.app = undefined;
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

	this.init = function (context) {

		this.app = context;

		//collect and transform information
		const status = this.app.gameState.success ? 'success' : 'wrong';
		const category = this.app.gameState.currentCategory;

		//slug - because JSON notation doesn't work well with spaces
		let categorySlug = category.replace(/\s/g, '-').toLowerCase();

		//page data
		this.pageData = {
			inverseColour: this.app.interface.inverseClass(),
			success: this.app.gameState.success,
			status: this.app.i18next.t(`postgame.${status}`),
			supposedPhrase: this.app.i18next.t('postgame.supposed'),
			itis: this.app.i18next.t('postgame.it-is'),
			category: this.app.i18next.t(`categories.${categorySlug}`),
			back: this.app.i18next.t('postgame.back'),
			bestGuessPhrase: this.app.i18next.t('postgame.best-guesses')
		};

		//build page
		const postgameHTML = postgameMustache(this.pageData);
		$(postgameHTML).appendTo($('#view'));

		// get limited list of best guess
		const list = this.app.getBestGuesses();
		const guessList = $('#view').find('.tags'); //DOM

		for (let guess of list) {
			const slug = guess.replace(/\s/g, '-').toLowerCase();
			const translation = this.app.i18next.t(`categories.${slug}`);
			guessList.append(`<span class="uk-label uk-label-primary" data-i18n="categories.${slug}">${translation}</span>\n`);	
		}

		//translate
		this.translate();

		//speak
		this.speak();

		//action
		$('#back').click(this, this.back);

		//emit to socker IO
		this.emitToDashboard({
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

	this.translate = function() {
		$('postgame').localize();
	};

	this.back = function(e) {

		const _this = e.data;
		const duration = 1500;

		$('#postgame').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, function () {
			_this.emit('changeView', {
				source: 'post-game',
				target:'challenges'
			});
		});

	};

	this.speak = function() {
		//speak
		let speech = '';
		if (this.app.gameState.success) {
			speech = `${this.pageData.status}. ${this.pageData.itis} ${this.pageData.category}.`;
		} else {
			speech = `${this.pageData.status}. ${this.pageData.supposedPhrase} ${this.pageData.category}.`;
		}

		this.app.speak(speech, this.app.currentPersona.language);
	};

	this.emitToDashboard = function ({
		type = 'interface',
		view = 'post-game',
		inverseColour = '',
		success = false,
		status = '',
		supposedPhrase = '',
		itis = '',
		category = '',
		bestGuessPhrase = '',
		bestGuesses = ''
	}) {

		if (this.app.IOon) {
			this.app.socket.emit(type, {
				view: view,
				inverseColour: inverseColour,
				success: success,
				status: status,
				supposedPhrase: supposedPhrase,
				itis: itis,
				category: category,
				bestGuessPhrase: bestGuessPhrase,
				bestGuesses: bestGuesses,
			});
		}
	};

}

export default new PostGameView();