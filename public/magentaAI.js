//modules
import $ from 'jquery';
import paper from 'paper';
import rwc from 'random-weighted-choice';


export default function magentaAI() {

	// Initialize Variables
	this.path;
	this.ink;
	this.scores;
	this.timerGoogle = 0;
	this.lastTimestamp = 0,
	this.lastTimestamp_check = 0;
	this.d_scores = {};

	this.isOn = false;

	this.prevPoints;

	this.quickDrawAPI = 'https://inputtools.google.com/request?ime=handwriting&app=quickdraw&dbg=1&cs=1&oe=UTF-8'; // Set Base URL for Quickdraw Google AI API

	//--- Initialize...

	this.init = function(context) {
		this.app = context;
		// Install Paper.js
		paper.install(window);
		// paper.install(this.app);
	};

	this.startMagenta = function() {

		const _this = this;

		this.initInk(); // Initialize Ink array ()
		paper.setup('canvas'); // Setup Paper #canvas

		let tool = new paper.Tool(); // Inititalize Paper Tool

		// Paper Tool Mouse Down Event
		tool.onMouseDown = function (event) {

			if (_this.isOn == true) {
				// New Paper Path and Settings
				_this.path = new paper.Path();
				_this.path.strokeColor = 'black';
				_this.path.strokeWidth = 2; //7;

				// Get Time [ms] for each Guess (needed for accurate Google AI Guessing)
				let eventTimeStamp = event.event.timeStamp;
				let time;
				if (_this.timerGoogle === 0) {
					_this.timerGoogle = 1;
					// let timerGoogle = 0;
				} else {
					let timeDelta = eventTimeStamp - _this.lastTimestamp;
					time = _this.ink[2][_this.ink[2].length - 1] + timeDelta;
				}

				// Get XY point from event w/ time [ms] to update Ink Array
				_this.updateInk(event.point, time);
				// Draw XY point to Paper Path
				_this.path.add(event.point);

				_this.prevPoints = event.point;

				// Reset Timestamps
				_this.lastTimestamp = eventTimeStamp;
			}

		};

		// Paper Tool Mouse Drag Event
		tool.onMouseDrag = function (event) {

			if (_this.isOn == true) {
				// Get Event Timestamp and Timestamp Delta
				let eventTimeStamp = event.event.timeStamp;
				let timeDelta = eventTimeStamp - _this.lastTimestamp;

				// Get new Time for Ink Array
				let time = _this.ink[2][_this.ink[2].length - 1] + timeDelta;

				// Get XY point from event w/ time [ms] to update Ink Array
				_this.updateInk(event.point, time);

				// Draw XY point to Paper Path
				_this.path.add(event.point);

				// Reset Timestamps
				_this.lastTimestamp = eventTimeStamp;

				// Check Google AI Quickdraw every 250 m/s 
				if (eventTimeStamp - _this.lastTimestamp_check > 1000) {
					_this.checkQuickDraw();
					_this.lastTimestamp_check = eventTimeStamp;
				}

				let canvasSize = _this.getCanvasDimensions();

				_this.app.socket.emit('drawing', {
					x0: _this.prevPoints.x / canvasSize.width,
					y0: _this.prevPoints.y / canvasSize.height,
					x1: event.point.x / canvasSize.width,
					y1: event.point.y / canvasSize.height
				});

				_this.prevPoints = event.point;

			}
		};

	};

	//--- Initialize Ink Array
	this.initInk = function() {
		this.ink = [
			[],
			[],
			[]
		];
	};

	//--- Update Ink Array w/ XY Point + Time
	this.updateInk = function(point, time) {
		this.ink[0].push(point.x);
		this.ink[1].push(point.y);
		this.ink[2].push(time);
	};

	//--- Clear Paper Drawing Canvas --/// only canvsas... interface is handled in interfaca.js
	this.clearCanvas = function() {

		// Remove Paper Path Layer
		paper.project.activeLayer.removeChildren();
		paper.view.draw();

		// Init Ink Array
		this.initInk();

		// Resert Variables
		this.timerGoogle = 0;
		this.d_scores = {};

	};

	//--- Get Paper Canvas Dimensions Width/Height
	this.getCanvasDimensions = function() {
		let w = document.getElementById('canvas').offsetWidth;
		let h = document.getElementById('canvas').offsetHeight;
		return {
			height: h,
			width: w
		};
	};

	//--- Check Quickdraw Google AI API
	this.checkQuickDraw = function() {

		const _this = this;

		// Get Paper Canvas Weight/Height
		let c_dims = this.getCanvasDimensions();

		// Set HTTP Headers
		let headers = {
			'Accept': '*/*',
			'Content-Type': 'application/json'
		};

		// Init HTTP Request
		let xhr = new XMLHttpRequest();
		xhr.open('POST', this.quickDrawAPI);
		Object.keys(headers).forEach(function (key, index) {
			xhr.setRequestHeader(key, headers[key]);
		});

		// HTTP Request On Load
		xhr.onload = function () {
			if (xhr.status === 200) {
				let res = xhr.responseText; // HTTP Response Text
				_this.parseResponse(res); // Parse Response
			} else if (xhr.status !== 200) {
				console.log('Request failed.  Returned status of ' + xhr.status);
			}
		};

		// Create New Data Payload for Quickdraw Google AI API
		let data = {
			'input_type': 0,
			'requests': [{
				'language': 'quickdraw',
				'writing_guide': {
					'width': c_dims.width,
					'height': c_dims.height
				},
				'ink': [this.ink]
			}]
		};

		// Convert Data Payload to JSON String
		let request_data = JSON.stringify(data);

		// Send HTTP Request w/ Data Payload
		xhr.send(request_data);

	};

	// Parse Quickdraw Google AI API Response
	this.parseResponse = function(res) {

		// Convert Response String to JSON
		let res_j = JSON.parse(res);

		// Extract Guess Score String from Response and Convert to JSON
		this.scores = JSON.parse(res_j[1][0][3].debug_info.match(/SCORESINKS: (.+) Combiner:/)[1]);

		// let activeScore = scores;
		let activeScore = this.filterGuess(this.scores);

		let attempt = activeScore[0][0];

		this.addToGuessAttemps(attempt);

		//----TEST AND GET BACK TO THE INTERFACE
		if (this.app.gameState.currentCategory != attempt) {
			this.drawIsWrong(attempt);
		} else {
			this.drawIsRight(attempt);
		}

	};

	///add atemot to a list
	this.addToGuessAttemps = function(newAttempt) {

		let repeated = false;

		for(let attempt of this.app.attempts) {
			if (attempt == newAttempt) {
				repeated = true;
			}
		}

		if (repeated == false) {
			this.app.attempts.push(newAttempt);
		}

	};

	//--- filter guesses
	this.filterGuess = function(scores) {

		let currentGuesses = this.scores.slice();

		//if it is the first guess
		if (this.app.attempts.length == 0) {
			return scores;
		}

		for (let i = 0; i < this.app.attempts.length; i++) {
			for (let j = 0; j < currentGuesses.length; j++) {
				if (this.app.attempts[i] == currentGuesses[j][0]) {
					currentGuesses.splice(j, 1);
				}
			}
		}

		if (currentGuesses.length == 0) {
			currentGuesses = scores.slice();
		}

		return currentGuesses;

	};

	
	////-- if  draw is wrong
	this.drawIsWrong = function (attempt) {

		let verbal = '';
		let speech = '';

		//check if the word Quickdraw is guessing is in our database - If not, just throw an interjection. Tis word should be added to the dataset later.
		let attemptExist = this.app.mechanics.catChallenges.find(function (c) {
			return attempt.toLowerCase() == c.Category.toLowerCase();
		});

		//slug - because JSON notation doesn't work well with spaces
		let attemptSlug = attempt.replace(/\s/g, '-').toLowerCase();


		//translate word
		let translatedAttempt = this.app.i18next.t(
			`categories.${attemptSlug}`,
			{lng:this.app.getLanguageCode(this.app.currentPersona.language)}
		);

		//Throigh interjection. Change: [20%?] Or if the word is unknown
		if (Math.random() < this.app.mechanics.interjection.chance || attemptExist == undefined) {
			
			if (!attemptExist) {
				console.log('ADD THIS: ' + attempt);
				translatedAttempt = '';
			}

			//pick a interjection
			const choosenItemID = rwc(this.app.mechanics.interjection.phrases);

			//phrase
			const interjection = this.app.mechanics.interjection.phrases[choosenItemID].phrase;
			
			//Phrease translation
			let translatedInterjection = this.app.i18next.t(
				`interjection.${choosenItemID}`,
				{lng:this.app.getLanguageCode(this.app.currentPersona.language)}
			);

			//wild card *  ||  replace * for the attempt word
			const regex = /\*/;
			translatedInterjection = translatedInterjection.replace(regex,translatedAttempt);
			
			//define
			speech = translatedInterjection;
			verbal = translatedInterjection;

		} else {

			verbal = translatedAttempt;

			if (this.app.gameState.firstSpeak == true) {
				this.app.gameState.firstSpeak = false;
				speech = 'Hummm....';
			} else {
				speech = translatedAttempt;
			}
		}

		//update page
		$('#guess')[0].innerHTML = verbal;


		//speak
		this.app.speak(speech,this.app.currentPersona.language);

		this.app.socket.emit('guess', {
			view: 'game',
			attempt: verbal,
		});

	};

	////-- if  draw is right
	this.drawIsRight = function (attempt) {

		this.app.gameState.timer.stop(); //stop timer
		this.app.gameState.success = true; 
		
		this.magentIsOn = false;

		let verbal = '';
		let speech = '';

		//slug - because JSON notation doesn't work well with spaces
		let attemptSlug = attempt.replace(/\s/g, '-').toLowerCase();

		//translate word
		let translatedAttempt = this.app.i18next.t(
			`categories.${attemptSlug}`,
			{lng:this.app.getLanguageCode(this.app.currentPersona.language)}
		);

		//translate "i know" phrase"
		let iknow = this.app.i18next.t(
			'game.phrases.i-know',
			{lng:this.app.getLanguageCode(this.app.currentPersona.language)}
		);

		verbal = speech = `${iknow} ${translatedAttempt}.`;

		$('#guess')[0].innerHTML = verbal;

		this.app.speak(speech,this.app.currentPersona.language);

		setTimeout(function () {
			this.app.interface.changeView('post-game');
		}, 3000);

	};

}