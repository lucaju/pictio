//modules
import $ from 'jquery';
require('webpack-jquery-ui/effects');

import waitingView from './waiting-view';
import challengeView from './challenge-view';
import gameView from './game-view';
import postgameView from './postgame-view';


export default function interfaceView(context) {

	const app = context;

	this.currentViewName = 'waiting';
	this.currentView = '';

	this.inverseClassToggle = false;
	this.classColor = '';	//Class colour (can be the same as playercolour) -> change the interface color
	this.classBlend = '';  // blend


	this.init = () => {
		this.currentViewName = 'waiting';
		this.changeView(this.currentViewName);
	};

	this.changeView = (viewName, data) => {

		//clean view
		const view = $('#view');
		view.empty();

		this.currentViewName = viewName;

		if(viewName == 'waiting') {
			this.currentView = waitingView;
		} else if(viewName == 'challenge') {
			this.currentView = challengeView;
		} else if(viewName == 'game') {
			this.currentView = gameView;
		} else if(viewName == 'post-game') {
			this.currentView = postgameView;
		}

		this.currentView.init(app, data);

	};

	this.updateView = (data) => {
		if (data.view == 'partners' || data.view == 'challenges' || data.view == 'players') {
			if (this.currentViewName != 'waiting') this.changeView('waiting');
			if (data.colour) this.changeColour(data.colour);
		} else if(data.view == 'challenge') {
			this.changeView('challenge');
		} else if(data.view == 'game') {
			this.changeView('game', data);
		} else if(data.view == 'post-game') {
			this.changeView('post-game');
		} else if(data.view == 'waiting') {
			if (this.currentViewName != 'waiting') this.changeView('waiting');
		}

		this.currentView.update(data);

	};
	
	this.updateGuess = (data) => {
		if (this.currentViewName == 'game') {
			if (data.action == 'clear') {
				this.currentView.clear(data);
			} else {
				this.currentView.guess(data.attempt);
			}
		}
	};

	this.updateTimer = (data) => {
		if (this.currentViewName == 'game') {
			this.currentView.timer(data);
		}
	};

	this.draw = (data) => {
		if(this.currentViewName == 'game') {
			this.currentView.draw(data);
		}
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
	
		$('#view').switchClass( prevColorClass, colorClass, duration, 'easeInOutQuad');
		if (prevBlendClass != this.classBlend) $('#view').switchClass( prevBlendClass, this.classBlend, duration, 'easeInOutQuad');
	};

}