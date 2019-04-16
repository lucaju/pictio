/*****
@author: Luciano Frizzera <lucaju@gmail.com>
*/

//modules
import $ from 'jquery';

import UIkit from 'uikit/dist/js/uikit.min';
import uikiticons from 'uikit/dist/js/uikit-icons.min';

import i18next from 'i18next/i18next.min';
import i18nextBackend from 'i18next-xhr-backend/i18nextXHRBackend.min';
import jqueryI18next from 'jquery-i18next/jquery-i18next.min';

import Artyom from 'artyom.js';

import io from 'socket.io-client';

import gameMechanics from './data/game-mechanics.json';

import interfaceView from './components/interface-view';

import 'uikit/dist/css/uikit.min.css';
import './style.css';



/// APP

const App = function () {

	//main variables
	this.IOon = true;
	this.socket = undefined;
	this.i18next = i18next;
	this.artyom = new Artyom();

	this.interface = new interfaceView(this);
	this.mute = gameMechanics.options.mute;
	this.language = gameMechanics.options.language.code;
	// this.language = 'British English';
	// this.language = {
	// 	name: 'British English',
	// 	code: 'en-GB'
	// };
	

	this.mechanics = gameMechanics;

	this.personas = gameMechanics.personas;
	this.currentPersona = this.personas[0];

	this.gameState = {
		currentChallenge: '', //'', //current challenge
		currentCategory: '', //'', //current draw category
		firstSpeak: true, //regulates is it is the first time the machine speak on each time that users play the challenge
		success: false,
		attempts: [], //current list of guess attempts
		// timer: new easytimer() //innitiate timer object
	};

	//methods
	this.init = function () {

		uikiticons(UIkit);

		//socket.io
		if(this.IOon) {
			$(document).ready(function () {
				app.socket = io();
			});
		}

		app.i18next
			.use(i18nextBackend)
			.init({
				debug: false,
				lng: 'en',
				fallbackLng: 'en',
				backend: {
					loadPath: 'locales/{{lng}}.json'
				}
			}, function (err, t) {

				jqueryI18next.init(window.app.i18next, $);
				// , {
				//         tName: 't', // --> appends $.t = i18next.t
				//         i18nName: 'i18n', // --> appends $.i18n = i18next
				//         handleName: 'localize', // --> appends $(selector).localize(opts);
				//         selectorAttr: 'data-i18n', // selector for translating elements
				//         targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
				//         optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
				//         useOptionsAttr: false, // see optionsAttr
				//         parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
				//       });

				app.interface.init();

			});
	};

	this.changeContexLanguage = function (lang) {
		this.language = lang;
		this.i18next.changeLanguage(this.language);
		return this.language;
	};

	this.getPersona = function (slug) {
		return this.personas.find(function (p) {
			return slug.toLowerCase() == p.slug.toLowerCase();
		});
	};

	this.getPersonaByColour = function (colour) {
		const colourTraslated = this.i18next.t(`personas.colours.${colour}`);
		return this.personas.find(function (p) {
			return colourTraslated.toLowerCase() == p.colour.toLowerCase();
		});
	};

	this.getLanguageCode = function (lang) {

		if(lang == 'American English' || lang == 'en') {
			return 'en-US';
		} else 	if(lang == 'British English' || lang == 'en') {
			return 'en-GB';
		} else 	if(lang == 'Português Brasil' || lang == 'pt') {
			return 'pt-BR';
		} else 	if(lang == 'Français' || lang == 'fr') {
			return 'fr-FR';
		}
	};

	this.getChallenge = function (name) {
		return this.mechanics.challenges.find(function (c) {
			return name.toLowerCase() == c.name.toLowerCase();
		});
	};

	this._initArtyom = function () {

		// Start the commands !
		this.artyom.initialize({
			lang: this.getLanguageCode(this.language), // GreatBritain english
			continuous: true, // Listen forever
			soundex: true, // Use the soundex algorithm to increase accuracy
			debug: false, // Show messages in the console
			executionKeyword: 'and do it now',
			listen: true, // Start to listen commands !
			// name: 'Jarvis' // If providen, you can only trigger a command if you say its name e.g to trigger Good Morning, you need to say 'Jarvis Good Morning'
		}).then(() => {
			console.log('Artyom has been succesfully initialized');
		}).catch((err) => {
			console.error('Artyom couldnt be initialized: ', err);
		});

	};

	this.speak = function (text, language) {
		if (!this.mute && text != null) {
			if (language != undefined) {
				this.artyom.say(text, {
					lang: app.getLanguageCode(language)
				});
			} else {
				this.artyom.say(text);
			}
		}
	};

	this.resetGameState = function () {
		this.gameState = {
			currentChallenge: '',
			currentCategory: '',
			firstSpeak: true,
			success: false,
			attempts: [],
			// timer: new easytimer()
		};
	};


	// ---  set limited list of best guesses
	this.getBestGuesses = function (limit) {
		if (limit) return this.gameState.attempts.slice(0, limit);
		return this.gameState.attempts;
	};


};

const app = new App();
window.app = app;
app.init();