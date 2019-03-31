//modules
import $ from 'jquery';

require('webpack-jquery-ui/effects');

import homeView from './home-view';
import partnersView from './partners-view';
import playersView from './human-players-view';
import challengesView from './challenges-view';
import challengeView from './challenge-view';
import gameView from './game-view';
import postgameView from './postgame-view';


export default function interfaceView(context) {

	this.app = context;

	this.currentViewName = 'home';
	this.currentView = '';

	this.inverseClassToggle = false;
	this.classColor = '';	//Class colour (can be the same as playercolour) -> change the interface color
	this.classBlend = '';  // blend


	this.init = function() {
		this.currentViewName = {target:'home'};
		this.changeView(this.currentViewName);
	};

	this.changeView = function(event) {

		console.log(event)

		const _this = this;

		//clean view
		const view = $('#view');
		view.empty();

		this.currentViewName = event.target;

		if(event.target == 'home') {
			//reset gameState
			this.app.resetGameState();
			this.currentView = homeView;
		} else if(event.target == 'partners') {
			this.currentView = partnersView;
		} else if(event.target == 'players') {
			this.currentView = playersView;
		} else if(event.target == 'challenges') {
			this.currentView = challengesView;
		} else if(event.target == 'challenge') {
			this.currentView = challengeView;
		} else if(event.target == 'game') {
			this.currentView = gameView;
		} else if(event.target == 'post-game') {
			this.currentView = postgameView;
		}

		this.currentView.init(this.app);
		this.currentView.once('changeView', view => _this.changeView(view));

	};

	this.inverseClass = function() {
		return this.inverseClassToggle ? 'uk-light' : 'uk-dark';
	};

	this.changeColour = function(colour) {

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
	
		$('#view').switchClass( prevColorClass, colorClass, duration, 'easeInOutQuad');
		if (prevBlendClass != this.classBlend) $('#view').switchClass( prevBlendClass, this.classBlend, duration, 'easeInOutQuad');
	};

}