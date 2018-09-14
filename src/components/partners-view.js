//modules
import $ from 'jquery';
import ee from 'event-emitter';
import partnersMustache from './partners.html';

function PartnersView() {

	//emitter
	ee(this);

	this.app = undefined;
	this.pageData = {
		title: '',
		inverseColour: undefined,
		done: '',
		personas: [],
		showName: false,
		individualAccent: false
	};

	this.init = function (context) {

		this.app = context;

		//data
		this.pageData = {
			title: 'Choose your partner',
			inverseColour: this.app.interface.inverseClass(),
			done: this.app.i18next.t('personas.done'),
			personas: this.app.personas,
			showName: false,
			individualAccent: false
		};

		//build page
		const partnerHTML = partnersMustache(this.pageData);
		$(partnerHTML).appendTo($('#view'));

		//buttons - personas
		for (let persona of this.app.personas) {
			const bt = $(`#${persona.slug}`);
			bt.addClass(this.getClass(persona.colour));
			bt.data({id: persona.slug});
			bt.click(this,this.personaClick);
		}

		//translate
		this.translate();

		//done
		$('#done').click(this,this.exitAnimation);

		//animation
		this.enterAnimation();

		//emit to socker IO
		this.emitToDashboard({
			message: this.app.i18next.t('personas.dashboard.assembly'),
		});

	};

	this.translate = function() {
		$('#partner-choice').localize();
	};

	this.personaClick = function (e) {

		const _this = e.data;
		const app = _this.app;
		const bt = $(e.currentTarget);

		//get persona
		const persona = _this.app.getPersona(bt.attr('id'));

		//if it is not selected
		if (app.currentPersona != persona) {

			app.currentPersona = persona;

			//colour
			app.interface.changeColour(persona.colour);
			_this.invertColour();

			//translation colour
			let translatedColor = _this.translateColour(persona,_this.pageData.individualAccent);

			//speak
			_this.speak(persona,translatedColor);

			//emit to deashboard
			_this.emitToDashboard({
				colour: app.currentPersona.colour,
				message: app.i18next.t('personas.dashboard.assembly'),
			});

		}

	};

	this.invertColour = function() {
		const duration = 500;

		if (this.app.interface.inverseClassToggle == true) {
			$('#title').addClass('uk-light', {
				duration: duration
			});
		} else {
			$('#title').removeClass('uk-light', {
				duration: duration
			});
		}
	};

	this.getClass = function (colour) {

		if (colour == 'light') {
			return 'uk-button-default uk-background-default';
		} else if (colour == 'blue') {
			return 'uk-button-primary';
		} else if (colour == 'dark') {
			return 'uk-button-secondary';
		} else if (colour == 'yellow') {
			return 'uk-button-default background-yellow';
		}

		// default
		return 'uk-button-default uk-background-default';

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

	this.exitAnimation = function (e) {
		const _this = e.data;
		const duration = 1500;

		$('#partner-choice').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, function () {
			_this.emit('changeView', 'challenges');
		});
	};

	this.translateColour = function(persona,accent) {
		if (accent) {
			return this.app.i18next.t(
				`personas.colours.${persona.colour}`, {
					lng: this.app.getLanguageCode(persona.language)
				}
			);
		} else {
			return this.app.i18next.t(
				`personas.colours.${persona.colour}`
			);
		}

	};

	this.speak = function(persona,translatedColor) {

		//speak
		let textToSpeak = '';
		if (this.pageData.showName) textToSpeak = `${persona.name}. `;
		textToSpeak += translatedColor;

		this.app.speak(textToSpeak, persona.language);

	};

	this.emitToDashboard = function({
		type = 'interface',
		view = 'partners',
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