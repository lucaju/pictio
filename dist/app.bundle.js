/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/app.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uikit_dist_js_uikit_min__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uikit/dist/js/uikit.min */ "./node_modules/uikit/dist/js/uikit.min.js");
/* harmony import */ var uikit_dist_js_uikit_min__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uikit_dist_js_uikit_min__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uikit_dist_js_uikit_icons_min__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uikit/dist/js/uikit-icons.min */ "./node_modules/uikit/dist/js/uikit-icons.min.js");
/* harmony import */ var uikit_dist_js_uikit_icons_min__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uikit_dist_js_uikit_icons_min__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! i18next */ "./node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var i18next_xhr_backend_i18nextXHRBackend_min__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! i18next-xhr-backend/i18nextXHRBackend.min */ "./node_modules/i18next-xhr-backend/i18nextXHRBackend.min.js");
/* harmony import */ var i18next_xhr_backend_i18nextXHRBackend_min__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(i18next_xhr_backend_i18nextXHRBackend_min__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var jquery_i18next_jquery_i18next_min__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery-i18next/jquery-i18next.min */ "./node_modules/jquery-i18next/jquery-i18next.min.js");
/* harmony import */ var jquery_i18next_jquery_i18next_min__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery_i18next_jquery_i18next_min__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var artyom_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! artyom.js */ "./node_modules/artyom.js/build/artyom.js");
/* harmony import */ var artyom_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(artyom_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _data_game_mechanics_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./data/game-mechanics.json */ "./src/data/game-mechanics.json");
var _data_game_mechanics_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./data/game-mechanics.json */ "./src/data/game-mechanics.json", 1);
/* harmony import */ var _components_interface_view__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/interface-view */ "./src/components/interface-view.js");
/* harmony import */ var uikit_dist_css_uikit_min_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! uikit/dist/css/uikit.min.css */ "./node_modules/uikit/dist/css/uikit.min.css");
/* harmony import */ var uikit_dist_css_uikit_min_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(uikit_dist_css_uikit_min_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_11__);
/*****
@author: Luciano Frizzera <lucaju@gmail.com>
*/

//modules





















/// APP
const App = function () {

	//main variables
	this.vistualCardRegistered = false;
	this.socket = undefined;
	this.i18next = i18next__WEBPACK_IMPORTED_MODULE_3__["default"];
	this.artyom = new artyom_js__WEBPACK_IMPORTED_MODULE_6___default.a();

	this.interface = new _components_interface_view__WEBPACK_IMPORTED_MODULE_9__["default"](this);
	this.mute = _data_game_mechanics_json__WEBPACK_IMPORTED_MODULE_8__.options.mute;
	this.language = _data_game_mechanics_json__WEBPACK_IMPORTED_MODULE_8__.options.language.code;


	this.mechanics = _data_game_mechanics_json__WEBPACK_IMPORTED_MODULE_8__;

	this.personas = _data_game_mechanics_json__WEBPACK_IMPORTED_MODULE_8__.personas;
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

		uikit_dist_js_uikit_icons_min__WEBPACK_IMPORTED_MODULE_2___default()(uikit_dist_js_uikit_min__WEBPACK_IMPORTED_MODULE_1___default.a);

		//socket.io
		app.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_7___default()();
		app.socket.on('connected', () => {
			// console.log(app.socket);
			// console.log('socket client connected');

			app.socket.emit('gameCreated', {
				msg: 'gameCreated',
				socketID: app.socket.id,
			});

		});

		app.i18next
			.use(i18next_xhr_backend_i18nextXHRBackend_min__WEBPACK_IMPORTED_MODULE_4___default.a)
			.init({
				debug: false,
				lng: this.language,
				fallbackLng: 'en',
				backend: {
					loadPath: 'locales/{{lng}}.json'
				}
			}).then( () => {
				jquery_i18next_jquery_i18next_min__WEBPACK_IMPORTED_MODULE_5___default.a.init(window.app.i18next, jquery__WEBPACK_IMPORTED_MODULE_0___default.a);
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

	this.resetGameSuccess = () => {
		this.gameState.success = false;
		this.gameState.attempts = [];
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

/***/ }),

/***/ "./src/components/about.html":
/*!***********************************!*\
  !*** ./src/components/about.html ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"about\" class=\"uk-modal-full uk-modal-overflow\" uk-modal>");t.b("\n" + i);t.b("    <div class=\"uk-modal-dialog\">");t.b("\n" + i);t.b("        <button class=\"uk-modal-close-full uk-close-large\" type=\"button\" uk-close></button>");t.b("\n");t.b("\n" + i);t.b("        <div class=\"uk-modal-header\">");t.b("\n" + i);t.b("            <h2 class=\"uk-modal-title uk-text-center\" data-i18n=\"about.title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("        </div>");t.b("\n");t.b("\n" + i);t.b("        <div class=\"uk-modal-body\" uk-overflow-auto>     ");t.b("\n" + i);t.b("            <div class=\"uk-container uk-container-xsmall\">");t.b("\n" + i);t.b("                <div>");t.b("\n" + i);t.b("                    <p data-i18n=\"about.text\">");t.b(t.v(t.f("text",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("                </div>");t.b("\n" + i);t.b("                ");t.b("\n" + i);t.b("                <div class=\"uk-margin-large-top\">");t.b("\n" + i);t.b("                    <iframe width=\"750\" height=\"422\" src=\"https://www.youtube.com/embed/");t.b(t.v(t.f("youtubeid",c,p,0)));t.b("?rel=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>");t.b("\n" + i);t.b("                </div>");t.b("\n");t.b("\n" + i);t.b("                <div class=\"uk-margin-large-top\">");t.b("\n" + i);t.b("                    <h2 class=\"uk-heading-line uk-text-center\"><span data-i18n=\"about.presentations.title\">");t.b(t.v(t.d("presentations.title",c,p,0)));t.b("</span></h2>");t.b("\n" + i);t.b("                    <p class=\"uk-text-small\" data-i18n=\"about.presentations.text\">");t.b(t.v(t.d("presentations.text",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("                    ");t.b("\n" + i);t.b("                    <div uk-grid>");t.b("\n" + i);t.b("                        <div class=\"uk-width-1-2\">");t.b("\n" + i);t.b("                            <h4 data-i18n=\"about.presentations.presentations.title\">");t.b(t.v(t.d("presentations.presentations.title",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("                            <ul class=\"uk-text-small\">");t.b("\n" + i);if(t.s(t.d("presentations.presentations.list",c,p,1),c,p,0,1496,1579,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                                <li>");t.b(t.v(t.f("name",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("                            </ul>");t.b("\n" + i);t.b("                        </div>");t.b("\n" + i);t.b("                        <div class=\"uk-width-1-2\">");t.b("\n" + i);t.b("                            <h4 data-i18n=\"about.presentations.exhibitions.title\">");t.b(t.v(t.d("presentations.exhibitions.title",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("                            <ul class=\"uk-text-small\">");t.b("\n" + i);if(t.s(t.d("presentations.exhibitions.list",c,p,1),c,p,0,1978,2061,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                                <li>");t.b(t.v(t.f("name",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("                            </ul>");t.b("\n" + i);t.b("                        </div>");t.b("\n" + i);t.b("                    </div>");t.b("\n" + i);t.b("                </div>");t.b("\n");t.b("\n" + i);t.b("                <div class=\"uk-margin-large-top\">");t.b("\n" + i);t.b("                    <h2 class=\"uk-heading-line uk-text-center\"><span data-i18n=\"about.team.title\">");t.b(t.v(t.d("team.title",c,p,0)));t.b("</span></h2>");t.b("\n" + i);t.b("                    <div uk-grid>");t.b("\n" + i);t.b("                        <div class=\"uk-width-1-3\">");t.b("\n" + i);t.b("                            <h4>");t.b(t.v(t.d("team.people.luciano.name",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("                            <p class=\"uk-text-small\" data-i18n=\"[html]about.team.people.luciano.text\">");t.b(t.t(t.d("team.people.luciano.text",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("                        </div>");t.b("\n" + i);t.b("                        <div class=\"uk-width-1-3\">");t.b("\n" + i);t.b("                            <h4>");t.b(t.v(t.d("team.people.salles.name",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("                            <p class=\"uk-text-small\" data-i18n=\"[html]about.team.people.salles.text\">");t.b(t.t(t.d("team.people.salles.text",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("                        </div>");t.b("\n" + i);t.b("                        <div class=\"uk-width-1-3\">");t.b("\n" + i);t.b("                            <h4>");t.b(t.v(t.d("team.people.zamboni.name",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("                            <p class=\"uk-text-small\" data-i18n=\"[html]about.team.people.zamboni.text\">");t.b(t.t(t.d("team.people.zamboni.text",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("                        </div>");t.b("\n" + i);t.b("                    </div>");t.b("\n");t.b("\n" + i);t.b("                    <p class=\"uk-margin-large-top uk-text-small\" data-i18n=\"[html]about.team.support\">");t.b(t.t(t.d("team.support",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("                </div>");t.b("\n");t.b("\n");t.b("\n" + i);t.b("                <div class=\"uk-margin-large-top\">");t.b("\n" + i);t.b("                    <h2 class=\"uk-heading-line uk-text-center\"><span data-i18n=\"about.sponsors.title\">");t.b(t.v(t.d("sponsors.title",c,p,0)));t.b("</span></h2>");t.b("\n" + i);t.b("                    <div class=\"uk-child-width-1-3@s uk-flex-middle\" uk-grid>");t.b("\n" + i);if(t.s(t.d("sponsors.list",c,p,1),c,p,0,3755,3952,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                        <div>");t.b("\n" + i);t.b("                            <img class=\"uk-align-center\" data-src=\"./assets/");t.b(t.v(t.f("image",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" uk-img/>");t.b("\n" + i);t.b("                        </div>");t.b("\n" + i);});c.pop();}t.b("                    </div>");t.b("\n" + i);t.b("                </div>");t.b("\n" + i);t.b("                ");t.b("\n" + i);t.b("                <div class=\"uk-margin-xlarge-top\">");t.b("\n" + i);t.b("                    <hr>");t.b("\n" + i);t.b("                    ");t.b("\n" + i);t.b("                    <div class=\"uk-child-width-1-1@s uk-flex-middle\" uk-grid>");t.b("\n" + i);t.b("                        <div>");t.b("\n" + i);t.b("                            <a href=\"https://github.com/lucaju/pictio\" target=\"_blank\">");t.b("\n" + i);t.b("                                <img class=\"uk-align-center\" width=\"45\" data-src=\"assets/github.png\" alt=\"Github\" uk-img>");t.b("\n" + i);t.b("                            </a>");t.b("\n" + i);t.b("                        </div>");t.b("\n" + i);t.b("                        <div class=\"uk-margin-remove-top\">");t.b("\n" + i);t.b("                            <a href=\"https://creativecommons.org/licenses/by-nc/4.0/\" target=\"_blank\">");t.b("\n" + i);t.b("                                <img class=\"uk-align-center\" width=\"100\" data-src=\"assets/cc-by-nc.png\" alt=\"CC\" uk-img>");t.b("\n" + i);t.b("                            </a>");t.b("\n" + i);t.b("                        </div>");t.b("\n" + i);t.b("                    </div>");t.b("\n" + i);t.b("            ");t.b("\n" + i);t.b("                </div>");t.b("\n" + i);t.b("                    ");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("        </div>");t.b("\n");t.b("\n" + i);t.b("    </div>   ");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"about\" class=\"uk-modal-full uk-modal-overflow\" uk-modal>\n    <div class=\"uk-modal-dialog\">\n        <button class=\"uk-modal-close-full uk-close-large\" type=\"button\" uk-close></button>\n\n        <div class=\"uk-modal-header\">\n            <h2 class=\"uk-modal-title uk-text-center\" data-i18n=\"about.title\">{{title}}</h2>\n        </div>\n\n        <div class=\"uk-modal-body\" uk-overflow-auto>     \n            <div class=\"uk-container uk-container-xsmall\">\n                <div>\n                    <p data-i18n=\"about.text\">{{text}}</p>\n                </div>\n                \n                <div class=\"uk-margin-large-top\">\n                    <iframe width=\"750\" height=\"422\" src=\"https://www.youtube.com/embed/{{youtubeid}}?rel=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>\n                </div>\n\n                <div class=\"uk-margin-large-top\">\n                    <h2 class=\"uk-heading-line uk-text-center\"><span data-i18n=\"about.presentations.title\">{{presentations.title}}</span></h2>\n                    <p class=\"uk-text-small\" data-i18n=\"about.presentations.text\">{{presentations.text}}</p>\n                    \n                    <div uk-grid>\n                        <div class=\"uk-width-1-2\">\n                            <h4 data-i18n=\"about.presentations.presentations.title\">{{presentations.presentations.title}}</h4>\n                            <ul class=\"uk-text-small\">\n                                {{#presentations.presentations.list}}\n                                <li>{{name}}</li>\n                                {{/presentations.presentations.list}}\n                            </ul>\n                        </div>\n                        <div class=\"uk-width-1-2\">\n                            <h4 data-i18n=\"about.presentations.exhibitions.title\">{{presentations.exhibitions.title}}</h4>\n                            <ul class=\"uk-text-small\">\n                                {{#presentations.exhibitions.list}}\n                                <li>{{name}}</li>\n                                {{/presentations.exhibitions.list}}\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"uk-margin-large-top\">\n                    <h2 class=\"uk-heading-line uk-text-center\"><span data-i18n=\"about.team.title\">{{team.title}}</span></h2>\n                    <div uk-grid>\n                        <div class=\"uk-width-1-3\">\n                            <h4>{{team.people.luciano.name}}</h4>\n                            <p class=\"uk-text-small\" data-i18n=\"[html]about.team.people.luciano.text\">{{{team.people.luciano.text}}}</p>\n                        </div>\n                        <div class=\"uk-width-1-3\">\n                            <h4>{{team.people.salles.name}}</h4>\n                            <p class=\"uk-text-small\" data-i18n=\"[html]about.team.people.salles.text\">{{{team.people.salles.text}}}</p>\n                        </div>\n                        <div class=\"uk-width-1-3\">\n                            <h4>{{team.people.zamboni.name}}</h4>\n                            <p class=\"uk-text-small\" data-i18n=\"[html]about.team.people.zamboni.text\">{{{team.people.zamboni.text}}}</p>\n                        </div>\n                    </div>\n\n                    <p class=\"uk-margin-large-top uk-text-small\" data-i18n=\"[html]about.team.support\">{{{team.support}}}</p>\n                </div>\n\n\n                <div class=\"uk-margin-large-top\">\n                    <h2 class=\"uk-heading-line uk-text-center\"><span data-i18n=\"about.sponsors.title\">{{sponsors.title}}</span></h2>\n                    <div class=\"uk-child-width-1-3@s uk-flex-middle\" uk-grid>\n                        {{#sponsors.list}}\n                        <div>\n                            <img class=\"uk-align-center\" data-src=\"./assets/{{image}}\" alt=\"{{name}}\" uk-img/>\n                        </div>\n                        {{/sponsors.list}}\n                    </div>\n                </div>\n                \n                <div class=\"uk-margin-xlarge-top\">\n                    <hr>\n                    \n                    <div class=\"uk-child-width-1-1@s uk-flex-middle\" uk-grid>\n                        <div>\n                            <a href=\"https://github.com/lucaju/pictio\" target=\"_blank\">\n                                <img class=\"uk-align-center\" width=\"45\" data-src=\"assets/github.png\" alt=\"Github\" uk-img>\n                            </a>\n                        </div>\n                        <div class=\"uk-margin-remove-top\">\n                            <a href=\"https://creativecommons.org/licenses/by-nc/4.0/\" target=\"_blank\">\n                                <img class=\"uk-align-center\" width=\"100\" data-src=\"assets/cc-by-nc.png\" alt=\"CC\" uk-img>\n                            </a>\n                        </div>\n                    </div>\n            \n                </div>\n                    \n            </div>\n        </div>\n\n    </div>   \n</div>", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/components/canvas-view.js":
/*!***************************************!*\
  !*** ./src/components/canvas-view.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return canvasView; });
/* harmony import */ var paper_dist_paper_core_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! paper/dist/paper-core.min */ "./node_modules/paper/dist/paper-core.min.js");
/* harmony import */ var paper_dist_paper_core_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(paper_dist_paper_core_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! event-emitter */ "./node_modules/event-emitter/index.js");
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(event_emitter__WEBPACK_IMPORTED_MODULE_1__);
//modules




function canvasView() {

	let app;

	//emitter
	event_emitter__WEBPACK_IMPORTED_MODULE_1___default()(this);

	// Variables
	this.path = undefined;
	this.ink = [];
	this.prevPoints = undefined;
	this.lastTimestamp = 0;
	

	//--- Initialize...

	this.init = (context) => {
		app = context;
		paper_dist_paper_core_min__WEBPACK_IMPORTED_MODULE_0___default.a.install(window);
	};

	this.startCanvas = () => {

		initInk(); // Initialize Ink array ()
		paper_dist_paper_core_min__WEBPACK_IMPORTED_MODULE_0___default.a.setup('canvas'); // Setup Paper #canvas

		let tool = new paper_dist_paper_core_min__WEBPACK_IMPORTED_MODULE_0___default.a.Tool(); // Inititalize Paper Tool

		// Paper Tool Mouse Down Event
		tool.onMouseDown = (event) => {

			// New Paper Path and Settings
			this.path = new paper_dist_paper_core_min__WEBPACK_IMPORTED_MODULE_0___default.a.Path();
			this.path.strokeColor = 'black';
			this.path.strokeWidth = 2; //7;

			// Get Time [ms] for each Guess (needed for accurate Google AI Guessing)
			let eventTimeStamp = event.event.timeStamp;
	
			let timeDelta = eventTimeStamp - this.lastTimestamp;
			let time = this.ink[2][this.ink[2].length - 1] + timeDelta;

			// Get XY point from event w/ time [ms] to update Ink Array
			updateInk(event.point, time);

			// Draw XY point to Paper Path
			this.path.add(event.point);

			this.prevPoints = event.point;

			// Reset Timestamps
			this.lastTimestamp = eventTimeStamp;

		};

		// Paper Tool Mouse Drag Event
		tool.onMouseDrag = (event) => {

			// Get Event Timestamp and Timestamp Delta
			let eventTimeStamp = event.event.timeStamp;
			let timeDelta = eventTimeStamp - this.lastTimestamp;

			// Get new Time for Ink Array
			let time = this.ink[2][this.ink[2].length - 1] + timeDelta;

			// Get XY point from event w/ time [ms] to update Ink Array
			updateInk(event.point, time);

			// Draw XY point to Paper Path
			this.path.add(event.point);

			// Reset Timestamps
			this.lastTimestamp = eventTimeStamp;
			
			this.emit('drawing',eventTimeStamp, this.ink);

			const canvasSize = getCanvasDimensions();

			if (canvasSize) {
				app.socket.emit('drawing', {
					room: app.socket.id,
					x0: this.prevPoints.x / canvasSize.width,
					y0: this.prevPoints.y / canvasSize.height,
					x1: event.point.x / canvasSize.width,
					y1: event.point.y / canvasSize.height
				});
			}
			
			this.prevPoints = event.point;

		};

	};

	//--- Initialize Ink Array
	const initInk = () => {
		this.ink = [
			[],
			[],
			[]
		];
	};

	//--- Update Ink Array w/ XY Point + Time
	const updateInk = (point, time) => {
		this.ink[0].push(point.x);
		this.ink[1].push(point.y);
		this.ink[2].push(time);
	};

	//--- Clear Paper Drawing Canvas
	this.clearCanvas = () => {

		// Remove Paper Path Layer
		paper_dist_paper_core_min__WEBPACK_IMPORTED_MODULE_0___default.a.project.activeLayer.removeChildren();
		paper_dist_paper_core_min__WEBPACK_IMPORTED_MODULE_0___default.a.view.draw();

		// Init Ink Array
		initInk();
	};

	this.stop = () => {
		if (paper_dist_paper_core_min__WEBPACK_IMPORTED_MODULE_0___default.a.tool) paper_dist_paper_core_min__WEBPACK_IMPORTED_MODULE_0___default.a.tool.remove();
	};

	//--- Get Paper Canvas Dimensions Width/Height
	const getCanvasDimensions = () => {
		if (! document.getElementById('canvas'))  return;

		let w = document.getElementById('canvas').offsetWidth;
		let h = document.getElementById('canvas').offsetHeight;
		return {
			height: h,
			width: w
		};
	};

}

/***/ }),

/***/ "./src/components/challenge-qrcode.html":
/*!**********************************************!*\
  !*** ./src/components/challenge-qrcode.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"qrcode-card\" class=\"uk-card uk-card-default uk-border-rounded uk-padding-remove-left\">");t.b("\n" + i);t.b("    <div id=\"qrcode-card-body\" class=\"uk-card-body\">");t.b("\n" + i);t.b("        <div uk-grid>");t.b("\n" + i);t.b("            <div class=\"uk-width-3-5\">");t.b("\n" + i);t.b("                <h4 class=\"uk-h4 uk-text-muted uk-margin-top\" data-i18n=\"page.access\">");t.b(t.v(t.f("qrcodeText",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("            <div class=\"uk-width-2-5\">");t.b("\n" + i);t.b("                <img src=\"");t.b(t.v(t.f("qrcode",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("externalCardURL",c,p,0)));t.b("\" width=\"122\" height=\"122\" />");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div id=\"no-phone-footer\" class=\"uk-padding-remove-bottom \">");t.b("\n" + i);t.b("        <button id=\"no-phone-bt\"");t.b("\n" + i);t.b("            class=\"uk-button uk-button-text uk-button-large uk-width-1-1\"");t.b("\n" + i);t.b("            data-i18n=\"challenges.page.no-phone-text\">");t.b(t.v(t.f("noPhoneText",c,p,0)));t.b("\n" + i);t.b("        </button>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"qrcode-card\" class=\"uk-card uk-card-default uk-border-rounded uk-padding-remove-left\">\n    <div id=\"qrcode-card-body\" class=\"uk-card-body\">\n        <div uk-grid>\n            <div class=\"uk-width-3-5\">\n                <h4 class=\"uk-h4 uk-text-muted uk-margin-top\" data-i18n=\"page.access\">{{qrcodeText}}</h4>\n            </div>\n            <div class=\"uk-width-2-5\">\n                <img src=\"{{qrcode}}\" alt=\"{{externalCardURL}}\" width=\"122\" height=\"122\" />\n            </div>\n        </div>\n    </div>\n    <div id=\"no-phone-footer\" class=\"uk-padding-remove-bottom \">\n        <button id=\"no-phone-bt\"\n            class=\"uk-button uk-button-text uk-button-large uk-width-1-1\"\n            data-i18n=\"challenges.page.no-phone-text\">{{noPhoneText}}\n        </button>\n    </div>\n</div>", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/components/challenge-view.js":
/*!******************************************!*\
  !*** ./src/components/challenge-view.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! event-emitter */ "./node_modules/event-emitter/index.js");
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(event_emitter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var qrcode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! qrcode */ "./node_modules/qrcode/lib/browser.js");
/* harmony import */ var qrcode__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(qrcode__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _challenge_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./challenge.html */ "./src/components/challenge.html");
/* harmony import */ var _challenge_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_challenge_html__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _challenge_qrcode_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./challenge-qrcode.html */ "./src/components/challenge-qrcode.html");
/* harmony import */ var _challenge_qrcode_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_challenge_qrcode_html__WEBPACK_IMPORTED_MODULE_4__);
//modules








function ChallengeView() {

	let app;

	//emitter
	event_emitter__WEBPACK_IMPORTED_MODULE_1___default()(this);

	app = undefined;
	this.challenge = undefined;
	this.currentDrawChallenge = undefined;
	this.pageData = {
		name: '',
		short: '',
		description: '',
		draw: '',
		drawCategory: '',
		categorySlug: '',
		time: 0,
		ready: '',
		back: '',
		inverseColour: undefined,
	};


	this.init = async (context) => {

		//setup
		app = context;

		this.challenge = app.getChallenge(app.gameState.currentChallenge);
		this.currentDrawChallenge = pickDrawCategory();

		app.gameState.currentCategory = this.currentDrawChallenge;

		const categorySlug = this.currentDrawChallenge.replace(/\s/g, '-').toLowerCase();

		const externalCardURL = `http://www.gamepictio.com/card/${app.socket.id}`;
		
		const qrCode = await qrcode__WEBPACK_IMPORTED_MODULE_2___default.a.toDataURL(externalCardURL);

		//data
		this.pageData = {
			name: app.i18next.t(`challenges.challenges.${this.challenge.short}.name`),
			short: this.challenge.short,
			description: app.i18next.t(`challenges.challenges.${this.challenge.short}.description`),
			draw: app.i18next.t('challenges.page.draw'),
			drawCategory: app.i18next.t(`categories.${categorySlug}`),
			categorySlug: categorySlug,
			time: this.challenge.time,
			ready: app.i18next.t('challenges.page.ready'),
			back: app.i18next.t('challenges.page.back'),
			inverseColour: app.interface.inverseClass(),
			onePlayer: app.gameState.players == 1,
			qrcodeText: app.i18next.t('challenges.page.qrcodeText'),
			noPhoneText: app.i18next.t('challenges.page.page.no-phone-text'),
			externalCardURL: externalCardURL,
			qrcode: qrCode
		};

		//buid page
		const challengeHTML = _challenge_html__WEBPACK_IMPORTED_MODULE_3___default()(this.pageData);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(challengeHTML).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view'));

		app.speak(`${app.i18next.t('challenges.speak.the-challenge-is')} ${this.pageData.name}`);

		let toSpeak;

		if (app.gameState.players === 1 || app.gameState.noPhone) {

			toSpeak = `${app.i18next.t('challenges.speak.you-must-draw')} ${this.pageData.time} ${app.i18next.t('challenges.speak.seconds')}`;
			app.speak(toSpeak);

			toSpeak = `${app.i18next.t('challenges.speak.are-you-ready')}`;
			app.speak(toSpeak);

			jquery__WEBPACK_IMPORTED_MODULE_0___default()('.uk-card').click(this, callGame);

			//animation
			showDrawingCard({delay:1000});

		} else if (app.gameState.players === 2) {

			app.speak(app.i18next.t('challenges.page.qrcodeText'));
			jquery__WEBPACK_IMPORTED_MODULE_0___default()('#drawing-card').css('display','none');
			jquery__WEBPACK_IMPORTED_MODULE_0___default()('#back').click(this, goBack);

			showQRCodeCard();
			
		}
		
		//translate
		translate();

		//home button
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#home-button').click(() => {
			homeButton('home');
		});

		//emit to socker IO
		emitToDashboard({
			name: this.pageData.name,
			short: this.pageData.short,
			description: this.pageData.description,
			drawCategory: this.pageData.drawCategory,
			time: this.pageData.time,
			colourClass: this.pageData.inverseColour,
			players: app.gameState.players
		});

		if (app.gameState.players > 1) {
			if (app.virtualCardRegistered) {
				emitToCard({
					action: 'new',
				});
			}

			app.socket.on('card', cardListeners);
		}

		enterAnimation();

	};

	const pickDrawCategory = () => {
		//pick a draw category
		const filteredCatetories = filterCategories(this.challenge.code);
		const randomDraw = filteredCatetories[Math.floor(Math.random() * filteredCatetories.length)];
		return randomDraw.Category; // save current draw category
	};

	//-- Filter category by cahllenge code 
	const filterCategories = (code) => {

		let filteredCat = [];

		//loop categories draw
		for (let cat of app.mechanics.catChallenges) {

			// if category fits in only one challenge
			if (cat.Challenge.length == 1) {
				if (cat.Challenge == code) filteredCat.push(cat);

				// cartegory fits into more than one category
			} else {

				//split comma separated cateories
				let chArray = cat.Challenge.split(',');

				//loop
				for (let chall of chArray) {
					if (chall == code) filteredCat.push(cat);
				}

			}
		}

		return filteredCat;
	};

	const translate = () => {
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenge').localize();
	};

	const callGame = () => {
		const duration = 1500;

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, () => {
			this.emit('changeView', {
				source: 'challenge',
				target:'game'
			});
		});
	};

	//comming from the card (on another device)
	const cardListeners = (card) => {

		if (card.action == 'start') {

			app.virtualCardRegistered = true;

			emitToCard({
				action: 'new',
			});

		} else if (card.action == 'play') {

			const duration = 1500;

			jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenge').animate({
				marginTop: '-100',
				opacity: 0,
			}, duration, () => {
				this.emit('changeView', {
					source: 'challenge',
					target:'game'
				});
			});
		}
	};

	const homeButton = () => {
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			this.emit('changeView', {
				source: 'challenge',
				target:'home'
			});
		});

		emitToCard({
			action: 'wait',
		});

		//emit to socker IO
		emitToDashboard({
			view: 'waiting'
		});
	};

	const goBack = () => {
		const duration = 1500;

		emitToCard({
			action: 'wait',
		});

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, () => {
			this.emit('changeView', {
				source: 'challenge',
				target:'challenges'
			});
		});
	};

	//animation
	const enterAnimation = () => {

		const duration = 1500;

		const container = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenge');
		container.css('opacity', 0);
		container.css('marginTop', 100);

		//animation
		container.animate({
			marginTop: 0,
			opacity: 1,
		}, duration);

	};

	const showDrawingCard = ({delay}) => {

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#play').click(this, callGame);

		const duration = 1500;

		const card = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#drawing-card');
		const cardHeight = card.height();
		card.css('height', 0);
		card.css('opacity', 0);

		card.delay(delay).animate({
			height: cardHeight,
			opacity: 1,
		}, duration);
	};

	const showQRCodeCard = () => {

		const duration = 1500;

		//buid page
		const QRCardHTML = _challenge_qrcode_html__WEBPACK_IMPORTED_MODULE_4___default()(this.pageData);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(QRCardHTML).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#card'));

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#no-phone-bt').click(this, noPhoneAction);

		const card = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#qrcode-card');
		// const qRCardBody = $('#qrcode-card-body');

		// const cardHeight = card.height();
		// const cardBodyHeight = qRCardBody.outerHeight();

		card.css('height', 0);
		card.css('opacity', 0);

		const cardFooter = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#no-phone-footer');
		cardFooter.css('display','none');
		cardFooter.css('opacity', 0);

		const cardHeader = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#no-phone-header');
		cardHeader.css('display','none');
		cardHeader.css('opacity', 0);

		card.delay(1000).animate({
			height: 182, //cardBodyHeight - 25,
			opacity: 1,
		}, duration, () => {
			noPhoneFooter();
		});

		const noPhoneFooter = () => {
		
			const duration = 1500;
			const delay = 1000;
	
			const card = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#qrcode-card');
			const cardHeight = card.height();
	
			const cardFooter = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#no-phone-footer');
	
			card.delay(delay).animate({
				height: cardHeight + 65
			}, duration);
	
			cardFooter.css('display','block');
			cardFooter.delay(delay).animate({
				opacity: 1,
			}, duration);
		};
	};

	const noPhoneAction = () => {

		app.gameState.noPhone = true;

		const duration = 1500;

		const QRcard = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#qrcode-card');

		QRcard.animate({
			height: 0,
			opacity: 1,
		}, duration, () => {
			QRcard.css('display','none');
			jquery__WEBPACK_IMPORTED_MODULE_0___default()('#drawing-card').css('display','block');
			showDrawingCard({delay:0});
		});
	};

	const emitToCard = ({
		type = 'card',
		view = 'challenge',
		action = 'new',
		room = app.socket.id,
		name = this.pageData.name,
		short = this.pageData.short,
		draw = this.pageData.draw,
		drawCategory = this.pageData.drawCategory,
		time = this.pageData.time,
		ready = this.pageData.ready
	}) => {
		app.socket.emit(type, {view, action, room, name, short, draw, drawCategory, time, ready});
	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'challenge',
		room = app.socket.id,
		name = '',
		short = '',
		description = '',
		drawCategory = '',
		time = 0,
		colourClass = '',
		players = 0
	}) => {
		app.socket.emit(type, {view, room, name, short, description, drawCategory, time, colourClass, players});
	};
	

}

/* harmony default export */ __webpack_exports__["default"] = (new ChallengeView());

/***/ }),

/***/ "./src/components/challenge.html":
/*!***************************************!*\
  !*** ./src/components/challenge.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"challenge\" class=\"uk-container uk-container-small uk-position-center uk-text-center\">");t.b("\n" + i);t.b("    <h2 id=\"title\" class=\"uk-h2 ");t.b(t.v(t.f("inverseColour",c,p,0)));t.b("\" data-i18n=\"challenges.challenges.");t.b(t.v(t.f("short",c,p,0)));t.b(".name\">");t.b(t.v(t.f("name",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("    <div class=\"uk-margin-remove-top\" uk-grid>");t.b("\n" + i);t.b("        <div class=\"uk-width-expand\"></div>");t.b("\n" + i);t.b("        <div id=\"description\" class=\"uk-width-2-3\">");t.b("\n" + i);t.b("            <div class=\"uk-margin-medium-bottom ");t.b(t.v(t.f("inverseColour",c,p,0)));t.b("\">");t.b("\n" + i);t.b("                <p data-i18n=\"challenges.challenges.");t.b(t.v(t.f("short",c,p,0)));t.b(".description\">");t.b(t.v(t.f("description",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("            <div uk-grid>");t.b("\n" + i);t.b("                <div class=\"uk-width-expand\"></div>");t.b("\n" + i);t.b("                <div id='card' class=\"uk-width-2-3\">");t.b("\n" + i);t.b("                    <div id=\"drawing-card\" class=\"uk-card uk-card-default uk-box-shadow-large uk-border-rounded uk-margin-small-left uk-padding-remove-left \">");t.b("\n" + i);t.b("                        <div class=\"uk-card-header\">");t.b("\n" + i);t.b("                            <h4 class=\"uk-h4 uk-margin-remove-bottom\" data-i18n=\"challenges.page.draw\">");t.b(t.v(t.f("draw",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("                        </div>");t.b("\n" + i);t.b("                    ");t.b("\n" + i);t.b("                        <div class=\"uk-card-body uk-card-primary uk-box-shadow-large uk-light\">");t.b("\n" + i);t.b("                            <h2 class=\"uk-h2\" data-i18n=\"categories.");t.b(t.v(t.f("categorySlug",c,p,0)));t.b("\">");t.b(t.v(t.f("drawCategory",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("                            <p class=\"uk-text-small\">");t.b("\n" + i);t.b("                                <span uk-icon=\"future\" class=\"uk-margin-small-right\"></span>");t.b(t.v(t.f("time",c,p,0)));t.b("s");t.b("\n" + i);t.b("                            </p>");t.b("\n" + i);t.b("                        </div>");t.b("\n" + i);t.b("                    ");t.b("\n" + i);t.b("                        <div class=\"uk-card-footer uk-box-shadow-large\">");t.b("\n" + i);t.b("                            <button id=\"play\" class=\"uk-button uk-button-text uk-button-large uk-border-rounded uk-width-1-1\"");t.b("\n" + i);t.b("                                data-i18n=\"challenges.page.ready\">");t.b(t.v(t.f("ready",c,p,0)));t.b("\n" + i);t.b("                                <span uk-icon=\"chevron-right\" class=\"uk-margin-small-left\"></span>");t.b("\n" + i);t.b("                            </button>");t.b("\n" + i);t.b("                        </div>");t.b("\n" + i);t.b("                    </div>");t.b("\n" + i);t.b("                </div>");t.b("\n" + i);t.b("                <div class=\"uk-width-expand\"></div>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <div class=\"uk-width-expand\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);if(!t.s(t.f("onePlayer",c,p,1),c,p,1,0,0,"")){t.b("    <div class=\"uk-margin-large-top\">");t.b("\n" + i);t.b("        <button id=\"back\" class=\"uk-button uk-button-text uk-text-meta ");t.b(t.v(t.f("inverseColour",c,p,0)));t.b("\"><span uk-icon=\"chevron-left\"");t.b("\n" + i);t.b("                class=\"uk-margin-small-right\"></span><span data-i18n=\"challenges.page.back\">");t.b(t.v(t.f("back",c,p,0)));t.b("</span></button>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);};t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<button id=\"home-button\" class=\"uk-button uk-button-large uk-border-rounded uk-padding-remove\">");t.b("\n" + i);t.b("    <span uk-icon=\"icon: home; ratio: 1.5\" class=\"uk-margin-small-right\"></span>Home");t.b("\n" + i);t.b("</button>");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"challenge\" class=\"uk-container uk-container-small uk-position-center uk-text-center\">\n    <h2 id=\"title\" class=\"uk-h2 {{inverseColour}}\" data-i18n=\"challenges.challenges.{{short}}.name\">{{name}}</h2>\n    <div class=\"uk-margin-remove-top\" uk-grid>\n        <div class=\"uk-width-expand\"></div>\n        <div id=\"description\" class=\"uk-width-2-3\">\n            <div class=\"uk-margin-medium-bottom {{inverseColour}}\">\n                <p data-i18n=\"challenges.challenges.{{short}}.description\">{{description}}</p>\n            </div>\n            <div uk-grid>\n                <div class=\"uk-width-expand\"></div>\n                <div id='card' class=\"uk-width-2-3\">\n                    <div id=\"drawing-card\" class=\"uk-card uk-card-default uk-box-shadow-large uk-border-rounded uk-margin-small-left uk-padding-remove-left \">\n                        <div class=\"uk-card-header\">\n                            <h4 class=\"uk-h4 uk-margin-remove-bottom\" data-i18n=\"challenges.page.draw\">{{draw}}</h4>\n                        </div>\n                    \n                        <div class=\"uk-card-body uk-card-primary uk-box-shadow-large uk-light\">\n                            <h2 class=\"uk-h2\" data-i18n=\"categories.{{categorySlug}}\">{{drawCategory}}</h2>\n                            <p class=\"uk-text-small\">\n                                <span uk-icon=\"future\" class=\"uk-margin-small-right\"></span>{{time}}s\n                            </p>\n                        </div>\n                    \n                        <div class=\"uk-card-footer uk-box-shadow-large\">\n                            <button id=\"play\" class=\"uk-button uk-button-text uk-button-large uk-border-rounded uk-width-1-1\"\n                                data-i18n=\"challenges.page.ready\">{{ready}}\n                                <span uk-icon=\"chevron-right\" class=\"uk-margin-small-left\"></span>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"uk-width-expand\"></div>\n            </div>\n        </div>\n        <div class=\"uk-width-expand\"></div>\n    </div>\n\n    {{^onePlayer}}\n    <div class=\"uk-margin-large-top\">\n        <button id=\"back\" class=\"uk-button uk-button-text uk-text-meta {{inverseColour}}\"><span uk-icon=\"chevron-left\"\n                class=\"uk-margin-small-right\"></span><span data-i18n=\"challenges.page.back\">{{back}}</span></button>\n    </div>\n    {{/onePlayer}}\n\n</div>\n\n<button id=\"home-button\" class=\"uk-button uk-button-large uk-border-rounded uk-padding-remove\">\n    <span uk-icon=\"icon: home; ratio: 1.5\" class=\"uk-margin-small-right\"></span>Home\n</button>", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/components/challenges-view.js":
/*!*******************************************!*\
  !*** ./src/components/challenges-view.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! event-emitter */ "./node_modules/event-emitter/index.js");
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(event_emitter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _challenges_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./challenges.html */ "./src/components/challenges.html");
/* harmony import */ var _challenges_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_challenges_html__WEBPACK_IMPORTED_MODULE_2__);
//modules






function ChallengesView() {

	let app;

	//emitter
	event_emitter__WEBPACK_IMPORTED_MODULE_1___default()(this);

	app = undefined;
	this.pageData = {
		title: '',
		inverseColour: undefined,
		challenges: undefined
	};

	this.init = (context) => {
		
		app = context;

		const challenges = [];
		for (const challenge of app.mechanics.challenges) {
			if (challenge.players > 1) {
				challenges.push(challenge);
			}
		}

		//data
		this.pageData = {
			title: app.i18next.t('challenges.page.title'),
			inverseColour: app.interface.inverseClass(),
			challenges: challenges
		};

		//build page
		const challengesHTML = _challenges_html__WEBPACK_IMPORTED_MODULE_2___default()(this.pageData);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(challengesHTML).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view'));


		//home button
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#home-button').click(() => {
			homeButton('home');
		});

		// get challenges
		getChallenges();

		//transalate
		translate();

		//emit to socker IO
		emitToDashboard({
			message: app.i18next.t('challenges.dashboard.selecting'),
		});

		app.speak(app.i18next.t('challenges.speak.pick-a-challenge'));

		//animation
		enterAnimation();
	};

	const translate = () => {
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenges').localize();
	};

	const getChallenges = () => {

		// const _this = this;
		const duration = 1000;

		//loop
		let i = 0;
		for (const challenge of this.pageData.challenges) {

			const card = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`#${challenge.short}`);
			card.data({
				short: challenge.short,
				name:challenge.name
			});
			card.click(this, challengeButtonAction);

			//visual initial state
			let cDelay = 400 + (i * 100) + (Math.random() * 200);
			let ctop = -500 + (Math.random() * 1000);

			card.css('cursor', 'pointer');
			card.css('left', -1500);
			card.css('top', ctop);

			card.delay(cDelay).animate({
				top: 0,
				left: 0,
			}, {
				duration: duration,
				specialEasing: {
					width: 'linear',
					height: 'easeOutBounce'
				}
			});
		}
	};

	const homeButton = () => {
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenges').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			this.emit('changeView', {
				source: 'challenges',
				target:'home'
			});
		});

		emitToDashboard({
			view: 'waiting'
		});
	};

	const challengeButtonAction = (e) => {
		const card = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
		const challengeName = card.data('name');

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenges').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			app.gameState.currentChallenge = challengeName;
			this.emit('changeView', {
				source: 'challenges',
				target:'challenge'
			});
		});
	};

	//animation
	const enterAnimation = () => {

		const duration = 1100;

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenges').css('opacity', 0);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenges').css('marginTop', 100);

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#challenges').animate({
			marginTop: 0,
			opacity: 1,
		}, duration);
	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'challenges',
		room = app.socket.id,
		message = ''
	}) => {
		app.socket.emit(type, {view, room, message});
	};

}

/* harmony default export */ __webpack_exports__["default"] = (new ChallengesView());

/***/ }),

/***/ "./src/components/challenges.html":
/*!****************************************!*\
  !*** ./src/components/challenges.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"challenges\" class=\"uk-container uk-container-small uk-position-center uk-text-center\">");t.b("\n" + i);t.b("    <h1 id=\"title\" class=\"uk-h1 ");t.b(t.v(t.f("inverseColour",c,p,0)));t.b("\" data-i18n=\"challenges.page.title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</h1>");t.b("\n" + i);t.b("    <div class=\"uk-margin-medium-top\" uk-grid>");t.b("\n" + i);t.b("        <div class=\"uk-width-expand\"></div>");t.b("\n" + i);t.b("        <div id=\"columns\" class=\"uk-width-2-3\" uk-grid>");t.b("\n" + i);if(t.s(t.f("challenges",c,p,1),c,p,0,370,1071,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <div class=\"uk-width-1-2\">");t.b("\n" + i);t.b("                <div id=\"");t.b(t.v(t.f("short",c,p,0)));t.b("\" class=\"uk-card uk-card-default uk-border-rounded uk-box-shadow-small uk-animation-toggle\">");t.b("\n" + i);t.b("                    <div class=\"uk-card-media-top uk-cover-container\">");t.b("\n" + i);t.b("                        <img src=\"./assets/");t.b(t.v(t.f("short",c,p,0)));t.b(".opt.png\" alt=\"\" class=\"uk-animation-kenburns\">");t.b("\n" + i);t.b("                    </div>");t.b("\n" + i);t.b("                    <div class=\"uk-card-body\">");t.b("\n" + i);t.b("                        <a href=\"#\" class=\"uk-button uk-button-text\">");t.b("\n" + i);t.b("                            <h4 class=\"uk-h4\" data-i18n=\"challenges.challenges.");t.b(t.v(t.f("short",c,p,0)));t.b(".name\">");t.b(t.v(t.f("name",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("                        </a>");t.b("\n" + i);t.b("                    </div>");t.b("\n" + i);t.b("                </div>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);});c.pop();}t.b("        </div>");t.b("\n" + i);t.b("        <div class=\"uk-width-expand\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<button id=\"home-button\" class=\"uk-button uk-button-large uk-border-rounded uk-padding-remove\">");t.b("\n" + i);t.b("    <span uk-icon=\"icon: home; ratio: 1.5\" class=\"uk-margin-small-right\"></span>Home");t.b("\n" + i);t.b("</button>");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"challenges\" class=\"uk-container uk-container-small uk-position-center uk-text-center\">\n    <h1 id=\"title\" class=\"uk-h1 {{inverseColour}}\" data-i18n=\"challenges.page.title\">{{title}}</h1>\n    <div class=\"uk-margin-medium-top\" uk-grid>\n        <div class=\"uk-width-expand\"></div>\n        <div id=\"columns\" class=\"uk-width-2-3\" uk-grid>\n            {{#challenges}}\n            <div class=\"uk-width-1-2\">\n                <div id=\"{{short}}\" class=\"uk-card uk-card-default uk-border-rounded uk-box-shadow-small uk-animation-toggle\">\n                    <div class=\"uk-card-media-top uk-cover-container\">\n                        <img src=\"./assets/{{short}}.opt.png\" alt=\"\" class=\"uk-animation-kenburns\">\n                    </div>\n                    <div class=\"uk-card-body\">\n                        <a href=\"#\" class=\"uk-button uk-button-text\">\n                            <h4 class=\"uk-h4\" data-i18n=\"challenges.challenges.{{short}}.name\">{{name}}</h4>\n                        </a>\n                    </div>\n                </div>\n            </div>\n            {{/challenges}}\n        </div>\n        <div class=\"uk-width-expand\"></div>\n    </div>\n</div>\n\n<button id=\"home-button\" class=\"uk-button uk-button-large uk-border-rounded uk-padding-remove\">\n    <span uk-icon=\"icon: home; ratio: 1.5\" class=\"uk-margin-small-right\"></span>Home\n</button>", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/components/game-view.js":
/*!*************************************!*\
  !*** ./src/components/game-view.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! event-emitter */ "./node_modules/event-emitter/index.js");
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(event_emitter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var event_emitter_has_listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! event-emitter/has-listeners */ "./node_modules/event-emitter/has-listeners.js");
/* harmony import */ var event_emitter_has_listeners__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(event_emitter_has_listeners__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var easytimer_dist_easytimer_min__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! easytimer/dist/easytimer.min */ "./node_modules/easytimer/dist/easytimer.min.js");
/* harmony import */ var easytimer_dist_easytimer_min__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(easytimer_dist_easytimer_min__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var progressbar_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! progressbar.js */ "./node_modules/progressbar.js/src/main.js");
/* harmony import */ var progressbar_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(progressbar_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _game_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game.html */ "./src/components/game.html");
/* harmony import */ var _game_html__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_game_html__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _canvas_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./canvas-view */ "./src/components/canvas-view.js");
/* harmony import */ var _magentaAI__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./magentaAI */ "./src/components/magentaAI.js");
//modules












function GameView() {

	let app;

	//emitter
	event_emitter__WEBPACK_IMPORTED_MODULE_1___default()(this);

	let progressBar;

	app = undefined;
	this.challenge = undefined;
	this.timer = undefined;
	this.pageData = {
		time: 0,
		clear: '',
		play: '',
		back: '',
		inverseColour: undefined
	};
	this.canvasPaper = new _canvas_view__WEBPACK_IMPORTED_MODULE_6__["default"]();
	this.magentaAI = new _magentaAI__WEBPACK_IMPORTED_MODULE_7__["default"]();

	this.initiated = false;


	this.init = (context) => {

		app = context;

		//setup
		this.canvasPaper.init(app);
		this.magentaAI.init(app);

		//set challenge
		this.challenge = app.getChallenge(app.gameState.currentChallenge);

		//Page data
		this.pageData = {
			time: this.challenge.time,
			clear: app.i18next.t('game.page.clear'),
			play: app.i18next.t('game.page.play'),
			back: app.i18next.t('game.page.back'),
			showBackButton: false,
			inverseColour: app.interface.inverseClass()
		};

		//Build page

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('.uk-offcanvas-content').hide();

		const gameHTML = _game_html__WEBPACK_IMPORTED_MODULE_5___default()(this.pageData);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(gameHTML).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#app'));

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#home-button').click(() => {
			homeButton('home');
		});

		//translate
		translate();

		//set button actions
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#start-drawing-overlay').click(this, start);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#clear-drawing').click(this, clear);

		if (!this.initiated) {
			this.initiated = true;
			this.addListeners();
		}

		//animation
		enterAnimation();

		//emit to socker IO
		emitToDashboard({
			type: 'interface',
			view: 'game',
			challenge: app.gameState.currentChallenge
		});

		app.speak(app.i18next.t('game.speak.play'));

	};

	const translate = () => {
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#game').localize();
	};

	const updatePage = (guess) => {
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#guess')[0].innerHTML = guess;
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#container-guess').fadeIn('fast');
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#container-guess').fadeOut('slow');
	};

	this.addListeners = () => {

		this.canvasPaper.on('drawing', (ets, ink) => {
			this.magentaAI.read(ets, ink);
		});

		this.magentaAI.on('guess', (guess) => {
			updatePage(guess);

			emitToCard({
				action: 'updateGuess',
				guess: guess
			});
		});

		this.magentaAI.on('stop', () => {
			this.canvasPaper.stop();
			this.timer.stop();
		});

		if (!event_emitter_has_listeners__WEBPACK_IMPORTED_MODULE_2___default()(this.magentaAI, 'win')) {
			this.magentaAI.on('win', () => {
				jquery__WEBPACK_IMPORTED_MODULE_0___default()('.uk-offcanvas-content').show();
				jquery__WEBPACK_IMPORTED_MODULE_0___default()('#game').remove();
				this.emit('changeView', {
					source: 'game',
					target: 'post-game'
				});
			});
		}

	};

	const start = (e) => {

		jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget).remove();

		app.gameState.attempts = [];

		timeGame();
		this.canvasPaper.startCanvas();

		emitToCard({
			action: 'start'
		});
	};

	const clear = () => {

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#guess')[0].innerHTML = '...';
		this.canvasPaper.clearCanvas();

		emitToCard({
			action: 'updateGuess',
			guess: '...'
		});

		//emit to socker IO
		emitToDashboard({
			type: 'guess',
			view: 'game',
			action: 'clear',
			attempt: '...',
		});
	};

	const homeButton = () => {
		this.timer.stop();
		app.gameState.attempts = [];
		this.canvasPaper.clearCanvas();

		emitToCard({
			action: 'wait',
		});

		emitToDashboard({
			view: 'waiting'
		});

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('.uk-offcanvas-content').show();
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#game').remove();
		this.emit('changeView', {
			source: 'game',
			target: 'home'
		});
	};

	// --- set timer for game
	const timeGame = () => {

		const challengeTime = this.challenge.time;

		this.timer = new easytimer_dist_easytimer_min__WEBPACK_IMPORTED_MODULE_3___default.a(); // reset timer

		this.timer.start({
			countdown: true,
			precision: 'secondTenths',
			startValues: {
				seconds: challengeTime
			}
		}); // start timer countdown

		let timeLeftSeconds = challengeTime;
		let timeLeftPercent = 100; // %

		progressBar = new progressbar_js__WEBPACK_IMPORTED_MODULE_4___default.a.SemiCircle('#progress', {
			strokeWidth: 12,
			color: '#FFEA82',
			duration: 1400,
			svgStyle: null,
			text: {
				value: '',
				alignToBottom: true,
			},
			from: {
				color: '#ED6A5A'
			},
			to: {
				color: '#FFEA82'
			},
			// Set default step function for all animate calls
			step: (state, bar) => {
				bar.path.setAttribute('stroke', state.color);

				if ((timeLeftSeconds + 1) === 0) {
					bar.setText('');
				} else {
					bar.setText(`${timeLeftSeconds + 1}'`);
				}

				bar.text.style.color = state.color;
			}
		});


		this.timer.addEventListener('secondTenthsUpdated', () => {

			const min = this.timer.getTimeValues().minutes;
			const sec = this.timer.getTimeValues().seconds;
			const tsec = this.timer.getTimeValues().secondTenths;

			timeLeftSeconds = (min * 60) + sec;

			const timeLeftSecondsTeeth = (min * 60 * 10) + (sec * 10) + tsec;
			timeLeftPercent = (timeLeftSecondsTeeth / challengeTime) * 10;

			progressBar.set(timeLeftPercent / 100); // Number from 0.0 to 1.0

			//IO - emit timer
			app.socket.emit('timer', {
				view: 'game',
				timer: timeLeftSeconds,
				timerPercentage: timeLeftPercent
			});

			emitToCard({
				action: 'updateTime',
				time: timeLeftSeconds
			});
			
		});

		this.timer.addEventListener('targetAchieved', () => {
			jquery__WEBPACK_IMPORTED_MODULE_0___default()('.uk-offcanvas-content').show();
			jquery__WEBPACK_IMPORTED_MODULE_0___default()('#game').remove();
			this.emit('changeView', {
				source: 'game',
				target: 'post-game'
			});
		});
	};

	//animation
	const enterAnimation = () => {
		const duration = 1500;

		let container = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#game');
		container.css('opacity', 0);
		container.css('marginTop', 100);

		let card = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.uk-card');
		let cardHeight = card.height();
		card.css('height', 0);
		card.css('opacity', 0);

		//animation
		container.animate({
			marginTop: 0,
			opacity: 1,
		}, duration);

		card.delay(1000).animate({
			height: cardHeight,
			opacity: 1,
		}, duration);
	};

	const emitToCard = ({
		type = 'card',
		view = 'challenge',
		action = 'new',
		room = app.socket.id,
		time = 0,
		guess = ''
	}) => {
		app.socket.emit(type, {view, action, room, name, time, guess: guess});
	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'game',
		room = app.socket.id,
		challenge = '',
		action = '',
		attempt = ''
	}) => {
		app.socket.emit(type, {view, room, challenge, action, attempt});
	};

}

/* harmony default export */ __webpack_exports__["default"] = (new GameView());

/***/ }),

/***/ "./src/components/game.html":
/*!**********************************!*\
  !*** ./src/components/game.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"game\">");t.b("\n" + i);t.b("    <div class=\"uk-margin-remove-top\" uk-height-viewport>");t.b("\n" + i);t.b("        <div class=\"uk-card uk-card-default uk-card-body uk-border-rounded uk-padding-remove uk-margin-remove uk-box-shadow-large bordered\"");t.b("\n" + i);t.b("            uk-height-viewport>");t.b("\n");t.b("\n" + i);t.b("            <button id=\"start-drawing-overlay\"");t.b("\n" + i);t.b("                class=\"uk-button uk-button-large uk-button-primary uk-border-rounded uk-position-center\"");t.b("\n" + i);t.b("                data-i18n=\"game.page.play\">");t.b(t.v(t.f("play",c,p,0)));t.b("</button>");t.b("\n");t.b("\n" + i);t.b("            <canvas id=\"canvas\" resize></canvas>");t.b("\n");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <button id=\"home-button\" class=\"uk-button uk-button-large uk-border-rounded uk-padding-remove\">");t.b("\n" + i);t.b("        <span uk-icon=\"icon: home; ratio: 1.5\" class=\"uk-margin-small-right\"></span>Home");t.b("\n" + i);t.b("    </button>");t.b("\n");t.b("\n" + i);t.b("    <div id=\"container-clear\">");t.b("\n" + i);t.b("        <button id=\"clear-drawing\" class=\"uk-button uk-border-rounded uk-align-right\"");t.b("\n" + i);t.b("            data-i18n=\"game.page.clear\">");t.b(t.v(t.f("clear",c,p,0)));t.b("</button>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div id=\"container-progress\">");t.b("\n" + i);t.b("        <div id=\"progress\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    ");t.b("\n" + i);t.b("    <div id=\"container-guess\">");t.b("\n" + i);t.b("        <h1 id=\"guess\" class=\"uk-h1 uk-text-bold uk-text-muted uk-text-center\"></h1>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"game\">\n    <div class=\"uk-margin-remove-top\" uk-height-viewport>\n        <div class=\"uk-card uk-card-default uk-card-body uk-border-rounded uk-padding-remove uk-margin-remove uk-box-shadow-large bordered\"\n            uk-height-viewport>\n\n            <button id=\"start-drawing-overlay\"\n                class=\"uk-button uk-button-large uk-button-primary uk-border-rounded uk-position-center\"\n                data-i18n=\"game.page.play\">{{play}}</button>\n\n            <canvas id=\"canvas\" resize></canvas>\n\n        </div>\n    </div>\n\n    <button id=\"home-button\" class=\"uk-button uk-button-large uk-border-rounded uk-padding-remove\">\n        <span uk-icon=\"icon: home; ratio: 1.5\" class=\"uk-margin-small-right\"></span>Home\n    </button>\n\n    <div id=\"container-clear\">\n        <button id=\"clear-drawing\" class=\"uk-button uk-border-rounded uk-align-right\"\n            data-i18n=\"game.page.clear\">{{clear}}</button>\n    </div>\n\n    <div id=\"container-progress\">\n        <div id=\"progress\"></div>\n    </div>\n    \n    <div id=\"container-guess\">\n        <h1 id=\"guess\" class=\"uk-h1 uk-text-bold uk-text-muted uk-text-center\"></h1>\n    </div>\n\n</div>\n\n", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/components/home-view.js":
/*!*************************************!*\
  !*** ./src/components/home-view.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! event-emitter */ "./node_modules/event-emitter/index.js");
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(event_emitter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _home_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.html */ "./src/components/home.html");
/* harmony import */ var _home_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_home_html__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _instructions_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instructions.html */ "./src/components/instructions.html");
/* harmony import */ var _instructions_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_instructions_html__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _about_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./about.html */ "./src/components/about.html");
/* harmony import */ var _about_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_about_html__WEBPACK_IMPORTED_MODULE_4__);
//modules








function HomeView() {

	let app;

	//emitter
	event_emitter__WEBPACK_IMPORTED_MODULE_1___default()(this);
	
	this.homeData = {
		subtitle: '',
		buttons: {},
		languages: []
	};
	this.instructionData = {
		title: '',
		text: ''
	};
	this.aboutData = {
		title: '',
		text: '',
		sponsorTitle:''
	};

	this.init = (context) => {

		app = context;

		//data
		this.homeData = {
			subtitle: app.i18next.t('intro.subtitle'),
			buttons: {
				play: app.i18next.t('intro.buttons.play'),
				intructions: app.i18next.t('intro.buttons.intructions')
			},
			languages: [{
				name: 'English',
				iso: 'en'
			},
			{
				name: 'Português',
				iso: 'pt',
			},
			{
				name: 'Français',
				iso: 'fr',
			}
			]
		};

		this.instructionData = {
			title: app.i18next.t('instructions.title'),
			text: app.i18next.t('instructions.text')
		};

		this.aboutData = {
			title: app.i18next.t('about.title'),
			text: app.i18next.t('about.text'),
			youtubeid: app.i18next.t('about.youtubeid'),
			presentations: {
				title: app.i18next.t('about.presentations.title'),
				text: app.i18next.t('about.presentations.text'),
				presentations: {
					title: app.i18next.t('about.presentations.presentations.title'),
					list: app.i18next.store.data.en.translation.about.presentations.presentations.list
				},
				exhibitions: {
					title: app.i18next.t('about.presentations.exhibitions.title'),
					list: app.i18next.store.data.en.translation.about.presentations.exhibitions.list
				},
			},
			team: {
				title: app.i18next.t('about.team.title'),
				people: app.i18next.store.data.en.translation.about.team.people,
				support: app.i18next.t('about.team.support'),
			},
			sponsors: {
				title: app.i18next.t('about.sponsors.title'),
				list: app.i18next.store.data.en.translation.about.sponsors.list
			}
		};

		console.log(this.aboutData);
		console.log(app.i18next);
		

		//build page
		const homeHTML = _home_html__WEBPACK_IMPORTED_MODULE_2___default()(this.homeData);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(homeHTML).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view'));

		const instructionsHTML = _instructions_html__WEBPACK_IMPORTED_MODULE_3___default()(this.instructionData);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(instructionsHTML).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view'));

		const aboutHTML = _about_html__WEBPACK_IMPORTED_MODULE_4___default()(this.aboutData);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(aboutHTML).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view'));

		//translation
		translate();

		//button
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#go-play').click(this, play);

		emitToDashboard({
			view: 'waiting'
		});

	};

	const translate = () => {
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#intro').localize();

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#instructions').localize({
			joinArrays: ' '
		});
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#about').localize();

		app.i18next.on('languageChanged', () => {
			jquery__WEBPACK_IMPORTED_MODULE_0___default()('#intro').localize();
			jquery__WEBPACK_IMPORTED_MODULE_0___default()('#instructions').localize({
				joinArrays: ' '
			});
			jquery__WEBPACK_IMPORTED_MODULE_0___default()('#about').localize();
			udpateAboutVideo();
		});
	};

	const udpateAboutVideo = () => {
		this.aboutData.youtubeid = app.i18next.t('about.youtubeid');
		const aboutHTML = _about_html__WEBPACK_IMPORTED_MODULE_4___default()(this.aboutData);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#about').remove();
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(aboutHTML).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view'));

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#about').localize({
			joinArrays: ' '
		});
	};

	const play = () => {

		const duration = 1500;

		if(!app.artyom.initialized) app._initArtyom(); // initialize languate

		app.speak(app.i18next.t('intro.speak.play'));

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#intro').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, () => {
			this.emit('changeView', {
				source: 'home',
				target:'players' //'partners'
			});
		});

	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'waiting',
		message = ''
	}) => {	
		app.socket.emit(type, {view, message});
	};

}

/* harmony default export */ __webpack_exports__["default"] = (new HomeView());

/***/ }),

/***/ "./src/components/home.html":
/*!**********************************!*\
  !*** ./src/components/home.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"intro\" class=\"uk-container uk-container-small uk-position-center uk-text-center\">");t.b("\n" + i);t.b("    <div>");t.b("\n" + i);t.b("        <h1 class=\"uk-heading-primary\">Pict • io</h1>");t.b("\n" + i);t.b("        <h3 id=\"subtitle\" data-i18n=\"[html]intro.subtitle\" class=\"uk-h3 uk-margin-remove-top\">");t.b(t.t(t.f("subtitle",c,p,0)));t.b("</strong></h3>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"uk-margin-medium-top\">");t.b("\n" + i);t.b("        <button id=\"go-play\" data-i18n=\"intro.buttons.play\" class=\"uk-button uk-button-large uk-button-primary uk-border-rounded\">");t.b(t.v(t.d("buttons.play",c,p,0)));t.b("</button>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <!-- <div class=\"uk-margin-large-top\">");t.b("\n" + i);t.b("        <button id=\"-show-instructions\" data-i18n=\"intro.buttons.instructions\" uk-toggle=\"target: #instructions\" class=\"uk-button uk-button-text\">");t.b(t.v(t.d("buttons.instructions",c,p,0)));t.b("</button>");t.b("\n" + i);t.b("    </div> -->");t.b("\n" + i);t.b("    <div class=\"uk-margin-large-top\">");t.b("\n" + i);t.b("        <a data-i18n=\"intro.buttons.about\" class=\"uk-button uk-button-text\" href=\"#about\" uk-toggle>");t.b(t.v(t.d("buttons.about",c,p,0)));t.b("</a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <br/>");t.b("\n" + i);t.b("    <hr/>");t.b("\n" + i);t.b("    <nav class=\"uk-navbar\">");t.b("\n" + i);t.b("        <div class=\"uk-navbar-center\">");t.b("\n" + i);t.b("            <ul class=\"uk-navbar-nav\">");t.b("\n" + i);if(t.s(t.f("languages",c,p,1),c,p,0,1060,1173,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                <li><a href=\"#\" onclick=\"app.changeContexLanguage('");t.b(t.v(t.f("iso",c,p,0)));t.b("')\">");t.b(t.v(t.f("name",c,p,0)));t.b("</a></li>");t.b("\n" + i);});c.pop();}t.b("            </ul>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("    </nav>");t.b("\n" + i);t.b("</div>;");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"intro\" class=\"uk-container uk-container-small uk-position-center uk-text-center\">\n    <div>\n        <h1 class=\"uk-heading-primary\">Pict • io</h1>\n        <h3 id=\"subtitle\" data-i18n=\"[html]intro.subtitle\" class=\"uk-h3 uk-margin-remove-top\">{{{subtitle}}}</strong></h3>\n    </div>\n    <div class=\"uk-margin-medium-top\">\n        <button id=\"go-play\" data-i18n=\"intro.buttons.play\" class=\"uk-button uk-button-large uk-button-primary uk-border-rounded\">{{buttons.play}}</button>\n    </div>\n    <!-- <div class=\"uk-margin-large-top\">\n        <button id=\"-show-instructions\" data-i18n=\"intro.buttons.instructions\" uk-toggle=\"target: #instructions\" class=\"uk-button uk-button-text\">{{buttons.instructions}}</button>\n    </div> -->\n    <div class=\"uk-margin-large-top\">\n        <a data-i18n=\"intro.buttons.about\" class=\"uk-button uk-button-text\" href=\"#about\" uk-toggle>{{buttons.about}}</a>\n    </div>\n    <br/>\n    <hr/>\n    <nav class=\"uk-navbar\">\n        <div class=\"uk-navbar-center\">\n            <ul class=\"uk-navbar-nav\">\n                {{#languages}}\n                <li><a href=\"#\" onclick=\"app.changeContexLanguage('{{iso}}')\">{{name}}</a></li>\n                {{/languages}}\n            </ul>\n        </div>\n    </nav>\n</div>;", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/components/human-players-view.js":
/*!**********************************************!*\
  !*** ./src/components/human-players-view.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! event-emitter */ "./node_modules/event-emitter/index.js");
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(event_emitter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _human_players_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./human-players.html */ "./src/components/human-players.html");
/* harmony import */ var _human_players_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_human_players_html__WEBPACK_IMPORTED_MODULE_2__);
//modules






function PartnersView() {

	let app;

	//emitter
	event_emitter__WEBPACK_IMPORTED_MODULE_1___default()(this);

	app = undefined;
	this.pageData = {
		title: '',
		playersOptions: [],
		inverseColour: undefined,
		individualAccent: false
	};

	this.init = (context) => {

		app = context;

		//data
		this.pageData = {
			title: app.i18next.t('players.page.title'),
			playersOptions: [
				{
					name: app.i18next.t('players.playersOptions.onePlayer'),
					slug:'one',
					colour: 'background-yellow'
				},{
					name: app.i18next.t('players.playersOptions.twoPlayers'),
					slug:  'two',
					colour: 'uk-button-primary',
					extraIcon: true
				}
			],
			inverseColour: app.interface.inverseClass(),
			individualAccent: false
		};

		speak(this.pageData.title);

		//build page
		const playersHTML = _human_players_html__WEBPACK_IMPORTED_MODULE_2___default()(this.pageData);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(playersHTML).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view'));

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#home-button').click(() => {
			homeButton('home');
		});

		//buttons human players
		for (const option of this.pageData.playersOptions) {
			const bt = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`#${option.slug}`);

			bt.click(() =>{

				let target;
				if (option.slug == 'one') {
					app.gameState.currentChallenge = 'Blind Drawing with Left/Right Hand';
					app.gameState.players = 1;
					target = 'challenge';
					speak(app.i18next.t('players.speak.onePlayer'));
				} else {
					app.gameState.players = 2;
					target = 'challenges';
					speak(app.i18next.t('players.speak.twoPlayers'));
				}

				exitAnimation(target);
			});
		}

		//translate
		translate();

		//animation
		enterAnimation();

		//emit to socker IO
		emitToDashboard({
			message: app.i18next.t('players.dashboard.message'),
		});

	};

	const translate = () => {
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#human-players').localize();
	};

	const enterAnimation = () => {
		const duration = 1500;

		const container = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#human-players');
		container.css('opacity', 0);
		container.css('marginTop', 100);

		container.animate({
			marginTop: 0,
			opacity: 1,
		}, duration);
	};

	const homeButton = () => {
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#human-players').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			this.emit('changeView', {
				source: 'players',
				target:'home'
			});
		});

		emitToDashboard({
			view: 'waiting'
		});
	};

	const exitAnimation = (target) => {
		const duration = 1500;

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#human-players').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, () => {
			this.emit('changeView', {
				source: 'players',
				target:target
			});
		});
	};

	//speack
	const speak = (msg) => {
		app.speak(msg);
	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'players',
		room = app.socket.id,
		colour = '',
		message = ''
	}) => {
		app.socket.emit(type, { view, room, colour, message});
	};

}

/* harmony default export */ __webpack_exports__["default"] = (new PartnersView());

/***/ }),

/***/ "./src/components/human-players.html":
/*!*******************************************!*\
  !*** ./src/components/human-players.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"human-players\" class=\"uk-container uk-container-small uk-position-center uk-text-center\">");t.b("\n" + i);t.b("    <h1 id=\"title\" class=\"uk-h1 ");t.b(t.v(t.f("inverseColour",c,p,0)));t.b("\" data-i18n=\"players.page.title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</h1>");t.b("\n" + i);t.b("    <div class=\"uk-margin-medium-top\" uk-grid>");t.b("\n" + i);if(t.s(t.f("playersOptions",c,p,1),c,p,0,274,724,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <div class=\"uk-width-1-2\">");t.b("\n" + i);t.b("                <button id=\"");t.b(t.v(t.f("slug",c,p,0)));t.b("\" class=\"uk-button uk-button-large uk-border-rounded ");t.b(t.v(t.f("colour",c,p,0)));t.b(" uk-margin-small-right uk-margin-small-bottom uk-padding-small uk-width-1-1\">");t.b("\n" + i);t.b("                    <span uk-icon=\"icon: user; ratio: 1.5\"></span>");t.b("\n" + i);t.b("                    ");if(t.s(t.f("extraIcon",c,p,1),c,p,0,588,634,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span uk-icon=\"icon: user; ratio: 1.5\"></span>");});c.pop();}t.b("\n" + i);t.b("                </button>");t.b("\n" + i);t.b("                 ");t.b(t.v(t.f("name",c,p,0)));t.b("\n" + i);t.b("        </div>");t.b("\n" + i);});c.pop();}t.b("    </div>  ");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<button id=\"home-button\" class=\"uk-button uk-button-large uk-border-rounded uk-padding-remove\">");t.b("\n" + i);t.b("    <span uk-icon=\"icon: home; ratio: 1.5\" class=\"uk-margin-small-right\"></span>Home");t.b("\n" + i);t.b("</button>");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"human-players\" class=\"uk-container uk-container-small uk-position-center uk-text-center\">\n    <h1 id=\"title\" class=\"uk-h1 {{inverseColour}}\" data-i18n=\"players.page.title\">{{title}}</h1>\n    <div class=\"uk-margin-medium-top\" uk-grid>\n            {{#playersOptions}}\n        <div class=\"uk-width-1-2\">\n                <button id=\"{{slug}}\" class=\"uk-button uk-button-large uk-border-rounded {{colour}} uk-margin-small-right uk-margin-small-bottom uk-padding-small uk-width-1-1\">\n                    <span uk-icon=\"icon: user; ratio: 1.5\"></span>\n                    {{#extraIcon}}<span uk-icon=\"icon: user; ratio: 1.5\"></span>{{/extraIcon}}\n                </button>\n                 {{name}}\n        </div>\n        {{/playersOptions}}\n    </div>  \n</div>\n\n<button id=\"home-button\" class=\"uk-button uk-button-large uk-border-rounded uk-padding-remove\">\n    <span uk-icon=\"icon: home; ratio: 1.5\" class=\"uk-margin-small-right\"></span>Home\n</button>", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/components/instructions.html":
/*!******************************************!*\
  !*** ./src/components/instructions.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"instructions\" uk-offcanvas=\"mode: push; overlay: true\">");t.b("\n" + i);t.b("    <div class=\"uk-offcanvas-bar\">");t.b("\n" + i);t.b("        <button class=\"uk-offcanvas-close\" type=\"button\" uk-close></button>");t.b("\n" + i);t.b("        <div class=\"uk-text-small\">");t.b("\n" + i);t.b("            <h3 class='uk-h3' data-i18n=\"[html]instructions.title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</h3>");t.b("\n" + i);t.b("            <div data-i18n=\"[html]instructions.text\">");t.b("\n" + i);t.b("                ");t.b(t.t(t.f("text",c,p,0)));t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"instructions\" uk-offcanvas=\"mode: push; overlay: true\">\n    <div class=\"uk-offcanvas-bar\">\n        <button class=\"uk-offcanvas-close\" type=\"button\" uk-close></button>\n        <div class=\"uk-text-small\">\n            <h3 class='uk-h3' data-i18n=\"[html]instructions.title\">{{title}}</h3>\n            <div data-i18n=\"[html]instructions.text\">\n                {{{text}}}\n            </div>\n        </div>\n    </div>\n</div>", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/components/interface-view.js":
/*!******************************************!*\
  !*** ./src/components/interface-view.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return interfaceView; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _home_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home-view */ "./src/components/home-view.js");
/* harmony import */ var _partners_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./partners-view */ "./src/components/partners-view.js");
/* harmony import */ var _human_players_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./human-players-view */ "./src/components/human-players-view.js");
/* harmony import */ var _challenges_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./challenges-view */ "./src/components/challenges-view.js");
/* harmony import */ var _challenge_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./challenge-view */ "./src/components/challenge-view.js");
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game-view */ "./src/components/game-view.js");
/* harmony import */ var _postgame_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./postgame-view */ "./src/components/postgame-view.js");
//modules


__webpack_require__(/*! webpack-jquery-ui/effects */ "./node_modules/webpack-jquery-ui/effects.js");










function interfaceView(context) {

	const app = context;

	this.currentViewName = 'home';
	this.currentView = '';

	this.inverseClassToggle = false;
	this.classColor = '';	//Class colour (can be the same as playercolour) -> change the interface color
	this.classBlend = '';  // blend


	this.init = () => {
		this.currentViewName = {target:'home'};
		this.changeView(this.currentViewName);
	};

	this.changeView = (event) => {

		//clean view
		const view = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view');
		view.empty();

		this.currentViewName = event.target;

		if(event.target == 'home') {
			app.resetGameState();
			this.currentView = _home_view__WEBPACK_IMPORTED_MODULE_1__["default"];
		} else if(event.target == 'partners') {
			this.currentView = _partners_view__WEBPACK_IMPORTED_MODULE_2__["default"];
		} else if(event.target == 'players') {
			this.currentView = _human_players_view__WEBPACK_IMPORTED_MODULE_3__["default"];
		} else if(event.target == 'challenges') {
			this.currentView = _challenges_view__WEBPACK_IMPORTED_MODULE_4__["default"];
		} else if(event.target == 'challenge') {
			app.resetGameSuccess();
			this.currentView = _challenge_view__WEBPACK_IMPORTED_MODULE_5__["default"];
		} else if(event.target == 'game') {
			this.currentView = _game_view__WEBPACK_IMPORTED_MODULE_6__["default"];
		} else if(event.target == 'post-game') {
			this.currentView = _postgame_view__WEBPACK_IMPORTED_MODULE_7__["default"];
		}

		this.currentView.init(app);
		this.currentView.once('changeView', view => this.changeView(view));

	};

	this.inverseClass = () => {
		return this.inverseClassToggle ? 'uk-light' : 'uk-dark';
	};

	this.changeColour = (colour) => {

		const duration = 1000;

		let prevColorClass = this.classColor;
		let prevBlendClass = this.classBlend;
	
		let colorClass;
		let blendClass;
	
		if(colour == 'light') {
			this.inverseClassToggle = false;
			colorClass = 'uk-background-default';
			blendClass = 'uk-background-blend-multiply';
		} else if(colour == 'blue') {
			this.inverseClassToggle = true;
			colorClass = 'uk-background-primary';
			blendClass = 'uk-background-blend-multiply';
		} else if(colour == 'dark') {
			this.inverseClassToggle = true;
			colorClass = 'uk-background-secondary';
			blendClass = 'uk-background-blend-color-burn';
		} else if(colour == 'yellow') {
			this.inverseClassToggle = false;
			colorClass = 'background-yellow';
			blendClass = 'uk-background-blend-multiply';
		}
	
		// this.classElement = elementClass;
		this.classColor = colorClass;
		this.classBlend = blendClass;
	
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view').switchClass( prevColorClass, colorClass, duration, 'easeInOutQuad');
		if (prevBlendClass != this.classBlend) jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view').switchClass( prevBlendClass, this.classBlend, duration, 'easeInOutQuad');
	};

}

/***/ }),

/***/ "./src/components/magentaAI.js":
/*!*************************************!*\
  !*** ./src/components/magentaAI.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return magentaAI; });
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! event-emitter */ "./node_modules/event-emitter/index.js");
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(event_emitter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var random_weighted_choice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! random-weighted-choice */ "./node_modules/random-weighted-choice/lib/random-weighted-choice.js");
/* harmony import */ var random_weighted_choice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(random_weighted_choice__WEBPACK_IMPORTED_MODULE_1__);
//modules




function magentaAI() {

	let app;

	//emiter
	event_emitter__WEBPACK_IMPORTED_MODULE_0___default()(this);

	// Initialize Variables

	this.scores = [];
	this.timerGoogle = 0;
	this.lastTimestamp = 0;
	this.lastTimestamp_check = 0;

	this.currentCategory = '';

	this.QUICK_DRAW_API = 'https://inputtools.google.com/request?ime=handwriting&app=quickdraw&dbg=1&cs=1&oe=UTF-8'; // Set Base URL for Quickdraw Google AI API
	

	//--- Initialize...

	this.init = (context) => {
		app = context;
		this.currentCategory  = app.gameState.currentCategory;
	};

	this.read = (eventTimeStamp,ink) => {
		//delay
		if (eventTimeStamp - this.lastTimestamp_check > 1000) {
			checkQuickDraw(ink);
			this.lastTimestamp_check = eventTimeStamp;
		}
	};

	//--- Check Quickdraw Google AI API
	const checkQuickDraw = (ink) => {

		// Get Paper Canvas Weight/Height
		let c_dims = getCanvasDimensions();

		// Set HTTP Headers
		let headers = {
			'Accept': '*/*',
			'Content-Type': 'application/json'
		};

		// Init HTTP Request
		let xhr = new XMLHttpRequest();
		xhr.open('POST', this.QUICK_DRAW_API);
		Object.keys(headers).forEach( (key) => {
			xhr.setRequestHeader(key, headers[key]);
		});

		// HTTP Request On Load
		xhr.onload = () => {
			if (xhr.status === 200) {
				let res = xhr.responseText; // HTTP Response Text
				parseResponse(res); // Parse Response
			} else if (xhr.status !== 200) {
				console.log('Request failed.  Returned status of ' + xhr.status);
			}
		};

		// Create New Data Payload for Quickdraw Google AI API
		let data = {
			'input_type': 0,
			'requests': [{
				'language': 'quickdraw',
				'writing_guide': {
					'width': c_dims.width,
					'height': c_dims.height
				},
				'ink': [ink]
			}]
		};

		// Convert Data Payload to JSON String
		let request_data = JSON.stringify(data);

		// Send HTTP Request w/ Data Payload
		xhr.send(request_data);

	};

	//--- Get Paper Canvas Dimensions Width/Height
	const getCanvasDimensions = () => {
		let w = document.getElementById('canvas').offsetWidth;
		let h = document.getElementById('canvas').offsetHeight;
		return {
			height: h,
			width: w
		};
	};

	// Parse Quickdraw Google AI API Response
	const parseResponse = (res) => {

		// Convert Response String to JSON
		let res_j = JSON.parse(res);

		// Extract Guess Score String from Response and Convert to JSON
		this.scores = JSON.parse(res_j[1][0][3].debug_info.match(/SCORESINKS: (.+) Combiner:/)[1]);

		// let activeScore = scores;
		let activeScore = filterGuess(this.scores);

		let attempt = activeScore[0][0];

		//----TEST AND GET BACK TO THE INTERFACE
		if (this.currentCategory != attempt) {
			drawIsWrong(attempt);
		} else {
			drawIsRight(attempt);
		}

	};

	///add atemot to a list
	const addToGuessAttemps = (newAttempt) => {

		let repeated = false;

		for(let attempt of app.gameState.attempts) {
			if (attempt == newAttempt) {
				repeated = true;
			}
		}

		if (repeated == false) {
			app.gameState.attempts.push(newAttempt);
		}

	};

	//--- filter guesses
	const filterGuess = (scores) => {

		let currentGuesses = this.scores.slice();

		//if it is the first guess
		if (app.gameState.attempts.length == 0) {
			return scores;
		}

		for (let i = 0; i < app.gameState.attempts.length; i++) {
			for (let j = 0; j < currentGuesses.length; j++) {
				if (app.gameState.attempts[i] == currentGuesses[j][0]) {
					currentGuesses.splice(j, 1);
				}
			}
		}

		if (currentGuesses.length == 0) {
			currentGuesses = scores.slice();
		}

		return currentGuesses;

	};

	
	////-- if  draw is wrong
	const drawIsWrong = (attempt) => {

		let verbal = '';
		let speech = '';

		//check if the word Quickdraw is guessing is in our database - If not, just throw an interjection. This word should be added to the dataset later.
		let attemptExist = app.mechanics.catChallenges.find( (c) => {
			return attempt.toLowerCase() == c.Category.toLowerCase();
		});

		//slug - because JSON notation doesn't work well with spaces
		let attemptSlug = attempt.replace(/\s/g, '-').toLowerCase();


		//translate word
		let translatedAttempt = app.i18next.t(
			`categories.${attemptSlug}`,
			{lng:app.getLanguageCode(app.language)}
		);

		//Throw interjection. Chance: [20%?] Or if the word is unknown
		if (Math.random() < app.mechanics.interjection.chance || attemptExist == undefined) {
			
			if (!attemptExist) {
				console.log('ADD THIS: ' + attempt);
				translatedAttempt = '';
			}

			//pick a interjection
			const choosenItemID = random_weighted_choice__WEBPACK_IMPORTED_MODULE_1___default()(app.mechanics.interjection.phrases);

			//phrase
			// const interjection = app.mechanics.interjection.phrases[choosenItemID].phrase;
			
			//Phrease translation
			let translatedInterjection = app.i18next.t(
				`interjection.${choosenItemID}`,
				{lng:app.getLanguageCode(app.language)}
			);

			//wild card *  ||  replace * for the attempt word
			const regex = /\*/;
			translatedInterjection = translatedInterjection.replace(regex,translatedAttempt);
			
			//define
			speech = translatedInterjection;
			verbal = translatedInterjection;

		} else {

			addToGuessAttemps(attempt);

			verbal = translatedAttempt;

			if (app.gameState.firstSpeak == true) {
				app.gameState.firstSpeak = false;
				verbal = speech = 'Hummm....';
			} else {
				speech = verbal;
			}
		}

		//update page
		this.emit('guess', verbal);

		//speak
		app.speak(speech,app.language);

		app.socket.emit('guess', {
			view: 'game',
			room: app.socket.id,
			attempt: verbal,
		});

	};

	////-- if  draw is right
	const drawIsRight = (attempt) => {

		const _this = this;

		this.emit('stop');

		addToGuessAttemps(attempt);
		app.gameState.success = true; 

		let verbal = '';
		let speech = '';

		//slug - because JSON notation doesn't work well with spaces
		let attemptSlug = attempt.replace(/\s/g, '-').toLowerCase();

		//translate word
		let translatedAttempt = app.i18next.t(
			`categories.${attemptSlug}`,
			{lng:app.getLanguageCode(app.language)}
		);

		//translate "i know" phrase"
		let iknow = app.i18next.t(
			'game.phrases.i-know',
			{lng:app.getLanguageCode(app.language)}
		);

		verbal = speech = `${iknow} ${translatedAttempt}.`;

		//update page
		this.emit('guess', verbal);

		app.speak(speech,app.language);

		//wait 3 second before change view
		const duration = 3000;
		setTimeout( () => {
			_this.emit('win');
		}, duration);

	};

}

/***/ }),

/***/ "./src/components/partners-view.js":
/*!*****************************************!*\
  !*** ./src/components/partners-view.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! event-emitter */ "./node_modules/event-emitter/index.js");
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(event_emitter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _partners_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./partners.html */ "./src/components/partners.html");
/* harmony import */ var _partners_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_partners_html__WEBPACK_IMPORTED_MODULE_2__);
//modules






function PartnersView() {

	let app;

	//emitter
	event_emitter__WEBPACK_IMPORTED_MODULE_1___default()(this);

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
		const partnerHTML = _partners_html__WEBPACK_IMPORTED_MODULE_2___default()(this.pageData);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(partnerHTML).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view'));
		
		//buttons - personas
		for (let persona of app.personas) {
			const bt = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`#${persona.slug}`);
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
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#done').click(this, done);

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
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#partner-choice').localize();
	};

	const personaClick = (e) => {
		const bt = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
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
			jquery__WEBPACK_IMPORTED_MODULE_0___default()('#title').addClass('uk-light', {
				duration: duration
			});
		} else {
			jquery__WEBPACK_IMPORTED_MODULE_0___default()('#title').removeClass('uk-light', {
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

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#partner-choice').css('opacity', 0);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#partner-choice').css('marginTop', 100);

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#partner-choice').animate({
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

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#partner-choice').animate({
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

/* harmony default export */ __webpack_exports__["default"] = (new PartnersView());

/***/ }),

/***/ "./src/components/partners.html":
/*!**************************************!*\
  !*** ./src/components/partners.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"partner-choice\" class=\"uk-container uk-container-small uk-position-center uk-text-center\">");t.b("\n" + i);t.b("    <h1 id=\"title\" class=\"uk-h1 ");t.b(t.v(t.f("inverseColour",c,p,0)));t.b("\" data-i18n=\"personas.page.title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</h1>");t.b("\n" + i);t.b("    <div id=\"field\" class=\"uk-margin-medium-top\">");t.b("\n" + i);if(t.s(t.f("personas",c,p,1),c,p,0,273,566,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <button id=\"");t.b(t.v(t.f("slug",c,p,0)));t.b("\" class=\"uk-button uk-button-large uk-border-pill uk-margin-small-right\">");t.b("\n" + i);t.b("                <span uk-icon=\"icon: nut; ratio: 1.5\"></span>");t.b("\n" + i);if(t.s(t.f("showName",c,p,1),c,p,0,471,518,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                <br/>");t.b(t.v(t.f("name",c,p,0)));t.b("\n" + i);});c.pop();}t.b("            </button>");t.b("\n" + i);});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("    <button id=\"done\" class=\"uk-button uk-button-large uk-button-default uk-background-default uk-border-rounded uk-margin-xlarge-top\" data-i18n=\"personas.page.done\">");t.b(t.v(t.f("done",c,p,0)));t.b("</button>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"partner-choice\" class=\"uk-container uk-container-small uk-position-center uk-text-center\">\n    <h1 id=\"title\" class=\"uk-h1 {{inverseColour}}\" data-i18n=\"personas.page.title\">{{title}}</h1>\n    <div id=\"field\" class=\"uk-margin-medium-top\">\n            {{#personas}}\n            <button id=\"{{slug}}\" class=\"uk-button uk-button-large uk-border-pill uk-margin-small-right\">\n                <span uk-icon=\"icon: nut; ratio: 1.5\"></span>\n                {{#showName}}\n                <br/>{{name}}\n                {{/showName}}\n            </button>\n            {{/personas}}\n    </div>\n    <button id=\"done\" class=\"uk-button uk-button-large uk-button-default uk-background-default uk-border-rounded uk-margin-xlarge-top\" data-i18n=\"personas.page.done\">{{done}}</button>\n</div>", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/components/postgame-view.js":
/*!*****************************************!*\
  !*** ./src/components/postgame-view.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! event-emitter */ "./node_modules/event-emitter/index.js");
/* harmony import */ var event_emitter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(event_emitter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _postgame_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./postgame.html */ "./src/components/postgame.html");
/* harmony import */ var _postgame_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_postgame_html__WEBPACK_IMPORTED_MODULE_2__);
//modules






function PostGameView() {

	let app;

	//emitter
	event_emitter__WEBPACK_IMPORTED_MODULE_1___default()(this);

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

	this.init = (context) => {

		app = context;

		//collect and transform information
		const status = app.gameState.success ? 'success' : 'wrong';
		const category = app.gameState.currentCategory;

		//slug - because JSON notation doesn't work well with spaces
		let categorySlug = category.replace(/\s/g, '-').toLowerCase();

		//page data
		this.pageData = {
			inverseColour: app.interface.inverseClass(),
			success: app.gameState.success,
			status: app.i18next.t(`postgame.${status}`),
			supposedPhrase: app.i18next.t('postgame.supposed'),
			itis: app.i18next.t('postgame.it-is'),
			category: app.i18next.t(`categories.${categorySlug}`),
			back: app.i18next.t('postgame.back'),
			bestGuessPhrase: app.i18next.t('postgame.best-guesses')
		};

		//build page
		const postgameHTML = _postgame_html__WEBPACK_IMPORTED_MODULE_2___default()(this.pageData);
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(postgameHTML).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view'));

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#home-button').click(() => {
			homeButton('home');
		});

		// get limited list of best guess
		const list = app.getBestGuesses();
		const guessList = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view').find('.tags'); //DOM

		for (let guess of list) {
			const slug = guess.replace(/\s/g, '-').toLowerCase();
			const translation = app.i18next.t(`categories.${slug}`);
			guessList.append(`<span class="uk-label uk-label-primary" data-i18n="categories.${slug}">${translation}</span>\n`);	
		}

		//translate
		translate();

		//speak
		speak();

		//action
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#back').click(this, back);

		emitToCard({
			action: 'postGame',
			time: -1,
			guess: this.pageData.status
		});

		//emit to socker IO
		emitToDashboard({
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

	const translate = () => {
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('postgame').localize();
	};

	const homeButton = () => {

		emitToCard({
			action: 'wait',
		});

		emitToDashboard({
			view: 'waiting'
		});

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#postgame').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			this.emit('changeView', {
				source: 'post-game',
				target:'home'
			});
		});
	};

	const back = () => {
		const duration = 1500;

		emitToCard({
			action: 'wait',
		});

		emitToDashboard({
			view: 'waiting'
		});

		jquery__WEBPACK_IMPORTED_MODULE_0___default()('#postgame').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, () => {
			this.emit('changeView', {
				source: 'post-game',
				target:'players'
			});
		});

	};

	const speak = () => {
		//speak
		let speech = '';
		if (app.gameState.success) {
			speech = `${this.pageData.status}. ${this.pageData.itis} ${this.pageData.category}.`;
		} else {
			speech = `${this.pageData.status}. ${this.pageData.supposedPhrase} ${this.pageData.category}.`;
		}

		app.speak(speech, app.language);
	};

	const emitToCard = ({
		type = 'card',
		view = 'challenge',
		action = 'postGame',
		room = app.socket.id,
		name = '',
		short = '',
		draw = '',
		drawCategory = '',
		time = 0,
		guess = ''
	}) => {
		app.socket.emit(type, {view, action, room, name, short, draw, drawCategory, time, guess});
	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'post-game',
		room = app.socket.id,
		inverseColour = '',
		success = false,
		status = '',
		supposedPhrase = '',
		itis = '',
		category = '',
		bestGuessPhrase = '',
		bestGuesses = ''
	}) => {
		app.socket.emit(type, {view, room, inverseColour, success, status, supposedPhrase, itis, category, bestGuessPhrase, bestGuesses});
	};

}

/* harmony default export */ __webpack_exports__["default"] = (new PostGameView());

/***/ }),

/***/ "./src/components/postgame.html":
/*!**************************************!*\
  !*** ./src/components/postgame.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"postgame\" class=\"uk-container uk-container-medium uk-position-center uk-text-center\">");t.b("\n" + i);t.b("    <div class=\"");t.b(t.v(t.f("inverseColour",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <h1 class=\"uk-heading-primary\" data-i18n=\"postgmame.status.");t.b(t.v(t.f("success",c,p,0)));t.b("\">");t.b(t.v(t.f("status",c,p,0)));t.b("</h1>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"uk-margin-medium-top\" uk-grid>");t.b("\n");t.b("\n" + i);t.b("        <div class=\"uk-width-expand\"></div>");t.b("\n" + i);t.b("            <div class=\"uk-card uk-card-default uk-width-2-3 uk-margin-small-left uk-padding-remove-left uk-box-shadow-large uk-border-rounded\">");t.b("\n" + i);if(!t.s(t.f("success",c,p,1),c,p,1,0,0,"")){t.b("            <div class=\"uk-card-header\">");t.b("\n" + i);t.b("                <h4 class=\"uk-h4 uk-margin-remove-bottom\" data-i18n=\"postgmame.supposedPhrase\">");t.b(t.v(t.f("supposedPhrase",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);};t.b("            <div id=\"category\" class=\"uk-card-body uk-background-primary uk-box-shadow-large uk-light\">");t.b("\n" + i);t.b("                <h2 class=\"uk-h2\" data-i18n=\"categories.");t.b(t.v(t.f("category",c,p,0)));t.b("\">");t.b(t.v(t.f("category",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("            </div>");t.b("\n");t.b("\n" + i);t.b("            <div class=\"uk-card-footer uk-box-shadow-large\">");t.b("\n" + i);t.b("                <button id=\"back\" class=\"uk-button uk-button-text\"><span uk-icon=\"chevron-left\" class=\"uk-margin-small-right\" data-i18n=\"postgmame.back\"></span>");t.b(t.v(t.f("back",c,p,0)));t.b("</button>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("        </div>");t.b("\n");t.b("\n" + i);t.b("        <div class=\"uk-width-expand\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"uk-margin-large-top ");t.b(t.v(t.f("inverseColour",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <div uk-grid>");t.b("\n" + i);t.b("            <div class=\"uk-width-expand\"></div>");t.b("\n" + i);t.b("            <div class=\"uk-width-2-3\">");t.b("\n" + i);t.b("                <h3 class=\"uk-h3\">");t.b(t.v(t.f("bestGuessPhrase",c,p,0)));t.b("</h3>");t.b("\n" + i);t.b("                <div class=\"tags\"></div>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("            <div class=\"uk-width-expand\"></div>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<button id=\"home-button\" class=\"uk-button uk-button-large uk-border-rounded uk-padding-remove\">");t.b("\n" + i);t.b("    <span uk-icon=\"icon: home; ratio: 1.5\" class=\"uk-margin-small-right\"></span>Home");t.b("\n" + i);t.b("</button>");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"postgame\" class=\"uk-container uk-container-medium uk-position-center uk-text-center\">\n    <div class=\"{{inverseColour}}\">\n        <h1 class=\"uk-heading-primary\" data-i18n=\"postgmame.status.{{success}}\">{{status}}</h1>\n    </div>\n\n    <div class=\"uk-margin-medium-top\" uk-grid>\n\n        <div class=\"uk-width-expand\"></div>\n            <div class=\"uk-card uk-card-default uk-width-2-3 uk-margin-small-left uk-padding-remove-left uk-box-shadow-large uk-border-rounded\">\n            {{^success}}\n            <div class=\"uk-card-header\">\n                <h4 class=\"uk-h4 uk-margin-remove-bottom\" data-i18n=\"postgmame.supposedPhrase\">{{supposedPhrase}}</h4>\n            </div>\n            {{/success}}\n            <div id=\"category\" class=\"uk-card-body uk-background-primary uk-box-shadow-large uk-light\">\n                <h2 class=\"uk-h2\" data-i18n=\"categories.{{category}}\">{{category}}</h2>\n            </div>\n\n            <div class=\"uk-card-footer uk-box-shadow-large\">\n                <button id=\"back\" class=\"uk-button uk-button-text\"><span uk-icon=\"chevron-left\" class=\"uk-margin-small-right\" data-i18n=\"postgmame.back\"></span>{{back}}</button>\n            </div>\n        </div>\n\n        <div class=\"uk-width-expand\"></div>\n    </div>\n\n    <div class=\"uk-margin-large-top {{inverseColour}}\">\n        <div uk-grid>\n            <div class=\"uk-width-expand\"></div>\n            <div class=\"uk-width-2-3\">\n                <h3 class=\"uk-h3\">{{bestGuessPhrase}}</h3>\n                <div class=\"tags\"></div>\n            </div>\n            <div class=\"uk-width-expand\"></div>\n        </div>\n    </div>\n\n</div>\n\n<button id=\"home-button\" class=\"uk-button uk-button-large uk-border-rounded uk-padding-remove\">\n    <span uk-icon=\"icon: home; ratio: 1.5\" class=\"uk-margin-small-right\"></span>Home\n</button>", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/data/game-mechanics.json":
/*!**************************************!*\
  !*** ./src/data/game-mechanics.json ***!
  \**************************************/
/*! exports provided: options, personas, challenges, interjection, catChallenges, default */
/***/ (function(module) {

module.exports = {"options":{"mute":false,"language":{"name":"American English","code":"en"}},"personas":[{"name":"Nancy Fraser","slug":"nancy_fraser","language":"American English","languageCode":"en","colour":"light"},{"name":"Marcia Tiburi","slug":"marcia_tiburi","language":"Português Brasil","languageCode":"pt","colour":"blue"},{"name":"Voltaire","slug":"voltaire","language":"Français","languageCode":"fr","colour":"yellow"}],"challenges":[{"name":"Drawing on the Wall","code":"A","short":"wall","players":2,"time":30,"description":"In this challenge, the two human players work together to produce one sketch representing the word given by the tablet. The player who saw the word must draw on a wall, using just their fingers, without leaving any visible mark. The second human acts as a proxy, following the trajectory of the finger and trying to reproduce it on the screen of the tablet. The AI program has one minute to guess what is being drawn."},{"name":"Blind Drawing with Left/Right Hand","code":"B","short":"blind","players":1,"time":45,"description":"This is an individual challenge, where the drawer sketch representations for the word selected without looking at the screen and using her/his non-dominant hand. While the human player draws, the machine will attempt to guess what is being drawn."},{"name":"Verbal Description","code":"C","short":"verbal","players":2,"time":60,"description":"In this challenge, the two human players work together to produce one sketch representing the word selected. The player who saw the word must verbally describe it, using only geometrical figures and spatial orientation. The second human acts as a proxy, following the instructions and trying to reproduce it on the screen of the tablets. The AI program has one minute to guess what is being drawn."}],"interjection":{"chance":0.2,"phrases":[{"id":0,"weight":1},{"id":1,"weight":1},{"id":2,"weight":1},{"id":3,"weight":1},{"id":4,"weight":1},{"id":5,"weight":1},{"id":6,"weight":1},{"id":7,"weight":1},{"id":8,"weight":1},{"id":9,"weight":1},{"id":10,"weight":1},{"id":11,"weight":1},{"id":12,"weight":1},{"id":13,"weight":1},{"id":14,"weight":1},{"id":15,"weight":1},{"id":16,"weight":1},{"id":17,"weight":1},{"id":18,"weight":1},{"id":19,"weight":1},{"id":20,"weight":1},{"id":21,"weight":1},{"id":22,"weight":1},{"id":23,"weight":1},{"id":24,"weight":1}]},"catChallenges":[{"Category":"aircraft carrier","Challenge":"B"},{"Category":"airplane","Challenge":"B"},{"Category":"alarm clock","Challenge":"B"},{"Category":"ambulance","Challenge":"B"},{"Category":"angel","Challenge":"B"},{"Category":"animal migration","Challenge":"B"},{"Category":"ant","Challenge":"A,C"},{"Category":"anvil","Challenge":"B"},{"Category":"apple","Challenge":"A"},{"Category":"arm","Challenge":"A,B"},{"Category":"asparagus","Challenge":"A,B"},{"Category":"axe","Challenge":"A,C"},{"Category":"backpack","Challenge":"B"},{"Category":"banana","Challenge":"A"},{"Category":"bandage","Challenge":"B"},{"Category":"barn","Challenge":"B"},{"Category":"baseball","Challenge":""},{"Category":"baseball bat","Challenge":"A"},{"Category":"basket","Challenge":"B"},{"Category":"basketball","Challenge":""},{"Category":"bat","Challenge":"B"},{"Category":"bathtub","Challenge":"A"},{"Category":"beach","Challenge":"B"},{"Category":"bear","Challenge":"B"},{"Category":"beard","Challenge":"A"},{"Category":"bed","Challenge":"A,C"},{"Category":"bee","Challenge":"B"},{"Category":"belt","Challenge":"B"},{"Category":"bench","Challenge":"A,B,C"},{"Category":"bicycle","Challenge":"B,C"},{"Category":"binoculars","Challenge":"C"},{"Category":"bird","Challenge":"B"},{"Category":"birthday cake","Challenge":"C"},{"Category":"blackberry","Challenge":"A,C"},{"Category":"blueberry","Challenge":"A,C"},{"Category":"book","Challenge":"A,C"},{"Category":"boomerang","Challenge":"A,C"},{"Category":"bottlecap","Challenge":"C"},{"Category":"bowtie","Challenge":"A,C"},{"Category":"bracelet","Challenge":"B,C"},{"Category":"brain","Challenge":"A"},{"Category":"bread","Challenge":"A"},{"Category":"bridge","Challenge":"A,C"},{"Category":"broccoli","Challenge":"B"},{"Category":"broom","Challenge":"A,C"},{"Category":"bucket","Challenge":"C"},{"Category":"bulldozer","Challenge":"B"},{"Category":"bus","Challenge":"C"},{"Category":"bush","Challenge":"A"},{"Category":"butterfly","Challenge":"A"},{"Category":"cactus","Challenge":"A,C"},{"Category":"cake","Challenge":"A,C"},{"Category":"calculator","Challenge":"A,C"},{"Category":"calendar","Challenge":"A,C"},{"Category":"camel","Challenge":"B"},{"Category":"camera","Challenge":"C"},{"Category":"camouflage","Challenge":"A"},{"Category":"campfire","Challenge":"A"},{"Category":"candle","Challenge":"A,C"},{"Category":"cannon","Challenge":"A,B,C"},{"Category":"canoe","Challenge":"A"},{"Category":"car","Challenge":"A,C"},{"Category":"carrot","Challenge":"A,C"},{"Category":"castle","Challenge":"A,C"},{"Category":"cat","Challenge":"B"},{"Category":"ceiling fan","Challenge":"B"},{"Category":"cello","Challenge":"B"},{"Category":"cell phone","Challenge":"A,C"},{"Category":"chair","Challenge":"A,C"},{"Category":"chandelier","Challenge":"B"},{"Category":"church","Challenge":"A"},{"Category":"circle","Challenge":""},{"Category":"clarinet","Challenge":"B"},{"Category":"clock","Challenge":"A,C"},{"Category":"cloud","Challenge":"A"},{"Category":"coffee cup","Challenge":"A"},{"Category":"compass","Challenge":"A,C"},{"Category":"computer","Challenge":"C"},{"Category":"cookie","Challenge":"A,C"},{"Category":"cooler","Challenge":"B,C"},{"Category":"couch","Challenge":"B"},{"Category":"cow","Challenge":"B"},{"Category":"crab","Challenge":"B"},{"Category":"crayon","Challenge":"A,C"},{"Category":"crocodile","Challenge":"A,B"},{"Category":"crown","Challenge":"A,C"},{"Category":"cruise ship","Challenge":"B"},{"Category":"cup","Challenge":"A,C"},{"Category":"diamond","Challenge":"A,C"},{"Category":"dishwasher","Challenge":"A,C"},{"Category":"diving board","Challenge":"B"},{"Category":"dog","Challenge":"B"},{"Category":"dolphin","Challenge":"B"},{"Category":"donut","Challenge":"A,C"},{"Category":"door","Challenge":"A,C"},{"Category":"dragon","Challenge":"B"},{"Category":"dresser","Challenge":"B,C"},{"Category":"drill","Challenge":"C"},{"Category":"drums","Challenge":"C"},{"Category":"duck","Challenge":"B"},{"Category":"dumbbell","Challenge":"A,C"},{"Category":"ear","Challenge":"B"},{"Category":"elbow","Challenge":"B"},{"Category":"elephant","Challenge":"B"},{"Category":"envelope","Challenge":"A,C"},{"Category":"eraser","Challenge":"A"},{"Category":"eye","Challenge":"A"},{"Category":"eyeglasses","Challenge":"A,C"},{"Category":"face","Challenge":"A,C"},{"Category":"fan","Challenge":"A,B,C"},{"Category":"feather","Challenge":"A"},{"Category":"fence","Challenge":"A,C"},{"Category":"finger","Challenge":"A"},{"Category":"fire hydrant","Challenge":"A,C"},{"Category":"fireplace","Challenge":"A"},{"Category":"firetruck","Challenge":"B"},{"Category":"fish","Challenge":"A,B"},{"Category":"flamingo","Challenge":"B"},{"Category":"flashlight","Challenge":"B,C"},{"Category":"flip flops","Challenge":"B"},{"Category":"floor lamp","Challenge":"A,C"},{"Category":"flower","Challenge":"A,C"},{"Category":"flying saucer","Challenge":"A,C"},{"Category":"foot","Challenge":"A,B"},{"Category":"fork","Challenge":"A,C"},{"Category":"frog","Challenge":"B"},{"Category":"frying pan","Challenge":"A,C"},{"Category":"garden","Challenge":"B"},{"Category":"garden hose","Challenge":"B"},{"Category":"giraffe","Challenge":"B"},{"Category":"goatee","Challenge":"B"},{"Category":"golf club","Challenge":"B"},{"Category":"grapes","Challenge":"A,C"},{"Category":"grass","Challenge":"A,C"},{"Category":"guitar","Challenge":"A,B"},{"Category":"hamburger","Challenge":"B"},{"Category":"hammer","Challenge":"C"},{"Category":"hand","Challenge":"A"},{"Category":"harp","Challenge":"A,B"},{"Category":"hat","Challenge":"A,C"},{"Category":"headphones","Challenge":"A,C"},{"Category":"hedgehog","Challenge":"B,C"},{"Category":"helicopter","Challenge":"B"},{"Category":"helmet","Challenge":"A"},{"Category":"hexagon","Challenge":"A"},{"Category":"hockey puck","Challenge":"B"},{"Category":"hockey stick","Challenge":"A,C"},{"Category":"horse","Challenge":"B"},{"Category":"hospital","Challenge":"A,B"},{"Category":"hot air balloon","Challenge":"A,C"},{"Category":"hot dog","Challenge":"B"},{"Category":"hot tub","Challenge":"B"},{"Category":"hourglass","Challenge":"A,C"},{"Category":"house","Challenge":"A,C"},{"Category":"house plant","Challenge":"A,B,C"},{"Category":"hurricane","Challenge":"A"},{"Category":"ice cream","Challenge":"A,C"},{"Category":"jacket","Challenge":"B"},{"Category":"jail","Challenge":"A,C"},{"Category":"kangaroo","Challenge":"B"},{"Category":"key","Challenge":"B"},{"Category":"keyboard","Challenge":"B"},{"Category":"knee","Challenge":"B"},{"Category":"knife","Challenge":"A,C"},{"Category":"ladder","Challenge":"A,C"},{"Category":"lantern","Challenge":"A,C"},{"Category":"laptop","Challenge":"B"},{"Category":"leaf","Challenge":"A"},{"Category":"leg","Challenge":"A"},{"Category":"light bulb","Challenge":"A"},{"Category":"lighter","Challenge":"A"},{"Category":"lighthouse","Challenge":"B"},{"Category":"lightning","Challenge":"A"},{"Category":"line","Challenge":""},{"Category":"lion","Challenge":"B"},{"Category":"lipstick","Challenge":"B"},{"Category":"lobster","Challenge":"B"},{"Category":"lollipop","Challenge":"A,C"},{"Category":"mailbox","Challenge":"A,C"},{"Category":"map","Challenge":"A,C"},{"Category":"marker","Challenge":"A,C"},{"Category":"matches","Challenge":"A,B,C"},{"Category":"megaphone","Challenge":"B"},{"Category":"mermaid","Challenge":"B"},{"Category":"microphone","Challenge":"A,C"},{"Category":"microwave","Challenge":"C"},{"Category":"monkey","Challenge":"B"},{"Category":"moon","Challenge":""},{"Category":"mosquito","Challenge":"B"},{"Category":"motorbike","Challenge":"B"},{"Category":"mountain","Challenge":"A"},{"Category":"mouse","Challenge":"B"},{"Category":"moustache","Challenge":"A"},{"Category":"mouth","Challenge":"A"},{"Category":"mug","Challenge":"A,C"},{"Category":"mushroom","Challenge":"A,C"},{"Category":"nail","Challenge":"B"},{"Category":"necklace","Challenge":"A,C"},{"Category":"nose","Challenge":"A"},{"Category":"ocean","Challenge":""},{"Category":"octagon","Challenge":"A"},{"Category":"octopus","Challenge":"B,C"},{"Category":"onion","Challenge":""},{"Category":"oven","Challenge":"C"},{"Category":"owl","Challenge":"B"},{"Category":"paintbrush","Challenge":"A.B"},{"Category":"paint can","Challenge":"A,C"},{"Category":"palm tree","Challenge":"A"},{"Category":"panda","Challenge":"B"},{"Category":"pants","Challenge":"A,B,C"},{"Category":"paper clip","Challenge":"A"},{"Category":"parachute","Challenge":"A,B,C"},{"Category":"parrot","Challenge":"B"},{"Category":"passport","Challenge":"A,B,C"},{"Category":"peanut","Challenge":"A,B"},{"Category":"pear","Challenge":"A,B"},{"Category":"peas","Challenge":"A,B"},{"Category":"pencil","Challenge":"A,C"},{"Category":"penguin","Challenge":"B"},{"Category":"piano","Challenge":"B"},{"Category":"pickup truck","Challenge":"B"},{"Category":"picture frame","Challenge":"A,B,C"},{"Category":"pig","Challenge":"B"},{"Category":"pillow","Challenge":"A,B,C"},{"Category":"pineapple","Challenge":"A,B,C"},{"Category":"pizza","Challenge":"A,B,C"},{"Category":"pliers","Challenge":"B"},{"Category":"police car","Challenge":"B"},{"Category":"pond","Challenge":"A,B,C"},{"Category":"pool","Challenge":"A,B,C"},{"Category":"popsicle","Challenge":"A,B,C"},{"Category":"postcard","Challenge":"A,B,C"},{"Category":"potato","Challenge":"A,B,C"},{"Category":"power outlet","Challenge":"A,C"},{"Category":"purse","Challenge":"A,B,C"},{"Category":"rabbit","Challenge":"B"},{"Category":"raccoon","Challenge":"B"},{"Category":"radio","Challenge":"B,C"},{"Category":"rain","Challenge":"A,B"},{"Category":"rainbow","Challenge":"A,B"},{"Category":"rake","Challenge":"A,B,C"},{"Category":"remote control","Challenge":"A,B,C"},{"Category":"rhinoceros","Challenge":"B"},{"Category":"rifle","Challenge":"B"},{"Category":"river","Challenge":"A,B,C"},{"Category":"roller coaster","Challenge":"A,B"},{"Category":"rollerskates","Challenge":"A,B"},{"Category":"sailboat","Challenge":"B,C"},{"Category":"sandwich","Challenge":"B"},{"Category":"saw","Challenge":"A,B"},{"Category":"saxophone","Challenge":"A,B"},{"Category":"school bus","Challenge":"A,B"},{"Category":"scissors","Challenge":"B"},{"Category":"scorpion","Challenge":"B"},{"Category":"screwdriver","Challenge":"A,B"},{"Category":"sea turtle","Challenge":"B"},{"Category":"see saw","Challenge":"A,B"},{"Category":"shark","Challenge":"B"},{"Category":"sheep","Challenge":"B"},{"Category":"shoe","Challenge":"A,B"},{"Category":"shorts","Challenge":"A,B,C"},{"Category":"shovel","Challenge":"A,B,C"},{"Category":"sink","Challenge":"A,B"},{"Category":"skateboard","Challenge":"B,C"},{"Category":"skull","Challenge":"B"},{"Category":"skyscraper","Challenge":"A,B,C"},{"Category":"sleeping bag","Challenge":"A,B"},{"Category":"smiley face","Challenge":"A"},{"Category":"snail","Challenge":"B"},{"Category":"snake","Challenge":"B"},{"Category":"snorkel","Challenge":"B"},{"Category":"snowflake","Challenge":"A,B"},{"Category":"snowman","Challenge":"A,B,C"},{"Category":"soccer ball","Challenge":"A"},{"Category":"sock","Challenge":"A"},{"Category":"speedboat","Challenge":"B"},{"Category":"spider","Challenge":"A,B"},{"Category":"spoon","Challenge":"C"},{"Category":"spreadsheet","Challenge":"A,C"},{"Category":"square","Challenge":""},{"Category":"squiggle","Challenge":"A,C"},{"Category":"squirrel","Challenge":"B"},{"Category":"stairs","Challenge":"A"},{"Category":"star","Challenge":"A"},{"Category":"steak","Challenge":"B"},{"Category":"stereo","Challenge":"B,C"},{"Category":"stethoscope","Challenge":"B,C"},{"Category":"stitches","Challenge":"A,C"},{"Category":"stop sign","Challenge":"A"},{"Category":"stove","Challenge":"B,C"},{"Category":"strawberry","Challenge":"A"},{"Category":"streetlight","Challenge":"A"},{"Category":"string bean","Challenge":"B"},{"Category":"submarine","Challenge":"B"},{"Category":"suitcase","Challenge":"A,C"},{"Category":"sun","Challenge":"A,C"},{"Category":"swan","Challenge":"B"},{"Category":"sweater","Challenge":"B"},{"Category":"swing set","Challenge":"B"},{"Category":"sword","Challenge":"A,C"},{"Category":"syringe","Challenge":"C"},{"Category":"table","Challenge":"A,C"},{"Category":"teapot","Challenge":"B"},{"Category":"teddy-bear","Challenge":"B"},{"Category":"telephone","Challenge":"B"},{"Category":"television","Challenge":"C"},{"Category":"tennis racquet","Challenge":"A,C"},{"Category":"tent","Challenge":"A,C"},{"Category":"The Eiffel Tower","Challenge":"A,C"},{"Category":"The Great Wall of China","Challenge":"A"},{"Category":"The Mona Lisa","Challenge":"B"},{"Category":"tiger","Challenge":"B"},{"Category":"toaster","Challenge":"B"},{"Category":"toe","Challenge":"B"},{"Category":"toilet","Challenge":"B"},{"Category":"tooth","Challenge":"B"},{"Category":"toothbrush","Challenge":"A,C"},{"Category":"toothpaste","Challenge":"B"},{"Category":"tornado","Challenge":"A"},{"Category":"tractor","Challenge":"B"},{"Category":"traffic light","Challenge":"B"},{"Category":"train","Challenge":"B"},{"Category":"tree","Challenge":"A"},{"Category":"triangle","Challenge":""},{"Category":"trombone","Challenge":"B"},{"Category":"truck","Challenge":"B"},{"Category":"trumpet","Challenge":"B"},{"Category":"t-shirt","Challenge":"B"},{"Category":"umbrella","Challenge":"A"},{"Category":"underwear","Challenge":"A"},{"Category":"van","Challenge":"B,C"},{"Category":"vase","Challenge":"A"},{"Category":"violin","Challenge":"B"},{"Category":"washing machine","Challenge":"B"},{"Category":"watermelon","Challenge":"A,C"},{"Category":"waterslide","Challenge":"B"},{"Category":"whale","Challenge":"A,B"},{"Category":"wheel","Challenge":""},{"Category":"windmill","Challenge":"B"},{"Category":"wine bottle","Challenge":"A,C"},{"Category":"wine glass","Challenge":"B"},{"Category":"wristwatch","Challenge":"B"},{"Category":"yoga","Challenge":"B"},{"Category":"zebra","Challenge":"B"},{"Category":"zigzag","Challenge":""}]};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!********************************!*\
  !*** ./node/self.js (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************************!*\
  !*** ./node/extend.js (ignored) ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hYm91dC5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NhbnZhcy12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NoYWxsZW5nZS1xcmNvZGUuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jaGFsbGVuZ2Utdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jaGFsbGVuZ2UuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jaGFsbGVuZ2VzLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY2hhbGxlbmdlcy5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2dhbWUtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9nYW1lLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaG9tZS12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2hvbWUuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9odW1hbi1wbGF5ZXJzLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaHVtYW4tcGxheWVycy5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2luc3RydWN0aW9ucy5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ludGVyZmFjZS12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21hZ2VudGFBSS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYXJ0bmVycy12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhcnRuZXJzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9zdGdhbWUtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3N0Z2FtZS5odG1sIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3M/YzY2YiIsIndlYnBhY2s6Ly8vd3MgKGlnbm9yZWQpIiwid2VicGFjazovLy8uL25vZGUvc2VsZi5qcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vbm9kZS9leHRlbmQuanMgKGlnbm9yZWQpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdI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ImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm1haW5cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9hcHAuanNcIixcInZlbmRvcnN+bWFpblwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8qKioqKlxuQGF1dGhvcjogTHVjaWFubyBGcml6emVyYSA8bHVjYWp1QGdtYWlsLmNvbT5cbiovXG5cbi8vbW9kdWxlc1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuaW1wb3J0IFVJa2l0IGZyb20gJ3Vpa2l0L2Rpc3QvanMvdWlraXQubWluJztcbmltcG9ydCB1aWtpdGljb25zIGZyb20gJ3Vpa2l0L2Rpc3QvanMvdWlraXQtaWNvbnMubWluJztcblxuaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XG5pbXBvcnQgaTE4bmV4dEJhY2tlbmQgZnJvbSAnaTE4bmV4dC14aHItYmFja2VuZC9pMThuZXh0WEhSQmFja2VuZC5taW4nO1xuaW1wb3J0IGpxdWVyeUkxOG5leHQgZnJvbSAnanF1ZXJ5LWkxOG5leHQvanF1ZXJ5LWkxOG5leHQubWluJztcblxuaW1wb3J0IEFydHlvbSBmcm9tICdhcnR5b20uanMnO1xuXG5pbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmltcG9ydCBnYW1lTWVjaGFuaWNzIGZyb20gJy4vZGF0YS9nYW1lLW1lY2hhbmljcy5qc29uJztcblxuaW1wb3J0IGludGVyZmFjZVZpZXcgZnJvbSAnLi9jb21wb25lbnRzL2ludGVyZmFjZS12aWV3JztcblxuaW1wb3J0ICd1aWtpdC9kaXN0L2Nzcy91aWtpdC5taW4uY3NzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5cbi8vLyBBUFBcbmNvbnN0IEFwcCA9IGZ1bmN0aW9uICgpIHtcblxuXHQvL21haW4gdmFyaWFibGVzXG5cdHRoaXMudmlzdHVhbENhcmRSZWdpc3RlcmVkID0gZmFsc2U7XG5cdHRoaXMuc29ja2V0ID0gdW5kZWZpbmVkO1xuXHR0aGlzLmkxOG5leHQgPSBpMThuZXh0O1xuXHR0aGlzLmFydHlvbSA9IG5ldyBBcnR5b20oKTtcblxuXHR0aGlzLmludGVyZmFjZSA9IG5ldyBpbnRlcmZhY2VWaWV3KHRoaXMpO1xuXHR0aGlzLm11dGUgPSBnYW1lTWVjaGFuaWNzLm9wdGlvbnMubXV0ZTtcblx0dGhpcy5sYW5ndWFnZSA9IGdhbWVNZWNoYW5pY3Mub3B0aW9ucy5sYW5ndWFnZS5jb2RlO1xuXG5cblx0dGhpcy5tZWNoYW5pY3MgPSBnYW1lTWVjaGFuaWNzO1xuXG5cdHRoaXMucGVyc29uYXMgPSBnYW1lTWVjaGFuaWNzLnBlcnNvbmFzO1xuXHR0aGlzLmN1cnJlbnRQZXJzb25hID0gdGhpcy5wZXJzb25hc1swXTtcblxuXHR0aGlzLmdhbWVTdGF0ZSA9IHtcblx0XHRwbGF5ZXJzOiAwLFxuXHRcdG5vUGhvbmU6IGZhbHNlLFxuXHRcdGN1cnJlbnRDaGFsbGVuZ2U6ICcnLCAvLycnLCAvL2N1cnJlbnQgY2hhbGxlbmdlXG5cdFx0Y3VycmVudENhdGVnb3J5OiAnJywgLy8nJywgLy9jdXJyZW50IGRyYXcgY2F0ZWdvcnlcblx0XHRmaXJzdFNwZWFrOiB0cnVlLCAvL3JlZ3VsYXRlcyBpcyBpdCBpcyB0aGUgZmlyc3QgdGltZSB0aGUgbWFjaGluZSBzcGVhayBvbiBlYWNoIHRpbWUgdGhhdCB1c2VycyBwbGF5IHRoZSBjaGFsbGVuZ2Vcblx0XHRzdWNjZXNzOiBmYWxzZSxcblx0XHRhdHRlbXB0czogW10sIC8vY3VycmVudCBsaXN0IG9mIGd1ZXNzIGF0dGVtcHRzXG5cdH07XG5cblx0Ly9tZXRob2RzXG5cdHRoaXMuaW5pdCA9ICgpID0+IHtcblxuXHRcdHVpa2l0aWNvbnMoVUlraXQpO1xuXG5cdFx0Ly9zb2NrZXQuaW9cblx0XHRhcHAuc29ja2V0ID0gaW8oKTtcblx0XHRhcHAuc29ja2V0Lm9uKCdjb25uZWN0ZWQnLCAoKSA9PiB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhhcHAuc29ja2V0KTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdzb2NrZXQgY2xpZW50IGNvbm5lY3RlZCcpO1xuXG5cdFx0XHRhcHAuc29ja2V0LmVtaXQoJ2dhbWVDcmVhdGVkJywge1xuXHRcdFx0XHRtc2c6ICdnYW1lQ3JlYXRlZCcsXG5cdFx0XHRcdHNvY2tldElEOiBhcHAuc29ja2V0LmlkLFxuXHRcdFx0fSk7XG5cblx0XHR9KTtcblxuXHRcdGFwcC5pMThuZXh0XG5cdFx0XHQudXNlKGkxOG5leHRCYWNrZW5kKVxuXHRcdFx0LmluaXQoe1xuXHRcdFx0XHRkZWJ1ZzogZmFsc2UsXG5cdFx0XHRcdGxuZzogdGhpcy5sYW5ndWFnZSxcblx0XHRcdFx0ZmFsbGJhY2tMbmc6ICdlbicsXG5cdFx0XHRcdGJhY2tlbmQ6IHtcblx0XHRcdFx0XHRsb2FkUGF0aDogJ2xvY2FsZXMve3tsbmd9fS5qc29uJ1xuXHRcdFx0XHR9XG5cdFx0XHR9KS50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdGpxdWVyeUkxOG5leHQuaW5pdCh3aW5kb3cuYXBwLmkxOG5leHQsICQpO1xuXHRcdFx0XHRhcHAuaW50ZXJmYWNlLmluaXQoKTtcblx0XHRcdH0pO1xuXG5cdH07XG5cblx0dGhpcy5jaGFuZ2VDb250ZXhMYW5ndWFnZSA9IChsYW5nKSA9PiB7XG5cdFx0dGhpcy5sYW5ndWFnZSA9IGxhbmc7XG5cdFx0dGhpcy5pMThuZXh0LmNoYW5nZUxhbmd1YWdlKHRoaXMubGFuZ3VhZ2UpO1xuXHRcdHJldHVybiB0aGlzLmxhbmd1YWdlO1xuXHR9O1xuXG5cdHRoaXMuZ2V0UGVyc29uYSA9IChzbHVnKSA9PiB7XG5cdFx0cmV0dXJuIHRoaXMucGVyc29uYXMuZmluZChmdW5jdGlvbiAocCkge1xuXHRcdFx0cmV0dXJuIHNsdWcudG9Mb3dlckNhc2UoKSA9PSBwLnNsdWcudG9Mb3dlckNhc2UoKTtcblx0XHR9KTtcblx0fTtcblxuXHR0aGlzLmdldFBlcnNvbmFCeUNvbG91ciA9IChjb2xvdXIpID0+IHtcblx0XHRjb25zdCBjb2xvdXJUcmFzbGF0ZWQgPSB0aGlzLmkxOG5leHQudChgcGVyc29uYXMuY29sb3Vycy4ke2NvbG91cn1gKTtcblx0XHRyZXR1cm4gdGhpcy5wZXJzb25hcy5maW5kKGZ1bmN0aW9uIChwKSB7XG5cdFx0XHRyZXR1cm4gY29sb3VyVHJhc2xhdGVkLnRvTG93ZXJDYXNlKCkgPT0gcC5jb2xvdXIudG9Mb3dlckNhc2UoKTtcblx0XHR9KTtcblx0fTtcblxuXHR0aGlzLmdldExhbmd1YWdlQ29kZSA9IChsYW5nKSA9PiB7XG5cdFx0aWYgKGxhbmcgPT0gJ0FtZXJpY2FuIEVuZ2xpc2gnIHx8IGxhbmcgPT0gJ2VuJykge1xuXHRcdFx0cmV0dXJuICdlbi1VUyc7XG5cdFx0fSBlbHNlIGlmIChsYW5nID09ICdCcml0aXNoIEVuZ2xpc2gnIHx8IGxhbmcgPT0gJ2VuJykge1xuXHRcdFx0cmV0dXJuICdlbi1HQic7XG5cdFx0fSBlbHNlIGlmIChsYW5nID09ICdQb3J0dWd1w6pzIEJyYXNpbCcgfHwgbGFuZyA9PSAncHQnKSB7XG5cdFx0XHRyZXR1cm4gJ3B0LUJSJztcblx0XHR9IGVsc2UgaWYgKGxhbmcgPT0gJ0ZyYW7Dp2FpcycgfHwgbGFuZyA9PSAnZnInKSB7XG5cdFx0XHRyZXR1cm4gJ2ZyLUZSJztcblx0XHR9XG5cdH07XG5cblx0dGhpcy5nZXRDaGFsbGVuZ2UgPSAobmFtZSkgPT4ge1xuXHRcdHJldHVybiB0aGlzLm1lY2hhbmljcy5jaGFsbGVuZ2VzLmZpbmQoZnVuY3Rpb24gKGMpIHtcblx0XHRcdHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKCkgPT0gYy5uYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0fSk7XG5cdH07XG5cblx0dGhpcy5faW5pdEFydHlvbSA9ICgpID0+IHtcblx0XHQvLyBTdGFydCB0aGUgY29tbWFuZHMgIVxuXHRcdHRoaXMuYXJ0eW9tLmluaXRpYWxpemUoe1xuXHRcdFx0bGFuZzogdGhpcy5nZXRMYW5ndWFnZUNvZGUodGhpcy5sYW5ndWFnZSksIC8vIEdyZWF0QnJpdGFpbiBlbmdsaXNoXG5cdFx0XHRjb250aW51b3VzOiB0cnVlLCAvLyBMaXN0ZW4gZm9yZXZlclxuXHRcdFx0c291bmRleDogdHJ1ZSwgLy8gVXNlIHRoZSBzb3VuZGV4IGFsZ29yaXRobSB0byBpbmNyZWFzZSBhY2N1cmFjeVxuXHRcdFx0ZGVidWc6IGZhbHNlLCAvLyBTaG93IG1lc3NhZ2VzIGluIHRoZSBjb25zb2xlXG5cdFx0XHRleGVjdXRpb25LZXl3b3JkOiAnYW5kIGRvIGl0IG5vdycsXG5cdFx0XHRsaXN0ZW46IHRydWUsIC8vIFN0YXJ0IHRvIGxpc3RlbiBjb21tYW5kcyAhXG5cdFx0XHQvLyBuYW1lOiAnSmFydmlzJyAvLyBJZiBwcm92aWRlbiwgeW91IGNhbiBvbmx5IHRyaWdnZXIgYSBjb21tYW5kIGlmIHlvdSBzYXkgaXRzIG5hbWUgZS5nIHRvIHRyaWdnZXIgR29vZCBNb3JuaW5nLCB5b3UgbmVlZCB0byBzYXkgJ0phcnZpcyBHb29kIE1vcm5pbmcnXG5cdFx0fSkudGhlbigoKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZygnQXJ0eW9tIGhhcyBiZWVuIHN1Y2Nlc2Z1bGx5IGluaXRpYWxpemVkJyk7XG5cdFx0XHR0aGlzLmFydHlvbS5pbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fSkuY2F0Y2goKGVycikgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvcignQXJ0eW9tIGNvdWxkbnQgYmUgaW5pdGlhbGl6ZWQ6ICcsIGVycik7XG5cdFx0fSk7XG5cdH07XG5cblx0dGhpcy5zcGVhayA9ICh0ZXh0LCBsYW5ndWFnZSkgPT4ge1xuXHRcdGlmICghdGhpcy5tdXRlICYmIHRleHQgIT0gbnVsbCkge1xuXHRcdFx0aWYgKGxhbmd1YWdlICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0aGlzLmFydHlvbS5zYXkodGV4dCwge1xuXHRcdFx0XHRcdGxhbmc6IGFwcC5nZXRMYW5ndWFnZUNvZGUobGFuZ3VhZ2UpXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hcnR5b20uc2F5KHRleHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHR0aGlzLnJlc2V0R2FtZVN0YXRlID0gKCkgPT4ge1xuXHRcdHRoaXMuZ2FtZVN0YXRlID0ge1xuXHRcdFx0cGxheWVyczogMCxcblx0XHRcdG5vUGhvbmU6IGZhbHNlLFxuXHRcdFx0Y3VycmVudENoYWxsZW5nZTogJycsXG5cdFx0XHRjdXJyZW50Q2F0ZWdvcnk6ICcnLFxuXHRcdFx0Zmlyc3RTcGVhazogdHJ1ZSxcblx0XHRcdHN1Y2Nlc3M6IGZhbHNlLFxuXHRcdFx0YXR0ZW1wdHM6IFtdLFxuXHRcdH07XG5cdH07XG5cblx0dGhpcy5yZXNldEdhbWVTdWNjZXNzID0gKCkgPT4ge1xuXHRcdHRoaXMuZ2FtZVN0YXRlLnN1Y2Nlc3MgPSBmYWxzZTtcblx0XHR0aGlzLmdhbWVTdGF0ZS5hdHRlbXB0cyA9IFtdO1xuXHR9O1xuXG5cdC8vIC0tLSAgc2V0IGxpbWl0ZWQgbGlzdCBvZiBiZXN0IGd1ZXNzZXNcblx0dGhpcy5nZXRCZXN0R3Vlc3NlcyA9IChsaW1pdCkgPT4ge1xuXHRcdGlmIChsaW1pdCkgcmV0dXJuIHRoaXMuZ2FtZVN0YXRlLmF0dGVtcHRzLnNsaWNlKDAsIGxpbWl0KTtcblx0XHRyZXR1cm4gdGhpcy5nYW1lU3RhdGUuYXR0ZW1wdHM7XG5cdH07XG5cblx0Ly8gY29uc3Qgb25DYXJkID0gKGRhdGEpID0+IHtcblx0Ly8gXHRjb25zb2xlLmxvZyhkYXRhKTtcblx0Ly8gXHQvLyBhcHAuaW50ZXJmYWNlLmN1cnJlbnRWaWV3LnJlYWR5KGRhdGEpO1xuXHQvLyB9O1xuXG5cbn07XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbndpbmRvdy5hcHAgPSBhcHA7XG5hcHAuaW5pdCgpOyIsInZhciBIID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgdmFyIFQgPSBuZXcgSC5UZW1wbGF0ZSh7Y29kZTogZnVuY3Rpb24gKGMscCxpKSB7IHZhciB0PXRoaXM7dC5iKGk9aXx8XCJcIik7dC5iKFwiPGRpdiBpZD1cXFwiYWJvdXRcXFwiIGNsYXNzPVxcXCJ1ay1tb2RhbC1mdWxsIHVrLW1vZGFsLW92ZXJmbG93XFxcIiB1ay1tb2RhbD5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBjbGFzcz1cXFwidWstbW9kYWwtZGlhbG9nXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDxidXR0b24gY2xhc3M9XFxcInVrLW1vZGFsLWNsb3NlLWZ1bGwgdWstY2xvc2UtbGFyZ2VcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdWstY2xvc2U+PC9idXR0b24+XCIpO3QuYihcIlxcblwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstbW9kYWwtaGVhZGVyXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICA8aDIgY2xhc3M9XFxcInVrLW1vZGFsLXRpdGxlIHVrLXRleHQtY2VudGVyXFxcIiBkYXRhLWkxOG49XFxcImFib3V0LnRpdGxlXFxcIj5cIik7dC5iKHQudih0LmYoXCJ0aXRsZVwiLGMscCwwKSkpO3QuYihcIjwvaDI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tb2RhbC1ib2R5XFxcIiB1ay1vdmVyZmxvdy1hdXRvPiAgICAgXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstY29udGFpbmVyIHVrLWNvbnRhaW5lci14c21hbGxcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICA8ZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgPHAgZGF0YS1pMThuPVxcXCJhYm91dC50ZXh0XFxcIj5cIik7dC5iKHQudih0LmYoXCJ0ZXh0XCIsYyxwLDApKSk7dC5iKFwiPC9wPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLW1hcmdpbi1sYXJnZS10b3BcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgPGlmcmFtZSB3aWR0aD1cXFwiNzUwXFxcIiBoZWlnaHQ9XFxcIjQyMlxcXCIgc3JjPVxcXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9cIik7dC5iKHQudih0LmYoXCJ5b3V0dWJlaWRcIixjLHAsMCkpKTt0LmIoXCI/cmVsPTBcXFwiIGZyYW1lYm9yZGVyPVxcXCIwXFxcIiBhbGxvdz1cXFwiYXV0b3BsYXk7IGVuY3J5cHRlZC1tZWRpYVxcXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLW1hcmdpbi1sYXJnZS10b3BcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVxcXCJ1ay1oZWFkaW5nLWxpbmUgdWstdGV4dC1jZW50ZXJcXFwiPjxzcGFuIGRhdGEtaTE4bj1cXFwiYWJvdXQucHJlc2VudGF0aW9ucy50aXRsZVxcXCI+XCIpO3QuYih0LnYodC5kKFwicHJlc2VudGF0aW9ucy50aXRsZVwiLGMscCwwKSkpO3QuYihcIjwvc3Bhbj48L2gyPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcInVrLXRleHQtc21hbGxcXFwiIGRhdGEtaTE4bj1cXFwiYWJvdXQucHJlc2VudGF0aW9ucy50ZXh0XFxcIj5cIik7dC5iKHQudih0LmQoXCJwcmVzZW50YXRpb25zLnRleHRcIixjLHAsMCkpKTt0LmIoXCI8L3A+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICBcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgIDxkaXYgdWstZ3JpZD5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC0xLTJcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgZGF0YS1pMThuPVxcXCJhYm91dC5wcmVzZW50YXRpb25zLnByZXNlbnRhdGlvbnMudGl0bGVcXFwiPlwiKTt0LmIodC52KHQuZChcInByZXNlbnRhdGlvbnMucHJlc2VudGF0aW9ucy50aXRsZVwiLGMscCwwKSkpO3QuYihcIjwvaDQ+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cXFwidWstdGV4dC1zbWFsbFxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7aWYodC5zKHQuZChcInByZXNlbnRhdGlvbnMucHJlc2VudGF0aW9ucy5saXN0XCIsYyxwLDEpLGMscCwwLDE0OTYsMTU3OSxcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XCIpO3QuYih0LnYodC5mKFwibmFtZVwiLGMscCwwKSkpO3QuYihcIjwvbGk+XCIpO3QuYihcIlxcblwiICsgaSk7fSk7Yy5wb3AoKTt9dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtMS0yXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGRhdGEtaTE4bj1cXFwiYWJvdXQucHJlc2VudGF0aW9ucy5leGhpYml0aW9ucy50aXRsZVxcXCI+XCIpO3QuYih0LnYodC5kKFwicHJlc2VudGF0aW9ucy5leGhpYml0aW9ucy50aXRsZVwiLGMscCwwKSkpO3QuYihcIjwvaDQ+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cXFwidWstdGV4dC1zbWFsbFxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7aWYodC5zKHQuZChcInByZXNlbnRhdGlvbnMuZXhoaWJpdGlvbnMubGlzdFwiLGMscCwxKSxjLHAsMCwxOTc4LDIwNjEsXCJ7eyB9fVwiKSl7dC5ycyhjLHAsZnVuY3Rpb24oYyxwLHQpe3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlwiKTt0LmIodC52KHQuZihcIm5hbWVcIixjLHAsMCkpKTt0LmIoXCI8L2xpPlwiKTt0LmIoXCJcXG5cIiArIGkpO30pO2MucG9wKCk7fXQuYihcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XFxcInVrLWhlYWRpbmctbGluZSB1ay10ZXh0LWNlbnRlclxcXCI+PHNwYW4gZGF0YS1pMThuPVxcXCJhYm91dC50ZWFtLnRpdGxlXFxcIj5cIik7dC5iKHQudih0LmQoXCJ0ZWFtLnRpdGxlXCIsYyxwLDApKSk7dC5iKFwiPC9zcGFuPjwvaDI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICA8ZGl2IHVrLWdyaWQ+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtMS0zXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PlwiKTt0LmIodC52KHQuZChcInRlYW0ucGVvcGxlLmx1Y2lhbm8ubmFtZVwiLGMscCwwKSkpO3QuYihcIjwvaDQ+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJ1ay10ZXh0LXNtYWxsXFxcIiBkYXRhLWkxOG49XFxcIltodG1sXWFib3V0LnRlYW0ucGVvcGxlLmx1Y2lhbm8udGV4dFxcXCI+XCIpO3QuYih0LnQodC5kKFwidGVhbS5wZW9wbGUubHVjaWFuby50ZXh0XCIsYyxwLDApKSk7dC5iKFwiPC9wPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLTEtM1xcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5cIik7dC5iKHQudih0LmQoXCJ0ZWFtLnBlb3BsZS5zYWxsZXMubmFtZVwiLGMscCwwKSkpO3QuYihcIjwvaDQ+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJ1ay10ZXh0LXNtYWxsXFxcIiBkYXRhLWkxOG49XFxcIltodG1sXWFib3V0LnRlYW0ucGVvcGxlLnNhbGxlcy50ZXh0XFxcIj5cIik7dC5iKHQudCh0LmQoXCJ0ZWFtLnBlb3BsZS5zYWxsZXMudGV4dFwiLGMscCwwKSkpO3QuYihcIjwvcD5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC0xLTNcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+XCIpO3QuYih0LnYodC5kKFwidGVhbS5wZW9wbGUuemFtYm9uaS5uYW1lXCIsYyxwLDApKSk7dC5iKFwiPC9oND5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcInVrLXRleHQtc21hbGxcXFwiIGRhdGEtaTE4bj1cXFwiW2h0bWxdYWJvdXQudGVhbS5wZW9wbGUuemFtYm9uaS50ZXh0XFxcIj5cIik7dC5iKHQudCh0LmQoXCJ0ZWFtLnBlb3BsZS56YW1ib25pLnRleHRcIixjLHAsMCkpKTt0LmIoXCI8L3A+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwidWstbWFyZ2luLWxhcmdlLXRvcCB1ay10ZXh0LXNtYWxsXFxcIiBkYXRhLWkxOG49XFxcIltodG1sXWFib3V0LnRlYW0uc3VwcG9ydFxcXCI+XCIpO3QuYih0LnQodC5kKFwidGVhbS5zdXBwb3J0XCIsYyxwLDApKSk7dC5iKFwiPC9wPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIpO3QuYihcIlxcblwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4tbGFyZ2UtdG9wXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cXFwidWstaGVhZGluZy1saW5lIHVrLXRleHQtY2VudGVyXFxcIj48c3BhbiBkYXRhLWkxOG49XFxcImFib3V0LnNwb25zb3JzLnRpdGxlXFxcIj5cIik7dC5iKHQudih0LmQoXCJzcG9uc29ycy50aXRsZVwiLGMscCwwKSkpO3QuYihcIjwvc3Bhbj48L2gyPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstY2hpbGQtd2lkdGgtMS0zQHMgdWstZmxleC1taWRkbGVcXFwiIHVrLWdyaWQ+XCIpO3QuYihcIlxcblwiICsgaSk7aWYodC5zKHQuZChcInNwb25zb3JzLmxpc3RcIixjLHAsMSksYyxwLDAsMzc1NSwzOTUyLFwie3sgfX1cIikpe3QucnMoYyxwLGZ1bmN0aW9uKGMscCx0KXt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJ1ay1hbGlnbi1jZW50ZXJcXFwiIGRhdGEtc3JjPVxcXCIuL2Fzc2V0cy9cIik7dC5iKHQudih0LmYoXCJpbWFnZVwiLGMscCwwKSkpO3QuYihcIlxcXCIgYWx0PVxcXCJcIik7dC5iKHQudih0LmYoXCJuYW1lXCIsYyxwLDApKSk7dC5iKFwiXFxcIiB1ay1pbWcvPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO30pO2MucG9wKCk7fXQuYihcIiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICBcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLXhsYXJnZS10b3BcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgPGhyPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jaGlsZC13aWR0aC0xLTFAcyB1ay1mbGV4LW1pZGRsZVxcXCIgdWstZ3JpZD5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vbHVjYWp1L3BpY3Rpb1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cXFwidWstYWxpZ24tY2VudGVyXFxcIiB3aWR0aD1cXFwiNDVcXFwiIGRhdGEtc3JjPVxcXCJhc3NldHMvZ2l0aHViLnBuZ1xcXCIgYWx0PVxcXCJHaXRodWJcXFwiIHVrLWltZz5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLW1hcmdpbi1yZW1vdmUtdG9wXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LW5jLzQuMC9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInVrLWFsaWduLWNlbnRlclxcXCIgd2lkdGg9XFxcIjEwMFxcXCIgZGF0YS1zcmM9XFxcImFzc2V0cy9jYy1ieS1uYy5wbmdcXFwiIGFsdD1cXFwiQ0NcXFwiIHVrLWltZz5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDwvZGl2PiAgIFwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIjwvZGl2PlwiKTtyZXR1cm4gdC5mbCgpOyB9LHBhcnRpYWxzOiB7fSwgc3ViczogeyAgfX0sIFwiPGRpdiBpZD1cXFwiYWJvdXRcXFwiIGNsYXNzPVxcXCJ1ay1tb2RhbC1mdWxsIHVrLW1vZGFsLW92ZXJmbG93XFxcIiB1ay1tb2RhbD5cXG4gICAgPGRpdiBjbGFzcz1cXFwidWstbW9kYWwtZGlhbG9nXFxcIj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcInVrLW1vZGFsLWNsb3NlLWZ1bGwgdWstY2xvc2UtbGFyZ2VcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdWstY2xvc2U+PC9idXR0b24+XFxuXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tb2RhbC1oZWFkZXJcXFwiPlxcbiAgICAgICAgICAgIDxoMiBjbGFzcz1cXFwidWstbW9kYWwtdGl0bGUgdWstdGV4dC1jZW50ZXJcXFwiIGRhdGEtaTE4bj1cXFwiYWJvdXQudGl0bGVcXFwiPnt7dGl0bGV9fTwvaDI+XFxuICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWJvZHlcXFwiIHVrLW92ZXJmbG93LWF1dG8+ICAgICBcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jb250YWluZXIgdWstY29udGFpbmVyLXhzbWFsbFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLWkxOG49XFxcImFib3V0LnRleHRcXFwiPnt7dGV4dH19PC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLW1hcmdpbi1sYXJnZS10b3BcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGlmcmFtZSB3aWR0aD1cXFwiNzUwXFxcIiBoZWlnaHQ9XFxcIjQyMlxcXCIgc3JjPVxcXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC97e3lvdXR1YmVpZH19P3JlbD0wXFxcIiBmcmFtZWJvcmRlcj1cXFwiMFxcXCIgYWxsb3c9XFxcImF1dG9wbGF5OyBlbmNyeXB0ZWQtbWVkaWFcXFwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLW1hcmdpbi1sYXJnZS10b3BcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVxcXCJ1ay1oZWFkaW5nLWxpbmUgdWstdGV4dC1jZW50ZXJcXFwiPjxzcGFuIGRhdGEtaTE4bj1cXFwiYWJvdXQucHJlc2VudGF0aW9ucy50aXRsZVxcXCI+e3twcmVzZW50YXRpb25zLnRpdGxlfX08L3NwYW4+PC9oMj5cXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJ1ay10ZXh0LXNtYWxsXFxcIiBkYXRhLWkxOG49XFxcImFib3V0LnByZXNlbnRhdGlvbnMudGV4dFxcXCI+e3twcmVzZW50YXRpb25zLnRleHR9fTwvcD5cXG4gICAgICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiB1ay1ncmlkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLTEtMlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBkYXRhLWkxOG49XFxcImFib3V0LnByZXNlbnRhdGlvbnMucHJlc2VudGF0aW9ucy50aXRsZVxcXCI+e3twcmVzZW50YXRpb25zLnByZXNlbnRhdGlvbnMudGl0bGV9fTwvaDQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cXFwidWstdGV4dC1zbWFsbFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyNwcmVzZW50YXRpb25zLnByZXNlbnRhdGlvbnMubGlzdH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+e3tuYW1lfX08L2xpPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3svcHJlc2VudGF0aW9ucy5wcmVzZW50YXRpb25zLmxpc3R9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLTEtMlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBkYXRhLWkxOG49XFxcImFib3V0LnByZXNlbnRhdGlvbnMuZXhoaWJpdGlvbnMudGl0bGVcXFwiPnt7cHJlc2VudGF0aW9ucy5leGhpYml0aW9ucy50aXRsZX19PC9oND5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVxcXCJ1ay10ZXh0LXNtYWxsXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7I3ByZXNlbnRhdGlvbnMuZXhoaWJpdGlvbnMubGlzdH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+e3tuYW1lfX08L2xpPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3svcHJlc2VudGF0aW9ucy5leGhpYml0aW9ucy5saXN0fX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XFxcInVrLWhlYWRpbmctbGluZSB1ay10ZXh0LWNlbnRlclxcXCI+PHNwYW4gZGF0YS1pMThuPVxcXCJhYm91dC50ZWFtLnRpdGxlXFxcIj57e3RlYW0udGl0bGV9fTwvc3Bhbj48L2gyPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiB1ay1ncmlkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLTEtM1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND57e3RlYW0ucGVvcGxlLmx1Y2lhbm8ubmFtZX19PC9oND5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcInVrLXRleHQtc21hbGxcXFwiIGRhdGEtaTE4bj1cXFwiW2h0bWxdYWJvdXQudGVhbS5wZW9wbGUubHVjaWFuby50ZXh0XFxcIj57e3t0ZWFtLnBlb3BsZS5sdWNpYW5vLnRleHR9fX08L3A+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtMS0zXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0Pnt7dGVhbS5wZW9wbGUuc2FsbGVzLm5hbWV9fTwvaDQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJ1ay10ZXh0LXNtYWxsXFxcIiBkYXRhLWkxOG49XFxcIltodG1sXWFib3V0LnRlYW0ucGVvcGxlLnNhbGxlcy50ZXh0XFxcIj57e3t0ZWFtLnBlb3BsZS5zYWxsZXMudGV4dH19fTwvcD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC0xLTNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+e3t0ZWFtLnBlb3BsZS56YW1ib25pLm5hbWV9fTwvaDQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJ1ay10ZXh0LXNtYWxsXFxcIiBkYXRhLWkxOG49XFxcIltodG1sXWFib3V0LnRlYW0ucGVvcGxlLnphbWJvbmkudGV4dFxcXCI+e3t7dGVhbS5wZW9wbGUuemFtYm9uaS50ZXh0fX19PC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwidWstbWFyZ2luLWxhcmdlLXRvcCB1ay10ZXh0LXNtYWxsXFxcIiBkYXRhLWkxOG49XFxcIltodG1sXWFib3V0LnRlYW0uc3VwcG9ydFxcXCI+e3t7dGVhbS5zdXBwb3J0fX19PC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG5cXG5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XFxcInVrLWhlYWRpbmctbGluZSB1ay10ZXh0LWNlbnRlclxcXCI+PHNwYW4gZGF0YS1pMThuPVxcXCJhYm91dC5zcG9uc29ycy50aXRsZVxcXCI+e3tzcG9uc29ycy50aXRsZX19PC9zcGFuPjwvaDI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jaGlsZC13aWR0aC0xLTNAcyB1ay1mbGV4LW1pZGRsZVxcXCIgdWstZ3JpZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICB7eyNzcG9uc29ycy5saXN0fX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJ1ay1hbGlnbi1jZW50ZXJcXFwiIGRhdGEtc3JjPVxcXCIuL2Fzc2V0cy97e2ltYWdlfX1cXFwiIGFsdD1cXFwie3tuYW1lfX1cXFwiIHVrLWltZy8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAge3svc3BvbnNvcnMubGlzdH19XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4teGxhcmdlLXRvcFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aHI+XFxuICAgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLWNoaWxkLXdpZHRoLTEtMUBzIHVrLWZsZXgtbWlkZGxlXFxcIiB1ay1ncmlkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS9sdWNhanUvcGljdGlvXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJ1ay1hbGlnbi1jZW50ZXJcXFwiIHdpZHRoPVxcXCI0NVxcXCIgZGF0YS1zcmM9XFxcImFzc2V0cy9naXRodWIucG5nXFxcIiBhbHQ9XFxcIkdpdGh1YlxcXCIgdWstaW1nPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLXJlbW92ZS10b3BcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktbmMvNC4wL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cXFwidWstYWxpZ24tY2VudGVyXFxcIiB3aWR0aD1cXFwiMTAwXFxcIiBkYXRhLXNyYz1cXFwiYXNzZXRzL2NjLWJ5LW5jLnBuZ1xcXCIgYWx0PVxcXCJDQ1xcXCIgdWstaW1nPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj4gICBcXG48L2Rpdj5cIiwgSCk7cmV0dXJuIFQucmVuZGVyLmFwcGx5KFQsIGFyZ3VtZW50cyk7IH07IiwiLy9tb2R1bGVzXG5pbXBvcnQgcGFwZXIgZnJvbSAncGFwZXIvZGlzdC9wYXBlci1jb3JlLm1pbic7XG5pbXBvcnQgZWUgZnJvbSAnZXZlbnQtZW1pdHRlcic7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FudmFzVmlldygpIHtcblxuXHRsZXQgYXBwO1xuXG5cdC8vZW1pdHRlclxuXHRlZSh0aGlzKTtcblxuXHQvLyBWYXJpYWJsZXNcblx0dGhpcy5wYXRoID0gdW5kZWZpbmVkO1xuXHR0aGlzLmluayA9IFtdO1xuXHR0aGlzLnByZXZQb2ludHMgPSB1bmRlZmluZWQ7XG5cdHRoaXMubGFzdFRpbWVzdGFtcCA9IDA7XG5cdFxuXG5cdC8vLS0tIEluaXRpYWxpemUuLi5cblxuXHR0aGlzLmluaXQgPSAoY29udGV4dCkgPT4ge1xuXHRcdGFwcCA9IGNvbnRleHQ7XG5cdFx0cGFwZXIuaW5zdGFsbCh3aW5kb3cpO1xuXHR9O1xuXG5cdHRoaXMuc3RhcnRDYW52YXMgPSAoKSA9PiB7XG5cblx0XHRpbml0SW5rKCk7IC8vIEluaXRpYWxpemUgSW5rIGFycmF5ICgpXG5cdFx0cGFwZXIuc2V0dXAoJ2NhbnZhcycpOyAvLyBTZXR1cCBQYXBlciAjY2FudmFzXG5cblx0XHRsZXQgdG9vbCA9IG5ldyBwYXBlci5Ub29sKCk7IC8vIEluaXRpdGFsaXplIFBhcGVyIFRvb2xcblxuXHRcdC8vIFBhcGVyIFRvb2wgTW91c2UgRG93biBFdmVudFxuXHRcdHRvb2wub25Nb3VzZURvd24gPSAoZXZlbnQpID0+IHtcblxuXHRcdFx0Ly8gTmV3IFBhcGVyIFBhdGggYW5kIFNldHRpbmdzXG5cdFx0XHR0aGlzLnBhdGggPSBuZXcgcGFwZXIuUGF0aCgpO1xuXHRcdFx0dGhpcy5wYXRoLnN0cm9rZUNvbG9yID0gJ2JsYWNrJztcblx0XHRcdHRoaXMucGF0aC5zdHJva2VXaWR0aCA9IDI7IC8vNztcblxuXHRcdFx0Ly8gR2V0IFRpbWUgW21zXSBmb3IgZWFjaCBHdWVzcyAobmVlZGVkIGZvciBhY2N1cmF0ZSBHb29nbGUgQUkgR3Vlc3NpbmcpXG5cdFx0XHRsZXQgZXZlbnRUaW1lU3RhbXAgPSBldmVudC5ldmVudC50aW1lU3RhbXA7XG5cdFxuXHRcdFx0bGV0IHRpbWVEZWx0YSA9IGV2ZW50VGltZVN0YW1wIC0gdGhpcy5sYXN0VGltZXN0YW1wO1xuXHRcdFx0bGV0IHRpbWUgPSB0aGlzLmlua1syXVt0aGlzLmlua1syXS5sZW5ndGggLSAxXSArIHRpbWVEZWx0YTtcblxuXHRcdFx0Ly8gR2V0IFhZIHBvaW50IGZyb20gZXZlbnQgdy8gdGltZSBbbXNdIHRvIHVwZGF0ZSBJbmsgQXJyYXlcblx0XHRcdHVwZGF0ZUluayhldmVudC5wb2ludCwgdGltZSk7XG5cblx0XHRcdC8vIERyYXcgWFkgcG9pbnQgdG8gUGFwZXIgUGF0aFxuXHRcdFx0dGhpcy5wYXRoLmFkZChldmVudC5wb2ludCk7XG5cblx0XHRcdHRoaXMucHJldlBvaW50cyA9IGV2ZW50LnBvaW50O1xuXG5cdFx0XHQvLyBSZXNldCBUaW1lc3RhbXBzXG5cdFx0XHR0aGlzLmxhc3RUaW1lc3RhbXAgPSBldmVudFRpbWVTdGFtcDtcblxuXHRcdH07XG5cblx0XHQvLyBQYXBlciBUb29sIE1vdXNlIERyYWcgRXZlbnRcblx0XHR0b29sLm9uTW91c2VEcmFnID0gKGV2ZW50KSA9PiB7XG5cblx0XHRcdC8vIEdldCBFdmVudCBUaW1lc3RhbXAgYW5kIFRpbWVzdGFtcCBEZWx0YVxuXHRcdFx0bGV0IGV2ZW50VGltZVN0YW1wID0gZXZlbnQuZXZlbnQudGltZVN0YW1wO1xuXHRcdFx0bGV0IHRpbWVEZWx0YSA9IGV2ZW50VGltZVN0YW1wIC0gdGhpcy5sYXN0VGltZXN0YW1wO1xuXG5cdFx0XHQvLyBHZXQgbmV3IFRpbWUgZm9yIEluayBBcnJheVxuXHRcdFx0bGV0IHRpbWUgPSB0aGlzLmlua1syXVt0aGlzLmlua1syXS5sZW5ndGggLSAxXSArIHRpbWVEZWx0YTtcblxuXHRcdFx0Ly8gR2V0IFhZIHBvaW50IGZyb20gZXZlbnQgdy8gdGltZSBbbXNdIHRvIHVwZGF0ZSBJbmsgQXJyYXlcblx0XHRcdHVwZGF0ZUluayhldmVudC5wb2ludCwgdGltZSk7XG5cblx0XHRcdC8vIERyYXcgWFkgcG9pbnQgdG8gUGFwZXIgUGF0aFxuXHRcdFx0dGhpcy5wYXRoLmFkZChldmVudC5wb2ludCk7XG5cblx0XHRcdC8vIFJlc2V0IFRpbWVzdGFtcHNcblx0XHRcdHRoaXMubGFzdFRpbWVzdGFtcCA9IGV2ZW50VGltZVN0YW1wO1xuXHRcdFx0XG5cdFx0XHR0aGlzLmVtaXQoJ2RyYXdpbmcnLGV2ZW50VGltZVN0YW1wLCB0aGlzLmluayk7XG5cblx0XHRcdGNvbnN0IGNhbnZhc1NpemUgPSBnZXRDYW52YXNEaW1lbnNpb25zKCk7XG5cblx0XHRcdGlmIChjYW52YXNTaXplKSB7XG5cdFx0XHRcdGFwcC5zb2NrZXQuZW1pdCgnZHJhd2luZycsIHtcblx0XHRcdFx0XHRyb29tOiBhcHAuc29ja2V0LmlkLFxuXHRcdFx0XHRcdHgwOiB0aGlzLnByZXZQb2ludHMueCAvIGNhbnZhc1NpemUud2lkdGgsXG5cdFx0XHRcdFx0eTA6IHRoaXMucHJldlBvaW50cy55IC8gY2FudmFzU2l6ZS5oZWlnaHQsXG5cdFx0XHRcdFx0eDE6IGV2ZW50LnBvaW50LnggLyBjYW52YXNTaXplLndpZHRoLFxuXHRcdFx0XHRcdHkxOiBldmVudC5wb2ludC55IC8gY2FudmFzU2l6ZS5oZWlnaHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMucHJldlBvaW50cyA9IGV2ZW50LnBvaW50O1xuXG5cdFx0fTtcblxuXHR9O1xuXG5cdC8vLS0tIEluaXRpYWxpemUgSW5rIEFycmF5XG5cdGNvbnN0IGluaXRJbmsgPSAoKSA9PiB7XG5cdFx0dGhpcy5pbmsgPSBbXG5cdFx0XHRbXSxcblx0XHRcdFtdLFxuXHRcdFx0W11cblx0XHRdO1xuXHR9O1xuXG5cdC8vLS0tIFVwZGF0ZSBJbmsgQXJyYXkgdy8gWFkgUG9pbnQgKyBUaW1lXG5cdGNvbnN0IHVwZGF0ZUluayA9IChwb2ludCwgdGltZSkgPT4ge1xuXHRcdHRoaXMuaW5rWzBdLnB1c2gocG9pbnQueCk7XG5cdFx0dGhpcy5pbmtbMV0ucHVzaChwb2ludC55KTtcblx0XHR0aGlzLmlua1syXS5wdXNoKHRpbWUpO1xuXHR9O1xuXG5cdC8vLS0tIENsZWFyIFBhcGVyIERyYXdpbmcgQ2FudmFzXG5cdHRoaXMuY2xlYXJDYW52YXMgPSAoKSA9PiB7XG5cblx0XHQvLyBSZW1vdmUgUGFwZXIgUGF0aCBMYXllclxuXHRcdHBhcGVyLnByb2plY3QuYWN0aXZlTGF5ZXIucmVtb3ZlQ2hpbGRyZW4oKTtcblx0XHRwYXBlci52aWV3LmRyYXcoKTtcblxuXHRcdC8vIEluaXQgSW5rIEFycmF5XG5cdFx0aW5pdEluaygpO1xuXHR9O1xuXG5cdHRoaXMuc3RvcCA9ICgpID0+IHtcblx0XHRpZiAocGFwZXIudG9vbCkgcGFwZXIudG9vbC5yZW1vdmUoKTtcblx0fTtcblxuXHQvLy0tLSBHZXQgUGFwZXIgQ2FudmFzIERpbWVuc2lvbnMgV2lkdGgvSGVpZ2h0XG5cdGNvbnN0IGdldENhbnZhc0RpbWVuc2lvbnMgPSAoKSA9PiB7XG5cdFx0aWYgKCEgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpKSAgcmV0dXJuO1xuXG5cdFx0bGV0IHcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykub2Zmc2V0V2lkdGg7XG5cdFx0bGV0IGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykub2Zmc2V0SGVpZ2h0O1xuXHRcdHJldHVybiB7XG5cdFx0XHRoZWlnaHQ6IGgsXG5cdFx0XHR3aWR0aDogd1xuXHRcdH07XG5cdH07XG5cbn0iLCJ2YXIgSCA9IHJlcXVpcmUoXCJob2dhbi5qc1wiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHZhciBUID0gbmV3IEguVGVtcGxhdGUoe2NvZGU6IGZ1bmN0aW9uIChjLHAsaSkgeyB2YXIgdD10aGlzO3QuYihpPWl8fFwiXCIpO3QuYihcIjxkaXYgaWQ9XFxcInFyY29kZS1jYXJkXFxcIiBjbGFzcz1cXFwidWstY2FyZCB1ay1jYXJkLWRlZmF1bHQgdWstYm9yZGVyLXJvdW5kZWQgdWstcGFkZGluZy1yZW1vdmUtbGVmdFxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDxkaXYgaWQ9XFxcInFyY29kZS1jYXJkLWJvZHlcXFwiIGNsYXNzPVxcXCJ1ay1jYXJkLWJvZHlcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGRpdiB1ay1ncmlkPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLTMtNVxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cXFwidWstaDQgdWstdGV4dC1tdXRlZCB1ay1tYXJnaW4tdG9wXFxcIiBkYXRhLWkxOG49XFxcInBhZ2UuYWNjZXNzXFxcIj5cIik7dC5iKHQudih0LmYoXCJxcmNvZGVUZXh0XCIsYyxwLDApKSk7dC5iKFwiPC9oND5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC0yLTVcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIpO3QuYih0LnYodC5mKFwicXJjb2RlXCIsYyxwLDApKSk7dC5iKFwiXFxcIiBhbHQ9XFxcIlwiKTt0LmIodC52KHQuZihcImV4dGVybmFsQ2FyZFVSTFwiLGMscCwwKSkpO3QuYihcIlxcXCIgd2lkdGg9XFxcIjEyMlxcXCIgaGVpZ2h0PVxcXCIxMjJcXFwiIC8+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDxkaXYgaWQ9XFxcIm5vLXBob25lLWZvb3RlclxcXCIgY2xhc3M9XFxcInVrLXBhZGRpbmctcmVtb3ZlLWJvdHRvbSBcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGJ1dHRvbiBpZD1cXFwibm8tcGhvbmUtYnRcXFwiXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tdGV4dCB1ay1idXR0b24tbGFyZ2UgdWstd2lkdGgtMS0xXFxcIlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgIGRhdGEtaTE4bj1cXFwiY2hhbGxlbmdlcy5wYWdlLm5vLXBob25lLXRleHRcXFwiPlwiKTt0LmIodC52KHQuZihcIm5vUGhvbmVUZXh0XCIsYyxwLDApKSk7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDwvYnV0dG9uPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCI8L2Rpdj5cIik7cmV0dXJuIHQuZmwoKTsgfSxwYXJ0aWFsczoge30sIHN1YnM6IHsgIH19LCBcIjxkaXYgaWQ9XFxcInFyY29kZS1jYXJkXFxcIiBjbGFzcz1cXFwidWstY2FyZCB1ay1jYXJkLWRlZmF1bHQgdWstYm9yZGVyLXJvdW5kZWQgdWstcGFkZGluZy1yZW1vdmUtbGVmdFxcXCI+XFxuICAgIDxkaXYgaWQ9XFxcInFyY29kZS1jYXJkLWJvZHlcXFwiIGNsYXNzPVxcXCJ1ay1jYXJkLWJvZHlcXFwiPlxcbiAgICAgICAgPGRpdiB1ay1ncmlkPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLTMtNVxcXCI+XFxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cXFwidWstaDQgdWstdGV4dC1tdXRlZCB1ay1tYXJnaW4tdG9wXFxcIiBkYXRhLWkxOG49XFxcInBhZ2UuYWNjZXNzXFxcIj57e3FyY29kZVRleHR9fTwvaDQ+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtMi01XFxcIj5cXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XFxcInt7cXJjb2RlfX1cXFwiIGFsdD1cXFwie3tleHRlcm5hbENhcmRVUkx9fVxcXCIgd2lkdGg9XFxcIjEyMlxcXCIgaGVpZ2h0PVxcXCIxMjJcXFwiIC8+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgaWQ9XFxcIm5vLXBob25lLWZvb3RlclxcXCIgY2xhc3M9XFxcInVrLXBhZGRpbmctcmVtb3ZlLWJvdHRvbSBcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwibm8tcGhvbmUtYnRcXFwiXFxuICAgICAgICAgICAgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tdGV4dCB1ay1idXR0b24tbGFyZ2UgdWstd2lkdGgtMS0xXFxcIlxcbiAgICAgICAgICAgIGRhdGEtaTE4bj1cXFwiY2hhbGxlbmdlcy5wYWdlLm5vLXBob25lLXRleHRcXFwiPnt7bm9QaG9uZVRleHR9fVxcbiAgICAgICAgPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlwiLCBIKTtyZXR1cm4gVC5yZW5kZXIuYXBwbHkoVCwgYXJndW1lbnRzKTsgfTsiLCIvL21vZHVsZXNcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgZWUgZnJvbSAnZXZlbnQtZW1pdHRlcic7XG5pbXBvcnQgUVJDb2RlIGZyb20gJ3FyY29kZSc7XG5cbmltcG9ydCBjaGFsbGVuZ2VNdXN0YWNoZSBmcm9tICcuL2NoYWxsZW5nZS5odG1sJztcbmltcG9ydCBjaGFsbGVuZ2VRUmNvZGVNdXN0YWNoZSBmcm9tICcuL2NoYWxsZW5nZS1xcmNvZGUuaHRtbCc7XG5cblxuZnVuY3Rpb24gQ2hhbGxlbmdlVmlldygpIHtcblxuXHRsZXQgYXBwO1xuXG5cdC8vZW1pdHRlclxuXHRlZSh0aGlzKTtcblxuXHRhcHAgPSB1bmRlZmluZWQ7XG5cdHRoaXMuY2hhbGxlbmdlID0gdW5kZWZpbmVkO1xuXHR0aGlzLmN1cnJlbnREcmF3Q2hhbGxlbmdlID0gdW5kZWZpbmVkO1xuXHR0aGlzLnBhZ2VEYXRhID0ge1xuXHRcdG5hbWU6ICcnLFxuXHRcdHNob3J0OiAnJyxcblx0XHRkZXNjcmlwdGlvbjogJycsXG5cdFx0ZHJhdzogJycsXG5cdFx0ZHJhd0NhdGVnb3J5OiAnJyxcblx0XHRjYXRlZ29yeVNsdWc6ICcnLFxuXHRcdHRpbWU6IDAsXG5cdFx0cmVhZHk6ICcnLFxuXHRcdGJhY2s6ICcnLFxuXHRcdGludmVyc2VDb2xvdXI6IHVuZGVmaW5lZCxcblx0fTtcblxuXG5cdHRoaXMuaW5pdCA9IGFzeW5jIChjb250ZXh0KSA9PiB7XG5cblx0XHQvL3NldHVwXG5cdFx0YXBwID0gY29udGV4dDtcblxuXHRcdHRoaXMuY2hhbGxlbmdlID0gYXBwLmdldENoYWxsZW5nZShhcHAuZ2FtZVN0YXRlLmN1cnJlbnRDaGFsbGVuZ2UpO1xuXHRcdHRoaXMuY3VycmVudERyYXdDaGFsbGVuZ2UgPSBwaWNrRHJhd0NhdGVnb3J5KCk7XG5cblx0XHRhcHAuZ2FtZVN0YXRlLmN1cnJlbnRDYXRlZ29yeSA9IHRoaXMuY3VycmVudERyYXdDaGFsbGVuZ2U7XG5cblx0XHRjb25zdCBjYXRlZ29yeVNsdWcgPSB0aGlzLmN1cnJlbnREcmF3Q2hhbGxlbmdlLnJlcGxhY2UoL1xccy9nLCAnLScpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRjb25zdCBleHRlcm5hbENhcmRVUkwgPSBgaHR0cDovL3d3dy5nYW1lcGljdGlvLmNvbS9jYXJkLyR7YXBwLnNvY2tldC5pZH1gO1xuXHRcdFxuXHRcdGNvbnN0IHFyQ29kZSA9IGF3YWl0IFFSQ29kZS50b0RhdGFVUkwoZXh0ZXJuYWxDYXJkVVJMKTtcblxuXHRcdC8vZGF0YVxuXHRcdHRoaXMucGFnZURhdGEgPSB7XG5cdFx0XHRuYW1lOiBhcHAuaTE4bmV4dC50KGBjaGFsbGVuZ2VzLmNoYWxsZW5nZXMuJHt0aGlzLmNoYWxsZW5nZS5zaG9ydH0ubmFtZWApLFxuXHRcdFx0c2hvcnQ6IHRoaXMuY2hhbGxlbmdlLnNob3J0LFxuXHRcdFx0ZGVzY3JpcHRpb246IGFwcC5pMThuZXh0LnQoYGNoYWxsZW5nZXMuY2hhbGxlbmdlcy4ke3RoaXMuY2hhbGxlbmdlLnNob3J0fS5kZXNjcmlwdGlvbmApLFxuXHRcdFx0ZHJhdzogYXBwLmkxOG5leHQudCgnY2hhbGxlbmdlcy5wYWdlLmRyYXcnKSxcblx0XHRcdGRyYXdDYXRlZ29yeTogYXBwLmkxOG5leHQudChgY2F0ZWdvcmllcy4ke2NhdGVnb3J5U2x1Z31gKSxcblx0XHRcdGNhdGVnb3J5U2x1ZzogY2F0ZWdvcnlTbHVnLFxuXHRcdFx0dGltZTogdGhpcy5jaGFsbGVuZ2UudGltZSxcblx0XHRcdHJlYWR5OiBhcHAuaTE4bmV4dC50KCdjaGFsbGVuZ2VzLnBhZ2UucmVhZHknKSxcblx0XHRcdGJhY2s6IGFwcC5pMThuZXh0LnQoJ2NoYWxsZW5nZXMucGFnZS5iYWNrJyksXG5cdFx0XHRpbnZlcnNlQ29sb3VyOiBhcHAuaW50ZXJmYWNlLmludmVyc2VDbGFzcygpLFxuXHRcdFx0b25lUGxheWVyOiBhcHAuZ2FtZVN0YXRlLnBsYXllcnMgPT0gMSxcblx0XHRcdHFyY29kZVRleHQ6IGFwcC5pMThuZXh0LnQoJ2NoYWxsZW5nZXMucGFnZS5xcmNvZGVUZXh0JyksXG5cdFx0XHRub1Bob25lVGV4dDogYXBwLmkxOG5leHQudCgnY2hhbGxlbmdlcy5wYWdlLnBhZ2Uubm8tcGhvbmUtdGV4dCcpLFxuXHRcdFx0ZXh0ZXJuYWxDYXJkVVJMOiBleHRlcm5hbENhcmRVUkwsXG5cdFx0XHRxcmNvZGU6IHFyQ29kZVxuXHRcdH07XG5cblx0XHQvL2J1aWQgcGFnZVxuXHRcdGNvbnN0IGNoYWxsZW5nZUhUTUwgPSBjaGFsbGVuZ2VNdXN0YWNoZSh0aGlzLnBhZ2VEYXRhKTtcblx0XHQkKGNoYWxsZW5nZUhUTUwpLmFwcGVuZFRvKCQoJyN2aWV3JykpO1xuXG5cdFx0YXBwLnNwZWFrKGAke2FwcC5pMThuZXh0LnQoJ2NoYWxsZW5nZXMuc3BlYWsudGhlLWNoYWxsZW5nZS1pcycpfSAke3RoaXMucGFnZURhdGEubmFtZX1gKTtcblxuXHRcdGxldCB0b1NwZWFrO1xuXG5cdFx0aWYgKGFwcC5nYW1lU3RhdGUucGxheWVycyA9PT0gMSB8fCBhcHAuZ2FtZVN0YXRlLm5vUGhvbmUpIHtcblxuXHRcdFx0dG9TcGVhayA9IGAke2FwcC5pMThuZXh0LnQoJ2NoYWxsZW5nZXMuc3BlYWsueW91LW11c3QtZHJhdycpfSAke3RoaXMucGFnZURhdGEudGltZX0gJHthcHAuaTE4bmV4dC50KCdjaGFsbGVuZ2VzLnNwZWFrLnNlY29uZHMnKX1gO1xuXHRcdFx0YXBwLnNwZWFrKHRvU3BlYWspO1xuXG5cdFx0XHR0b1NwZWFrID0gYCR7YXBwLmkxOG5leHQudCgnY2hhbGxlbmdlcy5zcGVhay5hcmUteW91LXJlYWR5Jyl9YDtcblx0XHRcdGFwcC5zcGVhayh0b1NwZWFrKTtcblxuXHRcdFx0JCgnLnVrLWNhcmQnKS5jbGljayh0aGlzLCBjYWxsR2FtZSk7XG5cblx0XHRcdC8vYW5pbWF0aW9uXG5cdFx0XHRzaG93RHJhd2luZ0NhcmQoe2RlbGF5OjEwMDB9KTtcblxuXHRcdH0gZWxzZSBpZiAoYXBwLmdhbWVTdGF0ZS5wbGF5ZXJzID09PSAyKSB7XG5cblx0XHRcdGFwcC5zcGVhayhhcHAuaTE4bmV4dC50KCdjaGFsbGVuZ2VzLnBhZ2UucXJjb2RlVGV4dCcpKTtcblx0XHRcdCQoJyNkcmF3aW5nLWNhcmQnKS5jc3MoJ2Rpc3BsYXknLCdub25lJyk7XG5cdFx0XHQkKCcjYmFjaycpLmNsaWNrKHRoaXMsIGdvQmFjayk7XG5cblx0XHRcdHNob3dRUkNvZGVDYXJkKCk7XG5cdFx0XHRcblx0XHR9XG5cdFx0XG5cdFx0Ly90cmFuc2xhdGVcblx0XHR0cmFuc2xhdGUoKTtcblxuXHRcdC8vaG9tZSBidXR0b25cblx0XHQkKCcjaG9tZS1idXR0b24nKS5jbGljaygoKSA9PiB7XG5cdFx0XHRob21lQnV0dG9uKCdob21lJyk7XG5cdFx0fSk7XG5cblx0XHQvL2VtaXQgdG8gc29ja2VyIElPXG5cdFx0ZW1pdFRvRGFzaGJvYXJkKHtcblx0XHRcdG5hbWU6IHRoaXMucGFnZURhdGEubmFtZSxcblx0XHRcdHNob3J0OiB0aGlzLnBhZ2VEYXRhLnNob3J0LFxuXHRcdFx0ZGVzY3JpcHRpb246IHRoaXMucGFnZURhdGEuZGVzY3JpcHRpb24sXG5cdFx0XHRkcmF3Q2F0ZWdvcnk6IHRoaXMucGFnZURhdGEuZHJhd0NhdGVnb3J5LFxuXHRcdFx0dGltZTogdGhpcy5wYWdlRGF0YS50aW1lLFxuXHRcdFx0Y29sb3VyQ2xhc3M6IHRoaXMucGFnZURhdGEuaW52ZXJzZUNvbG91cixcblx0XHRcdHBsYXllcnM6IGFwcC5nYW1lU3RhdGUucGxheWVyc1xuXHRcdH0pO1xuXG5cdFx0aWYgKGFwcC5nYW1lU3RhdGUucGxheWVycyA+IDEpIHtcblx0XHRcdGlmIChhcHAudmlydHVhbENhcmRSZWdpc3RlcmVkKSB7XG5cdFx0XHRcdGVtaXRUb0NhcmQoe1xuXHRcdFx0XHRcdGFjdGlvbjogJ25ldycsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRhcHAuc29ja2V0Lm9uKCdjYXJkJywgY2FyZExpc3RlbmVycyk7XG5cdFx0fVxuXG5cdFx0ZW50ZXJBbmltYXRpb24oKTtcblxuXHR9O1xuXG5cdGNvbnN0IHBpY2tEcmF3Q2F0ZWdvcnkgPSAoKSA9PiB7XG5cdFx0Ly9waWNrIGEgZHJhdyBjYXRlZ29yeVxuXHRcdGNvbnN0IGZpbHRlcmVkQ2F0ZXRvcmllcyA9IGZpbHRlckNhdGVnb3JpZXModGhpcy5jaGFsbGVuZ2UuY29kZSk7XG5cdFx0Y29uc3QgcmFuZG9tRHJhdyA9IGZpbHRlcmVkQ2F0ZXRvcmllc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmaWx0ZXJlZENhdGV0b3JpZXMubGVuZ3RoKV07XG5cdFx0cmV0dXJuIHJhbmRvbURyYXcuQ2F0ZWdvcnk7IC8vIHNhdmUgY3VycmVudCBkcmF3IGNhdGVnb3J5XG5cdH07XG5cblx0Ly8tLSBGaWx0ZXIgY2F0ZWdvcnkgYnkgY2FobGxlbmdlIGNvZGUgXG5cdGNvbnN0IGZpbHRlckNhdGVnb3JpZXMgPSAoY29kZSkgPT4ge1xuXG5cdFx0bGV0IGZpbHRlcmVkQ2F0ID0gW107XG5cblx0XHQvL2xvb3AgY2F0ZWdvcmllcyBkcmF3XG5cdFx0Zm9yIChsZXQgY2F0IG9mIGFwcC5tZWNoYW5pY3MuY2F0Q2hhbGxlbmdlcykge1xuXG5cdFx0XHQvLyBpZiBjYXRlZ29yeSBmaXRzIGluIG9ubHkgb25lIGNoYWxsZW5nZVxuXHRcdFx0aWYgKGNhdC5DaGFsbGVuZ2UubGVuZ3RoID09IDEpIHtcblx0XHRcdFx0aWYgKGNhdC5DaGFsbGVuZ2UgPT0gY29kZSkgZmlsdGVyZWRDYXQucHVzaChjYXQpO1xuXG5cdFx0XHRcdC8vIGNhcnRlZ29yeSBmaXRzIGludG8gbW9yZSB0aGFuIG9uZSBjYXRlZ29yeVxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvL3NwbGl0IGNvbW1hIHNlcGFyYXRlZCBjYXRlb3JpZXNcblx0XHRcdFx0bGV0IGNoQXJyYXkgPSBjYXQuQ2hhbGxlbmdlLnNwbGl0KCcsJyk7XG5cblx0XHRcdFx0Ly9sb29wXG5cdFx0XHRcdGZvciAobGV0IGNoYWxsIG9mIGNoQXJyYXkpIHtcblx0XHRcdFx0XHRpZiAoY2hhbGwgPT0gY29kZSkgZmlsdGVyZWRDYXQucHVzaChjYXQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmlsdGVyZWRDYXQ7XG5cdH07XG5cblx0Y29uc3QgdHJhbnNsYXRlID0gKCkgPT4ge1xuXHRcdCQoJyNjaGFsbGVuZ2UnKS5sb2NhbGl6ZSgpO1xuXHR9O1xuXG5cdGNvbnN0IGNhbGxHYW1lID0gKCkgPT4ge1xuXHRcdGNvbnN0IGR1cmF0aW9uID0gMTUwMDtcblxuXHRcdCQoJyNjaGFsbGVuZ2UnKS5hbmltYXRlKHtcblx0XHRcdG1hcmdpblRvcDogJy0xMDAnLFxuXHRcdFx0b3BhY2l0eTogMCxcblx0XHR9LCBkdXJhdGlvbiwgKCkgPT4ge1xuXHRcdFx0dGhpcy5lbWl0KCdjaGFuZ2VWaWV3Jywge1xuXHRcdFx0XHRzb3VyY2U6ICdjaGFsbGVuZ2UnLFxuXHRcdFx0XHR0YXJnZXQ6J2dhbWUnXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fTtcblxuXHQvL2NvbW1pbmcgZnJvbSB0aGUgY2FyZCAob24gYW5vdGhlciBkZXZpY2UpXG5cdGNvbnN0IGNhcmRMaXN0ZW5lcnMgPSAoY2FyZCkgPT4ge1xuXG5cdFx0aWYgKGNhcmQuYWN0aW9uID09ICdzdGFydCcpIHtcblxuXHRcdFx0YXBwLnZpcnR1YWxDYXJkUmVnaXN0ZXJlZCA9IHRydWU7XG5cblx0XHRcdGVtaXRUb0NhcmQoe1xuXHRcdFx0XHRhY3Rpb246ICduZXcnLFxuXHRcdFx0fSk7XG5cblx0XHR9IGVsc2UgaWYgKGNhcmQuYWN0aW9uID09ICdwbGF5Jykge1xuXG5cdFx0XHRjb25zdCBkdXJhdGlvbiA9IDE1MDA7XG5cblx0XHRcdCQoJyNjaGFsbGVuZ2UnKS5hbmltYXRlKHtcblx0XHRcdFx0bWFyZ2luVG9wOiAnLTEwMCcsXG5cdFx0XHRcdG9wYWNpdHk6IDAsXG5cdFx0XHR9LCBkdXJhdGlvbiwgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmVtaXQoJ2NoYW5nZVZpZXcnLCB7XG5cdFx0XHRcdFx0c291cmNlOiAnY2hhbGxlbmdlJyxcblx0XHRcdFx0XHR0YXJnZXQ6J2dhbWUnXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGhvbWVCdXR0b24gPSAoKSA9PiB7XG5cdFx0JCgnI2NoYWxsZW5nZScpLmFuaW1hdGUoe1xuXHRcdFx0bWFyZ2luVG9wOiAnLTEwMCcsXG5cdFx0XHRvcGFjaXR5OiAwLFxuXHRcdH0sIDE1MDAsICgpID0+IHtcblx0XHRcdHRoaXMuZW1pdCgnY2hhbmdlVmlldycsIHtcblx0XHRcdFx0c291cmNlOiAnY2hhbGxlbmdlJyxcblx0XHRcdFx0dGFyZ2V0Oidob21lJ1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRlbWl0VG9DYXJkKHtcblx0XHRcdGFjdGlvbjogJ3dhaXQnLFxuXHRcdH0pO1xuXG5cdFx0Ly9lbWl0IHRvIHNvY2tlciBJT1xuXHRcdGVtaXRUb0Rhc2hib2FyZCh7XG5cdFx0XHR2aWV3OiAnd2FpdGluZydcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBnb0JhY2sgPSAoKSA9PiB7XG5cdFx0Y29uc3QgZHVyYXRpb24gPSAxNTAwO1xuXG5cdFx0ZW1pdFRvQ2FyZCh7XG5cdFx0XHRhY3Rpb246ICd3YWl0Jyxcblx0XHR9KTtcblxuXHRcdCQoJyNjaGFsbGVuZ2UnKS5hbmltYXRlKHtcblx0XHRcdG1hcmdpblRvcDogJy0xMDAnLFxuXHRcdFx0b3BhY2l0eTogMCxcblx0XHR9LCBkdXJhdGlvbiwgKCkgPT4ge1xuXHRcdFx0dGhpcy5lbWl0KCdjaGFuZ2VWaWV3Jywge1xuXHRcdFx0XHRzb3VyY2U6ICdjaGFsbGVuZ2UnLFxuXHRcdFx0XHR0YXJnZXQ6J2NoYWxsZW5nZXMnXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fTtcblxuXHQvL2FuaW1hdGlvblxuXHRjb25zdCBlbnRlckFuaW1hdGlvbiA9ICgpID0+IHtcblxuXHRcdGNvbnN0IGR1cmF0aW9uID0gMTUwMDtcblxuXHRcdGNvbnN0IGNvbnRhaW5lciA9ICQoJyNjaGFsbGVuZ2UnKTtcblx0XHRjb250YWluZXIuY3NzKCdvcGFjaXR5JywgMCk7XG5cdFx0Y29udGFpbmVyLmNzcygnbWFyZ2luVG9wJywgMTAwKTtcblxuXHRcdC8vYW5pbWF0aW9uXG5cdFx0Y29udGFpbmVyLmFuaW1hdGUoe1xuXHRcdFx0bWFyZ2luVG9wOiAwLFxuXHRcdFx0b3BhY2l0eTogMSxcblx0XHR9LCBkdXJhdGlvbik7XG5cblx0fTtcblxuXHRjb25zdCBzaG93RHJhd2luZ0NhcmQgPSAoe2RlbGF5fSkgPT4ge1xuXG5cdFx0JCgnI3BsYXknKS5jbGljayh0aGlzLCBjYWxsR2FtZSk7XG5cblx0XHRjb25zdCBkdXJhdGlvbiA9IDE1MDA7XG5cblx0XHRjb25zdCBjYXJkID0gJCgnI2RyYXdpbmctY2FyZCcpO1xuXHRcdGNvbnN0IGNhcmRIZWlnaHQgPSBjYXJkLmhlaWdodCgpO1xuXHRcdGNhcmQuY3NzKCdoZWlnaHQnLCAwKTtcblx0XHRjYXJkLmNzcygnb3BhY2l0eScsIDApO1xuXG5cdFx0Y2FyZC5kZWxheShkZWxheSkuYW5pbWF0ZSh7XG5cdFx0XHRoZWlnaHQ6IGNhcmRIZWlnaHQsXG5cdFx0XHRvcGFjaXR5OiAxLFxuXHRcdH0sIGR1cmF0aW9uKTtcblx0fTtcblxuXHRjb25zdCBzaG93UVJDb2RlQ2FyZCA9ICgpID0+IHtcblxuXHRcdGNvbnN0IGR1cmF0aW9uID0gMTUwMDtcblxuXHRcdC8vYnVpZCBwYWdlXG5cdFx0Y29uc3QgUVJDYXJkSFRNTCA9IGNoYWxsZW5nZVFSY29kZU11c3RhY2hlKHRoaXMucGFnZURhdGEpO1xuXHRcdCQoUVJDYXJkSFRNTCkuYXBwZW5kVG8oJCgnI2NhcmQnKSk7XG5cblx0XHQkKCcjbm8tcGhvbmUtYnQnKS5jbGljayh0aGlzLCBub1Bob25lQWN0aW9uKTtcblxuXHRcdGNvbnN0IGNhcmQgPSAkKCcjcXJjb2RlLWNhcmQnKTtcblx0XHQvLyBjb25zdCBxUkNhcmRCb2R5ID0gJCgnI3FyY29kZS1jYXJkLWJvZHknKTtcblxuXHRcdC8vIGNvbnN0IGNhcmRIZWlnaHQgPSBjYXJkLmhlaWdodCgpO1xuXHRcdC8vIGNvbnN0IGNhcmRCb2R5SGVpZ2h0ID0gcVJDYXJkQm9keS5vdXRlckhlaWdodCgpO1xuXG5cdFx0Y2FyZC5jc3MoJ2hlaWdodCcsIDApO1xuXHRcdGNhcmQuY3NzKCdvcGFjaXR5JywgMCk7XG5cblx0XHRjb25zdCBjYXJkRm9vdGVyID0gJCgnI25vLXBob25lLWZvb3RlcicpO1xuXHRcdGNhcmRGb290ZXIuY3NzKCdkaXNwbGF5Jywnbm9uZScpO1xuXHRcdGNhcmRGb290ZXIuY3NzKCdvcGFjaXR5JywgMCk7XG5cblx0XHRjb25zdCBjYXJkSGVhZGVyID0gJCgnI25vLXBob25lLWhlYWRlcicpO1xuXHRcdGNhcmRIZWFkZXIuY3NzKCdkaXNwbGF5Jywnbm9uZScpO1xuXHRcdGNhcmRIZWFkZXIuY3NzKCdvcGFjaXR5JywgMCk7XG5cblx0XHRjYXJkLmRlbGF5KDEwMDApLmFuaW1hdGUoe1xuXHRcdFx0aGVpZ2h0OiAxODIsIC8vY2FyZEJvZHlIZWlnaHQgLSAyNSxcblx0XHRcdG9wYWNpdHk6IDEsXG5cdFx0fSwgZHVyYXRpb24sICgpID0+IHtcblx0XHRcdG5vUGhvbmVGb290ZXIoKTtcblx0XHR9KTtcblxuXHRcdGNvbnN0IG5vUGhvbmVGb290ZXIgPSAoKSA9PiB7XG5cdFx0XG5cdFx0XHRjb25zdCBkdXJhdGlvbiA9IDE1MDA7XG5cdFx0XHRjb25zdCBkZWxheSA9IDEwMDA7XG5cdFxuXHRcdFx0Y29uc3QgY2FyZCA9ICQoJyNxcmNvZGUtY2FyZCcpO1xuXHRcdFx0Y29uc3QgY2FyZEhlaWdodCA9IGNhcmQuaGVpZ2h0KCk7XG5cdFxuXHRcdFx0Y29uc3QgY2FyZEZvb3RlciA9ICQoJyNuby1waG9uZS1mb290ZXInKTtcblx0XG5cdFx0XHRjYXJkLmRlbGF5KGRlbGF5KS5hbmltYXRlKHtcblx0XHRcdFx0aGVpZ2h0OiBjYXJkSGVpZ2h0ICsgNjVcblx0XHRcdH0sIGR1cmF0aW9uKTtcblx0XG5cdFx0XHRjYXJkRm9vdGVyLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7XG5cdFx0XHRjYXJkRm9vdGVyLmRlbGF5KGRlbGF5KS5hbmltYXRlKHtcblx0XHRcdFx0b3BhY2l0eTogMSxcblx0XHRcdH0sIGR1cmF0aW9uKTtcblx0XHR9O1xuXHR9O1xuXG5cdGNvbnN0IG5vUGhvbmVBY3Rpb24gPSAoKSA9PiB7XG5cblx0XHRhcHAuZ2FtZVN0YXRlLm5vUGhvbmUgPSB0cnVlO1xuXG5cdFx0Y29uc3QgZHVyYXRpb24gPSAxNTAwO1xuXG5cdFx0Y29uc3QgUVJjYXJkID0gJCgnI3FyY29kZS1jYXJkJyk7XG5cblx0XHRRUmNhcmQuYW5pbWF0ZSh7XG5cdFx0XHRoZWlnaHQ6IDAsXG5cdFx0XHRvcGFjaXR5OiAxLFxuXHRcdH0sIGR1cmF0aW9uLCAoKSA9PiB7XG5cdFx0XHRRUmNhcmQuY3NzKCdkaXNwbGF5Jywnbm9uZScpO1xuXHRcdFx0JCgnI2RyYXdpbmctY2FyZCcpLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7XG5cdFx0XHRzaG93RHJhd2luZ0NhcmQoe2RlbGF5OjB9KTtcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBlbWl0VG9DYXJkID0gKHtcblx0XHR0eXBlID0gJ2NhcmQnLFxuXHRcdHZpZXcgPSAnY2hhbGxlbmdlJyxcblx0XHRhY3Rpb24gPSAnbmV3Jyxcblx0XHRyb29tID0gYXBwLnNvY2tldC5pZCxcblx0XHRuYW1lID0gdGhpcy5wYWdlRGF0YS5uYW1lLFxuXHRcdHNob3J0ID0gdGhpcy5wYWdlRGF0YS5zaG9ydCxcblx0XHRkcmF3ID0gdGhpcy5wYWdlRGF0YS5kcmF3LFxuXHRcdGRyYXdDYXRlZ29yeSA9IHRoaXMucGFnZURhdGEuZHJhd0NhdGVnb3J5LFxuXHRcdHRpbWUgPSB0aGlzLnBhZ2VEYXRhLnRpbWUsXG5cdFx0cmVhZHkgPSB0aGlzLnBhZ2VEYXRhLnJlYWR5XG5cdH0pID0+IHtcblx0XHRhcHAuc29ja2V0LmVtaXQodHlwZSwge3ZpZXcsIGFjdGlvbiwgcm9vbSwgbmFtZSwgc2hvcnQsIGRyYXcsIGRyYXdDYXRlZ29yeSwgdGltZSwgcmVhZHl9KTtcblx0fTtcblxuXHRjb25zdCBlbWl0VG9EYXNoYm9hcmQgPSAoe1xuXHRcdHR5cGUgPSAnaW50ZXJmYWNlJyxcblx0XHR2aWV3ID0gJ2NoYWxsZW5nZScsXG5cdFx0cm9vbSA9IGFwcC5zb2NrZXQuaWQsXG5cdFx0bmFtZSA9ICcnLFxuXHRcdHNob3J0ID0gJycsXG5cdFx0ZGVzY3JpcHRpb24gPSAnJyxcblx0XHRkcmF3Q2F0ZWdvcnkgPSAnJyxcblx0XHR0aW1lID0gMCxcblx0XHRjb2xvdXJDbGFzcyA9ICcnLFxuXHRcdHBsYXllcnMgPSAwXG5cdH0pID0+IHtcblx0XHRhcHAuc29ja2V0LmVtaXQodHlwZSwge3ZpZXcsIHJvb20sIG5hbWUsIHNob3J0LCBkZXNjcmlwdGlvbiwgZHJhd0NhdGVnb3J5LCB0aW1lLCBjb2xvdXJDbGFzcywgcGxheWVyc30pO1xuXHR9O1xuXHRcblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQ2hhbGxlbmdlVmlldygpOyIsInZhciBIID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgdmFyIFQgPSBuZXcgSC5UZW1wbGF0ZSh7Y29kZTogZnVuY3Rpb24gKGMscCxpKSB7IHZhciB0PXRoaXM7dC5iKGk9aXx8XCJcIik7dC5iKFwiPGRpdiBpZD1cXFwiY2hhbGxlbmdlXFxcIiBjbGFzcz1cXFwidWstY29udGFpbmVyIHVrLWNvbnRhaW5lci1zbWFsbCB1ay1wb3NpdGlvbi1jZW50ZXIgdWstdGV4dC1jZW50ZXJcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8aDIgaWQ9XFxcInRpdGxlXFxcIiBjbGFzcz1cXFwidWstaDIgXCIpO3QuYih0LnYodC5mKFwiaW52ZXJzZUNvbG91clwiLGMscCwwKSkpO3QuYihcIlxcXCIgZGF0YS1pMThuPVxcXCJjaGFsbGVuZ2VzLmNoYWxsZW5nZXMuXCIpO3QuYih0LnYodC5mKFwic2hvcnRcIixjLHAsMCkpKTt0LmIoXCIubmFtZVxcXCI+XCIpO3QuYih0LnYodC5mKFwibmFtZVwiLGMscCwwKSkpO3QuYihcIjwvaDI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDxkaXYgY2xhc3M9XFxcInVrLW1hcmdpbi1yZW1vdmUtdG9wXFxcIiB1ay1ncmlkPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtZXhwYW5kXFxcIj48L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDxkaXYgaWQ9XFxcImRlc2NyaXB0aW9uXFxcIiBjbGFzcz1cXFwidWstd2lkdGgtMi0zXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4tbWVkaXVtLWJvdHRvbSBcIik7dC5iKHQudih0LmYoXCJpbnZlcnNlQ29sb3VyXCIsYyxwLDApKSk7dC5iKFwiXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPHAgZGF0YS1pMThuPVxcXCJjaGFsbGVuZ2VzLmNoYWxsZW5nZXMuXCIpO3QuYih0LnYodC5mKFwic2hvcnRcIixjLHAsMCkpKTt0LmIoXCIuZGVzY3JpcHRpb25cXFwiPlwiKTt0LmIodC52KHQuZihcImRlc2NyaXB0aW9uXCIsYyxwLDApKSk7dC5iKFwiPC9wPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgIDxkaXYgdWstZ3JpZD5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtZXhwYW5kXFxcIj48L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPGRpdiBpZD0nY2FyZCcgY2xhc3M9XFxcInVrLXdpZHRoLTItM1xcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJkcmF3aW5nLWNhcmRcXFwiIGNsYXNzPVxcXCJ1ay1jYXJkIHVrLWNhcmQtZGVmYXVsdCB1ay1ib3gtc2hhZG93LWxhcmdlIHVrLWJvcmRlci1yb3VuZGVkIHVrLW1hcmdpbi1zbWFsbC1sZWZ0IHVrLXBhZGRpbmctcmVtb3ZlLWxlZnQgXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jYXJkLWhlYWRlclxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cXFwidWstaDQgdWstbWFyZ2luLXJlbW92ZS1ib3R0b21cXFwiIGRhdGEtaTE4bj1cXFwiY2hhbGxlbmdlcy5wYWdlLmRyYXdcXFwiPlwiKTt0LmIodC52KHQuZihcImRyYXdcIixjLHAsMCkpKTt0LmIoXCI8L2g0PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstY2FyZC1ib2R5IHVrLWNhcmQtcHJpbWFyeSB1ay1ib3gtc2hhZG93LWxhcmdlIHVrLWxpZ2h0XFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVxcXCJ1ay1oMlxcXCIgZGF0YS1pMThuPVxcXCJjYXRlZ29yaWVzLlwiKTt0LmIodC52KHQuZihcImNhdGVnb3J5U2x1Z1wiLGMscCwwKSkpO3QuYihcIlxcXCI+XCIpO3QuYih0LnYodC5mKFwiZHJhd0NhdGVnb3J5XCIsYyxwLDApKSk7dC5iKFwiPC9oMj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcInVrLXRleHQtc21hbGxcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdWstaWNvbj1cXFwiZnV0dXJlXFxcIiBjbGFzcz1cXFwidWstbWFyZ2luLXNtYWxsLXJpZ2h0XFxcIj48L3NwYW4+XCIpO3QuYih0LnYodC5mKFwidGltZVwiLGMscCwwKSkpO3QuYihcInNcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstY2FyZC1mb290ZXIgdWstYm94LXNoYWRvdy1sYXJnZVxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcInBsYXlcXFwiIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLXRleHQgdWstYnV0dG9uLWxhcmdlIHVrLWJvcmRlci1yb3VuZGVkIHVrLXdpZHRoLTEtMVxcXCJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtaTE4bj1cXFwiY2hhbGxlbmdlcy5wYWdlLnJlYWR5XFxcIj5cIik7dC5iKHQudih0LmYoXCJyZWFkeVwiLGMscCwwKSkpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB1ay1pY29uPVxcXCJjaGV2cm9uLXJpZ2h0XFxcIiBjbGFzcz1cXFwidWstbWFyZ2luLXNtYWxsLWxlZnRcXFwiPjwvc3Bhbj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWV4cGFuZFxcXCI+PC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWV4cGFuZFxcXCI+PC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIik7dC5iKFwiXFxuXCIgKyBpKTtpZighdC5zKHQuZihcIm9uZVBsYXllclwiLGMscCwxKSxjLHAsMSwwLDAsXCJcIikpe3QuYihcIiAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4tbGFyZ2UtdG9wXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDxidXR0b24gaWQ9XFxcImJhY2tcXFwiIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLXRleHQgdWstdGV4dC1tZXRhIFwiKTt0LmIodC52KHQuZihcImludmVyc2VDb2xvdXJcIixjLHAsMCkpKTt0LmIoXCJcXFwiPjxzcGFuIHVrLWljb249XFxcImNoZXZyb24tbGVmdFxcXCJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgY2xhc3M9XFxcInVrLW1hcmdpbi1zbWFsbC1yaWdodFxcXCI+PC9zcGFuPjxzcGFuIGRhdGEtaTE4bj1cXFwiY2hhbGxlbmdlcy5wYWdlLmJhY2tcXFwiPlwiKTt0LmIodC52KHQuZihcImJhY2tcIixjLHAsMCkpKTt0LmIoXCI8L3NwYW4+PC9idXR0b24+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO307dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCI8L2Rpdj5cIik7dC5iKFwiXFxuXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiPGJ1dHRvbiBpZD1cXFwiaG9tZS1idXR0b25cXFwiIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLWxhcmdlIHVrLWJvcmRlci1yb3VuZGVkIHVrLXBhZGRpbmctcmVtb3ZlXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPHNwYW4gdWstaWNvbj1cXFwiaWNvbjogaG9tZTsgcmF0aW86IDEuNVxcXCIgY2xhc3M9XFxcInVrLW1hcmdpbi1zbWFsbC1yaWdodFxcXCI+PC9zcGFuPkhvbWVcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCI8L2J1dHRvbj5cIik7cmV0dXJuIHQuZmwoKTsgfSxwYXJ0aWFsczoge30sIHN1YnM6IHsgIH19LCBcIjxkaXYgaWQ9XFxcImNoYWxsZW5nZVxcXCIgY2xhc3M9XFxcInVrLWNvbnRhaW5lciB1ay1jb250YWluZXItc21hbGwgdWstcG9zaXRpb24tY2VudGVyIHVrLXRleHQtY2VudGVyXFxcIj5cXG4gICAgPGgyIGlkPVxcXCJ0aXRsZVxcXCIgY2xhc3M9XFxcInVrLWgyIHt7aW52ZXJzZUNvbG91cn19XFxcIiBkYXRhLWkxOG49XFxcImNoYWxsZW5nZXMuY2hhbGxlbmdlcy57e3Nob3J0fX0ubmFtZVxcXCI+e3tuYW1lfX08L2gyPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4tcmVtb3ZlLXRvcFxcXCIgdWstZ3JpZD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWV4cGFuZFxcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJkZXNjcmlwdGlvblxcXCIgY2xhc3M9XFxcInVrLXdpZHRoLTItM1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLW1lZGl1bS1ib3R0b20ge3tpbnZlcnNlQ29sb3VyfX1cXFwiPlxcbiAgICAgICAgICAgICAgICA8cCBkYXRhLWkxOG49XFxcImNoYWxsZW5nZXMuY2hhbGxlbmdlcy57e3Nob3J0fX0uZGVzY3JpcHRpb25cXFwiPnt7ZGVzY3JpcHRpb259fTwvcD5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IHVrLWdyaWQ+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWV4cGFuZFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2NhcmQnIGNsYXNzPVxcXCJ1ay13aWR0aC0yLTNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cXFwiZHJhd2luZy1jYXJkXFxcIiBjbGFzcz1cXFwidWstY2FyZCB1ay1jYXJkLWRlZmF1bHQgdWstYm94LXNoYWRvdy1sYXJnZSB1ay1ib3JkZXItcm91bmRlZCB1ay1tYXJnaW4tc21hbGwtbGVmdCB1ay1wYWRkaW5nLXJlbW92ZS1sZWZ0IFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstY2FyZC1oZWFkZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XFxcInVrLWg0IHVrLW1hcmdpbi1yZW1vdmUtYm90dG9tXFxcIiBkYXRhLWkxOG49XFxcImNoYWxsZW5nZXMucGFnZS5kcmF3XFxcIj57e2RyYXd9fTwvaDQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jYXJkLWJvZHkgdWstY2FyZC1wcmltYXJ5IHVrLWJveC1zaGFkb3ctbGFyZ2UgdWstbGlnaHRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XFxcInVrLWgyXFxcIiBkYXRhLWkxOG49XFxcImNhdGVnb3JpZXMue3tjYXRlZ29yeVNsdWd9fVxcXCI+e3tkcmF3Q2F0ZWdvcnl9fTwvaDI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJ1ay10ZXh0LXNtYWxsXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHVrLWljb249XFxcImZ1dHVyZVxcXCIgY2xhc3M9XFxcInVrLW1hcmdpbi1zbWFsbC1yaWdodFxcXCI+PC9zcGFuPnt7dGltZX19c1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jYXJkLWZvb3RlciB1ay1ib3gtc2hhZG93LWxhcmdlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwicGxheVxcXCIgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tdGV4dCB1ay1idXR0b24tbGFyZ2UgdWstYm9yZGVyLXJvdW5kZWQgdWstd2lkdGgtMS0xXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1pMThuPVxcXCJjaGFsbGVuZ2VzLnBhZ2UucmVhZHlcXFwiPnt7cmVhZHl9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdWstaWNvbj1cXFwiY2hldnJvbi1yaWdodFxcXCIgY2xhc3M9XFxcInVrLW1hcmdpbi1zbWFsbC1sZWZ0XFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC1leHBhbmRcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC1leHBhbmRcXFwiPjwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAge3teb25lUGxheWVyfX1cXG4gICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCJiYWNrXFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi10ZXh0IHVrLXRleHQtbWV0YSB7e2ludmVyc2VDb2xvdXJ9fVxcXCI+PHNwYW4gdWstaWNvbj1cXFwiY2hldnJvbi1sZWZ0XFxcIlxcbiAgICAgICAgICAgICAgICBjbGFzcz1cXFwidWstbWFyZ2luLXNtYWxsLXJpZ2h0XFxcIj48L3NwYW4+PHNwYW4gZGF0YS1pMThuPVxcXCJjaGFsbGVuZ2VzLnBhZ2UuYmFja1xcXCI+e3tiYWNrfX08L3NwYW4+PC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICB7ey9vbmVQbGF5ZXJ9fVxcblxcbjwvZGl2PlxcblxcbjxidXR0b24gaWQ9XFxcImhvbWUtYnV0dG9uXFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1sYXJnZSB1ay1ib3JkZXItcm91bmRlZCB1ay1wYWRkaW5nLXJlbW92ZVxcXCI+XFxuICAgIDxzcGFuIHVrLWljb249XFxcImljb246IGhvbWU7IHJhdGlvOiAxLjVcXFwiIGNsYXNzPVxcXCJ1ay1tYXJnaW4tc21hbGwtcmlnaHRcXFwiPjwvc3Bhbj5Ib21lXFxuPC9idXR0b24+XCIsIEgpO3JldHVybiBULnJlbmRlci5hcHBseShULCBhcmd1bWVudHMpOyB9OyIsIi8vbW9kdWxlc1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBlZSBmcm9tICdldmVudC1lbWl0dGVyJztcblxuaW1wb3J0IGNoYWxsZW5nZXNNdXN0YWNoZSBmcm9tICcuL2NoYWxsZW5nZXMuaHRtbCc7XG5cblxuZnVuY3Rpb24gQ2hhbGxlbmdlc1ZpZXcoKSB7XG5cblx0bGV0IGFwcDtcblxuXHQvL2VtaXR0ZXJcblx0ZWUodGhpcyk7XG5cblx0YXBwID0gdW5kZWZpbmVkO1xuXHR0aGlzLnBhZ2VEYXRhID0ge1xuXHRcdHRpdGxlOiAnJyxcblx0XHRpbnZlcnNlQ29sb3VyOiB1bmRlZmluZWQsXG5cdFx0Y2hhbGxlbmdlczogdW5kZWZpbmVkXG5cdH07XG5cblx0dGhpcy5pbml0ID0gKGNvbnRleHQpID0+IHtcblx0XHRcblx0XHRhcHAgPSBjb250ZXh0O1xuXG5cdFx0Y29uc3QgY2hhbGxlbmdlcyA9IFtdO1xuXHRcdGZvciAoY29uc3QgY2hhbGxlbmdlIG9mIGFwcC5tZWNoYW5pY3MuY2hhbGxlbmdlcykge1xuXHRcdFx0aWYgKGNoYWxsZW5nZS5wbGF5ZXJzID4gMSkge1xuXHRcdFx0XHRjaGFsbGVuZ2VzLnB1c2goY2hhbGxlbmdlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvL2RhdGFcblx0XHR0aGlzLnBhZ2VEYXRhID0ge1xuXHRcdFx0dGl0bGU6IGFwcC5pMThuZXh0LnQoJ2NoYWxsZW5nZXMucGFnZS50aXRsZScpLFxuXHRcdFx0aW52ZXJzZUNvbG91cjogYXBwLmludGVyZmFjZS5pbnZlcnNlQ2xhc3MoKSxcblx0XHRcdGNoYWxsZW5nZXM6IGNoYWxsZW5nZXNcblx0XHR9O1xuXG5cdFx0Ly9idWlsZCBwYWdlXG5cdFx0Y29uc3QgY2hhbGxlbmdlc0hUTUwgPSBjaGFsbGVuZ2VzTXVzdGFjaGUodGhpcy5wYWdlRGF0YSk7XG5cdFx0JChjaGFsbGVuZ2VzSFRNTCkuYXBwZW5kVG8oJCgnI3ZpZXcnKSk7XG5cblxuXHRcdC8vaG9tZSBidXR0b25cblx0XHQkKCcjaG9tZS1idXR0b24nKS5jbGljaygoKSA9PiB7XG5cdFx0XHRob21lQnV0dG9uKCdob21lJyk7XG5cdFx0fSk7XG5cblx0XHQvLyBnZXQgY2hhbGxlbmdlc1xuXHRcdGdldENoYWxsZW5nZXMoKTtcblxuXHRcdC8vdHJhbnNhbGF0ZVxuXHRcdHRyYW5zbGF0ZSgpO1xuXG5cdFx0Ly9lbWl0IHRvIHNvY2tlciBJT1xuXHRcdGVtaXRUb0Rhc2hib2FyZCh7XG5cdFx0XHRtZXNzYWdlOiBhcHAuaTE4bmV4dC50KCdjaGFsbGVuZ2VzLmRhc2hib2FyZC5zZWxlY3RpbmcnKSxcblx0XHR9KTtcblxuXHRcdGFwcC5zcGVhayhhcHAuaTE4bmV4dC50KCdjaGFsbGVuZ2VzLnNwZWFrLnBpY2stYS1jaGFsbGVuZ2UnKSk7XG5cblx0XHQvL2FuaW1hdGlvblxuXHRcdGVudGVyQW5pbWF0aW9uKCk7XG5cdH07XG5cblx0Y29uc3QgdHJhbnNsYXRlID0gKCkgPT4ge1xuXHRcdCQoJyNjaGFsbGVuZ2VzJykubG9jYWxpemUoKTtcblx0fTtcblxuXHRjb25zdCBnZXRDaGFsbGVuZ2VzID0gKCkgPT4ge1xuXG5cdFx0Ly8gY29uc3QgX3RoaXMgPSB0aGlzO1xuXHRcdGNvbnN0IGR1cmF0aW9uID0gMTAwMDtcblxuXHRcdC8vbG9vcFxuXHRcdGxldCBpID0gMDtcblx0XHRmb3IgKGNvbnN0IGNoYWxsZW5nZSBvZiB0aGlzLnBhZ2VEYXRhLmNoYWxsZW5nZXMpIHtcblxuXHRcdFx0Y29uc3QgY2FyZCA9ICQoYCMke2NoYWxsZW5nZS5zaG9ydH1gKTtcblx0XHRcdGNhcmQuZGF0YSh7XG5cdFx0XHRcdHNob3J0OiBjaGFsbGVuZ2Uuc2hvcnQsXG5cdFx0XHRcdG5hbWU6Y2hhbGxlbmdlLm5hbWVcblx0XHRcdH0pO1xuXHRcdFx0Y2FyZC5jbGljayh0aGlzLCBjaGFsbGVuZ2VCdXR0b25BY3Rpb24pO1xuXG5cdFx0XHQvL3Zpc3VhbCBpbml0aWFsIHN0YXRlXG5cdFx0XHRsZXQgY0RlbGF5ID0gNDAwICsgKGkgKiAxMDApICsgKE1hdGgucmFuZG9tKCkgKiAyMDApO1xuXHRcdFx0bGV0IGN0b3AgPSAtNTAwICsgKE1hdGgucmFuZG9tKCkgKiAxMDAwKTtcblxuXHRcdFx0Y2FyZC5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XG5cdFx0XHRjYXJkLmNzcygnbGVmdCcsIC0xNTAwKTtcblx0XHRcdGNhcmQuY3NzKCd0b3AnLCBjdG9wKTtcblxuXHRcdFx0Y2FyZC5kZWxheShjRGVsYXkpLmFuaW1hdGUoe1xuXHRcdFx0XHR0b3A6IDAsXG5cdFx0XHRcdGxlZnQ6IDAsXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGR1cmF0aW9uOiBkdXJhdGlvbixcblx0XHRcdFx0c3BlY2lhbEVhc2luZzoge1xuXHRcdFx0XHRcdHdpZHRoOiAnbGluZWFyJyxcblx0XHRcdFx0XHRoZWlnaHQ6ICdlYXNlT3V0Qm91bmNlJ1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0Y29uc3QgaG9tZUJ1dHRvbiA9ICgpID0+IHtcblx0XHQkKCcjY2hhbGxlbmdlcycpLmFuaW1hdGUoe1xuXHRcdFx0bWFyZ2luVG9wOiAnLTEwMCcsXG5cdFx0XHRvcGFjaXR5OiAwLFxuXHRcdH0sIDE1MDAsICgpID0+IHtcblx0XHRcdHRoaXMuZW1pdCgnY2hhbmdlVmlldycsIHtcblx0XHRcdFx0c291cmNlOiAnY2hhbGxlbmdlcycsXG5cdFx0XHRcdHRhcmdldDonaG9tZSdcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0ZW1pdFRvRGFzaGJvYXJkKHtcblx0XHRcdHZpZXc6ICd3YWl0aW5nJ1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IGNoYWxsZW5nZUJ1dHRvbkFjdGlvbiA9IChlKSA9PiB7XG5cdFx0Y29uc3QgY2FyZCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRjb25zdCBjaGFsbGVuZ2VOYW1lID0gY2FyZC5kYXRhKCduYW1lJyk7XG5cblx0XHQkKCcjY2hhbGxlbmdlcycpLmFuaW1hdGUoe1xuXHRcdFx0bWFyZ2luVG9wOiAnLTEwMCcsXG5cdFx0XHRvcGFjaXR5OiAwLFxuXHRcdH0sIDE1MDAsICgpID0+IHtcblx0XHRcdGFwcC5nYW1lU3RhdGUuY3VycmVudENoYWxsZW5nZSA9IGNoYWxsZW5nZU5hbWU7XG5cdFx0XHR0aGlzLmVtaXQoJ2NoYW5nZVZpZXcnLCB7XG5cdFx0XHRcdHNvdXJjZTogJ2NoYWxsZW5nZXMnLFxuXHRcdFx0XHR0YXJnZXQ6J2NoYWxsZW5nZSdcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8vYW5pbWF0aW9uXG5cdGNvbnN0IGVudGVyQW5pbWF0aW9uID0gKCkgPT4ge1xuXG5cdFx0Y29uc3QgZHVyYXRpb24gPSAxMTAwO1xuXG5cdFx0JCgnI2NoYWxsZW5nZXMnKS5jc3MoJ29wYWNpdHknLCAwKTtcblx0XHQkKCcjY2hhbGxlbmdlcycpLmNzcygnbWFyZ2luVG9wJywgMTAwKTtcblxuXHRcdCQoJyNjaGFsbGVuZ2VzJykuYW5pbWF0ZSh7XG5cdFx0XHRtYXJnaW5Ub3A6IDAsXG5cdFx0XHRvcGFjaXR5OiAxLFxuXHRcdH0sIGR1cmF0aW9uKTtcblx0fTtcblxuXHRjb25zdCBlbWl0VG9EYXNoYm9hcmQgPSAoe1xuXHRcdHR5cGUgPSAnaW50ZXJmYWNlJyxcblx0XHR2aWV3ID0gJ2NoYWxsZW5nZXMnLFxuXHRcdHJvb20gPSBhcHAuc29ja2V0LmlkLFxuXHRcdG1lc3NhZ2UgPSAnJ1xuXHR9KSA9PiB7XG5cdFx0YXBwLnNvY2tldC5lbWl0KHR5cGUsIHt2aWV3LCByb29tLCBtZXNzYWdlfSk7XG5cdH07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IENoYWxsZW5nZXNWaWV3KCk7IiwidmFyIEggPSByZXF1aXJlKFwiaG9nYW4uanNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgeyB2YXIgVCA9IG5ldyBILlRlbXBsYXRlKHtjb2RlOiBmdW5jdGlvbiAoYyxwLGkpIHsgdmFyIHQ9dGhpczt0LmIoaT1pfHxcIlwiKTt0LmIoXCI8ZGl2IGlkPVxcXCJjaGFsbGVuZ2VzXFxcIiBjbGFzcz1cXFwidWstY29udGFpbmVyIHVrLWNvbnRhaW5lci1zbWFsbCB1ay1wb3NpdGlvbi1jZW50ZXIgdWstdGV4dC1jZW50ZXJcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8aDEgaWQ9XFxcInRpdGxlXFxcIiBjbGFzcz1cXFwidWstaDEgXCIpO3QuYih0LnYodC5mKFwiaW52ZXJzZUNvbG91clwiLGMscCwwKSkpO3QuYihcIlxcXCIgZGF0YS1pMThuPVxcXCJjaGFsbGVuZ2VzLnBhZ2UudGl0bGVcXFwiPlwiKTt0LmIodC52KHQuZihcInRpdGxlXCIsYyxwLDApKSk7dC5iKFwiPC9oMT5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLW1lZGl1bS10b3BcXFwiIHVrLWdyaWQ+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC1leHBhbmRcXFwiPjwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGRpdiBpZD1cXFwiY29sdW1uc1xcXCIgY2xhc3M9XFxcInVrLXdpZHRoLTItM1xcXCIgdWstZ3JpZD5cIik7dC5iKFwiXFxuXCIgKyBpKTtpZih0LnModC5mKFwiY2hhbGxlbmdlc1wiLGMscCwxKSxjLHAsMCwzNzAsMTA3MSxcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtMS0yXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPGRpdiBpZD1cXFwiXCIpO3QuYih0LnYodC5mKFwic2hvcnRcIixjLHAsMCkpKTt0LmIoXCJcXFwiIGNsYXNzPVxcXCJ1ay1jYXJkIHVrLWNhcmQtZGVmYXVsdCB1ay1ib3JkZXItcm91bmRlZCB1ay1ib3gtc2hhZG93LXNtYWxsIHVrLWFuaW1hdGlvbi10b2dnbGVcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstY2FyZC1tZWRpYS10b3AgdWstY292ZXItY29udGFpbmVyXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiLi9hc3NldHMvXCIpO3QuYih0LnYodC5mKFwic2hvcnRcIixjLHAsMCkpKTt0LmIoXCIub3B0LnBuZ1xcXCIgYWx0PVxcXCJcXFwiIGNsYXNzPVxcXCJ1ay1hbmltYXRpb24ta2VuYnVybnNcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jYXJkLWJvZHlcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLXRleHRcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XFxcInVrLWg0XFxcIiBkYXRhLWkxOG49XFxcImNoYWxsZW5nZXMuY2hhbGxlbmdlcy5cIik7dC5iKHQudih0LmYoXCJzaG9ydFwiLGMscCwwKSkpO3QuYihcIi5uYW1lXFxcIj5cIik7dC5iKHQudih0LmYoXCJuYW1lXCIsYyxwLDApKSk7dC5iKFwiPC9oND5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7fSk7Yy5wb3AoKTt9dC5iKFwiICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWV4cGFuZFxcXCI+PC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIjwvZGl2PlwiKTt0LmIoXCJcXG5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCI8YnV0dG9uIGlkPVxcXCJob21lLWJ1dHRvblxcXCIgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tbGFyZ2UgdWstYm9yZGVyLXJvdW5kZWQgdWstcGFkZGluZy1yZW1vdmVcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8c3BhbiB1ay1pY29uPVxcXCJpY29uOiBob21lOyByYXRpbzogMS41XFxcIiBjbGFzcz1cXFwidWstbWFyZ2luLXNtYWxsLXJpZ2h0XFxcIj48L3NwYW4+SG9tZVwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIjwvYnV0dG9uPlwiKTtyZXR1cm4gdC5mbCgpOyB9LHBhcnRpYWxzOiB7fSwgc3ViczogeyAgfX0sIFwiPGRpdiBpZD1cXFwiY2hhbGxlbmdlc1xcXCIgY2xhc3M9XFxcInVrLWNvbnRhaW5lciB1ay1jb250YWluZXItc21hbGwgdWstcG9zaXRpb24tY2VudGVyIHVrLXRleHQtY2VudGVyXFxcIj5cXG4gICAgPGgxIGlkPVxcXCJ0aXRsZVxcXCIgY2xhc3M9XFxcInVrLWgxIHt7aW52ZXJzZUNvbG91cn19XFxcIiBkYXRhLWkxOG49XFxcImNoYWxsZW5nZXMucGFnZS50aXRsZVxcXCI+e3t0aXRsZX19PC9oMT5cXG4gICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLW1lZGl1bS10b3BcXFwiIHVrLWdyaWQ+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC1leHBhbmRcXFwiPjwvZGl2PlxcbiAgICAgICAgPGRpdiBpZD1cXFwiY29sdW1uc1xcXCIgY2xhc3M9XFxcInVrLXdpZHRoLTItM1xcXCIgdWstZ3JpZD5cXG4gICAgICAgICAgICB7eyNjaGFsbGVuZ2VzfX1cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC0xLTJcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJ7e3Nob3J0fX1cXFwiIGNsYXNzPVxcXCJ1ay1jYXJkIHVrLWNhcmQtZGVmYXVsdCB1ay1ib3JkZXItcm91bmRlZCB1ay1ib3gtc2hhZG93LXNtYWxsIHVrLWFuaW1hdGlvbi10b2dnbGVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstY2FyZC1tZWRpYS10b3AgdWstY292ZXItY29udGFpbmVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiLi9hc3NldHMve3tzaG9ydH19Lm9wdC5wbmdcXFwiIGFsdD1cXFwiXFxcIiBjbGFzcz1cXFwidWstYW5pbWF0aW9uLWtlbmJ1cm5zXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstY2FyZC1ib2R5XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi10ZXh0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVxcXCJ1ay1oNFxcXCIgZGF0YS1pMThuPVxcXCJjaGFsbGVuZ2VzLmNoYWxsZW5nZXMue3tzaG9ydH19Lm5hbWVcXFwiPnt7bmFtZX19PC9oND5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAge3svY2hhbGxlbmdlc319XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWV4cGFuZFxcXCI+PC9kaXY+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlxcblxcbjxidXR0b24gaWQ9XFxcImhvbWUtYnV0dG9uXFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1sYXJnZSB1ay1ib3JkZXItcm91bmRlZCB1ay1wYWRkaW5nLXJlbW92ZVxcXCI+XFxuICAgIDxzcGFuIHVrLWljb249XFxcImljb246IGhvbWU7IHJhdGlvOiAxLjVcXFwiIGNsYXNzPVxcXCJ1ay1tYXJnaW4tc21hbGwtcmlnaHRcXFwiPjwvc3Bhbj5Ib21lXFxuPC9idXR0b24+XCIsIEgpO3JldHVybiBULnJlbmRlci5hcHBseShULCBhcmd1bWVudHMpOyB9OyIsIi8vbW9kdWxlc1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBlZSBmcm9tICdldmVudC1lbWl0dGVyJztcbmltcG9ydCBoYXNMaXN0ZW5lcnMgZnJvbSAnZXZlbnQtZW1pdHRlci9oYXMtbGlzdGVuZXJzJztcbmltcG9ydCBlYXN5dGltZXIgZnJvbSAnZWFzeXRpbWVyL2Rpc3QvZWFzeXRpbWVyLm1pbic7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAncHJvZ3Jlc3NiYXIuanMnO1xuXG5pbXBvcnQgZ2FtZU11c3RhY2hlIGZyb20gJy4vZ2FtZS5odG1sJztcblxuaW1wb3J0IGNhbnZhc1BhcGVyIGZyb20gJy4vY2FudmFzLXZpZXcnO1xuaW1wb3J0IG1hZ2VudGFBSSBmcm9tICcuL21hZ2VudGFBSSc7XG5cblxuZnVuY3Rpb24gR2FtZVZpZXcoKSB7XG5cblx0bGV0IGFwcDtcblxuXHQvL2VtaXR0ZXJcblx0ZWUodGhpcyk7XG5cblx0bGV0IHByb2dyZXNzQmFyO1xuXG5cdGFwcCA9IHVuZGVmaW5lZDtcblx0dGhpcy5jaGFsbGVuZ2UgPSB1bmRlZmluZWQ7XG5cdHRoaXMudGltZXIgPSB1bmRlZmluZWQ7XG5cdHRoaXMucGFnZURhdGEgPSB7XG5cdFx0dGltZTogMCxcblx0XHRjbGVhcjogJycsXG5cdFx0cGxheTogJycsXG5cdFx0YmFjazogJycsXG5cdFx0aW52ZXJzZUNvbG91cjogdW5kZWZpbmVkXG5cdH07XG5cdHRoaXMuY2FudmFzUGFwZXIgPSBuZXcgY2FudmFzUGFwZXIoKTtcblx0dGhpcy5tYWdlbnRhQUkgPSBuZXcgbWFnZW50YUFJKCk7XG5cblx0dGhpcy5pbml0aWF0ZWQgPSBmYWxzZTtcblxuXG5cdHRoaXMuaW5pdCA9IChjb250ZXh0KSA9PiB7XG5cblx0XHRhcHAgPSBjb250ZXh0O1xuXG5cdFx0Ly9zZXR1cFxuXHRcdHRoaXMuY2FudmFzUGFwZXIuaW5pdChhcHApO1xuXHRcdHRoaXMubWFnZW50YUFJLmluaXQoYXBwKTtcblxuXHRcdC8vc2V0IGNoYWxsZW5nZVxuXHRcdHRoaXMuY2hhbGxlbmdlID0gYXBwLmdldENoYWxsZW5nZShhcHAuZ2FtZVN0YXRlLmN1cnJlbnRDaGFsbGVuZ2UpO1xuXG5cdFx0Ly9QYWdlIGRhdGFcblx0XHR0aGlzLnBhZ2VEYXRhID0ge1xuXHRcdFx0dGltZTogdGhpcy5jaGFsbGVuZ2UudGltZSxcblx0XHRcdGNsZWFyOiBhcHAuaTE4bmV4dC50KCdnYW1lLnBhZ2UuY2xlYXInKSxcblx0XHRcdHBsYXk6IGFwcC5pMThuZXh0LnQoJ2dhbWUucGFnZS5wbGF5JyksXG5cdFx0XHRiYWNrOiBhcHAuaTE4bmV4dC50KCdnYW1lLnBhZ2UuYmFjaycpLFxuXHRcdFx0c2hvd0JhY2tCdXR0b246IGZhbHNlLFxuXHRcdFx0aW52ZXJzZUNvbG91cjogYXBwLmludGVyZmFjZS5pbnZlcnNlQ2xhc3MoKVxuXHRcdH07XG5cblx0XHQvL0J1aWxkIHBhZ2VcblxuXHRcdCQoJy51ay1vZmZjYW52YXMtY29udGVudCcpLmhpZGUoKTtcblxuXHRcdGNvbnN0IGdhbWVIVE1MID0gZ2FtZU11c3RhY2hlKHRoaXMucGFnZURhdGEpO1xuXHRcdCQoZ2FtZUhUTUwpLmFwcGVuZFRvKCQoJyNhcHAnKSk7XG5cblx0XHQkKCcjaG9tZS1idXR0b24nKS5jbGljaygoKSA9PiB7XG5cdFx0XHRob21lQnV0dG9uKCdob21lJyk7XG5cdFx0fSk7XG5cblx0XHQvL3RyYW5zbGF0ZVxuXHRcdHRyYW5zbGF0ZSgpO1xuXG5cdFx0Ly9zZXQgYnV0dG9uIGFjdGlvbnNcblx0XHQkKCcjc3RhcnQtZHJhd2luZy1vdmVybGF5JykuY2xpY2sodGhpcywgc3RhcnQpO1xuXHRcdCQoJyNjbGVhci1kcmF3aW5nJykuY2xpY2sodGhpcywgY2xlYXIpO1xuXG5cdFx0aWYgKCF0aGlzLmluaXRpYXRlZCkge1xuXHRcdFx0dGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5hZGRMaXN0ZW5lcnMoKTtcblx0XHR9XG5cblx0XHQvL2FuaW1hdGlvblxuXHRcdGVudGVyQW5pbWF0aW9uKCk7XG5cblx0XHQvL2VtaXQgdG8gc29ja2VyIElPXG5cdFx0ZW1pdFRvRGFzaGJvYXJkKHtcblx0XHRcdHR5cGU6ICdpbnRlcmZhY2UnLFxuXHRcdFx0dmlldzogJ2dhbWUnLFxuXHRcdFx0Y2hhbGxlbmdlOiBhcHAuZ2FtZVN0YXRlLmN1cnJlbnRDaGFsbGVuZ2Vcblx0XHR9KTtcblxuXHRcdGFwcC5zcGVhayhhcHAuaTE4bmV4dC50KCdnYW1lLnNwZWFrLnBsYXknKSk7XG5cblx0fTtcblxuXHRjb25zdCB0cmFuc2xhdGUgPSAoKSA9PiB7XG5cdFx0JCgnI2dhbWUnKS5sb2NhbGl6ZSgpO1xuXHR9O1xuXG5cdGNvbnN0IHVwZGF0ZVBhZ2UgPSAoZ3Vlc3MpID0+IHtcblx0XHQkKCcjZ3Vlc3MnKVswXS5pbm5lckhUTUwgPSBndWVzcztcblx0XHQkKCcjY29udGFpbmVyLWd1ZXNzJykuZmFkZUluKCdmYXN0Jyk7XG5cdFx0JCgnI2NvbnRhaW5lci1ndWVzcycpLmZhZGVPdXQoJ3Nsb3cnKTtcblx0fTtcblxuXHR0aGlzLmFkZExpc3RlbmVycyA9ICgpID0+IHtcblxuXHRcdHRoaXMuY2FudmFzUGFwZXIub24oJ2RyYXdpbmcnLCAoZXRzLCBpbmspID0+IHtcblx0XHRcdHRoaXMubWFnZW50YUFJLnJlYWQoZXRzLCBpbmspO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5tYWdlbnRhQUkub24oJ2d1ZXNzJywgKGd1ZXNzKSA9PiB7XG5cdFx0XHR1cGRhdGVQYWdlKGd1ZXNzKTtcblxuXHRcdFx0ZW1pdFRvQ2FyZCh7XG5cdFx0XHRcdGFjdGlvbjogJ3VwZGF0ZUd1ZXNzJyxcblx0XHRcdFx0Z3Vlc3M6IGd1ZXNzXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHRoaXMubWFnZW50YUFJLm9uKCdzdG9wJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5jYW52YXNQYXBlci5zdG9wKCk7XG5cdFx0XHR0aGlzLnRpbWVyLnN0b3AoKTtcblx0XHR9KTtcblxuXHRcdGlmICghaGFzTGlzdGVuZXJzKHRoaXMubWFnZW50YUFJLCAnd2luJykpIHtcblx0XHRcdHRoaXMubWFnZW50YUFJLm9uKCd3aW4nLCAoKSA9PiB7XG5cdFx0XHRcdCQoJy51ay1vZmZjYW52YXMtY29udGVudCcpLnNob3coKTtcblx0XHRcdFx0JCgnI2dhbWUnKS5yZW1vdmUoKTtcblx0XHRcdFx0dGhpcy5lbWl0KCdjaGFuZ2VWaWV3Jywge1xuXHRcdFx0XHRcdHNvdXJjZTogJ2dhbWUnLFxuXHRcdFx0XHRcdHRhcmdldDogJ3Bvc3QtZ2FtZSdcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fTtcblxuXHRjb25zdCBzdGFydCA9IChlKSA9PiB7XG5cblx0XHQkKGUuY3VycmVudFRhcmdldCkucmVtb3ZlKCk7XG5cblx0XHRhcHAuZ2FtZVN0YXRlLmF0dGVtcHRzID0gW107XG5cblx0XHR0aW1lR2FtZSgpO1xuXHRcdHRoaXMuY2FudmFzUGFwZXIuc3RhcnRDYW52YXMoKTtcblxuXHRcdGVtaXRUb0NhcmQoe1xuXHRcdFx0YWN0aW9uOiAnc3RhcnQnXG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgY2xlYXIgPSAoKSA9PiB7XG5cblx0XHQkKCcjZ3Vlc3MnKVswXS5pbm5lckhUTUwgPSAnLi4uJztcblx0XHR0aGlzLmNhbnZhc1BhcGVyLmNsZWFyQ2FudmFzKCk7XG5cblx0XHRlbWl0VG9DYXJkKHtcblx0XHRcdGFjdGlvbjogJ3VwZGF0ZUd1ZXNzJyxcblx0XHRcdGd1ZXNzOiAnLi4uJ1xuXHRcdH0pO1xuXG5cdFx0Ly9lbWl0IHRvIHNvY2tlciBJT1xuXHRcdGVtaXRUb0Rhc2hib2FyZCh7XG5cdFx0XHR0eXBlOiAnZ3Vlc3MnLFxuXHRcdFx0dmlldzogJ2dhbWUnLFxuXHRcdFx0YWN0aW9uOiAnY2xlYXInLFxuXHRcdFx0YXR0ZW1wdDogJy4uLicsXG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgaG9tZUJ1dHRvbiA9ICgpID0+IHtcblx0XHR0aGlzLnRpbWVyLnN0b3AoKTtcblx0XHRhcHAuZ2FtZVN0YXRlLmF0dGVtcHRzID0gW107XG5cdFx0dGhpcy5jYW52YXNQYXBlci5jbGVhckNhbnZhcygpO1xuXG5cdFx0ZW1pdFRvQ2FyZCh7XG5cdFx0XHRhY3Rpb246ICd3YWl0Jyxcblx0XHR9KTtcblxuXHRcdGVtaXRUb0Rhc2hib2FyZCh7XG5cdFx0XHR2aWV3OiAnd2FpdGluZydcblx0XHR9KTtcblxuXHRcdCQoJy51ay1vZmZjYW52YXMtY29udGVudCcpLnNob3coKTtcblx0XHQkKCcjZ2FtZScpLnJlbW92ZSgpO1xuXHRcdHRoaXMuZW1pdCgnY2hhbmdlVmlldycsIHtcblx0XHRcdHNvdXJjZTogJ2dhbWUnLFxuXHRcdFx0dGFyZ2V0OiAnaG9tZSdcblx0XHR9KTtcblx0fTtcblxuXHQvLyAtLS0gc2V0IHRpbWVyIGZvciBnYW1lXG5cdGNvbnN0IHRpbWVHYW1lID0gKCkgPT4ge1xuXG5cdFx0Y29uc3QgY2hhbGxlbmdlVGltZSA9IHRoaXMuY2hhbGxlbmdlLnRpbWU7XG5cblx0XHR0aGlzLnRpbWVyID0gbmV3IGVhc3l0aW1lcigpOyAvLyByZXNldCB0aW1lclxuXG5cdFx0dGhpcy50aW1lci5zdGFydCh7XG5cdFx0XHRjb3VudGRvd246IHRydWUsXG5cdFx0XHRwcmVjaXNpb246ICdzZWNvbmRUZW50aHMnLFxuXHRcdFx0c3RhcnRWYWx1ZXM6IHtcblx0XHRcdFx0c2Vjb25kczogY2hhbGxlbmdlVGltZVxuXHRcdFx0fVxuXHRcdH0pOyAvLyBzdGFydCB0aW1lciBjb3VudGRvd25cblxuXHRcdGxldCB0aW1lTGVmdFNlY29uZHMgPSBjaGFsbGVuZ2VUaW1lO1xuXHRcdGxldCB0aW1lTGVmdFBlcmNlbnQgPSAxMDA7IC8vICVcblxuXHRcdHByb2dyZXNzQmFyID0gbmV3IFByb2dyZXNzQmFyLlNlbWlDaXJjbGUoJyNwcm9ncmVzcycsIHtcblx0XHRcdHN0cm9rZVdpZHRoOiAxMixcblx0XHRcdGNvbG9yOiAnI0ZGRUE4MicsXG5cdFx0XHRkdXJhdGlvbjogMTQwMCxcblx0XHRcdHN2Z1N0eWxlOiBudWxsLFxuXHRcdFx0dGV4dDoge1xuXHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdGFsaWduVG9Cb3R0b206IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0ZnJvbToge1xuXHRcdFx0XHRjb2xvcjogJyNFRDZBNUEnXG5cdFx0XHR9LFxuXHRcdFx0dG86IHtcblx0XHRcdFx0Y29sb3I6ICcjRkZFQTgyJ1xuXHRcdFx0fSxcblx0XHRcdC8vIFNldCBkZWZhdWx0IHN0ZXAgZnVuY3Rpb24gZm9yIGFsbCBhbmltYXRlIGNhbGxzXG5cdFx0XHRzdGVwOiAoc3RhdGUsIGJhcikgPT4ge1xuXHRcdFx0XHRiYXIucGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHN0YXRlLmNvbG9yKTtcblxuXHRcdFx0XHRpZiAoKHRpbWVMZWZ0U2Vjb25kcyArIDEpID09PSAwKSB7XG5cdFx0XHRcdFx0YmFyLnNldFRleHQoJycpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJhci5zZXRUZXh0KGAke3RpbWVMZWZ0U2Vjb25kcyArIDF9J2ApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFyLnRleHQuc3R5bGUuY29sb3IgPSBzdGF0ZS5jb2xvcjtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdFx0dGhpcy50aW1lci5hZGRFdmVudExpc3RlbmVyKCdzZWNvbmRUZW50aHNVcGRhdGVkJywgKCkgPT4ge1xuXG5cdFx0XHRjb25zdCBtaW4gPSB0aGlzLnRpbWVyLmdldFRpbWVWYWx1ZXMoKS5taW51dGVzO1xuXHRcdFx0Y29uc3Qgc2VjID0gdGhpcy50aW1lci5nZXRUaW1lVmFsdWVzKCkuc2Vjb25kcztcblx0XHRcdGNvbnN0IHRzZWMgPSB0aGlzLnRpbWVyLmdldFRpbWVWYWx1ZXMoKS5zZWNvbmRUZW50aHM7XG5cblx0XHRcdHRpbWVMZWZ0U2Vjb25kcyA9IChtaW4gKiA2MCkgKyBzZWM7XG5cblx0XHRcdGNvbnN0IHRpbWVMZWZ0U2Vjb25kc1RlZXRoID0gKG1pbiAqIDYwICogMTApICsgKHNlYyAqIDEwKSArIHRzZWM7XG5cdFx0XHR0aW1lTGVmdFBlcmNlbnQgPSAodGltZUxlZnRTZWNvbmRzVGVldGggLyBjaGFsbGVuZ2VUaW1lKSAqIDEwO1xuXG5cdFx0XHRwcm9ncmVzc0Jhci5zZXQodGltZUxlZnRQZXJjZW50IC8gMTAwKTsgLy8gTnVtYmVyIGZyb20gMC4wIHRvIDEuMFxuXG5cdFx0XHQvL0lPIC0gZW1pdCB0aW1lclxuXHRcdFx0YXBwLnNvY2tldC5lbWl0KCd0aW1lcicsIHtcblx0XHRcdFx0dmlldzogJ2dhbWUnLFxuXHRcdFx0XHR0aW1lcjogdGltZUxlZnRTZWNvbmRzLFxuXHRcdFx0XHR0aW1lclBlcmNlbnRhZ2U6IHRpbWVMZWZ0UGVyY2VudFxuXHRcdFx0fSk7XG5cblx0XHRcdGVtaXRUb0NhcmQoe1xuXHRcdFx0XHRhY3Rpb246ICd1cGRhdGVUaW1lJyxcblx0XHRcdFx0dGltZTogdGltZUxlZnRTZWNvbmRzXG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdH0pO1xuXG5cdFx0dGhpcy50aW1lci5hZGRFdmVudExpc3RlbmVyKCd0YXJnZXRBY2hpZXZlZCcsICgpID0+IHtcblx0XHRcdCQoJy51ay1vZmZjYW52YXMtY29udGVudCcpLnNob3coKTtcblx0XHRcdCQoJyNnYW1lJykucmVtb3ZlKCk7XG5cdFx0XHR0aGlzLmVtaXQoJ2NoYW5nZVZpZXcnLCB7XG5cdFx0XHRcdHNvdXJjZTogJ2dhbWUnLFxuXHRcdFx0XHR0YXJnZXQ6ICdwb3N0LWdhbWUnXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fTtcblxuXHQvL2FuaW1hdGlvblxuXHRjb25zdCBlbnRlckFuaW1hdGlvbiA9ICgpID0+IHtcblx0XHRjb25zdCBkdXJhdGlvbiA9IDE1MDA7XG5cblx0XHRsZXQgY29udGFpbmVyID0gJCgnI2dhbWUnKTtcblx0XHRjb250YWluZXIuY3NzKCdvcGFjaXR5JywgMCk7XG5cdFx0Y29udGFpbmVyLmNzcygnbWFyZ2luVG9wJywgMTAwKTtcblxuXHRcdGxldCBjYXJkID0gJCgnLnVrLWNhcmQnKTtcblx0XHRsZXQgY2FyZEhlaWdodCA9IGNhcmQuaGVpZ2h0KCk7XG5cdFx0Y2FyZC5jc3MoJ2hlaWdodCcsIDApO1xuXHRcdGNhcmQuY3NzKCdvcGFjaXR5JywgMCk7XG5cblx0XHQvL2FuaW1hdGlvblxuXHRcdGNvbnRhaW5lci5hbmltYXRlKHtcblx0XHRcdG1hcmdpblRvcDogMCxcblx0XHRcdG9wYWNpdHk6IDEsXG5cdFx0fSwgZHVyYXRpb24pO1xuXG5cdFx0Y2FyZC5kZWxheSgxMDAwKS5hbmltYXRlKHtcblx0XHRcdGhlaWdodDogY2FyZEhlaWdodCxcblx0XHRcdG9wYWNpdHk6IDEsXG5cdFx0fSwgZHVyYXRpb24pO1xuXHR9O1xuXG5cdGNvbnN0IGVtaXRUb0NhcmQgPSAoe1xuXHRcdHR5cGUgPSAnY2FyZCcsXG5cdFx0dmlldyA9ICdjaGFsbGVuZ2UnLFxuXHRcdGFjdGlvbiA9ICduZXcnLFxuXHRcdHJvb20gPSBhcHAuc29ja2V0LmlkLFxuXHRcdHRpbWUgPSAwLFxuXHRcdGd1ZXNzID0gJydcblx0fSkgPT4ge1xuXHRcdGFwcC5zb2NrZXQuZW1pdCh0eXBlLCB7dmlldywgYWN0aW9uLCByb29tLCBuYW1lLCB0aW1lLCBndWVzczogZ3Vlc3N9KTtcblx0fTtcblxuXHRjb25zdCBlbWl0VG9EYXNoYm9hcmQgPSAoe1xuXHRcdHR5cGUgPSAnaW50ZXJmYWNlJyxcblx0XHR2aWV3ID0gJ2dhbWUnLFxuXHRcdHJvb20gPSBhcHAuc29ja2V0LmlkLFxuXHRcdGNoYWxsZW5nZSA9ICcnLFxuXHRcdGFjdGlvbiA9ICcnLFxuXHRcdGF0dGVtcHQgPSAnJ1xuXHR9KSA9PiB7XG5cdFx0YXBwLnNvY2tldC5lbWl0KHR5cGUsIHt2aWV3LCByb29tLCBjaGFsbGVuZ2UsIGFjdGlvbiwgYXR0ZW1wdH0pO1xuXHR9O1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBHYW1lVmlldygpOyIsInZhciBIID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgdmFyIFQgPSBuZXcgSC5UZW1wbGF0ZSh7Y29kZTogZnVuY3Rpb24gKGMscCxpKSB7IHZhciB0PXRoaXM7dC5iKGk9aXx8XCJcIik7dC5iKFwiPGRpdiBpZD1cXFwiZ2FtZVxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDxkaXYgY2xhc3M9XFxcInVrLW1hcmdpbi1yZW1vdmUtdG9wXFxcIiB1ay1oZWlnaHQtdmlld3BvcnQ+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jYXJkIHVrLWNhcmQtZGVmYXVsdCB1ay1jYXJkLWJvZHkgdWstYm9yZGVyLXJvdW5kZWQgdWstcGFkZGluZy1yZW1vdmUgdWstbWFyZ2luLXJlbW92ZSB1ay1ib3gtc2hhZG93LWxhcmdlIGJvcmRlcmVkXFxcIlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgIHVrLWhlaWdodC12aWV3cG9ydD5cIik7dC5iKFwiXFxuXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwic3RhcnQtZHJhd2luZy1vdmVybGF5XFxcIlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1sYXJnZSB1ay1idXR0b24tcHJpbWFyeSB1ay1ib3JkZXItcm91bmRlZCB1ay1wb3NpdGlvbi1jZW50ZXJcXFwiXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgIGRhdGEtaTE4bj1cXFwiZ2FtZS5wYWdlLnBsYXlcXFwiPlwiKTt0LmIodC52KHQuZihcInBsYXlcIixjLHAsMCkpKTt0LmIoXCI8L2J1dHRvbj5cIik7dC5iKFwiXFxuXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgPGNhbnZhcyBpZD1cXFwiY2FudmFzXFxcIiByZXNpemU+PC9jYW52YXM+XCIpO3QuYihcIlxcblwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGJ1dHRvbiBpZD1cXFwiaG9tZS1idXR0b25cXFwiIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLWxhcmdlIHVrLWJvcmRlci1yb3VuZGVkIHVrLXBhZGRpbmctcmVtb3ZlXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDxzcGFuIHVrLWljb249XFxcImljb246IGhvbWU7IHJhdGlvOiAxLjVcXFwiIGNsYXNzPVxcXCJ1ay1tYXJnaW4tc21hbGwtcmlnaHRcXFwiPjwvc3Bhbj5Ib21lXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDwvYnV0dG9uPlwiKTt0LmIoXCJcXG5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBpZD1cXFwiY29udGFpbmVyLWNsZWFyXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDxidXR0b24gaWQ9XFxcImNsZWFyLWRyYXdpbmdcXFwiIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYm9yZGVyLXJvdW5kZWQgdWstYWxpZ24tcmlnaHRcXFwiXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgZGF0YS1pMThuPVxcXCJnYW1lLnBhZ2UuY2xlYXJcXFwiPlwiKTt0LmIodC52KHQuZihcImNsZWFyXCIsYyxwLDApKSk7dC5iKFwiPC9idXR0b24+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBpZD1cXFwiY29udGFpbmVyLXByb2dyZXNzXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDxkaXYgaWQ9XFxcInByb2dyZXNzXFxcIj48L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIFwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8ZGl2IGlkPVxcXCJjb250YWluZXItZ3Vlc3NcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGgxIGlkPVxcXCJndWVzc1xcXCIgY2xhc3M9XFxcInVrLWgxIHVrLXRleHQtYm9sZCB1ay10ZXh0LW11dGVkIHVrLXRleHQtY2VudGVyXFxcIj48L2gxPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiPC9kaXY+XCIpO3QuYihcIlxcblwiKTt0LmIoXCJcXG5cIik7cmV0dXJuIHQuZmwoKTsgfSxwYXJ0aWFsczoge30sIHN1YnM6IHsgIH19LCBcIjxkaXYgaWQ9XFxcImdhbWVcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4tcmVtb3ZlLXRvcFxcXCIgdWstaGVpZ2h0LXZpZXdwb3J0PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstY2FyZCB1ay1jYXJkLWRlZmF1bHQgdWstY2FyZC1ib2R5IHVrLWJvcmRlci1yb3VuZGVkIHVrLXBhZGRpbmctcmVtb3ZlIHVrLW1hcmdpbi1yZW1vdmUgdWstYm94LXNoYWRvdy1sYXJnZSBib3JkZXJlZFxcXCJcXG4gICAgICAgICAgICB1ay1oZWlnaHQtdmlld3BvcnQ+XFxuXFxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwic3RhcnQtZHJhd2luZy1vdmVybGF5XFxcIlxcbiAgICAgICAgICAgICAgICBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1sYXJnZSB1ay1idXR0b24tcHJpbWFyeSB1ay1ib3JkZXItcm91bmRlZCB1ay1wb3NpdGlvbi1jZW50ZXJcXFwiXFxuICAgICAgICAgICAgICAgIGRhdGEtaTE4bj1cXFwiZ2FtZS5wYWdlLnBsYXlcXFwiPnt7cGxheX19PC9idXR0b24+XFxuXFxuICAgICAgICAgICAgPGNhbnZhcyBpZD1cXFwiY2FudmFzXFxcIiByZXNpemU+PC9jYW52YXM+XFxuXFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxidXR0b24gaWQ9XFxcImhvbWUtYnV0dG9uXFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1sYXJnZSB1ay1ib3JkZXItcm91bmRlZCB1ay1wYWRkaW5nLXJlbW92ZVxcXCI+XFxuICAgICAgICA8c3BhbiB1ay1pY29uPVxcXCJpY29uOiBob21lOyByYXRpbzogMS41XFxcIiBjbGFzcz1cXFwidWstbWFyZ2luLXNtYWxsLXJpZ2h0XFxcIj48L3NwYW4+SG9tZVxcbiAgICA8L2J1dHRvbj5cXG5cXG4gICAgPGRpdiBpZD1cXFwiY29udGFpbmVyLWNsZWFyXFxcIj5cXG4gICAgICAgIDxidXR0b24gaWQ9XFxcImNsZWFyLWRyYXdpbmdcXFwiIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYm9yZGVyLXJvdW5kZWQgdWstYWxpZ24tcmlnaHRcXFwiXFxuICAgICAgICAgICAgZGF0YS1pMThuPVxcXCJnYW1lLnBhZ2UuY2xlYXJcXFwiPnt7Y2xlYXJ9fTwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBpZD1cXFwiY29udGFpbmVyLXByb2dyZXNzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcInByb2dyZXNzXFxcIj48L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIFxcbiAgICA8ZGl2IGlkPVxcXCJjb250YWluZXItZ3Vlc3NcXFwiPlxcbiAgICAgICAgPGgxIGlkPVxcXCJndWVzc1xcXCIgY2xhc3M9XFxcInVrLWgxIHVrLXRleHQtYm9sZCB1ay10ZXh0LW11dGVkIHVrLXRleHQtY2VudGVyXFxcIj48L2gxPlxcbiAgICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cXG5cIiwgSCk7cmV0dXJuIFQucmVuZGVyLmFwcGx5KFQsIGFyZ3VtZW50cyk7IH07IiwiLy9tb2R1bGVzXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IGVlIGZyb20gJ2V2ZW50LWVtaXR0ZXInO1xuXG5pbXBvcnQgaG9tZU11c3RhY2hlIGZyb20gJy4vaG9tZS5odG1sJztcbmltcG9ydCBpbnN0cnVjdGlvbnNNdXN0YWNoZSBmcm9tICcuL2luc3RydWN0aW9ucy5odG1sJztcbmltcG9ydCBhYm91dE11c3RhY2hlIGZyb20gJy4vYWJvdXQuaHRtbCc7XG5cblxuZnVuY3Rpb24gSG9tZVZpZXcoKSB7XG5cblx0bGV0IGFwcDtcblxuXHQvL2VtaXR0ZXJcblx0ZWUodGhpcyk7XG5cdFxuXHR0aGlzLmhvbWVEYXRhID0ge1xuXHRcdHN1YnRpdGxlOiAnJyxcblx0XHRidXR0b25zOiB7fSxcblx0XHRsYW5ndWFnZXM6IFtdXG5cdH07XG5cdHRoaXMuaW5zdHJ1Y3Rpb25EYXRhID0ge1xuXHRcdHRpdGxlOiAnJyxcblx0XHR0ZXh0OiAnJ1xuXHR9O1xuXHR0aGlzLmFib3V0RGF0YSA9IHtcblx0XHR0aXRsZTogJycsXG5cdFx0dGV4dDogJycsXG5cdFx0c3BvbnNvclRpdGxlOicnXG5cdH07XG5cblx0dGhpcy5pbml0ID0gKGNvbnRleHQpID0+IHtcblxuXHRcdGFwcCA9IGNvbnRleHQ7XG5cblx0XHQvL2RhdGFcblx0XHR0aGlzLmhvbWVEYXRhID0ge1xuXHRcdFx0c3VidGl0bGU6IGFwcC5pMThuZXh0LnQoJ2ludHJvLnN1YnRpdGxlJyksXG5cdFx0XHRidXR0b25zOiB7XG5cdFx0XHRcdHBsYXk6IGFwcC5pMThuZXh0LnQoJ2ludHJvLmJ1dHRvbnMucGxheScpLFxuXHRcdFx0XHRpbnRydWN0aW9uczogYXBwLmkxOG5leHQudCgnaW50cm8uYnV0dG9ucy5pbnRydWN0aW9ucycpXG5cdFx0XHR9LFxuXHRcdFx0bGFuZ3VhZ2VzOiBbe1xuXHRcdFx0XHRuYW1lOiAnRW5nbGlzaCcsXG5cdFx0XHRcdGlzbzogJ2VuJ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bmFtZTogJ1BvcnR1Z3XDqnMnLFxuXHRcdFx0XHRpc286ICdwdCcsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRuYW1lOiAnRnJhbsOnYWlzJyxcblx0XHRcdFx0aXNvOiAnZnInLFxuXHRcdFx0fVxuXHRcdFx0XVxuXHRcdH07XG5cblx0XHR0aGlzLmluc3RydWN0aW9uRGF0YSA9IHtcblx0XHRcdHRpdGxlOiBhcHAuaTE4bmV4dC50KCdpbnN0cnVjdGlvbnMudGl0bGUnKSxcblx0XHRcdHRleHQ6IGFwcC5pMThuZXh0LnQoJ2luc3RydWN0aW9ucy50ZXh0Jylcblx0XHR9O1xuXG5cdFx0dGhpcy5hYm91dERhdGEgPSB7XG5cdFx0XHR0aXRsZTogYXBwLmkxOG5leHQudCgnYWJvdXQudGl0bGUnKSxcblx0XHRcdHRleHQ6IGFwcC5pMThuZXh0LnQoJ2Fib3V0LnRleHQnKSxcblx0XHRcdHlvdXR1YmVpZDogYXBwLmkxOG5leHQudCgnYWJvdXQueW91dHViZWlkJyksXG5cdFx0XHRwcmVzZW50YXRpb25zOiB7XG5cdFx0XHRcdHRpdGxlOiBhcHAuaTE4bmV4dC50KCdhYm91dC5wcmVzZW50YXRpb25zLnRpdGxlJyksXG5cdFx0XHRcdHRleHQ6IGFwcC5pMThuZXh0LnQoJ2Fib3V0LnByZXNlbnRhdGlvbnMudGV4dCcpLFxuXHRcdFx0XHRwcmVzZW50YXRpb25zOiB7XG5cdFx0XHRcdFx0dGl0bGU6IGFwcC5pMThuZXh0LnQoJ2Fib3V0LnByZXNlbnRhdGlvbnMucHJlc2VudGF0aW9ucy50aXRsZScpLFxuXHRcdFx0XHRcdGxpc3Q6IGFwcC5pMThuZXh0LnN0b3JlLmRhdGEuZW4udHJhbnNsYXRpb24uYWJvdXQucHJlc2VudGF0aW9ucy5wcmVzZW50YXRpb25zLmxpc3Rcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXhoaWJpdGlvbnM6IHtcblx0XHRcdFx0XHR0aXRsZTogYXBwLmkxOG5leHQudCgnYWJvdXQucHJlc2VudGF0aW9ucy5leGhpYml0aW9ucy50aXRsZScpLFxuXHRcdFx0XHRcdGxpc3Q6IGFwcC5pMThuZXh0LnN0b3JlLmRhdGEuZW4udHJhbnNsYXRpb24uYWJvdXQucHJlc2VudGF0aW9ucy5leGhpYml0aW9ucy5saXN0XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0dGVhbToge1xuXHRcdFx0XHR0aXRsZTogYXBwLmkxOG5leHQudCgnYWJvdXQudGVhbS50aXRsZScpLFxuXHRcdFx0XHRwZW9wbGU6IGFwcC5pMThuZXh0LnN0b3JlLmRhdGEuZW4udHJhbnNsYXRpb24uYWJvdXQudGVhbS5wZW9wbGUsXG5cdFx0XHRcdHN1cHBvcnQ6IGFwcC5pMThuZXh0LnQoJ2Fib3V0LnRlYW0uc3VwcG9ydCcpLFxuXHRcdFx0fSxcblx0XHRcdHNwb25zb3JzOiB7XG5cdFx0XHRcdHRpdGxlOiBhcHAuaTE4bmV4dC50KCdhYm91dC5zcG9uc29ycy50aXRsZScpLFxuXHRcdFx0XHRsaXN0OiBhcHAuaTE4bmV4dC5zdG9yZS5kYXRhLmVuLnRyYW5zbGF0aW9uLmFib3V0LnNwb25zb3JzLmxpc3Rcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Y29uc29sZS5sb2codGhpcy5hYm91dERhdGEpO1xuXHRcdGNvbnNvbGUubG9nKGFwcC5pMThuZXh0KTtcblx0XHRcblxuXHRcdC8vYnVpbGQgcGFnZVxuXHRcdGNvbnN0IGhvbWVIVE1MID0gaG9tZU11c3RhY2hlKHRoaXMuaG9tZURhdGEpO1xuXHRcdCQoaG9tZUhUTUwpLmFwcGVuZFRvKCQoJyN2aWV3JykpO1xuXG5cdFx0Y29uc3QgaW5zdHJ1Y3Rpb25zSFRNTCA9IGluc3RydWN0aW9uc011c3RhY2hlKHRoaXMuaW5zdHJ1Y3Rpb25EYXRhKTtcblx0XHQkKGluc3RydWN0aW9uc0hUTUwpLmFwcGVuZFRvKCQoJyN2aWV3JykpO1xuXG5cdFx0Y29uc3QgYWJvdXRIVE1MID0gYWJvdXRNdXN0YWNoZSh0aGlzLmFib3V0RGF0YSk7XG5cdFx0JChhYm91dEhUTUwpLmFwcGVuZFRvKCQoJyN2aWV3JykpO1xuXG5cdFx0Ly90cmFuc2xhdGlvblxuXHRcdHRyYW5zbGF0ZSgpO1xuXG5cdFx0Ly9idXR0b25cblx0XHQkKCcjZ28tcGxheScpLmNsaWNrKHRoaXMsIHBsYXkpO1xuXG5cdFx0ZW1pdFRvRGFzaGJvYXJkKHtcblx0XHRcdHZpZXc6ICd3YWl0aW5nJ1xuXHRcdH0pO1xuXG5cdH07XG5cblx0Y29uc3QgdHJhbnNsYXRlID0gKCkgPT4ge1xuXHRcdCQoJyNpbnRybycpLmxvY2FsaXplKCk7XG5cblx0XHQkKCcjaW5zdHJ1Y3Rpb25zJykubG9jYWxpemUoe1xuXHRcdFx0am9pbkFycmF5czogJyAnXG5cdFx0fSk7XG5cdFx0JCgnI2Fib3V0JykubG9jYWxpemUoKTtcblxuXHRcdGFwcC5pMThuZXh0Lm9uKCdsYW5ndWFnZUNoYW5nZWQnLCAoKSA9PiB7XG5cdFx0XHQkKCcjaW50cm8nKS5sb2NhbGl6ZSgpO1xuXHRcdFx0JCgnI2luc3RydWN0aW9ucycpLmxvY2FsaXplKHtcblx0XHRcdFx0am9pbkFycmF5czogJyAnXG5cdFx0XHR9KTtcblx0XHRcdCQoJyNhYm91dCcpLmxvY2FsaXplKCk7XG5cdFx0XHR1ZHBhdGVBYm91dFZpZGVvKCk7XG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgdWRwYXRlQWJvdXRWaWRlbyA9ICgpID0+IHtcblx0XHR0aGlzLmFib3V0RGF0YS55b3V0dWJlaWQgPSBhcHAuaTE4bmV4dC50KCdhYm91dC55b3V0dWJlaWQnKTtcblx0XHRjb25zdCBhYm91dEhUTUwgPSBhYm91dE11c3RhY2hlKHRoaXMuYWJvdXREYXRhKTtcblx0XHQkKCcjYWJvdXQnKS5yZW1vdmUoKTtcblx0XHQkKGFib3V0SFRNTCkuYXBwZW5kVG8oJCgnI3ZpZXcnKSk7XG5cblx0XHQkKCcjYWJvdXQnKS5sb2NhbGl6ZSh7XG5cdFx0XHRqb2luQXJyYXlzOiAnICdcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBwbGF5ID0gKCkgPT4ge1xuXG5cdFx0Y29uc3QgZHVyYXRpb24gPSAxNTAwO1xuXG5cdFx0aWYoIWFwcC5hcnR5b20uaW5pdGlhbGl6ZWQpIGFwcC5faW5pdEFydHlvbSgpOyAvLyBpbml0aWFsaXplIGxhbmd1YXRlXG5cblx0XHRhcHAuc3BlYWsoYXBwLmkxOG5leHQudCgnaW50cm8uc3BlYWsucGxheScpKTtcblxuXHRcdCQoJyNpbnRybycpLmFuaW1hdGUoe1xuXHRcdFx0bWFyZ2luVG9wOiAnLTEwMCcsXG5cdFx0XHRvcGFjaXR5OiAwLFxuXHRcdH0sIGR1cmF0aW9uLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmVtaXQoJ2NoYW5nZVZpZXcnLCB7XG5cdFx0XHRcdHNvdXJjZTogJ2hvbWUnLFxuXHRcdFx0XHR0YXJnZXQ6J3BsYXllcnMnIC8vJ3BhcnRuZXJzJ1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0fTtcblxuXHRjb25zdCBlbWl0VG9EYXNoYm9hcmQgPSAoe1xuXHRcdHR5cGUgPSAnaW50ZXJmYWNlJyxcblx0XHR2aWV3ID0gJ3dhaXRpbmcnLFxuXHRcdG1lc3NhZ2UgPSAnJ1xuXHR9KSA9PiB7XHRcblx0XHRhcHAuc29ja2V0LmVtaXQodHlwZSwge3ZpZXcsIG1lc3NhZ2V9KTtcblx0fTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgSG9tZVZpZXcoKTsiLCJ2YXIgSCA9IHJlcXVpcmUoXCJob2dhbi5qc1wiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHZhciBUID0gbmV3IEguVGVtcGxhdGUoe2NvZGU6IGZ1bmN0aW9uIChjLHAsaSkgeyB2YXIgdD10aGlzO3QuYihpPWl8fFwiXCIpO3QuYihcIjxkaXYgaWQ9XFxcImludHJvXFxcIiBjbGFzcz1cXFwidWstY29udGFpbmVyIHVrLWNvbnRhaW5lci1zbWFsbCB1ay1wb3NpdGlvbi1jZW50ZXIgdWstdGV4dC1jZW50ZXJcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8ZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGgxIGNsYXNzPVxcXCJ1ay1oZWFkaW5nLXByaW1hcnlcXFwiPlBpY3Qg4oCiIGlvPC9oMT5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDxoMyBpZD1cXFwic3VidGl0bGVcXFwiIGRhdGEtaTE4bj1cXFwiW2h0bWxdaW50cm8uc3VidGl0bGVcXFwiIGNsYXNzPVxcXCJ1ay1oMyB1ay1tYXJnaW4tcmVtb3ZlLXRvcFxcXCI+XCIpO3QuYih0LnQodC5mKFwic3VidGl0bGVcIixjLHAsMCkpKTt0LmIoXCI8L3N0cm9uZz48L2gzPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLW1lZGl1bS10b3BcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGJ1dHRvbiBpZD1cXFwiZ28tcGxheVxcXCIgZGF0YS1pMThuPVxcXCJpbnRyby5idXR0b25zLnBsYXlcXFwiIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLWxhcmdlIHVrLWJ1dHRvbi1wcmltYXJ5IHVrLWJvcmRlci1yb3VuZGVkXFxcIj5cIik7dC5iKHQudih0LmQoXCJidXR0b25zLnBsYXlcIixjLHAsMCkpKTt0LmIoXCI8L2J1dHRvbj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDwhLS0gPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8YnV0dG9uIGlkPVxcXCItc2hvdy1pbnN0cnVjdGlvbnNcXFwiIGRhdGEtaTE4bj1cXFwiaW50cm8uYnV0dG9ucy5pbnN0cnVjdGlvbnNcXFwiIHVrLXRvZ2dsZT1cXFwidGFyZ2V0OiAjaW5zdHJ1Y3Rpb25zXFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi10ZXh0XFxcIj5cIik7dC5iKHQudih0LmQoXCJidXR0b25zLmluc3RydWN0aW9uc1wiLGMscCwwKSkpO3QuYihcIjwvYnV0dG9uPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8L2Rpdj4gLS0+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDxkaXYgY2xhc3M9XFxcInVrLW1hcmdpbi1sYXJnZS10b3BcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGEgZGF0YS1pMThuPVxcXCJpbnRyby5idXR0b25zLmFib3V0XFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi10ZXh0XFxcIiBocmVmPVxcXCIjYWJvdXRcXFwiIHVrLXRvZ2dsZT5cIik7dC5iKHQudih0LmQoXCJidXR0b25zLmFib3V0XCIsYyxwLDApKSk7dC5iKFwiPC9hPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGJyLz5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGhyLz5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPG5hdiBjbGFzcz1cXFwidWstbmF2YmFyXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLW5hdmJhci1jZW50ZXJcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgIDx1bCBjbGFzcz1cXFwidWstbmF2YmFyLW5hdlxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7aWYodC5zKHQuZihcImxhbmd1YWdlc1wiLGMscCwxKSxjLHAsMCwxMDYwLDExNzMsXCJ7eyB9fVwiKSl7dC5ycyhjLHAsZnVuY3Rpb24oYyxwLHQpe3QuYihcIiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cXFwiI1xcXCIgb25jbGljaz1cXFwiYXBwLmNoYW5nZUNvbnRleExhbmd1YWdlKCdcIik7dC5iKHQudih0LmYoXCJpc29cIixjLHAsMCkpKTt0LmIoXCInKVxcXCI+XCIpO3QuYih0LnYodC5mKFwibmFtZVwiLGMscCwwKSkpO3QuYihcIjwvYT48L2xpPlwiKTt0LmIoXCJcXG5cIiArIGkpO30pO2MucG9wKCk7fXQuYihcIiAgICAgICAgICAgIDwvdWw+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPC9uYXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiPC9kaXY+O1wiKTtyZXR1cm4gdC5mbCgpOyB9LHBhcnRpYWxzOiB7fSwgc3ViczogeyAgfX0sIFwiPGRpdiBpZD1cXFwiaW50cm9cXFwiIGNsYXNzPVxcXCJ1ay1jb250YWluZXIgdWstY29udGFpbmVyLXNtYWxsIHVrLXBvc2l0aW9uLWNlbnRlciB1ay10ZXh0LWNlbnRlclxcXCI+XFxuICAgIDxkaXY+XFxuICAgICAgICA8aDEgY2xhc3M9XFxcInVrLWhlYWRpbmctcHJpbWFyeVxcXCI+UGljdCDigKIgaW88L2gxPlxcbiAgICAgICAgPGgzIGlkPVxcXCJzdWJ0aXRsZVxcXCIgZGF0YS1pMThuPVxcXCJbaHRtbF1pbnRyby5zdWJ0aXRsZVxcXCIgY2xhc3M9XFxcInVrLWgzIHVrLW1hcmdpbi1yZW1vdmUtdG9wXFxcIj57e3tzdWJ0aXRsZX19fTwvc3Ryb25nPjwvaDM+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4tbWVkaXVtLXRvcFxcXCI+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCJnby1wbGF5XFxcIiBkYXRhLWkxOG49XFxcImludHJvLmJ1dHRvbnMucGxheVxcXCIgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tbGFyZ2UgdWstYnV0dG9uLXByaW1hcnkgdWstYm9yZGVyLXJvdW5kZWRcXFwiPnt7YnV0dG9ucy5wbGF5fX08L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICAgIDwhLS0gPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XFxuICAgICAgICA8YnV0dG9uIGlkPVxcXCItc2hvdy1pbnN0cnVjdGlvbnNcXFwiIGRhdGEtaTE4bj1cXFwiaW50cm8uYnV0dG9ucy5pbnN0cnVjdGlvbnNcXFwiIHVrLXRvZ2dsZT1cXFwidGFyZ2V0OiAjaW5zdHJ1Y3Rpb25zXFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi10ZXh0XFxcIj57e2J1dHRvbnMuaW5zdHJ1Y3Rpb25zfX08L2J1dHRvbj5cXG4gICAgPC9kaXY+IC0tPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4tbGFyZ2UtdG9wXFxcIj5cXG4gICAgICAgIDxhIGRhdGEtaTE4bj1cXFwiaW50cm8uYnV0dG9ucy5hYm91dFxcXCIgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tdGV4dFxcXCIgaHJlZj1cXFwiI2Fib3V0XFxcIiB1ay10b2dnbGU+e3tidXR0b25zLmFib3V0fX08L2E+XFxuICAgIDwvZGl2PlxcbiAgICA8YnIvPlxcbiAgICA8aHIvPlxcbiAgICA8bmF2IGNsYXNzPVxcXCJ1ay1uYXZiYXJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstbmF2YmFyLWNlbnRlclxcXCI+XFxuICAgICAgICAgICAgPHVsIGNsYXNzPVxcXCJ1ay1uYXZiYXItbmF2XFxcIj5cXG4gICAgICAgICAgICAgICAge3sjbGFuZ3VhZ2VzfX1cXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XFxcIiNcXFwiIG9uY2xpY2s9XFxcImFwcC5jaGFuZ2VDb250ZXhMYW5ndWFnZSgne3tpc299fScpXFxcIj57e25hbWV9fTwvYT48L2xpPlxcbiAgICAgICAgICAgICAgICB7ey9sYW5ndWFnZXN9fVxcbiAgICAgICAgICAgIDwvdWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9uYXY+XFxuPC9kaXY+O1wiLCBIKTtyZXR1cm4gVC5yZW5kZXIuYXBwbHkoVCwgYXJndW1lbnRzKTsgfTsiLCIvL21vZHVsZXNcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgZWUgZnJvbSAnZXZlbnQtZW1pdHRlcic7XG5cbmltcG9ydCBwbGF5ZXJzc011c3RhY2hlIGZyb20gJy4vaHVtYW4tcGxheWVycy5odG1sJztcblxuXG5mdW5jdGlvbiBQYXJ0bmVyc1ZpZXcoKSB7XG5cblx0bGV0IGFwcDtcblxuXHQvL2VtaXR0ZXJcblx0ZWUodGhpcyk7XG5cblx0YXBwID0gdW5kZWZpbmVkO1xuXHR0aGlzLnBhZ2VEYXRhID0ge1xuXHRcdHRpdGxlOiAnJyxcblx0XHRwbGF5ZXJzT3B0aW9uczogW10sXG5cdFx0aW52ZXJzZUNvbG91cjogdW5kZWZpbmVkLFxuXHRcdGluZGl2aWR1YWxBY2NlbnQ6IGZhbHNlXG5cdH07XG5cblx0dGhpcy5pbml0ID0gKGNvbnRleHQpID0+IHtcblxuXHRcdGFwcCA9IGNvbnRleHQ7XG5cblx0XHQvL2RhdGFcblx0XHR0aGlzLnBhZ2VEYXRhID0ge1xuXHRcdFx0dGl0bGU6IGFwcC5pMThuZXh0LnQoJ3BsYXllcnMucGFnZS50aXRsZScpLFxuXHRcdFx0cGxheWVyc09wdGlvbnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IGFwcC5pMThuZXh0LnQoJ3BsYXllcnMucGxheWVyc09wdGlvbnMub25lUGxheWVyJyksXG5cdFx0XHRcdFx0c2x1Zzonb25lJyxcblx0XHRcdFx0XHRjb2xvdXI6ICdiYWNrZ3JvdW5kLXllbGxvdydcblx0XHRcdFx0fSx7XG5cdFx0XHRcdFx0bmFtZTogYXBwLmkxOG5leHQudCgncGxheWVycy5wbGF5ZXJzT3B0aW9ucy50d29QbGF5ZXJzJyksXG5cdFx0XHRcdFx0c2x1ZzogICd0d28nLFxuXHRcdFx0XHRcdGNvbG91cjogJ3VrLWJ1dHRvbi1wcmltYXJ5Jyxcblx0XHRcdFx0XHRleHRyYUljb246IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0XSxcblx0XHRcdGludmVyc2VDb2xvdXI6IGFwcC5pbnRlcmZhY2UuaW52ZXJzZUNsYXNzKCksXG5cdFx0XHRpbmRpdmlkdWFsQWNjZW50OiBmYWxzZVxuXHRcdH07XG5cblx0XHRzcGVhayh0aGlzLnBhZ2VEYXRhLnRpdGxlKTtcblxuXHRcdC8vYnVpbGQgcGFnZVxuXHRcdGNvbnN0IHBsYXllcnNIVE1MID0gcGxheWVyc3NNdXN0YWNoZSh0aGlzLnBhZ2VEYXRhKTtcblx0XHQkKHBsYXllcnNIVE1MKS5hcHBlbmRUbygkKCcjdmlldycpKTtcblxuXHRcdCQoJyNob21lLWJ1dHRvbicpLmNsaWNrKCgpID0+IHtcblx0XHRcdGhvbWVCdXR0b24oJ2hvbWUnKTtcblx0XHR9KTtcblxuXHRcdC8vYnV0dG9ucyBodW1hbiBwbGF5ZXJzXG5cdFx0Zm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5wYWdlRGF0YS5wbGF5ZXJzT3B0aW9ucykge1xuXHRcdFx0Y29uc3QgYnQgPSAkKGAjJHtvcHRpb24uc2x1Z31gKTtcblxuXHRcdFx0YnQuY2xpY2soKCkgPT57XG5cblx0XHRcdFx0bGV0IHRhcmdldDtcblx0XHRcdFx0aWYgKG9wdGlvbi5zbHVnID09ICdvbmUnKSB7XG5cdFx0XHRcdFx0YXBwLmdhbWVTdGF0ZS5jdXJyZW50Q2hhbGxlbmdlID0gJ0JsaW5kIERyYXdpbmcgd2l0aCBMZWZ0L1JpZ2h0IEhhbmQnO1xuXHRcdFx0XHRcdGFwcC5nYW1lU3RhdGUucGxheWVycyA9IDE7XG5cdFx0XHRcdFx0dGFyZ2V0ID0gJ2NoYWxsZW5nZSc7XG5cdFx0XHRcdFx0c3BlYWsoYXBwLmkxOG5leHQudCgncGxheWVycy5zcGVhay5vbmVQbGF5ZXInKSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YXBwLmdhbWVTdGF0ZS5wbGF5ZXJzID0gMjtcblx0XHRcdFx0XHR0YXJnZXQgPSAnY2hhbGxlbmdlcyc7XG5cdFx0XHRcdFx0c3BlYWsoYXBwLmkxOG5leHQudCgncGxheWVycy5zcGVhay50d29QbGF5ZXJzJykpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZXhpdEFuaW1hdGlvbih0YXJnZXQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly90cmFuc2xhdGVcblx0XHR0cmFuc2xhdGUoKTtcblxuXHRcdC8vYW5pbWF0aW9uXG5cdFx0ZW50ZXJBbmltYXRpb24oKTtcblxuXHRcdC8vZW1pdCB0byBzb2NrZXIgSU9cblx0XHRlbWl0VG9EYXNoYm9hcmQoe1xuXHRcdFx0bWVzc2FnZTogYXBwLmkxOG5leHQudCgncGxheWVycy5kYXNoYm9hcmQubWVzc2FnZScpLFxuXHRcdH0pO1xuXG5cdH07XG5cblx0Y29uc3QgdHJhbnNsYXRlID0gKCkgPT4ge1xuXHRcdCQoJyNodW1hbi1wbGF5ZXJzJykubG9jYWxpemUoKTtcblx0fTtcblxuXHRjb25zdCBlbnRlckFuaW1hdGlvbiA9ICgpID0+IHtcblx0XHRjb25zdCBkdXJhdGlvbiA9IDE1MDA7XG5cblx0XHRjb25zdCBjb250YWluZXIgPSAkKCcjaHVtYW4tcGxheWVycycpO1xuXHRcdGNvbnRhaW5lci5jc3MoJ29wYWNpdHknLCAwKTtcblx0XHRjb250YWluZXIuY3NzKCdtYXJnaW5Ub3AnLCAxMDApO1xuXG5cdFx0Y29udGFpbmVyLmFuaW1hdGUoe1xuXHRcdFx0bWFyZ2luVG9wOiAwLFxuXHRcdFx0b3BhY2l0eTogMSxcblx0XHR9LCBkdXJhdGlvbik7XG5cdH07XG5cblx0Y29uc3QgaG9tZUJ1dHRvbiA9ICgpID0+IHtcblx0XHQkKCcjaHVtYW4tcGxheWVycycpLmFuaW1hdGUoe1xuXHRcdFx0bWFyZ2luVG9wOiAnLTEwMCcsXG5cdFx0XHRvcGFjaXR5OiAwLFxuXHRcdH0sIDE1MDAsICgpID0+IHtcblx0XHRcdHRoaXMuZW1pdCgnY2hhbmdlVmlldycsIHtcblx0XHRcdFx0c291cmNlOiAncGxheWVycycsXG5cdFx0XHRcdHRhcmdldDonaG9tZSdcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0ZW1pdFRvRGFzaGJvYXJkKHtcblx0XHRcdHZpZXc6ICd3YWl0aW5nJ1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IGV4aXRBbmltYXRpb24gPSAodGFyZ2V0KSA9PiB7XG5cdFx0Y29uc3QgZHVyYXRpb24gPSAxNTAwO1xuXG5cdFx0JCgnI2h1bWFuLXBsYXllcnMnKS5hbmltYXRlKHtcblx0XHRcdG1hcmdpblRvcDogJy0xMDAnLFxuXHRcdFx0b3BhY2l0eTogMCxcblx0XHR9LCBkdXJhdGlvbiwgKCkgPT4ge1xuXHRcdFx0dGhpcy5lbWl0KCdjaGFuZ2VWaWV3Jywge1xuXHRcdFx0XHRzb3VyY2U6ICdwbGF5ZXJzJyxcblx0XHRcdFx0dGFyZ2V0OnRhcmdldFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG5cblx0Ly9zcGVhY2tcblx0Y29uc3Qgc3BlYWsgPSAobXNnKSA9PiB7XG5cdFx0YXBwLnNwZWFrKG1zZyk7XG5cdH07XG5cblx0Y29uc3QgZW1pdFRvRGFzaGJvYXJkID0gKHtcblx0XHR0eXBlID0gJ2ludGVyZmFjZScsXG5cdFx0dmlldyA9ICdwbGF5ZXJzJyxcblx0XHRyb29tID0gYXBwLnNvY2tldC5pZCxcblx0XHRjb2xvdXIgPSAnJyxcblx0XHRtZXNzYWdlID0gJydcblx0fSkgPT4ge1xuXHRcdGFwcC5zb2NrZXQuZW1pdCh0eXBlLCB7IHZpZXcsIHJvb20sIGNvbG91ciwgbWVzc2FnZX0pO1xuXHR9O1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBQYXJ0bmVyc1ZpZXcoKTsiLCJ2YXIgSCA9IHJlcXVpcmUoXCJob2dhbi5qc1wiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHZhciBUID0gbmV3IEguVGVtcGxhdGUoe2NvZGU6IGZ1bmN0aW9uIChjLHAsaSkgeyB2YXIgdD10aGlzO3QuYihpPWl8fFwiXCIpO3QuYihcIjxkaXYgaWQ9XFxcImh1bWFuLXBsYXllcnNcXFwiIGNsYXNzPVxcXCJ1ay1jb250YWluZXIgdWstY29udGFpbmVyLXNtYWxsIHVrLXBvc2l0aW9uLWNlbnRlciB1ay10ZXh0LWNlbnRlclxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDxoMSBpZD1cXFwidGl0bGVcXFwiIGNsYXNzPVxcXCJ1ay1oMSBcIik7dC5iKHQudih0LmYoXCJpbnZlcnNlQ29sb3VyXCIsYyxwLDApKSk7dC5iKFwiXFxcIiBkYXRhLWkxOG49XFxcInBsYXllcnMucGFnZS50aXRsZVxcXCI+XCIpO3QuYih0LnYodC5mKFwidGl0bGVcIixjLHAsMCkpKTt0LmIoXCI8L2gxPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4tbWVkaXVtLXRvcFxcXCIgdWstZ3JpZD5cIik7dC5iKFwiXFxuXCIgKyBpKTtpZih0LnModC5mKFwicGxheWVyc09wdGlvbnNcIixjLHAsMSksYyxwLDAsMjc0LDcyNCxcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC0xLTJcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJcIik7dC5iKHQudih0LmYoXCJzbHVnXCIsYyxwLDApKSk7dC5iKFwiXFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1sYXJnZSB1ay1ib3JkZXItcm91bmRlZCBcIik7dC5iKHQudih0LmYoXCJjb2xvdXJcIixjLHAsMCkpKTt0LmIoXCIgdWstbWFyZ2luLXNtYWxsLXJpZ2h0IHVrLW1hcmdpbi1zbWFsbC1ib3R0b20gdWstcGFkZGluZy1zbWFsbCB1ay13aWR0aC0xLTFcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgPHNwYW4gdWstaWNvbj1cXFwiaWNvbjogdXNlcjsgcmF0aW86IDEuNVxcXCI+PC9zcGFuPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICAgICAgXCIpO2lmKHQucyh0LmYoXCJleHRyYUljb25cIixjLHAsMSksYyxwLDAsNTg4LDYzNCxcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiPHNwYW4gdWstaWNvbj1cXFwiaWNvbjogdXNlcjsgcmF0aW86IDEuNVxcXCI+PC9zcGFuPlwiKTt9KTtjLnBvcCgpO310LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgIFwiKTt0LmIodC52KHQuZihcIm5hbWVcIixjLHAsMCkpKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7fSk7Yy5wb3AoKTt9dC5iKFwiICAgIDwvZGl2PiAgXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiPC9kaXY+XCIpO3QuYihcIlxcblwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIjxidXR0b24gaWQ9XFxcImhvbWUtYnV0dG9uXFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1sYXJnZSB1ay1ib3JkZXItcm91bmRlZCB1ay1wYWRkaW5nLXJlbW92ZVxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDxzcGFuIHVrLWljb249XFxcImljb246IGhvbWU7IHJhdGlvOiAxLjVcXFwiIGNsYXNzPVxcXCJ1ay1tYXJnaW4tc21hbGwtcmlnaHRcXFwiPjwvc3Bhbj5Ib21lXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiPC9idXR0b24+XCIpO3JldHVybiB0LmZsKCk7IH0scGFydGlhbHM6IHt9LCBzdWJzOiB7ICB9fSwgXCI8ZGl2IGlkPVxcXCJodW1hbi1wbGF5ZXJzXFxcIiBjbGFzcz1cXFwidWstY29udGFpbmVyIHVrLWNvbnRhaW5lci1zbWFsbCB1ay1wb3NpdGlvbi1jZW50ZXIgdWstdGV4dC1jZW50ZXJcXFwiPlxcbiAgICA8aDEgaWQ9XFxcInRpdGxlXFxcIiBjbGFzcz1cXFwidWstaDEge3tpbnZlcnNlQ29sb3VyfX1cXFwiIGRhdGEtaTE4bj1cXFwicGxheWVycy5wYWdlLnRpdGxlXFxcIj57e3RpdGxlfX08L2gxPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4tbWVkaXVtLXRvcFxcXCIgdWstZ3JpZD5cXG4gICAgICAgICAgICB7eyNwbGF5ZXJzT3B0aW9uc319XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC0xLTJcXFwiPlxcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJ7e3NsdWd9fVxcXCIgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tbGFyZ2UgdWstYm9yZGVyLXJvdW5kZWQge3tjb2xvdXJ9fSB1ay1tYXJnaW4tc21hbGwtcmlnaHQgdWstbWFyZ2luLXNtYWxsLWJvdHRvbSB1ay1wYWRkaW5nLXNtYWxsIHVrLXdpZHRoLTEtMVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiB1ay1pY29uPVxcXCJpY29uOiB1c2VyOyByYXRpbzogMS41XFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICB7eyNleHRyYUljb259fTxzcGFuIHVrLWljb249XFxcImljb246IHVzZXI7IHJhdGlvOiAxLjVcXFwiPjwvc3Bhbj57ey9leHRyYUljb259fVxcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgIHt7bmFtZX19XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIHt7L3BsYXllcnNPcHRpb25zfX1cXG4gICAgPC9kaXY+ICBcXG48L2Rpdj5cXG5cXG48YnV0dG9uIGlkPVxcXCJob21lLWJ1dHRvblxcXCIgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tbGFyZ2UgdWstYm9yZGVyLXJvdW5kZWQgdWstcGFkZGluZy1yZW1vdmVcXFwiPlxcbiAgICA8c3BhbiB1ay1pY29uPVxcXCJpY29uOiBob21lOyByYXRpbzogMS41XFxcIiBjbGFzcz1cXFwidWstbWFyZ2luLXNtYWxsLXJpZ2h0XFxcIj48L3NwYW4+SG9tZVxcbjwvYnV0dG9uPlwiLCBIKTtyZXR1cm4gVC5yZW5kZXIuYXBwbHkoVCwgYXJndW1lbnRzKTsgfTsiLCJ2YXIgSCA9IHJlcXVpcmUoXCJob2dhbi5qc1wiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHZhciBUID0gbmV3IEguVGVtcGxhdGUoe2NvZGU6IGZ1bmN0aW9uIChjLHAsaSkgeyB2YXIgdD10aGlzO3QuYihpPWl8fFwiXCIpO3QuYihcIjxkaXYgaWQ9XFxcImluc3RydWN0aW9uc1xcXCIgdWstb2ZmY2FudmFzPVxcXCJtb2RlOiBwdXNoOyBvdmVybGF5OiB0cnVlXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBjbGFzcz1cXFwidWstb2ZmY2FudmFzLWJhclxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJ1ay1vZmZjYW52YXMtY2xvc2VcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdWstY2xvc2U+PC9idXR0b24+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay10ZXh0LXNtYWxsXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICA8aDMgY2xhc3M9J3VrLWgzJyBkYXRhLWkxOG49XFxcIltodG1sXWluc3RydWN0aW9ucy50aXRsZVxcXCI+XCIpO3QuYih0LnYodC5mKFwidGl0bGVcIixjLHAsMCkpKTt0LmIoXCI8L2gzPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgIDxkaXYgZGF0YS1pMThuPVxcXCJbaHRtbF1pbnN0cnVjdGlvbnMudGV4dFxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgIFwiKTt0LmIodC50KHQuZihcInRleHRcIixjLHAsMCkpKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIjwvZGl2PlwiKTtyZXR1cm4gdC5mbCgpOyB9LHBhcnRpYWxzOiB7fSwgc3ViczogeyAgfX0sIFwiPGRpdiBpZD1cXFwiaW5zdHJ1Y3Rpb25zXFxcIiB1ay1vZmZjYW52YXM9XFxcIm1vZGU6IHB1c2g7IG92ZXJsYXk6IHRydWVcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1vZmZjYW52YXMtYmFyXFxcIj5cXG4gICAgICAgIDxidXR0b24gY2xhc3M9XFxcInVrLW9mZmNhbnZhcy1jbG9zZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiB1ay1jbG9zZT48L2J1dHRvbj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXRleHQtc21hbGxcXFwiPlxcbiAgICAgICAgICAgIDxoMyBjbGFzcz0ndWstaDMnIGRhdGEtaTE4bj1cXFwiW2h0bWxdaW5zdHJ1Y3Rpb25zLnRpdGxlXFxcIj57e3RpdGxlfX08L2gzPlxcbiAgICAgICAgICAgIDxkaXYgZGF0YS1pMThuPVxcXCJbaHRtbF1pbnN0cnVjdGlvbnMudGV4dFxcXCI+XFxuICAgICAgICAgICAgICAgIHt7e3RleHR9fX1cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L2Rpdj5cIiwgSCk7cmV0dXJuIFQucmVuZGVyLmFwcGx5KFQsIGFyZ3VtZW50cyk7IH07IiwiLy9tb2R1bGVzXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5yZXF1aXJlKCd3ZWJwYWNrLWpxdWVyeS11aS9lZmZlY3RzJyk7XG5cbmltcG9ydCBob21lVmlldyBmcm9tICcuL2hvbWUtdmlldyc7XG5pbXBvcnQgcGFydG5lcnNWaWV3IGZyb20gJy4vcGFydG5lcnMtdmlldyc7XG5pbXBvcnQgcGxheWVyc1ZpZXcgZnJvbSAnLi9odW1hbi1wbGF5ZXJzLXZpZXcnO1xuaW1wb3J0IGNoYWxsZW5nZXNWaWV3IGZyb20gJy4vY2hhbGxlbmdlcy12aWV3JztcbmltcG9ydCBjaGFsbGVuZ2VWaWV3IGZyb20gJy4vY2hhbGxlbmdlLXZpZXcnO1xuaW1wb3J0IGdhbWVWaWV3IGZyb20gJy4vZ2FtZS12aWV3JztcbmltcG9ydCBwb3N0Z2FtZVZpZXcgZnJvbSAnLi9wb3N0Z2FtZS12aWV3JztcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbnRlcmZhY2VWaWV3KGNvbnRleHQpIHtcblxuXHRjb25zdCBhcHAgPSBjb250ZXh0O1xuXG5cdHRoaXMuY3VycmVudFZpZXdOYW1lID0gJ2hvbWUnO1xuXHR0aGlzLmN1cnJlbnRWaWV3ID0gJyc7XG5cblx0dGhpcy5pbnZlcnNlQ2xhc3NUb2dnbGUgPSBmYWxzZTtcblx0dGhpcy5jbGFzc0NvbG9yID0gJyc7XHQvL0NsYXNzIGNvbG91ciAoY2FuIGJlIHRoZSBzYW1lIGFzIHBsYXllcmNvbG91cikgLT4gY2hhbmdlIHRoZSBpbnRlcmZhY2UgY29sb3Jcblx0dGhpcy5jbGFzc0JsZW5kID0gJyc7ICAvLyBibGVuZFxuXG5cblx0dGhpcy5pbml0ID0gKCkgPT4ge1xuXHRcdHRoaXMuY3VycmVudFZpZXdOYW1lID0ge3RhcmdldDonaG9tZSd9O1xuXHRcdHRoaXMuY2hhbmdlVmlldyh0aGlzLmN1cnJlbnRWaWV3TmFtZSk7XG5cdH07XG5cblx0dGhpcy5jaGFuZ2VWaWV3ID0gKGV2ZW50KSA9PiB7XG5cblx0XHQvL2NsZWFuIHZpZXdcblx0XHRjb25zdCB2aWV3ID0gJCgnI3ZpZXcnKTtcblx0XHR2aWV3LmVtcHR5KCk7XG5cblx0XHR0aGlzLmN1cnJlbnRWaWV3TmFtZSA9IGV2ZW50LnRhcmdldDtcblxuXHRcdGlmKGV2ZW50LnRhcmdldCA9PSAnaG9tZScpIHtcblx0XHRcdGFwcC5yZXNldEdhbWVTdGF0ZSgpO1xuXHRcdFx0dGhpcy5jdXJyZW50VmlldyA9IGhvbWVWaWV3O1xuXHRcdH0gZWxzZSBpZihldmVudC50YXJnZXQgPT0gJ3BhcnRuZXJzJykge1xuXHRcdFx0dGhpcy5jdXJyZW50VmlldyA9IHBhcnRuZXJzVmlldztcblx0XHR9IGVsc2UgaWYoZXZlbnQudGFyZ2V0ID09ICdwbGF5ZXJzJykge1xuXHRcdFx0dGhpcy5jdXJyZW50VmlldyA9IHBsYXllcnNWaWV3O1xuXHRcdH0gZWxzZSBpZihldmVudC50YXJnZXQgPT0gJ2NoYWxsZW5nZXMnKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRWaWV3ID0gY2hhbGxlbmdlc1ZpZXc7XG5cdFx0fSBlbHNlIGlmKGV2ZW50LnRhcmdldCA9PSAnY2hhbGxlbmdlJykge1xuXHRcdFx0YXBwLnJlc2V0R2FtZVN1Y2Nlc3MoKTtcblx0XHRcdHRoaXMuY3VycmVudFZpZXcgPSBjaGFsbGVuZ2VWaWV3O1xuXHRcdH0gZWxzZSBpZihldmVudC50YXJnZXQgPT0gJ2dhbWUnKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRWaWV3ID0gZ2FtZVZpZXc7XG5cdFx0fSBlbHNlIGlmKGV2ZW50LnRhcmdldCA9PSAncG9zdC1nYW1lJykge1xuXHRcdFx0dGhpcy5jdXJyZW50VmlldyA9IHBvc3RnYW1lVmlldztcblx0XHR9XG5cblx0XHR0aGlzLmN1cnJlbnRWaWV3LmluaXQoYXBwKTtcblx0XHR0aGlzLmN1cnJlbnRWaWV3Lm9uY2UoJ2NoYW5nZVZpZXcnLCB2aWV3ID0+IHRoaXMuY2hhbmdlVmlldyh2aWV3KSk7XG5cblx0fTtcblxuXHR0aGlzLmludmVyc2VDbGFzcyA9ICgpID0+IHtcblx0XHRyZXR1cm4gdGhpcy5pbnZlcnNlQ2xhc3NUb2dnbGUgPyAndWstbGlnaHQnIDogJ3VrLWRhcmsnO1xuXHR9O1xuXG5cdHRoaXMuY2hhbmdlQ29sb3VyID0gKGNvbG91cikgPT4ge1xuXG5cdFx0Y29uc3QgZHVyYXRpb24gPSAxMDAwO1xuXG5cdFx0bGV0IHByZXZDb2xvckNsYXNzID0gdGhpcy5jbGFzc0NvbG9yO1xuXHRcdGxldCBwcmV2QmxlbmRDbGFzcyA9IHRoaXMuY2xhc3NCbGVuZDtcblx0XG5cdFx0bGV0IGNvbG9yQ2xhc3M7XG5cdFx0bGV0IGJsZW5kQ2xhc3M7XG5cdFxuXHRcdGlmKGNvbG91ciA9PSAnbGlnaHQnKSB7XG5cdFx0XHR0aGlzLmludmVyc2VDbGFzc1RvZ2dsZSA9IGZhbHNlO1xuXHRcdFx0Y29sb3JDbGFzcyA9ICd1ay1iYWNrZ3JvdW5kLWRlZmF1bHQnO1xuXHRcdFx0YmxlbmRDbGFzcyA9ICd1ay1iYWNrZ3JvdW5kLWJsZW5kLW11bHRpcGx5Jztcblx0XHR9IGVsc2UgaWYoY29sb3VyID09ICdibHVlJykge1xuXHRcdFx0dGhpcy5pbnZlcnNlQ2xhc3NUb2dnbGUgPSB0cnVlO1xuXHRcdFx0Y29sb3JDbGFzcyA9ICd1ay1iYWNrZ3JvdW5kLXByaW1hcnknO1xuXHRcdFx0YmxlbmRDbGFzcyA9ICd1ay1iYWNrZ3JvdW5kLWJsZW5kLW11bHRpcGx5Jztcblx0XHR9IGVsc2UgaWYoY29sb3VyID09ICdkYXJrJykge1xuXHRcdFx0dGhpcy5pbnZlcnNlQ2xhc3NUb2dnbGUgPSB0cnVlO1xuXHRcdFx0Y29sb3JDbGFzcyA9ICd1ay1iYWNrZ3JvdW5kLXNlY29uZGFyeSc7XG5cdFx0XHRibGVuZENsYXNzID0gJ3VrLWJhY2tncm91bmQtYmxlbmQtY29sb3ItYnVybic7XG5cdFx0fSBlbHNlIGlmKGNvbG91ciA9PSAneWVsbG93Jykge1xuXHRcdFx0dGhpcy5pbnZlcnNlQ2xhc3NUb2dnbGUgPSBmYWxzZTtcblx0XHRcdGNvbG9yQ2xhc3MgPSAnYmFja2dyb3VuZC15ZWxsb3cnO1xuXHRcdFx0YmxlbmRDbGFzcyA9ICd1ay1iYWNrZ3JvdW5kLWJsZW5kLW11bHRpcGx5Jztcblx0XHR9XG5cdFxuXHRcdC8vIHRoaXMuY2xhc3NFbGVtZW50ID0gZWxlbWVudENsYXNzO1xuXHRcdHRoaXMuY2xhc3NDb2xvciA9IGNvbG9yQ2xhc3M7XG5cdFx0dGhpcy5jbGFzc0JsZW5kID0gYmxlbmRDbGFzcztcblx0XG5cdFx0JCgnI3ZpZXcnKS5zd2l0Y2hDbGFzcyggcHJldkNvbG9yQ2xhc3MsIGNvbG9yQ2xhc3MsIGR1cmF0aW9uLCAnZWFzZUluT3V0UXVhZCcpO1xuXHRcdGlmIChwcmV2QmxlbmRDbGFzcyAhPSB0aGlzLmNsYXNzQmxlbmQpICQoJyN2aWV3Jykuc3dpdGNoQ2xhc3MoIHByZXZCbGVuZENsYXNzLCB0aGlzLmNsYXNzQmxlbmQsIGR1cmF0aW9uLCAnZWFzZUluT3V0UXVhZCcpO1xuXHR9O1xuXG59IiwiLy9tb2R1bGVzXG5pbXBvcnQgZWUgZnJvbSAnZXZlbnQtZW1pdHRlcic7XG5pbXBvcnQgcndjIGZyb20gJ3JhbmRvbS13ZWlnaHRlZC1jaG9pY2UnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hZ2VudGFBSSgpIHtcblxuXHRsZXQgYXBwO1xuXG5cdC8vZW1pdGVyXG5cdGVlKHRoaXMpO1xuXG5cdC8vIEluaXRpYWxpemUgVmFyaWFibGVzXG5cblx0dGhpcy5zY29yZXMgPSBbXTtcblx0dGhpcy50aW1lckdvb2dsZSA9IDA7XG5cdHRoaXMubGFzdFRpbWVzdGFtcCA9IDA7XG5cdHRoaXMubGFzdFRpbWVzdGFtcF9jaGVjayA9IDA7XG5cblx0dGhpcy5jdXJyZW50Q2F0ZWdvcnkgPSAnJztcblxuXHR0aGlzLlFVSUNLX0RSQVdfQVBJID0gJ2h0dHBzOi8vaW5wdXR0b29scy5nb29nbGUuY29tL3JlcXVlc3Q/aW1lPWhhbmR3cml0aW5nJmFwcD1xdWlja2RyYXcmZGJnPTEmY3M9MSZvZT1VVEYtOCc7IC8vIFNldCBCYXNlIFVSTCBmb3IgUXVpY2tkcmF3IEdvb2dsZSBBSSBBUElcblx0XG5cblx0Ly8tLS0gSW5pdGlhbGl6ZS4uLlxuXG5cdHRoaXMuaW5pdCA9IChjb250ZXh0KSA9PiB7XG5cdFx0YXBwID0gY29udGV4dDtcblx0XHR0aGlzLmN1cnJlbnRDYXRlZ29yeSAgPSBhcHAuZ2FtZVN0YXRlLmN1cnJlbnRDYXRlZ29yeTtcblx0fTtcblxuXHR0aGlzLnJlYWQgPSAoZXZlbnRUaW1lU3RhbXAsaW5rKSA9PiB7XG5cdFx0Ly9kZWxheVxuXHRcdGlmIChldmVudFRpbWVTdGFtcCAtIHRoaXMubGFzdFRpbWVzdGFtcF9jaGVjayA+IDEwMDApIHtcblx0XHRcdGNoZWNrUXVpY2tEcmF3KGluayk7XG5cdFx0XHR0aGlzLmxhc3RUaW1lc3RhbXBfY2hlY2sgPSBldmVudFRpbWVTdGFtcDtcblx0XHR9XG5cdH07XG5cblx0Ly8tLS0gQ2hlY2sgUXVpY2tkcmF3IEdvb2dsZSBBSSBBUElcblx0Y29uc3QgY2hlY2tRdWlja0RyYXcgPSAoaW5rKSA9PiB7XG5cblx0XHQvLyBHZXQgUGFwZXIgQ2FudmFzIFdlaWdodC9IZWlnaHRcblx0XHRsZXQgY19kaW1zID0gZ2V0Q2FudmFzRGltZW5zaW9ucygpO1xuXG5cdFx0Ly8gU2V0IEhUVFAgSGVhZGVyc1xuXHRcdGxldCBoZWFkZXJzID0ge1xuXHRcdFx0J0FjY2VwdCc6ICcqLyonLFxuXHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdH07XG5cblx0XHQvLyBJbml0IEhUVFAgUmVxdWVzdFxuXHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHR4aHIub3BlbignUE9TVCcsIHRoaXMuUVVJQ0tfRFJBV19BUEkpO1xuXHRcdE9iamVjdC5rZXlzKGhlYWRlcnMpLmZvckVhY2goIChrZXkpID0+IHtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKTtcblx0XHR9KTtcblxuXHRcdC8vIEhUVFAgUmVxdWVzdCBPbiBMb2FkXG5cdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcblx0XHRcdFx0bGV0IHJlcyA9IHhoci5yZXNwb25zZVRleHQ7IC8vIEhUVFAgUmVzcG9uc2UgVGV4dFxuXHRcdFx0XHRwYXJzZVJlc3BvbnNlKHJlcyk7IC8vIFBhcnNlIFJlc3BvbnNlXG5cdFx0XHR9IGVsc2UgaWYgKHhoci5zdGF0dXMgIT09IDIwMCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnUmVxdWVzdCBmYWlsZWQuICBSZXR1cm5lZCBzdGF0dXMgb2YgJyArIHhoci5zdGF0dXMpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvLyBDcmVhdGUgTmV3IERhdGEgUGF5bG9hZCBmb3IgUXVpY2tkcmF3IEdvb2dsZSBBSSBBUElcblx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdCdpbnB1dF90eXBlJzogMCxcblx0XHRcdCdyZXF1ZXN0cyc6IFt7XG5cdFx0XHRcdCdsYW5ndWFnZSc6ICdxdWlja2RyYXcnLFxuXHRcdFx0XHQnd3JpdGluZ19ndWlkZSc6IHtcblx0XHRcdFx0XHQnd2lkdGgnOiBjX2RpbXMud2lkdGgsXG5cdFx0XHRcdFx0J2hlaWdodCc6IGNfZGltcy5oZWlnaHRcblx0XHRcdFx0fSxcblx0XHRcdFx0J2luayc6IFtpbmtdXG5cdFx0XHR9XVxuXHRcdH07XG5cblx0XHQvLyBDb252ZXJ0IERhdGEgUGF5bG9hZCB0byBKU09OIFN0cmluZ1xuXHRcdGxldCByZXF1ZXN0X2RhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcblxuXHRcdC8vIFNlbmQgSFRUUCBSZXF1ZXN0IHcvIERhdGEgUGF5bG9hZFxuXHRcdHhoci5zZW5kKHJlcXVlc3RfZGF0YSk7XG5cblx0fTtcblxuXHQvLy0tLSBHZXQgUGFwZXIgQ2FudmFzIERpbWVuc2lvbnMgV2lkdGgvSGVpZ2h0XG5cdGNvbnN0IGdldENhbnZhc0RpbWVuc2lvbnMgPSAoKSA9PiB7XG5cdFx0bGV0IHcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykub2Zmc2V0V2lkdGg7XG5cdFx0bGV0IGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykub2Zmc2V0SGVpZ2h0O1xuXHRcdHJldHVybiB7XG5cdFx0XHRoZWlnaHQ6IGgsXG5cdFx0XHR3aWR0aDogd1xuXHRcdH07XG5cdH07XG5cblx0Ly8gUGFyc2UgUXVpY2tkcmF3IEdvb2dsZSBBSSBBUEkgUmVzcG9uc2Vcblx0Y29uc3QgcGFyc2VSZXNwb25zZSA9IChyZXMpID0+IHtcblxuXHRcdC8vIENvbnZlcnQgUmVzcG9uc2UgU3RyaW5nIHRvIEpTT05cblx0XHRsZXQgcmVzX2ogPSBKU09OLnBhcnNlKHJlcyk7XG5cblx0XHQvLyBFeHRyYWN0IEd1ZXNzIFNjb3JlIFN0cmluZyBmcm9tIFJlc3BvbnNlIGFuZCBDb252ZXJ0IHRvIEpTT05cblx0XHR0aGlzLnNjb3JlcyA9IEpTT04ucGFyc2UocmVzX2pbMV1bMF1bM10uZGVidWdfaW5mby5tYXRjaCgvU0NPUkVTSU5LUzogKC4rKSBDb21iaW5lcjovKVsxXSk7XG5cblx0XHQvLyBsZXQgYWN0aXZlU2NvcmUgPSBzY29yZXM7XG5cdFx0bGV0IGFjdGl2ZVNjb3JlID0gZmlsdGVyR3Vlc3ModGhpcy5zY29yZXMpO1xuXG5cdFx0bGV0IGF0dGVtcHQgPSBhY3RpdmVTY29yZVswXVswXTtcblxuXHRcdC8vLS0tLVRFU1QgQU5EIEdFVCBCQUNLIFRPIFRIRSBJTlRFUkZBQ0Vcblx0XHRpZiAodGhpcy5jdXJyZW50Q2F0ZWdvcnkgIT0gYXR0ZW1wdCkge1xuXHRcdFx0ZHJhd0lzV3JvbmcoYXR0ZW1wdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRyYXdJc1JpZ2h0KGF0dGVtcHQpO1xuXHRcdH1cblxuXHR9O1xuXG5cdC8vL2FkZCBhdGVtb3QgdG8gYSBsaXN0XG5cdGNvbnN0IGFkZFRvR3Vlc3NBdHRlbXBzID0gKG5ld0F0dGVtcHQpID0+IHtcblxuXHRcdGxldCByZXBlYXRlZCA9IGZhbHNlO1xuXG5cdFx0Zm9yKGxldCBhdHRlbXB0IG9mIGFwcC5nYW1lU3RhdGUuYXR0ZW1wdHMpIHtcblx0XHRcdGlmIChhdHRlbXB0ID09IG5ld0F0dGVtcHQpIHtcblx0XHRcdFx0cmVwZWF0ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChyZXBlYXRlZCA9PSBmYWxzZSkge1xuXHRcdFx0YXBwLmdhbWVTdGF0ZS5hdHRlbXB0cy5wdXNoKG5ld0F0dGVtcHQpO1xuXHRcdH1cblxuXHR9O1xuXG5cdC8vLS0tIGZpbHRlciBndWVzc2VzXG5cdGNvbnN0IGZpbHRlckd1ZXNzID0gKHNjb3JlcykgPT4ge1xuXG5cdFx0bGV0IGN1cnJlbnRHdWVzc2VzID0gdGhpcy5zY29yZXMuc2xpY2UoKTtcblxuXHRcdC8vaWYgaXQgaXMgdGhlIGZpcnN0IGd1ZXNzXG5cdFx0aWYgKGFwcC5nYW1lU3RhdGUuYXR0ZW1wdHMubGVuZ3RoID09IDApIHtcblx0XHRcdHJldHVybiBzY29yZXM7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcHAuZ2FtZVN0YXRlLmF0dGVtcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGN1cnJlbnRHdWVzc2VzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGlmIChhcHAuZ2FtZVN0YXRlLmF0dGVtcHRzW2ldID09IGN1cnJlbnRHdWVzc2VzW2pdWzBdKSB7XG5cdFx0XHRcdFx0Y3VycmVudEd1ZXNzZXMuc3BsaWNlKGosIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGN1cnJlbnRHdWVzc2VzLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRjdXJyZW50R3Vlc3NlcyA9IHNjb3Jlcy5zbGljZSgpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjdXJyZW50R3Vlc3NlcztcblxuXHR9O1xuXG5cdFxuXHQvLy8vLS0gaWYgIGRyYXcgaXMgd3Jvbmdcblx0Y29uc3QgZHJhd0lzV3JvbmcgPSAoYXR0ZW1wdCkgPT4ge1xuXG5cdFx0bGV0IHZlcmJhbCA9ICcnO1xuXHRcdGxldCBzcGVlY2ggPSAnJztcblxuXHRcdC8vY2hlY2sgaWYgdGhlIHdvcmQgUXVpY2tkcmF3IGlzIGd1ZXNzaW5nIGlzIGluIG91ciBkYXRhYmFzZSAtIElmIG5vdCwganVzdCB0aHJvdyBhbiBpbnRlcmplY3Rpb24uIFRoaXMgd29yZCBzaG91bGQgYmUgYWRkZWQgdG8gdGhlIGRhdGFzZXQgbGF0ZXIuXG5cdFx0bGV0IGF0dGVtcHRFeGlzdCA9IGFwcC5tZWNoYW5pY3MuY2F0Q2hhbGxlbmdlcy5maW5kKCAoYykgPT4ge1xuXHRcdFx0cmV0dXJuIGF0dGVtcHQudG9Mb3dlckNhc2UoKSA9PSBjLkNhdGVnb3J5LnRvTG93ZXJDYXNlKCk7XG5cdFx0fSk7XG5cblx0XHQvL3NsdWcgLSBiZWNhdXNlIEpTT04gbm90YXRpb24gZG9lc24ndCB3b3JrIHdlbGwgd2l0aCBzcGFjZXNcblx0XHRsZXQgYXR0ZW1wdFNsdWcgPSBhdHRlbXB0LnJlcGxhY2UoL1xccy9nLCAnLScpLnRvTG93ZXJDYXNlKCk7XG5cblxuXHRcdC8vdHJhbnNsYXRlIHdvcmRcblx0XHRsZXQgdHJhbnNsYXRlZEF0dGVtcHQgPSBhcHAuaTE4bmV4dC50KFxuXHRcdFx0YGNhdGVnb3JpZXMuJHthdHRlbXB0U2x1Z31gLFxuXHRcdFx0e2xuZzphcHAuZ2V0TGFuZ3VhZ2VDb2RlKGFwcC5sYW5ndWFnZSl9XG5cdFx0KTtcblxuXHRcdC8vVGhyb3cgaW50ZXJqZWN0aW9uLiBDaGFuY2U6IFsyMCU/XSBPciBpZiB0aGUgd29yZCBpcyB1bmtub3duXG5cdFx0aWYgKE1hdGgucmFuZG9tKCkgPCBhcHAubWVjaGFuaWNzLmludGVyamVjdGlvbi5jaGFuY2UgfHwgYXR0ZW1wdEV4aXN0ID09IHVuZGVmaW5lZCkge1xuXHRcdFx0XG5cdFx0XHRpZiAoIWF0dGVtcHRFeGlzdCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnQUREIFRISVM6ICcgKyBhdHRlbXB0KTtcblx0XHRcdFx0dHJhbnNsYXRlZEF0dGVtcHQgPSAnJztcblx0XHRcdH1cblxuXHRcdFx0Ly9waWNrIGEgaW50ZXJqZWN0aW9uXG5cdFx0XHRjb25zdCBjaG9vc2VuSXRlbUlEID0gcndjKGFwcC5tZWNoYW5pY3MuaW50ZXJqZWN0aW9uLnBocmFzZXMpO1xuXG5cdFx0XHQvL3BocmFzZVxuXHRcdFx0Ly8gY29uc3QgaW50ZXJqZWN0aW9uID0gYXBwLm1lY2hhbmljcy5pbnRlcmplY3Rpb24ucGhyYXNlc1tjaG9vc2VuSXRlbUlEXS5waHJhc2U7XG5cdFx0XHRcblx0XHRcdC8vUGhyZWFzZSB0cmFuc2xhdGlvblxuXHRcdFx0bGV0IHRyYW5zbGF0ZWRJbnRlcmplY3Rpb24gPSBhcHAuaTE4bmV4dC50KFxuXHRcdFx0XHRgaW50ZXJqZWN0aW9uLiR7Y2hvb3Nlbkl0ZW1JRH1gLFxuXHRcdFx0XHR7bG5nOmFwcC5nZXRMYW5ndWFnZUNvZGUoYXBwLmxhbmd1YWdlKX1cblx0XHRcdCk7XG5cblx0XHRcdC8vd2lsZCBjYXJkICogIHx8ICByZXBsYWNlICogZm9yIHRoZSBhdHRlbXB0IHdvcmRcblx0XHRcdGNvbnN0IHJlZ2V4ID0gL1xcKi87XG5cdFx0XHR0cmFuc2xhdGVkSW50ZXJqZWN0aW9uID0gdHJhbnNsYXRlZEludGVyamVjdGlvbi5yZXBsYWNlKHJlZ2V4LHRyYW5zbGF0ZWRBdHRlbXB0KTtcblx0XHRcdFxuXHRcdFx0Ly9kZWZpbmVcblx0XHRcdHNwZWVjaCA9IHRyYW5zbGF0ZWRJbnRlcmplY3Rpb247XG5cdFx0XHR2ZXJiYWwgPSB0cmFuc2xhdGVkSW50ZXJqZWN0aW9uO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0YWRkVG9HdWVzc0F0dGVtcHMoYXR0ZW1wdCk7XG5cblx0XHRcdHZlcmJhbCA9IHRyYW5zbGF0ZWRBdHRlbXB0O1xuXG5cdFx0XHRpZiAoYXBwLmdhbWVTdGF0ZS5maXJzdFNwZWFrID09IHRydWUpIHtcblx0XHRcdFx0YXBwLmdhbWVTdGF0ZS5maXJzdFNwZWFrID0gZmFsc2U7XG5cdFx0XHRcdHZlcmJhbCA9IHNwZWVjaCA9ICdIdW1tbS4uLi4nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3BlZWNoID0gdmVyYmFsO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vdXBkYXRlIHBhZ2Vcblx0XHR0aGlzLmVtaXQoJ2d1ZXNzJywgdmVyYmFsKTtcblxuXHRcdC8vc3BlYWtcblx0XHRhcHAuc3BlYWsoc3BlZWNoLGFwcC5sYW5ndWFnZSk7XG5cblx0XHRhcHAuc29ja2V0LmVtaXQoJ2d1ZXNzJywge1xuXHRcdFx0dmlldzogJ2dhbWUnLFxuXHRcdFx0cm9vbTogYXBwLnNvY2tldC5pZCxcblx0XHRcdGF0dGVtcHQ6IHZlcmJhbCxcblx0XHR9KTtcblxuXHR9O1xuXG5cdC8vLy8tLSBpZiAgZHJhdyBpcyByaWdodFxuXHRjb25zdCBkcmF3SXNSaWdodCA9IChhdHRlbXB0KSA9PiB7XG5cblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XG5cblx0XHR0aGlzLmVtaXQoJ3N0b3AnKTtcblxuXHRcdGFkZFRvR3Vlc3NBdHRlbXBzKGF0dGVtcHQpO1xuXHRcdGFwcC5nYW1lU3RhdGUuc3VjY2VzcyA9IHRydWU7IFxuXG5cdFx0bGV0IHZlcmJhbCA9ICcnO1xuXHRcdGxldCBzcGVlY2ggPSAnJztcblxuXHRcdC8vc2x1ZyAtIGJlY2F1c2UgSlNPTiBub3RhdGlvbiBkb2Vzbid0IHdvcmsgd2VsbCB3aXRoIHNwYWNlc1xuXHRcdGxldCBhdHRlbXB0U2x1ZyA9IGF0dGVtcHQucmVwbGFjZSgvXFxzL2csICctJykudG9Mb3dlckNhc2UoKTtcblxuXHRcdC8vdHJhbnNsYXRlIHdvcmRcblx0XHRsZXQgdHJhbnNsYXRlZEF0dGVtcHQgPSBhcHAuaTE4bmV4dC50KFxuXHRcdFx0YGNhdGVnb3JpZXMuJHthdHRlbXB0U2x1Z31gLFxuXHRcdFx0e2xuZzphcHAuZ2V0TGFuZ3VhZ2VDb2RlKGFwcC5sYW5ndWFnZSl9XG5cdFx0KTtcblxuXHRcdC8vdHJhbnNsYXRlIFwiaSBrbm93XCIgcGhyYXNlXCJcblx0XHRsZXQgaWtub3cgPSBhcHAuaTE4bmV4dC50KFxuXHRcdFx0J2dhbWUucGhyYXNlcy5pLWtub3cnLFxuXHRcdFx0e2xuZzphcHAuZ2V0TGFuZ3VhZ2VDb2RlKGFwcC5sYW5ndWFnZSl9XG5cdFx0KTtcblxuXHRcdHZlcmJhbCA9IHNwZWVjaCA9IGAke2lrbm93fSAke3RyYW5zbGF0ZWRBdHRlbXB0fS5gO1xuXG5cdFx0Ly91cGRhdGUgcGFnZVxuXHRcdHRoaXMuZW1pdCgnZ3Vlc3MnLCB2ZXJiYWwpO1xuXG5cdFx0YXBwLnNwZWFrKHNwZWVjaCxhcHAubGFuZ3VhZ2UpO1xuXG5cdFx0Ly93YWl0IDMgc2Vjb25kIGJlZm9yZSBjaGFuZ2Ugdmlld1xuXHRcdGNvbnN0IGR1cmF0aW9uID0gMzAwMDtcblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHRfdGhpcy5lbWl0KCd3aW4nKTtcblx0XHR9LCBkdXJhdGlvbik7XG5cblx0fTtcblxufSIsIi8vbW9kdWxlc1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBlZSBmcm9tICdldmVudC1lbWl0dGVyJztcblxuaW1wb3J0IHBhcnRuZXJzTXVzdGFjaGUgZnJvbSAnLi9wYXJ0bmVycy5odG1sJztcblxuXG5mdW5jdGlvbiBQYXJ0bmVyc1ZpZXcoKSB7XG5cblx0bGV0IGFwcDtcblxuXHQvL2VtaXR0ZXJcblx0ZWUodGhpcyk7XG5cblx0dGhpcy5wYWdlRGF0YSA9IHtcblx0XHR0aXRsZTogJycsXG5cdFx0aW52ZXJzZUNvbG91cjogdW5kZWZpbmVkLFxuXHRcdGRvbmU6ICcnLFxuXHRcdHBlcnNvbmFzOiBbXSxcblx0XHRzaG93TmFtZTogZmFsc2UsXG5cdFx0aW5kaXZpZHVhbEFjY2VudDogZmFsc2Vcblx0fTtcblxuXHR0aGlzLmluaXQgPSAoY29udGV4dCkgPT4ge1xuXG5cdFx0YXBwID0gY29udGV4dDtcblxuXHRcdC8vbGludGl0IG9wdGlvbiBieSBsYW5ndWFnZVxuXHRcdGNvbnN0IHBlcnNvbmFzID0gYXBwLnBlcnNvbmFzLmZpbHRlcihwZXJzb25hID0+IHBlcnNvbmEubGFuZ3VhZ2VDb2RlID09IGFwcC5sYW5ndWFnZSk7XG5cblx0XHQvL2RhdGFcblx0XHR0aGlzLnBhZ2VEYXRhID0ge1xuXHRcdFx0dGl0bGU6ICdDaG9vc2UgeW91ciBwYXJ0bmVyJyxcblx0XHRcdGludmVyc2VDb2xvdXI6IGFwcC5pbnRlcmZhY2UuaW52ZXJzZUNsYXNzKCksXG5cdFx0XHRkb25lOiBhcHAuaTE4bmV4dC50KCdwZXJzb25hcy5wYWdlLmRvbmUnKSxcblx0XHRcdHBlcnNvbmFzOiBwZXJzb25hcyxcblx0XHRcdHNob3dOYW1lOiBmYWxzZSxcblx0XHRcdGluZGl2aWR1YWxBY2NlbnQ6IGZhbHNlXG5cdFx0fTtcblxuXHRcdC8vYnVpbGQgcGFnZVxuXHRcdGNvbnN0IHBhcnRuZXJIVE1MID0gcGFydG5lcnNNdXN0YWNoZSh0aGlzLnBhZ2VEYXRhKTtcblx0XHQkKHBhcnRuZXJIVE1MKS5hcHBlbmRUbygkKCcjdmlldycpKTtcblx0XHRcblx0XHQvL2J1dHRvbnMgLSBwZXJzb25hc1xuXHRcdGZvciAobGV0IHBlcnNvbmEgb2YgYXBwLnBlcnNvbmFzKSB7XG5cdFx0XHRjb25zdCBidCA9ICQoYCMke3BlcnNvbmEuc2x1Z31gKTtcblx0XHRcdGJ0LmFkZENsYXNzKGdldENsYXNzKHBlcnNvbmEuY29sb3VyKSk7XG5cdFx0XHRidC5kYXRhKHtpZDogcGVyc29uYS5zbHVnfSk7XG5cdFx0XHRidC5jbGljayh0aGlzLCBwZXJzb25hQ2xpY2spO1xuXG5cdFx0XHRjb25zdCBjb2xvdXJUcmFzbGF0ZWQgPSBhcHAuaTE4bmV4dC50KGBwZXJzb25hcy5jb2xvdXJzLiR7cGVyc29uYS5jb2xvdXJ9YCk7XG5cblx0XHRcdGFwcC5hcnR5b20ub24oW2NvbG91clRyYXNsYXRlZF0pXG5cdFx0XHRcdC50aGVuKCAoaSkgPT4ge1xuXHRcdFx0XHRcdHBlcnNvbmFTcGVhayh0aGlzLmluZGV4ZXNbaV0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdH1cblxuXHRcdC8vdHJhbnNsYXRlXG5cdFx0dHJhbnNsYXRlKCk7XG5cblx0XHQvL2RvbmVcblx0XHQkKCcjZG9uZScpLmNsaWNrKHRoaXMsIGRvbmUpO1xuXG5cdFx0YXBwLmFydHlvbS5vbihbdGhpcy5wYWdlRGF0YS5kb25lXSlcblx0XHRcdC50aGVuKCAoKSA9PiB7XG5cdFx0XHRcdGRvbmVTcGVha2luZygpO1xuXHRcdFx0fSk7XG5cblx0XHQvL2FuaW1hdGlvblxuXHRcdGVudGVyQW5pbWF0aW9uKCk7XG5cblx0XHQvL2VtaXQgdG8gc29ja2VyIElPXG5cdFx0ZW1pdFRvRGFzaGJvYXJkKHtcblx0XHRcdG1lc3NhZ2U6IGFwcC5pMThuZXh0LnQoJ3BlcnNvbmFzLmRhc2hib2FyZC5hc3NlbWJseScpLFxuXHRcdH0pO1xuXG5cdFx0Ly9wcmUtc2VsZWN0IGZpcnN0IG9wdGlvblxuXHRcdGNoYW5nZVBlcnNvbmEoYXBwLmdldFBlcnNvbmEocGVyc29uYXNbMF0uc2x1ZykpO1xuXHR9O1xuXG5cdGNvbnN0IHRyYW5zbGF0ZSA9ICgpID0+IHtcblx0XHQkKCcjcGFydG5lci1jaG9pY2UnKS5sb2NhbGl6ZSgpO1xuXHR9O1xuXG5cdGNvbnN0IHBlcnNvbmFDbGljayA9IChlKSA9PiB7XG5cdFx0Y29uc3QgYnQgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0Ly9nZXQgcGVyc29uYVxuXHRcdGNvbnN0IHBlcnNvbmEgPSBhcHAuZ2V0UGVyc29uYShidC5hdHRyKCdpZCcpKTtcblx0XHRjaGFuZ2VQZXJzb25hKHBlcnNvbmEpO1xuXHR9O1xuXG5cdGNvbnN0IHBlcnNvbmFTcGVhayA9IChjb2xvdXIpID0+IHtcblx0XHQvLyAvL2dldCBwZXJzb25hXG5cdFx0Y29uc3QgcGVyc29uYSA9IGFwcC5nZXRQZXJzb25hQnlDb2xvdXIoY29sb3VyKTtcblx0XHRjaGFuZ2VQZXJzb25hKHBlcnNvbmEpO1xuXHR9O1xuXG5cdGNvbnN0IGNoYW5nZVBlcnNvbmEgPSAocGVyc29uYSkgPT4ge1xuXG5cdFx0Ly9pZiBpdCBpcyBub3Qgc2VsZWN0ZWRcblx0XHRpZiAoYXBwLmN1cnJlbnRQZXJzb25hICE9IHBlcnNvbmEpIHtcblxuXHRcdFx0YXBwLmN1cnJlbnRQZXJzb25hID0gcGVyc29uYTtcblxuXHRcdFx0Ly9jb2xvdXJcblx0XHRcdGFwcC5pbnRlcmZhY2UuY2hhbmdlQ29sb3VyKHBlcnNvbmEuY29sb3VyKTtcblx0XHRcdGludmVydENvbG91cigpO1xuXG5cdFx0XHQvL3RyYW5zbGF0aW9uIGNvbG91clxuXHRcdFx0bGV0IHRyYW5zbGF0ZWRDb2xvciA9IHRyYW5zbGF0ZUNvbG91cihwZXJzb25hLHRoaXMucGFnZURhdGEuaW5kaXZpZHVhbEFjY2VudCk7XG5cblx0XHRcdC8vc3BlYWtcblx0XHRcdHNwZWFrKHBlcnNvbmEsdHJhbnNsYXRlZENvbG9yKTtcblxuXHRcdFx0Ly9lbWl0IHRvIGRlYXNoYm9hcmRcblx0XHRcdGVtaXRUb0Rhc2hib2FyZCh7XG5cdFx0XHRcdGNvbG91cjogYXBwLmN1cnJlbnRQZXJzb25hLmNvbG91cixcblx0XHRcdFx0bWVzc2FnZTogYXBwLmkxOG5leHQudCgncGVyc29uYXMuZGFzaGJvYXJkLmFzc2VtYmx5JyksXG5cdFx0XHR9KTtcblxuXHRcdH1cblx0fTtcblxuXHRjb25zdCBpbnZlcnRDb2xvdXIgPSAoKSA9PiB7XG5cdFx0Y29uc3QgZHVyYXRpb24gPSA1MDA7XG5cblx0XHRpZiAoYXBwLmludGVyZmFjZS5pbnZlcnNlQ2xhc3NUb2dnbGUgPT0gdHJ1ZSkge1xuXHRcdFx0JCgnI3RpdGxlJykuYWRkQ2xhc3MoJ3VrLWxpZ2h0Jywge1xuXHRcdFx0XHRkdXJhdGlvbjogZHVyYXRpb25cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCcjdGl0bGUnKS5yZW1vdmVDbGFzcygndWstbGlnaHQnLCB7XG5cdFx0XHRcdGR1cmF0aW9uOiBkdXJhdGlvblxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGdldENsYXNzID0gKGNvbG91cikgPT4ge1xuXG5cdFx0aWYgKGNvbG91ciA9PSAnbGlnaHQnKSB7XG5cdFx0XHRyZXR1cm4gJ3VrLWJ1dHRvbi1kZWZhdWx0IHVrLWJhY2tncm91bmQtZGVmYXVsdCc7XG5cdFx0fSBlbHNlIGlmIChjb2xvdXIgPT0gJ2JsdWUnKSB7XG5cdFx0XHRyZXR1cm4gJ3VrLWJ1dHRvbi1wcmltYXJ5Jztcblx0XHR9IGVsc2UgaWYgKGNvbG91ciA9PSAnZGFyaycpIHtcblx0XHRcdHJldHVybiAndWstYnV0dG9uLXNlY29uZGFyeSc7XG5cdFx0fSBlbHNlIGlmIChjb2xvdXIgPT0gJ3llbGxvdycpIHtcblx0XHRcdHJldHVybiAndWstYnV0dG9uLWRlZmF1bHQgYmFja2dyb3VuZC15ZWxsb3cnO1xuXHRcdH1cblxuXHRcdC8vIGRlZmF1bHRcblx0XHRyZXR1cm4gJ3VrLWJ1dHRvbi1kZWZhdWx0IHVrLWJhY2tncm91bmQtZGVmYXVsdCc7XG5cblx0fTtcblxuXHRjb25zdCBlbnRlckFuaW1hdGlvbiA9ICAoKSA9PiB7XG5cdFx0Y29uc3QgZHVyYXRpb24gPSAxNTAwO1xuXG5cdFx0JCgnI3BhcnRuZXItY2hvaWNlJykuY3NzKCdvcGFjaXR5JywgMCk7XG5cdFx0JCgnI3BhcnRuZXItY2hvaWNlJykuY3NzKCdtYXJnaW5Ub3AnLCAxMDApO1xuXG5cdFx0JCgnI3BhcnRuZXItY2hvaWNlJykuYW5pbWF0ZSh7XG5cdFx0XHRtYXJnaW5Ub3A6IDAsXG5cdFx0XHRvcGFjaXR5OiAxLFxuXHRcdH0sIGR1cmF0aW9uKTtcblx0fTtcblxuXHRjb25zdCBkb25lID0gKCkgPT4ge1xuXG5cdFx0bGV0IHBlcnNvbmEgPSBhcHAuY3VycmVudFBlcnNvbmE7XG5cdFx0XG5cdFx0bGV0IHRyYW5zbGF0ZWRDb2xvciA9IHRyYW5zbGF0ZUNvbG91cihwZXJzb25hLCB0aGlzLnBhZ2VEYXRhLmluZGl2aWR1YWxBY2NlbnQpO1xuXG5cdFx0c3BlYWsocGVyc29uYSx0cmFuc2xhdGVkQ29sb3IpO1xuXHRcdGV4aXRBbmltYXRpb24oKTtcblx0fTtcblxuXHRjb25zdCBkb25lU3BlYWtpbmcgPSAoKSA9PiB7XG5cdFx0ZXhpdEFuaW1hdGlvbigpO1xuXHR9O1xuXG5cdGNvbnN0IGV4aXRBbmltYXRpb24gPSAgKCkgPT4ge1xuXHRcdGNvbnN0IGR1cmF0aW9uID0gMTUwMDtcblxuXHRcdCQoJyNwYXJ0bmVyLWNob2ljZScpLmFuaW1hdGUoe1xuXHRcdFx0bWFyZ2luVG9wOiAnLTEwMCcsXG5cdFx0XHRvcGFjaXR5OiAwLFxuXHRcdH0sIGR1cmF0aW9uLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmVtaXQoJ2NoYW5nZVZpZXcnLCB7XG5cdFx0XHRcdHNvdXJjZTogJ3BhcnRuZXJzJyxcblx0XHRcdFx0dGFyZ2V0OidjaGFsbGVuZ2VzJ1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgdHJhbnNsYXRlQ29sb3VyID0gKHBlcnNvbmEsYWNjZW50KSA9PiB7XG5cdFx0aWYgKGFjY2VudCkge1xuXHRcdFx0cmV0dXJuIGFwcC5pMThuZXh0LnQoXG5cdFx0XHRcdGBwZXJzb25hcy5jb2xvdXJzLiR7cGVyc29uYS5jb2xvdXJ9YCwge1xuXHRcdFx0XHRcdGxuZzogYXBwLmdldExhbmd1YWdlQ29kZShwZXJzb25hLmxhbmd1YWdlKVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gYXBwLmkxOG5leHQudChcblx0XHRcdFx0YHBlcnNvbmFzLmNvbG91cnMuJHtwZXJzb25hLmNvbG91cn1gXG5cdFx0XHQpO1xuXHRcdH1cblx0fTtcblxuXHRjb25zdCBzcGVhayA9IChwZXJzb25hLHRyYW5zbGF0ZWRDb2xvcikgPT4ge1xuXG5cdFx0Ly9zcGVha1xuXHRcdGxldCB0ZXh0VG9TcGVhayA9ICcnO1xuXHRcdGlmICh0aGlzLnBhZ2VEYXRhLnNob3dOYW1lKSB0ZXh0VG9TcGVhayA9IGAke3BlcnNvbmEubmFtZX0uIGA7XG5cdFx0dGV4dFRvU3BlYWsgKz0gdHJhbnNsYXRlZENvbG9yO1xuXG5cdFx0YXBwLnNwZWFrKHRleHRUb1NwZWFrLCBwZXJzb25hLmxhbmd1YWdlKTtcblxuXHR9O1xuXG5cdGNvbnN0IGVtaXRUb0Rhc2hib2FyZCA9ICh7XG5cdFx0dHlwZSA9ICdpbnRlcmZhY2UnLFxuXHRcdHZpZXcgPSAncGFydG5lcnMnLFxuXHRcdHJvb20gPSBhcHAuc29ja2V0LmlkLFxuXHRcdGNvbG91ciA9ICcnLFxuXHRcdG1lc3NhZ2UgPSAnJ1xuXHR9KSA9PiB7XG5cdFx0YXBwLnNvY2tldC5lbWl0KHR5cGUsIHt2aWV3LCByb29tLCBjb2xvdXIsIG1lc3NhZ2V9KTtcblx0fTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUGFydG5lcnNWaWV3KCk7IiwidmFyIEggPSByZXF1aXJlKFwiaG9nYW4uanNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgeyB2YXIgVCA9IG5ldyBILlRlbXBsYXRlKHtjb2RlOiBmdW5jdGlvbiAoYyxwLGkpIHsgdmFyIHQ9dGhpczt0LmIoaT1pfHxcIlwiKTt0LmIoXCI8ZGl2IGlkPVxcXCJwYXJ0bmVyLWNob2ljZVxcXCIgY2xhc3M9XFxcInVrLWNvbnRhaW5lciB1ay1jb250YWluZXItc21hbGwgdWstcG9zaXRpb24tY2VudGVyIHVrLXRleHQtY2VudGVyXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGgxIGlkPVxcXCJ0aXRsZVxcXCIgY2xhc3M9XFxcInVrLWgxIFwiKTt0LmIodC52KHQuZihcImludmVyc2VDb2xvdXJcIixjLHAsMCkpKTt0LmIoXCJcXFwiIGRhdGEtaTE4bj1cXFwicGVyc29uYXMucGFnZS50aXRsZVxcXCI+XCIpO3QuYih0LnYodC5mKFwidGl0bGVcIixjLHAsMCkpKTt0LmIoXCI8L2gxPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8ZGl2IGlkPVxcXCJmaWVsZFxcXCIgY2xhc3M9XFxcInVrLW1hcmdpbi1tZWRpdW0tdG9wXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTtpZih0LnModC5mKFwicGVyc29uYXNcIixjLHAsMSksYyxwLDAsMjczLDU2NixcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiXCIpO3QuYih0LnYodC5mKFwic2x1Z1wiLGMscCwwKSkpO3QuYihcIlxcXCIgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tbGFyZ2UgdWstYm9yZGVyLXBpbGwgdWstbWFyZ2luLXNtYWxsLXJpZ2h0XFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPHNwYW4gdWstaWNvbj1cXFwiaWNvbjogbnV0OyByYXRpbzogMS41XFxcIj48L3NwYW4+XCIpO3QuYihcIlxcblwiICsgaSk7aWYodC5zKHQuZihcInNob3dOYW1lXCIsYyxwLDEpLGMscCwwLDQ3MSw1MTgsXCJ7eyB9fVwiKSl7dC5ycyhjLHAsZnVuY3Rpb24oYyxwLHQpe3QuYihcIiAgICAgICAgICAgICAgICA8YnIvPlwiKTt0LmIodC52KHQuZihcIm5hbWVcIixjLHAsMCkpKTt0LmIoXCJcXG5cIiArIGkpO30pO2MucG9wKCk7fXQuYihcIiAgICAgICAgICAgIDwvYnV0dG9uPlwiKTt0LmIoXCJcXG5cIiArIGkpO30pO2MucG9wKCk7fXQuYihcIiAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGJ1dHRvbiBpZD1cXFwiZG9uZVxcXCIgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tbGFyZ2UgdWstYnV0dG9uLWRlZmF1bHQgdWstYmFja2dyb3VuZC1kZWZhdWx0IHVrLWJvcmRlci1yb3VuZGVkIHVrLW1hcmdpbi14bGFyZ2UtdG9wXFxcIiBkYXRhLWkxOG49XFxcInBlcnNvbmFzLnBhZ2UuZG9uZVxcXCI+XCIpO3QuYih0LnYodC5mKFwiZG9uZVwiLGMscCwwKSkpO3QuYihcIjwvYnV0dG9uPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIjwvZGl2PlwiKTtyZXR1cm4gdC5mbCgpOyB9LHBhcnRpYWxzOiB7fSwgc3ViczogeyAgfX0sIFwiPGRpdiBpZD1cXFwicGFydG5lci1jaG9pY2VcXFwiIGNsYXNzPVxcXCJ1ay1jb250YWluZXIgdWstY29udGFpbmVyLXNtYWxsIHVrLXBvc2l0aW9uLWNlbnRlciB1ay10ZXh0LWNlbnRlclxcXCI+XFxuICAgIDxoMSBpZD1cXFwidGl0bGVcXFwiIGNsYXNzPVxcXCJ1ay1oMSB7e2ludmVyc2VDb2xvdXJ9fVxcXCIgZGF0YS1pMThuPVxcXCJwZXJzb25hcy5wYWdlLnRpdGxlXFxcIj57e3RpdGxlfX08L2gxPlxcbiAgICA8ZGl2IGlkPVxcXCJmaWVsZFxcXCIgY2xhc3M9XFxcInVrLW1hcmdpbi1tZWRpdW0tdG9wXFxcIj5cXG4gICAgICAgICAgICB7eyNwZXJzb25hc319XFxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwie3tzbHVnfX1cXFwiIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLWxhcmdlIHVrLWJvcmRlci1waWxsIHVrLW1hcmdpbi1zbWFsbC1yaWdodFxcXCI+XFxuICAgICAgICAgICAgICAgIDxzcGFuIHVrLWljb249XFxcImljb246IG51dDsgcmF0aW86IDEuNVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICB7eyNzaG93TmFtZX19XFxuICAgICAgICAgICAgICAgIDxici8+e3tuYW1lfX1cXG4gICAgICAgICAgICAgICAge3svc2hvd05hbWV9fVxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIHt7L3BlcnNvbmFzfX1cXG4gICAgPC9kaXY+XFxuICAgIDxidXR0b24gaWQ9XFxcImRvbmVcXFwiIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLWxhcmdlIHVrLWJ1dHRvbi1kZWZhdWx0IHVrLWJhY2tncm91bmQtZGVmYXVsdCB1ay1ib3JkZXItcm91bmRlZCB1ay1tYXJnaW4teGxhcmdlLXRvcFxcXCIgZGF0YS1pMThuPVxcXCJwZXJzb25hcy5wYWdlLmRvbmVcXFwiPnt7ZG9uZX19PC9idXR0b24+XFxuPC9kaXY+XCIsIEgpO3JldHVybiBULnJlbmRlci5hcHBseShULCBhcmd1bWVudHMpOyB9OyIsIi8vbW9kdWxlc1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBlZSBmcm9tICdldmVudC1lbWl0dGVyJztcblxuaW1wb3J0IHBvc3RnYW1lTXVzdGFjaGUgZnJvbSAnLi9wb3N0Z2FtZS5odG1sJztcblxuXG5mdW5jdGlvbiBQb3N0R2FtZVZpZXcoKSB7XG5cblx0bGV0IGFwcDtcblxuXHQvL2VtaXR0ZXJcblx0ZWUodGhpcyk7XG5cblx0dGhpcy5wYWdlRGF0YSA9IHtcblx0XHRpbnZlcnNlQ29sb3VyOiB1bmRlZmluZWQsXG5cdFx0c3VjY2VzczogZmFsc2UsXG5cdFx0c3RhdHVzOiAnJyxcblx0XHRzdXBwb3NlZFBocmFzZTogJycsXG5cdFx0aXRpczogJycsXG5cdFx0Y2F0ZWdvcnk6ICcnLFxuXHRcdGJhY2s6ICcnLFxuXHRcdGJlc3RHdWVzc1BocmFzZTogJydcblx0fTtcblxuXHR0aGlzLmluaXQgPSAoY29udGV4dCkgPT4ge1xuXG5cdFx0YXBwID0gY29udGV4dDtcblxuXHRcdC8vY29sbGVjdCBhbmQgdHJhbnNmb3JtIGluZm9ybWF0aW9uXG5cdFx0Y29uc3Qgc3RhdHVzID0gYXBwLmdhbWVTdGF0ZS5zdWNjZXNzID8gJ3N1Y2Nlc3MnIDogJ3dyb25nJztcblx0XHRjb25zdCBjYXRlZ29yeSA9IGFwcC5nYW1lU3RhdGUuY3VycmVudENhdGVnb3J5O1xuXG5cdFx0Ly9zbHVnIC0gYmVjYXVzZSBKU09OIG5vdGF0aW9uIGRvZXNuJ3Qgd29yayB3ZWxsIHdpdGggc3BhY2VzXG5cdFx0bGV0IGNhdGVnb3J5U2x1ZyA9IGNhdGVnb3J5LnJlcGxhY2UoL1xccy9nLCAnLScpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHQvL3BhZ2UgZGF0YVxuXHRcdHRoaXMucGFnZURhdGEgPSB7XG5cdFx0XHRpbnZlcnNlQ29sb3VyOiBhcHAuaW50ZXJmYWNlLmludmVyc2VDbGFzcygpLFxuXHRcdFx0c3VjY2VzczogYXBwLmdhbWVTdGF0ZS5zdWNjZXNzLFxuXHRcdFx0c3RhdHVzOiBhcHAuaTE4bmV4dC50KGBwb3N0Z2FtZS4ke3N0YXR1c31gKSxcblx0XHRcdHN1cHBvc2VkUGhyYXNlOiBhcHAuaTE4bmV4dC50KCdwb3N0Z2FtZS5zdXBwb3NlZCcpLFxuXHRcdFx0aXRpczogYXBwLmkxOG5leHQudCgncG9zdGdhbWUuaXQtaXMnKSxcblx0XHRcdGNhdGVnb3J5OiBhcHAuaTE4bmV4dC50KGBjYXRlZ29yaWVzLiR7Y2F0ZWdvcnlTbHVnfWApLFxuXHRcdFx0YmFjazogYXBwLmkxOG5leHQudCgncG9zdGdhbWUuYmFjaycpLFxuXHRcdFx0YmVzdEd1ZXNzUGhyYXNlOiBhcHAuaTE4bmV4dC50KCdwb3N0Z2FtZS5iZXN0LWd1ZXNzZXMnKVxuXHRcdH07XG5cblx0XHQvL2J1aWxkIHBhZ2Vcblx0XHRjb25zdCBwb3N0Z2FtZUhUTUwgPSBwb3N0Z2FtZU11c3RhY2hlKHRoaXMucGFnZURhdGEpO1xuXHRcdCQocG9zdGdhbWVIVE1MKS5hcHBlbmRUbygkKCcjdmlldycpKTtcblxuXHRcdCQoJyNob21lLWJ1dHRvbicpLmNsaWNrKCgpID0+IHtcblx0XHRcdGhvbWVCdXR0b24oJ2hvbWUnKTtcblx0XHR9KTtcblxuXHRcdC8vIGdldCBsaW1pdGVkIGxpc3Qgb2YgYmVzdCBndWVzc1xuXHRcdGNvbnN0IGxpc3QgPSBhcHAuZ2V0QmVzdEd1ZXNzZXMoKTtcblx0XHRjb25zdCBndWVzc0xpc3QgPSAkKCcjdmlldycpLmZpbmQoJy50YWdzJyk7IC8vRE9NXG5cblx0XHRmb3IgKGxldCBndWVzcyBvZiBsaXN0KSB7XG5cdFx0XHRjb25zdCBzbHVnID0gZ3Vlc3MucmVwbGFjZSgvXFxzL2csICctJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdGNvbnN0IHRyYW5zbGF0aW9uID0gYXBwLmkxOG5leHQudChgY2F0ZWdvcmllcy4ke3NsdWd9YCk7XG5cdFx0XHRndWVzc0xpc3QuYXBwZW5kKGA8c3BhbiBjbGFzcz1cInVrLWxhYmVsIHVrLWxhYmVsLXByaW1hcnlcIiBkYXRhLWkxOG49XCJjYXRlZ29yaWVzLiR7c2x1Z31cIj4ke3RyYW5zbGF0aW9ufTwvc3Bhbj5cXG5gKTtcdFxuXHRcdH1cblxuXHRcdC8vdHJhbnNsYXRlXG5cdFx0dHJhbnNsYXRlKCk7XG5cblx0XHQvL3NwZWFrXG5cdFx0c3BlYWsoKTtcblxuXHRcdC8vYWN0aW9uXG5cdFx0JCgnI2JhY2snKS5jbGljayh0aGlzLCBiYWNrKTtcblxuXHRcdGVtaXRUb0NhcmQoe1xuXHRcdFx0YWN0aW9uOiAncG9zdEdhbWUnLFxuXHRcdFx0dGltZTogLTEsXG5cdFx0XHRndWVzczogdGhpcy5wYWdlRGF0YS5zdGF0dXNcblx0XHR9KTtcblxuXHRcdC8vZW1pdCB0byBzb2NrZXIgSU9cblx0XHRlbWl0VG9EYXNoYm9hcmQoe1xuXHRcdFx0aW52ZXJzZUNvbG91cjogdGhpcy5wYWdlRGF0YS5pbnZlcnNlQ29sb3VyLFxuXHRcdFx0c3VjY2Vzczp0aGlzLnBhZ2VEYXRhLnN1Y2Nlc3MsXG5cdFx0XHRzdGF0dXM6IHRoaXMucGFnZURhdGEuc3RhdHVzLFxuXHRcdFx0c3VwcG9zZWRQaHJhc2U6IHRoaXMucGFnZURhdGEuc3VwcG9zZWRQaHJhc2UsXG5cdFx0XHRpdGlzOiB0aGlzLnBhZ2VEYXRhLml0aXMsXG5cdFx0XHRjYXRlZ29yeTogdGhpcy5wYWdlRGF0YS5jYXRlZ29yeSxcblx0XHRcdGJlc3RHdWVzc1BocmFzZTogdGhpcy5wYWdlRGF0YS5iZXN0R3Vlc3NQaHJhc2UsXG5cdFx0XHRiZXN0R3Vlc3NlczogbGlzdFxuXHRcdH0pO1xuXG5cdH07XG5cblx0Y29uc3QgdHJhbnNsYXRlID0gKCkgPT4ge1xuXHRcdCQoJ3Bvc3RnYW1lJykubG9jYWxpemUoKTtcblx0fTtcblxuXHRjb25zdCBob21lQnV0dG9uID0gKCkgPT4ge1xuXG5cdFx0ZW1pdFRvQ2FyZCh7XG5cdFx0XHRhY3Rpb246ICd3YWl0Jyxcblx0XHR9KTtcblxuXHRcdGVtaXRUb0Rhc2hib2FyZCh7XG5cdFx0XHR2aWV3OiAnd2FpdGluZydcblx0XHR9KTtcblxuXHRcdCQoJyNwb3N0Z2FtZScpLmFuaW1hdGUoe1xuXHRcdFx0bWFyZ2luVG9wOiAnLTEwMCcsXG5cdFx0XHRvcGFjaXR5OiAwLFxuXHRcdH0sIDE1MDAsICgpID0+IHtcblx0XHRcdHRoaXMuZW1pdCgnY2hhbmdlVmlldycsIHtcblx0XHRcdFx0c291cmNlOiAncG9zdC1nYW1lJyxcblx0XHRcdFx0dGFyZ2V0Oidob21lJ1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgYmFjayA9ICgpID0+IHtcblx0XHRjb25zdCBkdXJhdGlvbiA9IDE1MDA7XG5cblx0XHRlbWl0VG9DYXJkKHtcblx0XHRcdGFjdGlvbjogJ3dhaXQnLFxuXHRcdH0pO1xuXG5cdFx0ZW1pdFRvRGFzaGJvYXJkKHtcblx0XHRcdHZpZXc6ICd3YWl0aW5nJ1xuXHRcdH0pO1xuXG5cdFx0JCgnI3Bvc3RnYW1lJykuYW5pbWF0ZSh7XG5cdFx0XHRtYXJnaW5Ub3A6ICctMTAwJyxcblx0XHRcdG9wYWNpdHk6IDAsXG5cdFx0fSwgZHVyYXRpb24sICgpID0+IHtcblx0XHRcdHRoaXMuZW1pdCgnY2hhbmdlVmlldycsIHtcblx0XHRcdFx0c291cmNlOiAncG9zdC1nYW1lJyxcblx0XHRcdFx0dGFyZ2V0OidwbGF5ZXJzJ1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0fTtcblxuXHRjb25zdCBzcGVhayA9ICgpID0+IHtcblx0XHQvL3NwZWFrXG5cdFx0bGV0IHNwZWVjaCA9ICcnO1xuXHRcdGlmIChhcHAuZ2FtZVN0YXRlLnN1Y2Nlc3MpIHtcblx0XHRcdHNwZWVjaCA9IGAke3RoaXMucGFnZURhdGEuc3RhdHVzfS4gJHt0aGlzLnBhZ2VEYXRhLml0aXN9ICR7dGhpcy5wYWdlRGF0YS5jYXRlZ29yeX0uYDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3BlZWNoID0gYCR7dGhpcy5wYWdlRGF0YS5zdGF0dXN9LiAke3RoaXMucGFnZURhdGEuc3VwcG9zZWRQaHJhc2V9ICR7dGhpcy5wYWdlRGF0YS5jYXRlZ29yeX0uYDtcblx0XHR9XG5cblx0XHRhcHAuc3BlYWsoc3BlZWNoLCBhcHAubGFuZ3VhZ2UpO1xuXHR9O1xuXG5cdGNvbnN0IGVtaXRUb0NhcmQgPSAoe1xuXHRcdHR5cGUgPSAnY2FyZCcsXG5cdFx0dmlldyA9ICdjaGFsbGVuZ2UnLFxuXHRcdGFjdGlvbiA9ICdwb3N0R2FtZScsXG5cdFx0cm9vbSA9IGFwcC5zb2NrZXQuaWQsXG5cdFx0bmFtZSA9ICcnLFxuXHRcdHNob3J0ID0gJycsXG5cdFx0ZHJhdyA9ICcnLFxuXHRcdGRyYXdDYXRlZ29yeSA9ICcnLFxuXHRcdHRpbWUgPSAwLFxuXHRcdGd1ZXNzID0gJydcblx0fSkgPT4ge1xuXHRcdGFwcC5zb2NrZXQuZW1pdCh0eXBlLCB7dmlldywgYWN0aW9uLCByb29tLCBuYW1lLCBzaG9ydCwgZHJhdywgZHJhd0NhdGVnb3J5LCB0aW1lLCBndWVzc30pO1xuXHR9O1xuXG5cdGNvbnN0IGVtaXRUb0Rhc2hib2FyZCA9ICh7XG5cdFx0dHlwZSA9ICdpbnRlcmZhY2UnLFxuXHRcdHZpZXcgPSAncG9zdC1nYW1lJyxcblx0XHRyb29tID0gYXBwLnNvY2tldC5pZCxcblx0XHRpbnZlcnNlQ29sb3VyID0gJycsXG5cdFx0c3VjY2VzcyA9IGZhbHNlLFxuXHRcdHN0YXR1cyA9ICcnLFxuXHRcdHN1cHBvc2VkUGhyYXNlID0gJycsXG5cdFx0aXRpcyA9ICcnLFxuXHRcdGNhdGVnb3J5ID0gJycsXG5cdFx0YmVzdEd1ZXNzUGhyYXNlID0gJycsXG5cdFx0YmVzdEd1ZXNzZXMgPSAnJ1xuXHR9KSA9PiB7XG5cdFx0YXBwLnNvY2tldC5lbWl0KHR5cGUsIHt2aWV3LCByb29tLCBpbnZlcnNlQ29sb3VyLCBzdWNjZXNzLCBzdGF0dXMsIHN1cHBvc2VkUGhyYXNlLCBpdGlzLCBjYXRlZ29yeSwgYmVzdEd1ZXNzUGhyYXNlLCBiZXN0R3Vlc3Nlc30pO1xuXHR9O1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBQb3N0R2FtZVZpZXcoKTsiLCJ2YXIgSCA9IHJlcXVpcmUoXCJob2dhbi5qc1wiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHZhciBUID0gbmV3IEguVGVtcGxhdGUoe2NvZGU6IGZ1bmN0aW9uIChjLHAsaSkgeyB2YXIgdD10aGlzO3QuYihpPWl8fFwiXCIpO3QuYihcIjxkaXYgaWQ9XFxcInBvc3RnYW1lXFxcIiBjbGFzcz1cXFwidWstY29udGFpbmVyIHVrLWNvbnRhaW5lci1tZWRpdW0gdWstcG9zaXRpb24tY2VudGVyIHVrLXRleHQtY2VudGVyXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBjbGFzcz1cXFwiXCIpO3QuYih0LnYodC5mKFwiaW52ZXJzZUNvbG91clwiLGMscCwwKSkpO3QuYihcIlxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICA8aDEgY2xhc3M9XFxcInVrLWhlYWRpbmctcHJpbWFyeVxcXCIgZGF0YS1pMThuPVxcXCJwb3N0Z21hbWUuc3RhdHVzLlwiKTt0LmIodC52KHQuZihcInN1Y2Nlc3NcIixjLHAsMCkpKTt0LmIoXCJcXFwiPlwiKTt0LmIodC52KHQuZihcInN0YXR1c1wiLGMscCwwKSkpO3QuYihcIjwvaDE+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLW1lZGl1bS10b3BcXFwiIHVrLWdyaWQ+XCIpO3QuYihcIlxcblwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtZXhwYW5kXFxcIj48L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jYXJkIHVrLWNhcmQtZGVmYXVsdCB1ay13aWR0aC0yLTMgdWstbWFyZ2luLXNtYWxsLWxlZnQgdWstcGFkZGluZy1yZW1vdmUtbGVmdCB1ay1ib3gtc2hhZG93LWxhcmdlIHVrLWJvcmRlci1yb3VuZGVkXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTtpZighdC5zKHQuZihcInN1Y2Nlc3NcIixjLHAsMSksYyxwLDEsMCwwLFwiXCIpKXt0LmIoXCIgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jYXJkLWhlYWRlclxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cXFwidWstaDQgdWstbWFyZ2luLXJlbW92ZS1ib3R0b21cXFwiIGRhdGEtaTE4bj1cXFwicG9zdGdtYW1lLnN1cHBvc2VkUGhyYXNlXFxcIj5cIik7dC5iKHQudih0LmYoXCJzdXBwb3NlZFBocmFzZVwiLGMscCwwKSkpO3QuYihcIjwvaDQ+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7fTt0LmIoXCIgICAgICAgICAgICA8ZGl2IGlkPVxcXCJjYXRlZ29yeVxcXCIgY2xhc3M9XFxcInVrLWNhcmQtYm9keSB1ay1iYWNrZ3JvdW5kLXByaW1hcnkgdWstYm94LXNoYWRvdy1sYXJnZSB1ay1saWdodFxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cXFwidWstaDJcXFwiIGRhdGEtaTE4bj1cXFwiY2F0ZWdvcmllcy5cIik7dC5iKHQudih0LmYoXCJjYXRlZ29yeVwiLGMscCwwKSkpO3QuYihcIlxcXCI+XCIpO3QuYih0LnYodC5mKFwiY2F0ZWdvcnlcIixjLHAsMCkpKTt0LmIoXCI8L2gyPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jYXJkLWZvb3RlciB1ay1ib3gtc2hhZG93LWxhcmdlXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiYmFja1xcXCIgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tdGV4dFxcXCI+PHNwYW4gdWstaWNvbj1cXFwiY2hldnJvbi1sZWZ0XFxcIiBjbGFzcz1cXFwidWstbWFyZ2luLXNtYWxsLXJpZ2h0XFxcIiBkYXRhLWkxOG49XFxcInBvc3RnbWFtZS5iYWNrXFxcIj48L3NwYW4+XCIpO3QuYih0LnYodC5mKFwiYmFja1wiLGMscCwwKSkpO3QuYihcIjwvYnV0dG9uPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtZXhwYW5kXFxcIj48L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4tbGFyZ2UtdG9wIFwiKTt0LmIodC52KHQuZihcImludmVyc2VDb2xvdXJcIixjLHAsMCkpKTt0LmIoXCJcXFwiPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGRpdiB1ay1ncmlkPlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWV4cGFuZFxcXCI+PC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtMi0zXFxcIj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJ1ay1oM1xcXCI+XCIpO3QuYih0LnYodC5mKFwiYmVzdEd1ZXNzUGhyYXNlXCIsYyxwLDApKSk7dC5iKFwiPC9oMz5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidGFnc1xcXCI+PC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgPC9kaXY+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtZXhwYW5kXFxcIj48L2Rpdj5cIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIDwvZGl2PlwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8L2Rpdj5cIik7dC5iKFwiXFxuXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiPC9kaXY+XCIpO3QuYihcIlxcblwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIjxidXR0b24gaWQ9XFxcImhvbWUtYnV0dG9uXFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1sYXJnZSB1ay1ib3JkZXItcm91bmRlZCB1ay1wYWRkaW5nLXJlbW92ZVxcXCI+XCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDxzcGFuIHVrLWljb249XFxcImljb246IGhvbWU7IHJhdGlvOiAxLjVcXFwiIGNsYXNzPVxcXCJ1ay1tYXJnaW4tc21hbGwtcmlnaHRcXFwiPjwvc3Bhbj5Ib21lXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiPC9idXR0b24+XCIpO3JldHVybiB0LmZsKCk7IH0scGFydGlhbHM6IHt9LCBzdWJzOiB7ICB9fSwgXCI8ZGl2IGlkPVxcXCJwb3N0Z2FtZVxcXCIgY2xhc3M9XFxcInVrLWNvbnRhaW5lciB1ay1jb250YWluZXItbWVkaXVtIHVrLXBvc2l0aW9uLWNlbnRlciB1ay10ZXh0LWNlbnRlclxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcInt7aW52ZXJzZUNvbG91cn19XFxcIj5cXG4gICAgICAgIDxoMSBjbGFzcz1cXFwidWstaGVhZGluZy1wcmltYXJ5XFxcIiBkYXRhLWkxOG49XFxcInBvc3RnbWFtZS5zdGF0dXMue3tzdWNjZXNzfX1cXFwiPnt7c3RhdHVzfX08L2gxPlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLW1lZGl1bS10b3BcXFwiIHVrLWdyaWQ+XFxuXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC1leHBhbmRcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLWNhcmQgdWstY2FyZC1kZWZhdWx0IHVrLXdpZHRoLTItMyB1ay1tYXJnaW4tc21hbGwtbGVmdCB1ay1wYWRkaW5nLXJlbW92ZS1sZWZ0IHVrLWJveC1zaGFkb3ctbGFyZ2UgdWstYm9yZGVyLXJvdW5kZWRcXFwiPlxcbiAgICAgICAgICAgIHt7XnN1Y2Nlc3N9fVxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLWNhcmQtaGVhZGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVxcXCJ1ay1oNCB1ay1tYXJnaW4tcmVtb3ZlLWJvdHRvbVxcXCIgZGF0YS1pMThuPVxcXCJwb3N0Z21hbWUuc3VwcG9zZWRQaHJhc2VcXFwiPnt7c3VwcG9zZWRQaHJhc2V9fTwvaDQ+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAge3svc3VjY2Vzc319XFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwiY2F0ZWdvcnlcXFwiIGNsYXNzPVxcXCJ1ay1jYXJkLWJvZHkgdWstYmFja2dyb3VuZC1wcmltYXJ5IHVrLWJveC1zaGFkb3ctbGFyZ2UgdWstbGlnaHRcXFwiPlxcbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XFxcInVrLWgyXFxcIiBkYXRhLWkxOG49XFxcImNhdGVnb3JpZXMue3tjYXRlZ29yeX19XFxcIj57e2NhdGVnb3J5fX08L2gyPlxcbiAgICAgICAgICAgIDwvZGl2PlxcblxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLWNhcmQtZm9vdGVyIHVrLWJveC1zaGFkb3ctbGFyZ2VcXFwiPlxcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJiYWNrXFxcIiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi10ZXh0XFxcIj48c3BhbiB1ay1pY29uPVxcXCJjaGV2cm9uLWxlZnRcXFwiIGNsYXNzPVxcXCJ1ay1tYXJnaW4tc21hbGwtcmlnaHRcXFwiIGRhdGEtaTE4bj1cXFwicG9zdGdtYW1lLmJhY2tcXFwiPjwvc3Bhbj57e2JhY2t9fTwvYnV0dG9uPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC1leHBhbmRcXFwiPjwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLWxhcmdlLXRvcCB7e2ludmVyc2VDb2xvdXJ9fVxcXCI+XFxuICAgICAgICA8ZGl2IHVrLWdyaWQ+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtZXhwYW5kXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC0yLTNcXFwiPlxcbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcInVrLWgzXFxcIj57e2Jlc3RHdWVzc1BocmFzZX19PC9oMz5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidGFnc1xcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtZXhwYW5kXFxcIj48L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG5cXG48YnV0dG9uIGlkPVxcXCJob21lLWJ1dHRvblxcXCIgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tbGFyZ2UgdWstYm9yZGVyLXJvdW5kZWQgdWstcGFkZGluZy1yZW1vdmVcXFwiPlxcbiAgICA8c3BhbiB1ay1pY29uPVxcXCJpY29uOiBob21lOyByYXRpbzogMS41XFxcIiBjbGFzcz1cXFwidWstbWFyZ2luLXNtYWxsLXJpZ2h0XFxcIj48L3NwYW4+SG9tZVxcbjwvYnV0dG9uPlwiLCBIKTtyZXR1cm4gVC5yZW5kZXIuYXBwbHkoVCwgYXJndW1lbnRzKTsgfTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9