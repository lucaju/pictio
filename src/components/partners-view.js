//modules
import $ from 'jquery';
import ee from 'event-emitter';

import partnersMustache from './partners.html';


function PartnersView() {

	let app;

	//emitter
	ee(this);

	this.pageData = {
		title: '',
		inverseColour: undefined,
		done: '',
		personas: [],
		showName: false,
		individualAccent: false
	};

	this.init = (context) => {

		app = context;

		//lintit option by language
		const personas = app.personas.filter(persona => persona.languageCode == app.language);

		//data
		this.pageData = {
			title: 'Choose your partner',
			inverseColour: app.interface.inverseClass(),
			done: app.i18next.t('personas.page.done'),
			personas: personas,
			showName: false,
			individualAccent: false
		};

		//build page
		const partnerHTML = partnersMustache(this.pageData);
		$(partnerHTML).appendTo($('#view'));
		
		//buttons - personas
		for (let persona of app.personas) {
			const bt = $(`#${persona.slug}`);
			bt.addClass(getClass(persona.colour));
			bt.data({id: persona.slug});
			bt.click(this, personaClick);

			const colourTraslated = app.i18next.t(`personas.colours.${persona.colour}`);

			app.artyom.on([colourTraslated])
				.then( (i) => {
					personaSpeak(this.indexes[i]);
				});

		}

		//translate
		translate();

		//done
		$('#done').click(this, done);

		app.artyom.on([this.pageData.done])
			.then( () => {
				doneSpeaking();
			});

		//animation
		enterAnimation();

		//emit to socker IO
		emitToDashboard({
			message: app.i18next.t('personas.dashboard.assembly'),
		});

		//pre-select first option
		changePersona(app.getPersona(personas[0].slug));
	};

	const translate = () => {
		$('#partner-choice').localize();
	};

	const personaClick = (e) => {
		const bt = $(e.currentTarget);
		//get persona
		const persona = app.getPersona(bt.attr('id'));
		changePersona(persona);
	};

	const personaSpeak = (colour) => {
		// //get persona
		const persona = app.getPersonaByColour(colour);
		changePersona(persona);
	};

	const changePersona = (persona) => {

		//if it is not selected
		if (app.currentPersona != persona) {

			app.currentPersona = persona;

			//colour
			app.interface.changeColour(persona.colour);
			invertColour();

			//translation colour
			let translatedColor = translateColour(persona,this.pageData.individualAccent);

			//speak
			speak(persona,translatedColor);

			//emit to deashboard
			emitToDashboard({
				colour: app.currentPersona.colour,
				message: app.i18next.t('personas.dashboard.assembly'),
			});

		}
	};

	const invertColour = () => {
		const duration = 500;

		if (app.interface.inverseClassToggle == true) {
			$('#title').addClass('uk-light', {
				duration: duration
			});
		} else {
			$('#title').removeClass('uk-light', {
				duration: duration
			});
		}
	};

	const getClass = (colour) => {

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

	const enterAnimation =  () => {
		const duration = 1500;

		$('#partner-choice').css('opacity', 0);
		$('#partner-choice').css('marginTop', 100);

		$('#partner-choice').animate({
			marginTop: 0,
			opacity: 1,
		}, duration);
	};

	const done = () => {

		let persona = app.currentPersona;
		
		let translatedColor = translateColour(persona, this.pageData.individualAccent);

		speak(persona,translatedColor);
		exitAnimation();
	};

	const doneSpeaking = () => {
		exitAnimation();
	};

	const exitAnimation =  () => {
		const duration = 1500;

		$('#partner-choice').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, () => {
			this.emit('changeView', {
				source: 'partners',
				target:'challenges'
			});
		});
	};

	const translateColour = (persona,accent) => {
		if (accent) {
			return app.i18next.t(
				`personas.colours.${persona.colour}`, {
					lng: app.getLanguageCode(persona.language)
				}
			);
		} else {
			return app.i18next.t(
				`personas.colours.${persona.colour}`
			);
		}
	};

	const speak = (persona,translatedColor) => {

		//speak
		let textToSpeak = '';
		if (this.pageData.showName) textToSpeak = `${persona.name}. `;
		textToSpeak += translatedColor;

		app.speak(textToSpeak, persona.language);

	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'partners',
		room = app.socket.id,
		colour = '',
		message = ''
	}) => {
		app.socket.emit(type, {view, room, colour, message});
	};

}

export default new PartnersView();