/*****
@author: Luciano Frizzera <lucaju@gmail.com>
*/

//modules
import $ from 'jquery/dist/jquery.min';
import UIkit from 'uikit/dist/js/uikit.min';
import uikiticons from 'uikit/dist/js/uikit-icons.min';
import io from 'socket.io-client';
import interfaceView from './dashboard-components/interface-view';
// import magentaAI from './magentaAI';

import 'uikit/dist/css/uikit.min.css';
import './dashboard-style.css';



/// APP

const AppDashboard = function () {

	// main variables
	this.socket;
	this.interface = interfaceView;
	// this.magentaAI = new magentaAI();

	this.persona;

	//methods
	this.init = function () {

		uikiticons(UIkit);

		//socket.io
		$(document).ready(function () {
			app.socket = io();
			app.socket.on('interface', app.onInterfaceEvent);
			app.socket.on('drawing', app.onDrawingEvent);
			app.socket.on('timer', app.onTimerEvent);
			app.socket.on('guess', app.onGuessEvent);
		});
		

		app.interface.init(this);




		// app.magentaAI.init(app);



	};

	this.onInterfaceEvent = function (data) {
		app.interface.updateView(data);
	};

	this.onDrawingEvent = function (data) {
		// console.log(data)
	};

	this.onGuessEvent = function (data) {
		app.interface.updateGuess(data);
	};

	this.onTimerEvent = function (data) {
		app.interface.updateTimer(data);
	};

};

const app = new AppDashboard();
window.app = app;
app.init();