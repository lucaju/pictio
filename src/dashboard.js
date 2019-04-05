/*****
@author: Luciano Frizzera <lucaju@gmail.com>
*/

//modules
import UIkit from 'uikit/dist/js/uikit.min';
import uikiticons from 'uikit/dist/js/uikit-icons.min';

import io from 'socket.io-client';

import interfaceView from './dashboard-components/interface-view';

import 'uikit/dist/css/uikit.min.css';
import './dashboard-style.css';

/// APP

const AppDashboard = function () {

	// main variables
	this.socket = undefined;
	this.interface = new interfaceView(this);

	//methods
	this.init = () => {

		uikiticons(UIkit);

		//socket.io
		app.socket = io();
		app.socket = io();
		app.socket.on('connected', () => {
			// console.log(app.socket);
			// console.log('socket client connected');

			app.socket.emit('dashboardAdded', {
				msg: 'dashboardAdded',
				socketID: app.socket.id,
			});

		});

		app.socket.on('interface', onInterfaceEvent);
		app.socket.on('drawing', onDrawingEvent);
		app.socket.on('timer', onTimerEvent);
		app.socket.on('guess', onGuessEvent);

	
		app.interface.init(this);

	};

	const onInterfaceEvent = function (data) {
		app.interface.updateView(data);
	};

	const onDrawingEvent = function (data) {
		app.interface.draw(data);
	};

	const onGuessEvent = function (data) {
		app.interface.updateGuess(data);
	};

	const onTimerEvent = function (data) {
		app.interface.updateTimer(data);
	};

};

const app = new AppDashboard();
window.app = app;
app.init();