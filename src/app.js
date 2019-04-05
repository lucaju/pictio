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
	this.vistualCardRegistered = false;
	this.socket = undefined;
	this.i18next = i18next;
	this.artyom = new Artyom();

	this.interface = new interfaceView(this);
	this.mute = gameMechanics.options.mute;
	this.language = gameMechanics.options.language.code;


	this.mechanics = gameMechanics;

	this.personas = gameMechanics.personas;
	this.currentPersona = this.personas[0];

	this.gameState = {
		players: 0,
		noPhone: false,
		currentChallenge: '', //'', //current challenge
		currentCategory: '', //'', //current draw category
		firstSpeak: true, //regulates is it is the first time the machine speak on each time that users play the challenge
		success: false,
		attempts: [], //current list of guess attempts
	};

	//methods
	this.init = () => {

		uikiticons(UIkit);

		//socket.io
		app.socket = io();
		app.socket.on('connected', () => {
			// console.log(app.socket);
			// console.log('socket client connected');

			app.socket.emit('gameCreated', {
				msg: 'gameCreated',
				socketID: app.socket.id,
			});

		});

		app.i18next
			.use(i18nextBackend)
			.init({
				debug: false,
				lng: this.language,
				fallbackLng: 'en',
				backend: {
					loadPath: 'locales/{{lng}}.json'
				}
			}).then( () => {
				jqueryI18next.init(window.app.i18next, $);
				app.interface.init();
			});

	};

	this.changeContexLanguage = (lang) => {
		this.language = lang;
		this.i18next.changeLanguage(this.language);
		return this.language;
	};

	this.getPersona = (slug) => {
		return this.personas.find(function (p) {
			return slug.toLowerCase() == p.slug.toLowerCase();
		});
	};

	this.getPersonaByColour = (colour) => {
		const colourTraslated = this.i18next.t(`personas.colours.${colour}`);
		return this.personas.find(function (p) {
			return colourTraslated.toLowerCase() == p.colour.toLowerCase();
		});
	};

	this.getLanguageCode = (lang) => {
		if (lang == 'American English' || lang == 'en') {
			return 'en-US';
		} else if (lang == 'British English' || lang == 'en') {
			return 'en-GB';
		} else if (lang == 'Português Brasil' || lang == 'pt') {
			return 'pt-BR';
		} else if (lang == 'Français' || lang == 'fr') {
			return 'fr-FR';
		}
	};

	this.getChallenge = (name) => {
		return this.mechanics.challenges.find(function (c) {
			return name.toLowerCase() == c.name.toLowerCase();
		});
	};

	this._initArtyom = () => {
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
			this.artyom.initialized = true;
		}).catch((err) => {
			console.error('Artyom couldnt be initialized: ', err);
		});
	};

	this.speak = (text, language) => {
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

	this.resetGameState = () => {
		this.gameState = {
			players: 0,
			noPhone: false,
			currentChallenge: '',
			currentCategory: '',
			firstSpeak: true,
			success: false,
			attempts: [],
		};
	};

	// ---  set limited list of best guesses
	this.getBestGuesses = (limit) => {
		if (limit) return this.gameState.attempts.slice(0, limit);
		return this.gameState.attempts;
	};

	// const onCard = (data) => {
	// 	console.log(data);
	// 	// app.interface.currentView.ready(data);
	// };


};

const app = new App();
window.app = app;
app.init();