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

import personas from './personas.json';
import gameVariables from './gameVariables.json';

import interfaceView from './interfaceView';



/// APP

const App = function() {

	//main variables
	this.interface = new interfaceView(this);
	this.language = 'British English';

	this.artyom = new Artyom();

	this.personas = personas;
	this.currentPersona = this.personas[0];

	this.gameVariables = gameVariables;
	
	this.currentChallenge;           //current challenge
	this.currentDrawChallenge;       //current draw category
	this.guessAttemps = [];          //current list of guess attemps

	this.timer = new easytimer();        //innitiate timer object
	this.firstSpeak = true;          //regulates is it is the first time the machine speak on each time that users play the challenge

	this.socket;

	this.i18next = i18next;

	this.attempNumber = 0;



	this.init = function() {

		console.log(gameVariables);

		uikiticons(UIkit);

		//socket.io
		$(document).ready(function(){
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
			}, function(err, t) {

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
			});
	};

	this.changeContexLanguage = function(lang) {
		this.language = lang;
		this.i18next.changeLanguage(this.language);
		return this.language;
	};

	this.getPersona = function(name) {
		return this.personas.find(function(p) {
			return name.toLowerCase() == p.name.toLowerCase();
		});
	};

	this.getLanguageCode = function(lang) {

		switch(lang) {
		case 'American English':
			return 'en-US';
		case 'British English':
			return 'en-GB';
		case 'Portugues Brasil':
			return 'pt-BR';
		case 'Français':
			return 'fr-FR';
		default: 
			return 'en-GB';
		}
	};

	this._initArtyom = function() {

		// Start the commands !
		this.artyom.initialize({
			lang: app.getLanguageCode(app.language), // GreatBritain english
			continuous: true, // Listen forever
			soundex: true,// Use the soundex algorithm to increase accuracy
			debug: false, // Show messages in the console
			executionKeyword: 'and do it now',
			listen: true, // Start to listen commands !
		
			// If providen, you can only trigger a command if you say its name
			// e.g to trigger Good Morning, you need to say "Jarvis Good Morning"
			name: 'Jarvis' 
		}).then(() => {
			console.log('Artyom has been succesfully initialized');
		}).catch((err) => {
			console.error(`Artyom couldn't be initialized: `, err);
		});
		
	};

	this.speak = function(text, language) {
		if(text != null) {
			if (language != undefined) {
				this.artyom.say(text,{
					lang:app.getLanguageCode(language)
				});

			} else {
				this.artyom.say(text);
			}
			
		}

	};

};

const app = new App();
window.app = app;
app.init();
