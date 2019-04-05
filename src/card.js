/*****
@author: Luciano Frizzera <lucaju@gmail.com>
*/

//modules
import UIkit from 'uikit/dist/js/uikit.min';
import uikiticons from 'uikit/dist/js/uikit-icons.min';

import io from 'socket.io-client';

import 'uikit/dist/css/uikit.min.css';
import './card-style.css';

import cardView from './card-components/card-view';


/// APP
const AppCard = function () {

	// main variables
	this.socket = undefined;
	const card = new cardView(this);

	//methods
	this.init = () => {

		uikiticons(UIkit);

		//socket.io
		app.socket = io();

		app.socket.on('connected', () => {

		});

		app.socket.emit('cardAdded', {
			msg: 'cardAdded',
			socketID: app.socket.id,
		});

		app.socket.on('roomJoined', (data) => {
			console.log(data)
			app.socket.room = data.roomID;

			app.socket.emit('card', {
				component: 'card',
				action: 'start',
				room: data.roomID
			});

		});

		app.socket.on('card', onCard);

		card.update();

	};

	const onCard = (data) => {
		card.update(data);
	};
};

const app = new AppCard();
window.app = app;
app.init();