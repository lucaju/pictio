
//modules
import $ from 'jquery';
// require('webpack-jquery-ui');
require('webpack-jquery-ui/effects');

import homeView from './home-view';
import partnersView from './partners-view';
import challengesView from './challenges-view';
import challengeView from './challenge-view';
import gameView from './game-view';
import postgameView from './postgame-view';


export default function interfaceView(context) {

	this.app = context;

	this.classColor;	//Class colour (can be the same as playercolour) -> change the interface color

	this.classElement; 
	this.classBlend; 

	this.classColor;                 //Class colour (can be the same as playercolour) -> chanfe the interface color

	this.inverseClassToggle = false;

	this.currentViewName = 'home';
	this.currentView;

	this.invertedColor;

	this.init = function() {
		this.currentViewName = 'home';
		this.changeView(this.currentViewName);
	};

	this.changeView = function(viewName) {

		const _this = this;

		//clean view
		const view = $('#view');
		view.empty();

		this.currentViewName = viewName;
		
		switch(viewName) {

		case 'home':
			this.currentView = homeView;
			this.currentView.init(this.app);
			this.currentView.on('changeView', view => _this.changeView(view));
			break;

		case 'partners':
			this.currentView = partnersView;
			this.currentView.init(this.app);
			this.currentView.on('changeView', view => _this.changeView(view));
			break;

		case 'challenges':
			this.currentView = challengesView;
			this.currentView.init(this.app);
			this.currentView.on('changeView', view => _this.changeView(view));
			break;

		case 'challenge':
			this.currentView = challengeView;
			this.currentView.init(this.app);
			this.currentView.on('changeView', view => _this.changeView(view));
			break;

		case 'game':
			this.currentView = gameView;
			this.currentView.init(this.app);
			break;

		case 'post-game':
			this.currentView = postgameView(this.app);
			break;

		default:
			this.currentView = homeView(this.app);
			break;
		}

	};



	this.inverseClass = function() {
		return this.inverseClassToggle ? 'uk-light' : 'uk-dark';
	};

	this.changeColour = function(colour) {

		// let prevElementClass = this.classElement;
		let prevColorClass = this.classColor;
		let prevBlendClass = this.classBlend;
	
		let elementClass;
		let colorClass;
		let blendClass;
	
		if(colour == 'light') {
			this.inverseClassToggle = false;
			elementClass = 'uk-background-default uk-background-blend-multiply';
			colorClass = 'uk-background-default';
			blendClass = 'uk-background-blend-multiply';
		} else if(colour == 'blue') {
			this.inverseClassToggle = true;
			elementClass = 'uk-background-primary uk-background-blend-multiply';
			colorClass = 'uk-background-primary';
			blendClass = 'uk-background-blend-multiply';
		} else if(colour == 'dark') {
			this.inverseClassToggle = true;
			elementClass = 'uk-background-secondary uk-background-blend-color-burn';
			colorClass = 'uk-background-secondary';
			blendClass = 'uk-background-blend-color-burn';
		} else if(colour == 'yellow') {
			this.inverseClassToggle = false;
			elementClass = ' background-yellow uk-background-blend-multiply';
			colorClass = 'background-yellow';
			blendClass = 'uk-background-blend-multiply';
		}
	
		this.classElement = elementClass;
		this.classColor = colorClass;
		this.classBlend = blendClass;
	
		$('#view').switchClass( prevColorClass, colorClass, 1000, 'easeInOutQuad');
		if (prevBlendClass != this.classBlend) $('#view').switchClass( prevBlendClass, this.classBlend, 1000, 'easeInOutQuad');
	};

}