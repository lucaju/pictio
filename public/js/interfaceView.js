
//modules
import $ from 'jquery';
// import jqueryUI from 'jquery-ui';
// import jqueryUI from 'webpack-jquery-ui';
require('webpack-jquery-ui');
// import UIkit from 'uikit';


import homeView from './home-view';
import colorChoiceView from './color-choice-view';

export default function interfaceView(context) {

	this.context = context;

	this.classColor;	//Class colour (can be the same as playercolour) -> change the interface color

	this.classElement; 
	this.classBlend; 

	this.inverseClassToggle = false;

	this.currentViewName = 'home';
	this.currentView;

	this.init = function() {
		this.currentViewName = 'home';
		this.changeView(this.currentViewName);
	};

	this.changeView = function(viewName) {

		//clean view
		const view = $('#view');
		view.empty();

		this.currentViewName = viewName;
		
		switch(viewName) {

		case 'home':
			this.currentView = homeView(this.context);
			break;

		case 'color-choice':
			this.currentView = colorChoiceView(this.context);
			break;

		default:
			this.currentView = homeView(this.context);
			break;
		}

		console.log(viewName);

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

		console.log(colour,prevColorClass, colorClass)
	
		$('#view').switchClass( prevColorClass, colorClass, 1000, 'easeInOutQuad');
		if (prevBlendClass != this.classBlend) $('#view').switchClass( prevBlendClass, this.classBlend, 1000, 'easeInOutQuad');
	};

}