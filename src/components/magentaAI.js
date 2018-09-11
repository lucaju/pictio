//modules
import ee from 'event-emitter';
import rwc from 'random-weighted-choice';


export default function magentaAI() {

	// Initialize Variables

	this.scores = [];
	this.timerGoogle = 0;
	this.lastTimestamp = 0;
	this.lastTimestamp_check = 0;

	this.currentCategory = '';

	this.QUICK_DRAW_API = 'https://inputtools.google.com/request?ime=handwriting&app=quickdraw&dbg=1&cs=1&oe=UTF-8'; // Set Base URL for Quickdraw Google AI API

	ee(this);

	//--- Initialize...

	this.init = function(context) {
		this.app = context;
		this.currentCategory  = this.app.gameState.currentCategory;
	};

	this.read = function(eventTimeStamp,ink) {
		if (eventTimeStamp - this.lastTimestamp_check > 1000) {
			this.checkQuickDraw(ink);
			this.lastTimestamp_check = eventTimeStamp;
		}
	};

	//--- Check Quickdraw Google AI API
	this.checkQuickDraw = function(ink) {

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
		xhr.open('POST', this.QUICK_DRAW_API);
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
				'ink': [ink]
			}]
		};

		// Convert Data Payload to JSON String
		let request_data = JSON.stringify(data);

		// Send HTTP Request w/ Data Payload
		xhr.send(request_data);

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

	// Parse Quickdraw Google AI API Response
	this.parseResponse = function(res) {

		// Convert Response String to JSON
		let res_j = JSON.parse(res);

		// Extract Guess Score String from Response and Convert to JSON
		this.scores = JSON.parse(res_j[1][0][3].debug_info.match(/SCORESINKS: (.+) Combiner:/)[1]);

		// let activeScore = scores;
		let activeScore = this.filterGuess(this.scores);

		let attempt = activeScore[0][0];

		//----TEST AND GET BACK TO THE INTERFACE
		if (this.currentCategory != attempt) {
			this.drawIsWrong(attempt);
		} else {
			this.drawIsRight(attempt);
		}

	};

	///add atemot to a list
	this.addToGuessAttemps = function(newAttempt) {

		let repeated = false;

		for(let attempt of this.app.gameState.attempts) {
			if (attempt == newAttempt) {
				repeated = true;
			}
		}

		if (repeated == false) {
			this.app.gameState.attempts.push(newAttempt);
		}

	};

	//--- filter guesses
	this.filterGuess = function(scores) {

		let currentGuesses = this.scores.slice();

		//if it is the first guess
		if (this.app.gameState.attempts.length == 0) {
			return scores;
		}

		for (let i = 0; i < this.app.gameState.attempts.length; i++) {
			for (let j = 0; j < currentGuesses.length; j++) {
				if (this.app.gameState.attempts[i] == currentGuesses[j][0]) {
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
			// const interjection = this.app.mechanics.interjection.phrases[choosenItemID].phrase;
			
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

			this.addToGuessAttemps(attempt);

			verbal = translatedAttempt;

			if (this.app.gameState.firstSpeak == true) {
				this.app.gameState.firstSpeak = false;
				verbal = speech = 'Hummm....';
			} else {
				speech = verbal;
			}
		}

		//update page
		this.emit('guess', verbal);


		//speak
		this.app.speak(speech,this.app.currentPersona.language);

		if(this.app.IOon) {
			this.app.socket.emit('guess', {
				view: 'game',
				attempt: verbal,
			});
		}

	};

	////-- if  draw is right
	this.drawIsRight = function (attempt) {

		this.addToGuessAttemps(attempt);

		this.emit('stop');

		this.app.gameState.success = true; 

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

		//update page
		this.emit('guess', verbal);

		this.app.speak(speech,this.app.currentPersona.language);

		setTimeout(function () {
			this.app.interface.changeView('post-game');
		}, 3000);

	};

}