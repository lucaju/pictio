//modules
import $ from 'jquery';
require('webpack-jquery-ui/effects');

import waitingView from './waiting-view';
import challengeView from './challenge-view';
import gameView from './game-view';
// import postgameView from './postgame-view';


function interfaceView(context) {

	this.app;

	this.classColor; //Class colour (can be the same as playercolour) -> change the interface color

	this.classElement;
	this.classBlend;

	this.classColor; //Class colour (can be the same as playercolour) -> chanfe the interface color

	this.inverseClassToggle = false;

	this.currentViewName = 'waiting';
	this.currentView;

	this.invertedColor;

	this.init = function (context) {

		this.app = context;

		this.currentViewName = 'waiting';
		this.changeView(this.currentViewName);
	};

	this.changeView = function (viewName) {

		//clean view
		const view = $('#view');
		view.empty();

		this.currentViewName = viewName;

		switch (viewName) {

		case 'waiting':
			this.currentView = waitingView;
			break;

		case 'challenge':
			this.currentView = challengeView;
			break;

		case 'game':
			this.currentView = gameView;
			break;

			// case 'post-game':
			// 	this.currentView = postgameView(this.app);
			// 	break;

		default:
			this.currentView = waitingView(this.app);
			break;
		}

		this.currentView.init(this.app);

	};

	this.updateView = function (data) {
		if (data.view == 'partners' || data.view == 'challenges') {
			if (this.currentViewName != 'waiting') this.changeView('waiting');
			if (data.colour) this.changeColour(data.colour);
		} else if(data.view == 'challenge') {
			this.changeView('challenge');
		} else if(data.view == 'game') {
			this.changeView('game');
		}

		this.currentView.update(data);

	};
	
	this.updateGuess = function (data) {
		if (this.currentViewName == 'game') {
			if (data.action == 'clear') {
				this.currentView.clear(data);
			} else {
				this.currentView.guess(data.attempt);
			}

		}
	};

	this.updateTimer = function (data) {
		if (this.currentViewName == 'game') {
			this.currentView.timer(data);
		}
	};

	this.inverseClass = function () {
		return this.inverseClassToggle ? 'uk-light' : 'uk-dark';
	};

	this.changeColour = function (colour) {

		// let prevElementClass = this.classElement;
		let prevColorClass = this.classColor;
		let prevBlendClass = this.classBlend;

		let elementClass;
		let colorClass;
		let blendClass;

		if (colour == 'light') {
			this.inverseClassToggle = false;
			elementClass = 'uk-background-default uk-background-blend-multiply';
			colorClass = 'uk-background-default';
			blendClass = 'uk-background-blend-multiply';
		} else if (colour == 'blue') {
			this.inverseClassToggle = true;
			elementClass = 'uk-background-primary uk-background-blend-multiply';
			colorClass = 'uk-background-primary';
			blendClass = 'uk-background-blend-multiply';
		} else if (colour == 'dark') {
			this.inverseClassToggle = true;
			elementClass = 'uk-background-secondary uk-background-blend-color-burn';
			colorClass = 'uk-background-secondary';
			blendClass = 'uk-background-blend-color-burn';
		} else if (colour == 'yellow') {
			this.inverseClassToggle = false;
			elementClass = ' background-yellow uk-background-blend-multiply';
			colorClass = 'background-yellow';
			blendClass = 'uk-background-blend-multiply';
		}

		this.classElement = elementClass;
		this.classColor = colorClass;
		this.classBlend = blendClass;

		$('#view').switchClass(prevColorClass, colorClass, 1000, 'easeInOutQuad');
		if (prevBlendClass != this.classBlend) $('#view').switchClass(prevBlendClass, this.classBlend, 1000, 'easeInOutQuad');
	};

}

export default new interfaceView();