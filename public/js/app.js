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
// import responsivevoice from 'responsivevoice';
// import artyom from 'artyom.js';
// import chroma from 'chroma-js';
// import io from '/socket.io/socket.io';
import io from 'socket.io-client';
import i18next from 'i18next';
import i18nextBackend from 'i18next-xhr-backend';
import jqueryI18next from 'jquery-i18next';

import interfaceView from './interfaceView';

/// APP

const App = function() {

	

	//main variables
	this.interface = new interfaceView(this);
	

	this.currentChallenge;           //current challenge
	this.currentDrawChallenge;       //current draw category
	this.guessAttemps = [];          //current list of guess attemps
	this.classColor;                 //Class colour (can be the same as playercolour) -> chanfe the interface color
	this.playerColor;                //color choose by the player
	this.voice;                      //voice, attached to the colour

	this.invertedColor;

	this.timer = new easytimer();        //innitiate timer object
	this.firstSpeak = true;          //regulates is it is the first time the machine speak on each time that users play the challenge

	this.inverseClassToggle = false;

	this.classElement; 
	this.classBlend; 

	this.socket;

	this.i18next = i18next;

	this.attempNumber = 0;

	//list of colours
	this.colours = [
		'light',
		'blue',
		'dark',
		'yellow']; 


	//list of voices
	this.voices = [
		'UK English Female',
		'UK English Male',
		'US English Female',
		'US English Male'];


	this.init = function() {

		uikiticons(UIkit);

		console.log(this);

		// changeColour(colours[0]); //default
		// playerColor = colours[0];
		// changeVoice(playerColor); //default
		
		// showInfoView();

		// showGame(challenges[0]);
		// showGame('wall');

		//socket.io
		$(document).ready(function(){
			window.app.socket = io();
		});


		app.i18next
			.use(i18nextBackend)
			.init({
				debug: true,
				lng: 'en',
				fallbackLng: 'en',
				backend: {
					loadPath: 'locales/{{lng}}.json'
				}
			}, function(err, t) {
				// console.log(app.i18next);
				
				jqueryI18next.init(window.app.i18next, $);

				// console.log(app.i18next.t('pt.translation.general'));

				// jqueryI18next.init(app.i18next, $, {
				//         tName: 't', // --> appends $.t = i18next.t
				//         i18nName: 'i18n', // --> appends $.i18n = i18next
				//         handleName: 'localize', // --> appends $(selector).localize(opts);
				//         selectorAttr: 'data-i18n', // selector for translating elements
				//         targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
				//         optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
				//         useOptionsAttr: false, // see optionsAttr
				//         parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
				//       });

				app.interface.changeView('home');
			});





		// this.i18next.init({
		//     lng: 'en', // evtl. use language-detector https://github.com/i18next/i18next-browser-languageDetector
		//     resources: { // evtl. load via xhr https://github.com/i18next/i18next-xhr-backend
		//         en: {
		//             translation: {
		//                 intro: {
		//                     subtitle: 'An inclusive mini-game for <strong>humans</strong> and <strong>quasi-humans!</strong>',
		//                     PlayBT: 'Let's Play',
		//                     intructionsBT: 'How to play?'
		//                 }
		//             }
		//         },
		//         pt: {
		//             translation: {
		//                 intro: {
		//                     subtitle: 'Um game inclusive para <strong>humanos</strong> e <strong>quasi-humanos!</strong>',
		//                     PlayBT: 'Jogar',
		//                     intructionsBT: 'Instruções'
		//                 }
		//             }
		//         }
		//     }
		// }, function(err, t) {
		//     // jqueryI18next.init(app.i18next, $);

		//     jqueryI18next.init(app.i18next, $, {
		//             tName: 't', // --> appends $.t = i18next.t
		//             i18nName: 'i18n', // --> appends $.i18n = i18next
		//             handleName: 'localize', // --> appends $(selector).localize(opts);
		//             selectorAttr: 'data-i18n', // selector for translating elements
		//             targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
		//             optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
		//             useOptionsAttr: false, // see optionsAttr
		//             parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
		//           });

		//     app.interface.init();
		// });

		// console.log(i18next);

		// jqueryI18next.init(i18next, $, {
		//     tName: 't', // --> appends $.t = i18next.t
		//     i18nName: 'i18n', // --> appends $.i18n = i18next
		//     handleName: 'localize', // --> appends $(selector).localize(opts);
		//     selectorAttr: 'data-i18n', // selector for translating elements
		//     targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
		//     optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
		//     useOptionsAttr: false, // see optionsAttr
		//     parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
		//   });


		
	};

};

window.app = new App();
app.init();
