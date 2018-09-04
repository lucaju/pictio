/*****
@author: Luciano Frizzera <lucaju@gmail.com>
*/

//modules
import $ from 'jquery';
// import jqueryUI from 'jquery-ui';
import UIkit from 'uikit';
import uikiticons from 'uikit/dist/js/uikit-icons.min';
import easytimer from 'easytimer';
// import paper from 'paper';
// import responsiveVoice from 'responsivevoice';
// require('responsivevoice');
import Artyom from 'artyom.js';
// import chroma from 'chroma-js';
// import io from '/socket.io/socket.io';
import io from 'socket.io-client';
import i18next from 'i18next';
import i18nextBackend from 'i18next-xhr-backend';
import jqueryI18next from 'jquery-i18next';

import personas from './data/personas.json';
import gameVariables from './data/game-mechanics.json';

import interfaceView from './components/interface-view';



/// APP

const App = function () {

	//main variables
	this.socket;
	this.i18next = i18next;
	this.artyom = new Artyom();

	this.interface = new interfaceView(this);
	this.language = 'British English';
	this.mute = true;

	this.mechanics = gameVariables;

	this.personas = personas;
	this.currentPersona = this.personas[0];

	this.gameState = {
		currentChallenge: '', //current challenge
		currentCategory: '', //current draw category
		firstSpeak: true, //regulates is it is the first time the machine speak on each time that users play the challenge
		attemptNumber: 0,
		attemps: [], //current list of guess attemps
		timer: new easytimer() //innitiate timer object
	};

	//methods
	this.init = function () {

		console.log(gameVariables);

		uikiticons(UIkit);

		//socket.io
		$(document).ready(function () {
			app.socket = io();
		});

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

				// app.interface.changeColour(app.colours[0]); //default

				// app.interface.changeView('challenges');
				// app.interface.changeView('wall');

				// console.log(speechSynthesis.getVoices())
				// app.sortCat();
				// app.sortPort();
			});
	};

	// this.sortPort = function() {
	// 	const list = {};
	// 	for (let cat of port) {
	// 		let key = cat['Category English'];
	// 		let value = cat['Categoria Portugues'];
			

	// 		// console.log(key, value);
	// 		list[key.replace(' ', '-').toLowerCase()] = value.toLowerCase();
	// 	}

	// 	// console.log(list);

	// 	console.log(JSON.stringify(list));
	// };

	// this.sortCat = function() {
	// 	const list = {};
	// 	for (let cat of this.mechanics.catChallenges) {
	// 		// console.log(cat);
	// 		list[cat.Category.replace(' ', '-').toLowerCase()] = cat.Category.toLowerCase();
	// 	}

	// 	console.log(JSON.stringify(list));
	// };
	

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

	this.getLanguageCode = function (lang) {
		switch (lang) {
		case 'American English':
			return 'en-US';
		case 'British English':
			return 'en-GB';
		case 'Português Brasil':
			return 'pt-BR';
		case 'Français':
			return 'fr-FR';
		default:
			return 'en-GB';
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
			lang: app.getLanguageCode(app.language), // GreatBritain english
			continuous: true, // Listen forever
			soundex: true, // Use the soundex algorithm to increase accuracy
			debug: false, // Show messages in the console
			executionKeyword: 'and do it now',
			listen: true, // Start to listen commands !

			// If providen, you can only trigger a command if you say its name
			// e.g to trigger Good Morning, you need to say "Jarvis Good Morning"
			name: 'Jarvis'
		}).then(() => {
			console.log('Artyom has been succesfully initialized');
		}).catch((err) => {
			console.error('Artyom couldnt be initialized: ', err);
		});

	};

	this.speak = function (text, language) {
		console.log(this.mute, text);
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

	this.resetGameState = function() {
		this.gameState = {
			currentChallenge: '',
			currentCategory: '',
			firstSpeak: true,
			attemptNumber: 0,
			guessAttemps: [],
			timer: new easytimer()
		};
	};

};

const app = new App();
window.app = app;
app.init();