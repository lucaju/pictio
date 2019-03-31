//modules
import $ from 'jquery';
import gameMustache from './game.html';

import ProgressBar from 'progressbar.js';


function gameView () {

	this.app = undefined;
	this.progressBar = undefined;
	this.canvas = '';
	this.canvasContext = '';

	this.pageData = {
		colourClass: ''
	};

	this.init = function(context) {

		this.app = context;
		this.pageData.colourClass = this.app.interface.inverseClass();

		//build page
		const gameHTML = gameMustache(this.pageData);
		$('#view').html(gameHTML);

		//canvas
		this.canvas = $('canvas')[0];
		this.canvasContext = this.canvas.getContext('2d');

		//timer
		this.progressBar = new ProgressBar.SemiCircle('#progress', {
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

				if ((bar.value() + 1) === 0) {
					bar.setText('');
				} else {
					bar.setText(`${bar.value() + 1}'`);
				}

				bar.text.style.color = state.color;
			}
		});

		window.addEventListener('resize', this.onResize, false);
		this.onResize();

		//animate
		this.animation();
	};

	this.update = function() {
		//must exists as an interface for the views
	};

	this.draw = function(data) {
		let w = this.canvas.width;
		let h = this.canvas.height;
		this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
	};

	this.drawLine = function(x0, y0, x1, y1, color) {
		this.canvasContext.beginPath();
		this.canvasContext.moveTo(x0, y0);
		this.canvasContext.lineTo(x1, y1);
		this.canvasContext.strokeStyle = color;
		this.canvasContext.lineWidth = 2;
		this.canvasContext.stroke();
		this.canvasContext.closePath();
	};
 
	this.clear = function() {
		$('#guess')[0].innerHTML = '...';
		this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	this.guess = function(attempt) {
		$('#guess')[0].innerHTML = attempt;
	};

	this.timer = function(data) {
		this.progressBar.set(data.timerPercentage);
	};

	this.onResize = function () {
		if(this.canvas) {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		}
	};

	//animation
	this.animation = function() {

		const duration = 1500;

		let container = $('#game');
		container.css('opacity', 0);
		container.css('marginTop', 100);

		let card = $('.uk-card');
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

}

export default new gameView();