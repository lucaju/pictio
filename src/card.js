/*****
@author: Luciano Frizzera <lucaju@gmail.com>
*/

//modules
import $ from 'jquery';

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
	this.card = new cardView(this);

	//methods
	this.init = function () {

		uikiticons(UIkit);

		//socket.io
		$(document).ready(function () {
			app.socket = io();
			app.socket.on('card', app.onCard);
		});

		app.card.update();

	};

	this.onCard = function (data) {
		app.card.update(data);
	};

};

const app = new AppCard();
window.app = app;
app.init();