//modules
import ee from 'event-emitter';
import rwc from 'random-weighted-choice';


export default function magentaAI() {

	let app;

	//emiter
	ee(this);

	// Initialize Variables

	this.scores = [];
	this.timerGoogle = 0;
	this.lastTimestamp = 0;
	this.lastTimestamp_check = 0;

	this.currentCategory = '';

	this.QUICK_DRAW_API = 'https://inputtools.google.com/request?ime=handwriting&app=quickdraw&dbg=1&cs=1&oe=UTF-8'; // Set Base URL for Quickdraw Google AI API
	

	//--- Initialize...

	this.init = (context) => {
		app = context;
		this.currentCategory  = app.gameState.currentCategory;
	};

	this.read = (eventTimeStamp,ink) => {
		//delay
		if (eventTimeStamp - this.lastTimestamp_check > 1000) {
			checkQuickDraw(ink);
			this.lastTimestamp_check = eventTimeStamp;
		}
	};

	//--- Check Quickdraw Google AI API
	const checkQuickDraw = (ink) => {

		// Get Paper Canvas Weight/Height
		let c_dims = getCanvasDimensions();

		// Set HTTP Headers
		let headers = {
			'Accept': '*/*',
			'Content-Type': 'application/json'
		};

		// Init HTTP Request
		let xhr = new XMLHttpRequest();
		xhr.open('POST', this.QUICK_DRAW_API);
		Object.keys(headers).forEach( (key) => {
			xhr.setRequestHeader(key, headers[key]);
		});

		// HTTP Request On Load
		xhr.onload = () => {
			if (xhr.status === 200) {
				let res = xhr.responseText; // HTTP Response Text
				parseResponse(res); // Parse Response
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
	const getCanvasDimensions = () => {
		let w = document.getElementById('canvas').offsetWidth;
		let h = document.getElementById('canvas').offsetHeight;
		return {
			height: h,
			width: w
		};
	};

	// Parse Quickdraw Google AI API Response
	const parseResponse = (res) => {

		// Convert Response String to JSON
		let res_j = JSON.parse(res);

		// Extract Guess Score String from Response and Convert to JSON
		this.scores = JSON.parse(res_j[1][0][3].debug_info.match(/SCORESINKS: (.+) Combiner:/)[1]);

		// let activeScore = scores;
		let activeScore = filterGuess(this.scores);

		let attempt = activeScore[0][0];

		//----TEST AND GET BACK TO THE INTERFACE
		if (this.currentCategory != attempt) {
			drawIsWrong(attempt);
		} else {
			drawIsRight(attempt);
		}

	};

	///add atemot to a list
	const addToGuessAttemps = (newAttempt) => {

		let repeated = false;

		for(let attempt of app.gameState.attempts) {
			if (attempt == newAttempt) {
				repeated = true;
			}
		}

		if (repeated == false) {
			app.gameState.attempts.push(newAttempt);
		}

	};

	//--- filter guesses
	const filterGuess = (scores) => {

		let currentGuesses = this.scores.slice();

		//if it is the first guess
		if (app.gameState.attempts.length == 0) {
			return scores;
		}

		for (let i = 0; i < app.gameState.attempts.length; i++) {
			for (let j = 0; j < currentGuesses.length; j++) {
				if (app.gameState.attempts[i] == currentGuesses[j][0]) {
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
	const drawIsWrong = (attempt) => {

		let verbal = '';
		let speech = '';

		//check if the word Quickdraw is guessing is in our database - If not, just throw an interjection. This word should be added to the dataset later.
		let attemptExist = app.mechanics.catChallenges.find( (c) => {
			return attempt.toLowerCase() == c.Category.toLowerCase();
		});

		//slug - because JSON notation doesn't work well with spaces
		let attemptSlug = attempt.replace(/\s/g, '-').toLowerCase();


		//translate word
		let translatedAttempt = app.i18next.t(
			`categories.${attemptSlug}`,
			{lng:app.getLanguageCode(app.language)}
		);

		//Throw interjection. Chance: [20%?] Or if the word is unknown
		if (Math.random() < app.mechanics.interjection.chance || attemptExist == undefined) {
			
			if (!attemptExist) {
				console.log('ADD THIS: ' + attempt);
				translatedAttempt = '';
			}

			//pick a interjection
			const choosenItemID = rwc(app.mechanics.interjection.phrases);

			//phrase
			// const interjection = app.mechanics.interjection.phrases[choosenItemID].phrase;
			
			//Phrease translation
			let translatedInterjection = app.i18next.t(
				`interjection.${choosenItemID}`,
				{lng:app.getLanguageCode(app.language)}
			);

			//wild card *  ||  replace * for the attempt word
			const regex = /\*/;
			translatedInterjection = translatedInterjection.replace(regex,translatedAttempt);
			
			//define
			speech = translatedInterjection;
			verbal = translatedInterjection;

		} else {

			addToGuessAttemps(attempt);

			verbal = translatedAttempt;

			if (app.gameState.firstSpeak == true) {
				app.gameState.firstSpeak = false;
				verbal = speech = 'Hummm....';
			} else {
				speech = verbal;
			}
		}

		//update page
		this.emit('guess', verbal);

		//speak
		app.speak(speech,app.language);

		app.socket.emit('guess', {
			view: 'game',
			room: app.socket.id,
			attempt: verbal,
		});

	};

	////-- if  draw is right
	const drawIsRight = (attempt) => {

		const _this = this;

		this.emit('stop');

		addToGuessAttemps(attempt);
		app.gameState.success = true; 

		let verbal = '';
		let speech = '';

		//slug - because JSON notation doesn't work well with spaces
		let attemptSlug = attempt.replace(/\s/g, '-').toLowerCase();

		//translate word
		let translatedAttempt = app.i18next.t(
			`categories.${attemptSlug}`,
			{lng:app.getLanguageCode(app.language)}
		);

		//translate "i know" phrase"
		let iknow = app.i18next.t(
			'game.phrases.i-know',
			{lng:app.getLanguageCode(app.language)}
		);

		verbal = speech = `${iknow} ${translatedAttempt}.`;

		//update page
		this.emit('guess', verbal);

		app.speak(speech,app.language);

		//wait 3 second before change view
		const duration = 3000;
		setTimeout( () => {
			_this.emit('win');
		}, duration);

	};

}