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
require('responsivevoice');
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
	// this.classColor;                 //Class colour (can be the same as playercolour) -> chanfe the interface color
	this.playerColor;                //color choose by the player
	this.voice;                      //voice, attached to the colour

	this.invertedColor;

	this.timer = new easytimer();        //innitiate timer object
	this.firstSpeak = true;          //regulates is it is the first time the machine speak on each time that users play the challenge

	this.inverseClassToggle = false;

	// this.classElement; 
	// this.classBlend; 

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

		this.playerColor = this.colours[0];
		this.changeVoice(this.playerColor); //default

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

				app.interface.changeColour(app.colours[0]); //default

				// app.interface.changeView('challenges');
				// app.interface.changeView('wall');
				
			});

	};

	// --- function to change interface colour and assing it to the player
	this.changeVoice = function(playerColor) {

		let colourIndex;
		$.each(this.colours, function(i,colour) {
			if (playerColor == colour) {
				colourIndex = i;
				return false; 
			}
		});
	
		this.voice = this.voices[colourIndex];
	
	};

	this.speak = function(text) {
		if(text != null) {
			console.log(text)
			window.speak(text, this.voice);
		// artyom.say(text);
		}
	};

};

const app = new App();
window.app = app;
app.init();
