/*****
@author: Luciano Frizzera <lucaju@gmail.com>
*/

//modules
import $ from 'jquery';
import UIkit from 'uikit';
import uikiticons from 'uikit/dist/js/uikit-icons.min';
import easytimer from 'easytimer'; // consider change to: moment-timer
import Artyom from 'artyom.js';
// import chroma from 'chroma-js';
import io from 'socket.io-client';
import i18next from 'i18next';
import i18nextBackend from 'i18next-xhr-backend';
import jqueryI18next from 'jquery-i18next';

import gameMechanics from './data/game-mechanics.json';

import interfaceView from './components/interface-view';
import magentaAI from './magentaAI';

import loadingbar from '@loadingio/loading-bar';



/// APP

const App = function () {

	//main variables
	this.socket;
	this.i18next = i18next;
	this.artyom = new Artyom();

	this.interface = new interfaceView(this);
	this.language = 'British English';
	this.mute = gameMechanics.options.mute;

	this.mechanics = gameMechanics;

	this.personas = gameMechanics.personas;
	this.currentPersona = this.personas[0];

	this.magentaAI = new magentaAI();

	this.gameState = {
		currentChallenge: '', //'', //current challenge
		currentCategory: '', //'', //current draw category
		firstSpeak: true, //regulates is it is the first time the machine speak on each time that users play the challenge
		success: false,
		attempts: [], //current list of guess attempts
		timer: new easytimer() //innitiate timer object
	};

	//methods
	this.init = function () {

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

				app.magentaAI.init(app);

				// app.interface.changeView('game');

				// console.log(speechSynthesis.getVoices())
				// app.sortCat();
				// app.sortPort();
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
			name: 'Jarvis' // If providen, you can only trigger a command if you say its name e.g to trigger Good Morning, you need to say 'Jarvis Good Morning'
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
			timer: new easytimer()
		};
	};

	this.startDrawing = function () {
		this.attempts = [];
		this.timeGame();
		this.magentaAI.isOn = true;
		this.magentaAI.startMagenta();
	};

	// --- set timer for game
	this.timeGame = function () {

		const challenge = this.getChallenge(this.gameState.currentChallenge);
		const challengeTime = challenge.time;

		this.gameState.timer = new easytimer(); // reset timer

		

		this.gameState.timer.start({
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

		// $('#timer #number').html(challengeTime + 's');

		this.gameState.timer.addEventListener('secondTenthsUpdated', function (e) {

			const  min = app.gameState.timer.getTimeValues().minutes;
			const  sec = app.gameState.timer.getTimeValues().seconds;
			const  tsec = app.gameState.timer.getTimeValues().secondTenths;

			timeLeftSeconds = (min*60) + sec;
			// $('#timer #number').html(timeLeftSeconds + 's');

			const timeLeftSecondsTeeth = (min*60*10) + (sec*10) + tsec;
			timeLeftPercent = (timeLeftSecondsTeeth / challengeTime)*10;
			timerTracker.set(timeLeftPercent);

			app.socket.emit('interface', {
				view: 'game',
				action: 'timer',
				timer: timeLeftSeconds + 's',
				timerPercentage: timeLeftPercent
			});
		});

		this.gameState.timer.addEventListener('targetAchieved', function (e) {
			app.interface.changeView('post-game');
		});
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