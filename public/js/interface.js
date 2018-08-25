/*jshint esversion: 6 */

//main variables
var currentChallenge;           //current challenge
var currentDrawChallenge;       //current draw category
var guessAttemps = [];          //current list of guess attemps
var classColor;                 //Class colour (can be the same as playercolour) -> chanfe the interface color
var playerColor;                //color choose by the player
var voice;                      //voice, attached to the colour

var invertedColor;

var timer = new Timer();        //innitiate timer object
var firstSpeak = true;          //regulates is it is the first time the machine speak on each time that users play the challenge

var inverseClassToggle = false;

var classElement; 
var classColor; 
var classBlend; 

var socket;

var attempNumber = 0;

//list of colours
var colours = ["light",
               "blue",
               "dark",
               "yellow"]; 


//list of voices
var voices = ["UK English Female",
              "UK English Male",
              "US English Female",
              "US English Male"];

/// ---- Documetn Ready
$(document).ready(function(){

  socket = io();

	changeColour(colours[0]); //default
	playerColor = colours[0];
	changeVoice(playerColor); //default
	
	showInfoView();
  // showGame(challenges[0]);
  
  // showGame("wall");
});


// --- VIEW 1: Show first page: Information View
function showInfoView() {



	$('#go-play').click(function() {
		
		
		$("#intro").animate({
			marginTop: "-100",
			opacity: 0,
		}, 1500, function() {
			showColorChoice();
		} );

	});

}

// --- VIEW 2: Starting the game: choose you colour
function showColorChoice() {

	var view = $("#view");
	view.empty();


	var htmlContent = `<div id="color-choice" class="uk-container uk-container-small uk-position-center uk-text-center">
							<h1 id="title" lass="uk-h1 ${inverseClass()}">Choose your color</h1>
							<div id="field" class="uk-margin-medium-top"></div>
							<button id="done" class="uk-button uk-button-large uk-button-default uk-background-default uk-border-rounded uk-margin-xlarge-top">Done</button>
						</div>`;

  $(htmlContent).appendTo(view);
  
  socket.emit('interface', {
    view:"choose-color"
  });

	//buttons
	$.each(colours,function(i,colour) {

		var colorClass;

		if(colour == 'light') {
			colorClass = 'uk-button-default uk-background-default';
		} else if(colour == 'blue') {
			colorClass = 'uk-button-primary';
		} else if(colour == 'dark') {
			colorClass = 'uk-button-secondary';
		} else if(colour == 'yellow') {
			colorClass = ' uk-button-default background-yellow';
		}

		//a button for each color
		var bt= $(`<button id="${colour}" class="uk-button uk-button-large ${colorClass} uk-border-rounded uk-margin-small-right"><span uk-icon="icon: nut; ratio: 1.5"></span></button>`).appendTo($('#field'));
		
		
		bt.click(function() {

			// onChangeColor();
      
			var btColor = $(this).attr("id");

			if (playerColor != btColor) {

        
				playerColor = btColor;

				changeColour(playerColor);
				changeVoice(playerColor);
				
				speak(playerColor);

				if (inverseClassToggle == true) {
					$('#title').addClass('uk-light', {duration:500}); 
				} else {
					$('#title').removeClass('uk-light', {duration:500}); 
        }
        
        socket.emit('interface', {
          view:"choose-color",
          color: playerColor
        });

			}
		
    
		});

  });

	//button
	$('#done').click(function() {

    

		$("#color-choice").animate({
			marginTop: "-100",
			opacity: 0,
		}, 1500, function() {
			showChallenges();
		} );
		
	});

	//animation
	$("#color-choice").css("opacity",0);
	$("#color-choice").css("marginTop",100);
	
	//animation
	$("#color-choice").animate({
		marginTop: 0,
		opacity: 1,
	  }, 1500);

}

// function onChangeColor()

function inverseClass() {

    if(inverseClassToggle) {
      return "uk-light";
    } else {
      return "uk-dark";
    }

}

// --- VIEW 3: Show challenges
function showChallenges() {

  //main container
	var view = $("#view");
	view.empty();

	//content
	var html = `<div id="challenges" class="uk-container uk-container-small uk-position-center uk-text-center">
					<h1 id="title" class="uk-h1 ${inverseClass()}">Pick a challenge</h1>
					<div class="uk-margin-medium-top" uk-grid>
						<div class="uk-width-expand"></div>
						<div id="columns" class="uk-width-5-6" uk-grid></div>
						<div class="uk-width-expand"></div>
					</div>
				</div>`;

  $(html).appendTo(view);

  // get challenges
  $.each(challenges,function(i,challenge) {

	var col = `<div class="uk-width-1-3">
					<div id="${challenge.short}" class="uk-card uk-card-default uk-border-rounded uk-box-shadow-small uk-animation-toggle">
						<div class="uk-card-media-top uk-cover-container">
							<img src="assets/${challenge.short}.png" alt="" class="uk-animation-kenburns">
						</div>
						<div class="uk-card-body">
							<a href="#" class="uk-button uk-button-text"><h4 class="uk-h4">${challenge.name}</h4></a>
						</div>
					</div>
				</div>`;

    $(col).appendTo($('#columns'));

    //change mouse cursors
	var card = $(`#${challenge.short}`);
	
	card.css('cursor', 'pointer');

    //button controll
    card.click(function() {
		$("#challenges").animate({
			marginTop: "-100",
			opacity: 0,
		}, 1500, function() {
			showChallenge(challenge);
		} );

  });
  
  socket.emit('interface', {
    view:"choose-chalenge"
  });
	
	
	// card.css("transform","rotate(60deg)");
	var cDelay = 400 + (i*100) + (Math.random() * 200 );
	var cRotate = -3 + (Math.random() * 6 );
	var ctop = -500 + (Math.random() * 1000 );

	card.css("left",-1500);
	card.css("top",ctop);

	card.delay(cDelay).animate({
		top: 0,
		left: 0,
	  }, {
		duration: 1000,
		specialEasing: {
			width: "linear",
			height: "easeOutBounce"
		  },
		start: function() {
		  $( this ).rotate({
			duration:1200,
			angle: 150,
			animateTo:cRotate
		});
		}
	  });
  });

  //animation
	$("#challenges").css("opacity",0);
	$("#challenges").css("marginTop",100);

  	$("#challenges").animate({
		marginTop: 0,
		opacity: 1,
	}, 1100);

}

// --- VIEW 4: SHow Challenge
function showChallenge(challenge) {

	currentChallenge = challenge; //save current challenge

	//pick a draw category
	var filteredCatetories = filterCategories(challenge.code);
	var randomDraw = filteredCatetories[Math.floor(Math.random() * filteredCatetories.length)];
	currentDrawChallenge = randomDraw.Category; // save current draw category

	//   main container
	var view = $("#view");
	view.empty();


  //main container
  var html = `<div id="${challenge.short}" class="uk-container uk-container-small uk-position-center uk-text-center">
				<h2 id="title" class="uk-h2 ${inverseClass()}">${challenge.name}</h2>
				<div class="uk-margin-remove-top" uk-grid>
					<div class="uk-width-expand"></div>
					<div id="description" class="uk-width-2-3">
						<div class="${inverseClass()}">${challenge.description}</div>
						<div uk-grid>
							<div class="uk-width-expand"></div>
								<div class="uk-card uk-card-default uk-width-2-3 uk-margin-small-left uk-padding-remove-left uk-box-shadow-large uk-border-rounded">
								<div class="uk-card-header">
									<h4 class="uk-h4 uk-margin-remove-bottom">Draw</h4>
								</div>
								<div id="${currentDrawChallenge}" class="uk-card-body uk-background-primary uk-box-shadow-large uk-light">
									<h2 class="uk-h2">${currentDrawChallenge}</h2>
									<p class="uk-text-small"><span uk-icon="future" class="uk-margin-small-right"></span>${challenge.time}s</p>
								</div>
								<div class="uk-card-footer uk-box-shadow-large">
									<button id="play" class="uk-button uk-button-text uk-button-large uk-border-rounded uk-width-1-1">I'm ready<span uk-icon="chevron-right" class="uk-margin-small-left"></span></button>
								</div>
							</div>
							<div class="uk-width-expand"></div>
						</div>
					</div>
					<div class="uk-width-expand"></div>

				</div>

				<div class="uk-margin-large-top">
					<button id="back" class="uk-button uk-button-text uk-text-meta ${inverseClass()}"><span uk-icon="chevron-left" class="uk-margin-small-right"></span>back</button>
				</div>

			</div>`;

	$(html).appendTo(view);

	//buttons
	$('.uk-card').click(function() {
		callGame();
	});
	
	$('#play').click(function() {
		callGame();
	});

	function callGame() {
		$(`#${challenge.short}`).animate({
			marginTop: "-100",
			opacity: 0,
		}, 1500, function() {
			showGame(challenge);
		} );

	}

	$('#back').click(function() {
		$(`#${challenge.short}`).animate({
			marginTop: "-100",
			opacity: 0,
		}, 1500, function() {
			showChallenges();
		} );
		
  });
  
  socket.emit('interface', {
    view:"challenge-instruction",
    challenge: challenge,
    currentDrawChallenge: currentDrawChallenge
  });


	//animation
	var container = $(`#${challenge.short}`);
	container.css("opacity",0);
	container.css("marginTop",100);

	var card = $('.uk-card');
	var cardHeight = card.height();
	card.css("height",0);
	card.css("opacity",0);
		
	//animation
	container.animate({
		marginTop: 0,
		opacity: 1,
	  }, 1500);


	  card.delay(1000).animate({
		height: cardHeight,
		opacity: 1,
	  }, 1500);

}

// --- VIEW 5: SHow Game
function showGame(challenge) {

  firstSpeak = true; //reset first speak

  //   main container
	var view = $("#view");
	view.empty();

  //content
  var html = `<div id="game" class="uk-container uk-container-expand uk-text-center">
				<div class="${inverseClass()}" uk-grid>
					<div class="uk-width-1-3 uk-text-left">
						<h3 id="guess" class="uk-h3">...</h3>
						<!--		<button id="back" class="uk-button uk-button-text uk-text-meta uk-align-left"><span uk-icon="chevron-left" class="uk-margin-small-right"></span>back</button> -->
					</div>
					<div class="uk-width-1-3">
						<div id="timer">
						<!--	<div id="number" class="uk-countdown-number">${challenge.time}s</div> -->
							<h2 id="number" class="uk-h2">${challenge.time}s</h2>
						</div>
					</div>
					<div class="uk-width-1-3">
						<button id="clear-drawing" class="uk-button uk-button-secondary uk-border-rounded uk-align-right">Clear</button>
					</div>
				</div>
				<div class="uk-margin-remove-top" uk-grid>
					<!-- <div class="uk-card uk-card-default uk-card-body uk-border-rounded uk-width-1-1 uk-padding-remove uk-height-large uk-margin-left uk-box-shadow-large" uk-height-viewport="offset-bottom: 40"> -->
					<div class="uk-card uk-card-default uk-card-body uk-border-rounded uk-width-1-1 uk-padding-remove uk-margin-left uk-box-shadow-large bordered" uk-height-viewport="offset-bottom: 40">
						<button id="start-drawing" class="uk-button uk-button-large uk-button-primary uk-border-rounded uk-position-center">Play</button>
						
						<canvas id="canvas" resize></canvas>
						
					</div>
				</div>
				<!--
				<div uk-grid>
					<div class="uk-width-1-1">
						<h3 id="guess" class="uk-h3">...</h3>
					</div>
				</div>
				-->
			</div>`;

  $(html).appendTo(view);

  $('#start-drawing').click(function() {
		
    $('#start-drawing-overlay').remove();
    $('.uk-inline').removeClass('uk-inline');
    startDrawing(challenge);
  });

  $('#clear-drawing').click(function() {
    $("#guess")[0].innerHTML = "...";
    clearDrawing(challenge);

    socket.emit('guess', {
      view:"show-game",
      action:"clear",
      attemp: "...",
    });
  });


  $('#back').click(function() {
    timer.stop();
      guessAttemps = [];
    $('#game').animate({
      marginTop: "-100",
      opacity: 0,
    }, 1500, function() {
      showChallenges();
    } );
    
    
    
  });


  //animation
	var container = $('#game');
	container.css("opacity",0);
	container.css("marginTop",100);

	var card = $('.uk-card');
	var cardHeight = card.height();
	card.css("height",0);
	card.css("opacity",0);
		
	//animation
	container.animate({
		marginTop: 0,
		opacity: 1,
	  }, 1500);


  card.delay(1000).animate({
  height: cardHeight,
  opacity: 1,
  }, 1500);


  socket.emit('interface', {
    view:"show-game",
    action: "initiate",
    challenge: challenge,
  });

}

// --- VIEW 6: Game Lost
function gameLost(challenge) { 

	attempNumber = 0;

//   main container
	var view = $("#view");
	view.empty();

	var html = `<div id="postGameLost" class="uk-container uk-container-small uk-position-center uk-text-center">
					<div class="${inverseClass()}">
						<h2 class="uk-h2">Time's up!</h2>
						<h1 class="uk-heading-primary">We got all wrong!</h1>
					</div>


					<div uk-grid>
						<div class="uk-width-expand"></div>
							<div class="uk-card uk-card-default uk-width-2-3 uk-margin-small-left uk-padding-remove-left uk-box-shadow-large uk-border-rounded">
							<div class="uk-card-header">
								<h4 class="uk-h4 uk-margin-remove-bottom">You were supposed to draw</h4>
							</div>
							<div id="${currentDrawChallenge}" class="uk-card-body uk-background-primary uk-box-shadow-large uk-light">
								<h2 class="uk-h2">${currentDrawChallenge}</h2>
							</div>
							<div class="uk-card-footer uk-box-shadow-large">
								<button id="back" class="uk-button uk-button-text"><span uk-icon="chevron-left" class="uk-margin-small-right"></span>back</button>
							</div>
						</div>
						<div class="uk-width-expand"></div>
					</div>

					<div class="uk-margin-large-top ${inverseClass()}">
						<div uk-grid>
							<div class="uk-width-expand"></div>
							<div class="uk-width-2-3">
								<h3 class="uk-h3">My best guesses were</h3>
								<div class="tags"></div>
							</div>
							<div class="uk-width-expand"></div>
						</div>
					</div>

				</div>`;

  	$(html).appendTo(view);

 	 //speak
    // var speech = "We got all wrong! You were supposed to draw " + currentDrawChallenge +"";
    var speech = "We got all wrong!";
  	speak(speech);

  	$('#back').click(function() {
		$('#postGameLost').animate({
			marginTop: "-100",
			opacity: 0,
		}, 1500, function() {
			showChallenges();
		} );
		
	});


	// get limited list of best guess
	var list = getBestGuesses(guessAttemps);

	
	var guessList = view.find(".tags"); //DOM
	$.each(list, function(i,guess) {
		guessList.append(`<span class="uk-label uk-label-primary">${guess}</span>\n`);
  });
  
  socket.emit('interface', {
    view:"game-lost",
    action: "initiate",
    bestGuesses: list,
  });

}

// --- VIEW 7: Game Win
function gameWin() { 

	attempNumber = 0;

	//   main container
	var view = $("#view");
	view.empty();

	var html = `<div id="postGameLost" class="uk-container uk-container-small uk-position-center uk-text-center">
					<div class="${inverseClass()}">
						<h1 class="uk-heading-primary">We did it!</h1>
					</div>
					<div class="uk-margin-medium-top" uk-grid>
						<div class="uk-width-expand"></div>
							<div class="uk-card uk-card-default uk-width-2-3 uk-margin-small-left uk-padding-remove-left uk-box-shadow-large uk-border-rounded">
								<div id="${currentDrawChallenge}" class="uk-card-body uk-background-primary uk-light uk-box-shadow-large">
									<h2 class="uk-h2">${currentDrawChallenge}</h2>
								</div>
								<div class="uk-card-footer uk-box-shadow-large">
									<button id="back" class="uk-button uk-button-text"><span uk-icon="chevron-left" class="uk-margin-small-right"></span>back</button>
								</div>
							</div>
						<div class="uk-width-expand"></div>
					</div>

					<div class="uk-margin-xlarge-top ${inverseClass()}">
						<div uk-grid>
							<div class="uk-width-expand"></div>
							<div class="uk-width-2-3">
								<h3 class="uk-h3">My best guesses were</h3>
								<div class="tags"></div>
							</div>
							<div class="uk-width-expand"></div>
						</div>
					</div>

				</div>`;

	$(html).appendTo(view);

    //speak
    var speech = "We did it!";
    // var speech = "We did it! It is " + currentDrawChallenge;
    speak(speech);

  //buttons
  	$('#back').click(function() {
      $('#postGameLost').animate({
        marginTop: "-100",
        opacity: 0,
      }, 1500, function() {

        showChallenges();
        
    } );
    
  });

	// get limited list of best guess
	var list = getBestGuesses(guessAttemps);

	var guessList = view.find(".tags"); //DOM
	$.each(list, function(i,guess) {
		guessList.append(`<span class="uk-label uk-label-primary">${guess}</span>\n`);
  });
  
  console.log("win");

  socket.emit('interface', {
    view:"game-win",
    action: "initiate",
    bestGuesses: list,
  });

}

// --- function to change interface colour and assing it to the player
function changeColour(colour) {


  var prevElementClass = classElement;
  var prevColorClass = classColor;
  var prevBlendClass = classBlend;

  var elementClass;
  var colorClass;
  var blendClass;

	if(colour == 'light') {
		inverseClassToggle = false;
		elementClass = 'uk-background-default uk-background-blend-multiply';
		colorClass = 'uk-background-default';
		blendClass = 'uk-background-blend-multiply';
	} else if(colour == 'blue') {
		inverseClassToggle = true;
		elementClass = 'uk-background-primary uk-background-blend-multiply';
		colorClass = 'uk-background-primary';
		blendClass = 'uk-background-blend-multiply';
	} else if(colour == 'dark') {
		inverseClassToggle = true;
		elementClass = 'uk-background-secondary uk-background-blend-color-burn';
		colorClass = 'uk-background-secondary';
		blendClass = 'uk-background-blend-color-burn';
	} else if(colour == 'yellow') {
		inverseClassToggle = false;
		elementClass = ' background-yellow uk-background-blend-multiply';
		colorClass = 'background-yellow';
		blendClass = 'uk-background-blend-multiply';
  }

  classElement = elementClass;
  classColor = colorClass;
  classBlend = blendClass;

  $("#view").switchClass( prevColorClass, colorClass, 1000, "easeInOutQuad" );
  if (prevBlendClass != classBlend) $("#view").switchClass( prevBlendClass, classBlend, 1000, "easeInOutQuad" );
}

// --- function to change interface colour and assing it to the player
function changeVoice(playerColor) {

  var colourIndex;
  $.each(colours, function(i,colour) {
    if (playerColor == colour) {
      colourIndex = i;
      return false; 
    }
  });

  voice = voices[colourIndex];

}

// --- function START DRAWING
function startDrawing(challenge) {
  guessAttemps = [];
  timeGame(challenge);
  magentIsOn = true;
  startMagenta();
  $('#start-drawing').remove();
}

// --- set timer for game
function timeGame(challenge) {
  
  var time = challenge.time; //get timer for the challeng

  timer = new Timer(); // reset timer

  timer.start({countdown: true, startValues: {seconds: time}}); // start timer countdown

  var timeLeft = (timer.getTimeValues().minutes*60) + timer.getTimeValues().seconds;

  $('#timer #number').html(timeLeft+"s");

  timer.addEventListener('secondsUpdated', function (e) {

    timeLeft = (timer.getTimeValues().minutes*60) + timer.getTimeValues().seconds;

      $('#timer #number').html(timeLeft+"s");

      socket.emit('interface', {
        view:"show-game",
        action: "timer",
        timer: timeLeft+"s",
      });
  });

  timer.addEventListener('targetAchieved', function (e) {
      gameLost(challenge); // Time is up
  });
}

// ---  set limited list of best guesses
function getBestGuesses(guessAttemps,limit) {

  if (limit) {
    return guessAttemps.slice(0,8);
  }

  return guessAttemps;

}

//-- Filter category by cahllenge code 
function filterCategories(code) { 

  var filteredCat = [];

  //loop categories draw
  $.each(catChallenges, function(i,cat) {

    // if category fits in only one challegen
    if(cat.Challenge.length == 1) {
      if (cat.Challenge == code) {
        filteredCat.push(cat);
      }

      // cartegory fits into more than one category
    } else {

      //spli comma separated cateories
      var chArray = cat.Challenge.split(",");

      //loop
      for(var j = 0; j<chArray.length; j++) {
        if (chArray[j] == code) {
          filteredCat.push(cat);
          break;
        }
      }
    }

  });

  return filteredCat;

}

////-- if  draw is wrong
function drawIsWrong(attemp) {

	attempNumber++;

  var verbal = "I see " + attemp;
  var speech;

  if (firstSpeak == true) {
	// speech = "I see " + attemp;
	speech = "Hmmm....";// I see " + attemp;
    firstSpeak = false;
  } else {
    speech = attemp;
  }
  
  var rand = Math.round(Math.random() * 10);
  console.log(rand);
  if (rand >8) {

	var interjection;

	var interjectionRand = Math.round(Math.random() * 4);

	console.log(interjectionRand);
 
	if (interjectionRand == 0) {
		interjection = "What is this?";
	} else if (interjectionRand == 1) {
		interjection = "I have no ideia what it is.";
	} if (interjectionRand == 2) {
		interjection = "hmmm... Maybe " + attemp + "?";
	} if (interjectionRand == 3) {
		interjection = "Come on, time is running.";
	} if (interjectionRand == 4) {
		interjection = "This is fun.";
	}

	console.log(interjection);

	speech = interjection;
	verbal = interjection;
  }

  $("#guess")[0].innerHTML = verbal;

  if(!responsiveVoice.isPlaying()) {
	  speak(speech);
  }

  socket.emit('guess', {
    view:"show-game",
    attemp: verbal,
  });

}

////-- if  draw is right
function drawIsRight(attemp) {

  timer.stop(); //stop timer
  magentIsOn = false;

  var verbal = "I know! I know! It is " + attemp;
  var speech = "I know! I know! It is " + attemp;

  $("#guess")[0].innerHTML = verbal;

  speak(speech);

  setTimeout(function() {
      gameWin();
    }, 3000);

}


function speak(text) {
	if(text != null) {
		responsiveVoice.speak(text, voice);
	// artyom.say(text);
	}
}

//list of challenges
var challenges = [
  {
    name: "Drawing on the Wall",
    code: "A",
    short: "wall",
    time: 30,
    description:"<p>In this challenge, the two human players work together to produce one sketch representing the word given by the tablet. The player who saw the word must draw on a wall, using just their fingers, without leaving any visible mark. The second human acts as a proxy, following the trajectory of the finger and trying to reproduce it on the screen of the tablet. The AI program has one minute to guess what is being drawn.</p><br/>"
  },
  {
    name: "Blind Drawing with Left/Right Hand",
    code: "B",
    short: "blind",
    time: 60,
    description:"<p>This is an individual challenge, where the drawer sketch representations for the word selected without looking at the screen and using her/his non-dominant hand. While the human player draws, the machine will attempt to guess what is being drawn.</p><br/>"
  
  },
  {
    name: "Verbal Description",
    code: "C",
    short: "verbal",
    time: 90,
    description:"<p>In this challenge, the two human players work together to produce one sketch representing the word selected. The player who saw the word must verbally describe it, using only geometrical figures and spatial orientation. The second human acts as a proxy, following the instructions and trying to reproduce it on the screen of the tablets. The AI program has one minute to guess what is being drawn.</p><br/>"
  }
];

//list of draw category 
var catChallenges = [
  {
    "Category": "aircraft carrier",
    "Challenge": "B"
  },
  {
    "Category": "airplane",
    "Challenge": "B"
  },
  {
    "Category": "alarm clock",
    "Challenge": "B"
  },
  {
    "Category": "ambulance",
    "Challenge": "B"
  },
  {
    "Category": "angel",
    "Challenge": "B"
  },
  {
    "Category": "animal migration",
    "Challenge": "B"
  },
  {
    "Category": "ant",
    "Challenge": "A,C"
  },
  {
    "Category": "anvil",
    "Challenge": "B"
  },
  {
    "Category": "apple",
    "Challenge": "A"
  },
  {
    "Category": "arm",
    "Challenge": "A,B"
  },
  {
    "Category": "asparagus",
    "Challenge": "A,B"
  },
  {
    "Category": "axe",
    "Challenge": "A,C"
  },
  {
    "Category": "backpack",
    "Challenge": "B"
  },
  {
    "Category": "banana",
    "Challenge": "A"
  },
  {
    "Category": "bandage",
    "Challenge": "B"
  },
  {
    "Category": "barn",
    "Challenge": "B"
  },
  {
    "Category": "baseball",
    "Challenge": ""
  },
  {
    "Category": "baseball bat",
    "Challenge": "A"
  },
  {
    "Category": "basket",
    "Challenge": "B"
  },
  {
    "Category": "basketball",
    "Challenge": ""
  },
  {
    "Category": "bat",
    "Challenge": "B"
  },
  {
    "Category": "bathtub",
    "Challenge": "A"
  },
  {
    "Category": "beach",
    "Challenge": "B"
  },
  {
    "Category": "bear",
    "Challenge": "B"
  },
  {
    "Category": "beard",
    "Challenge": "A"
  },
  {
    "Category": "bed",
    "Challenge": "A,C"
  },
  {
    "Category": "bee",
    "Challenge": "B"
  },
  {
    "Category": "belt",
    "Challenge": "B"
  },
  {
    "Category": "bench",
    "Challenge": "A,B,C"
  },
  {
    "Category": "bicycle",
    "Challenge": "B,C"
  },
  {
    "Category": "binoculars",
    "Challenge": "C"
  },
  {
    "Category": "bird",
    "Challenge": "B"
  },
  {
    "Category": "birthday cake",
    "Challenge": "C"
  },
  {
    "Category": "blackberry",
    "Challenge": "A,C"
  },
  {
    "Category": "blueberry",
    "Challenge": "A,C"
  },
  {
    "Category": "book",
    "Challenge": "A,C"
  },
  {
    "Category": "boomerang",
    "Challenge": "A,C"
  },
  {
    "Category": "bottlecap",
    "Challenge": "C"
  },
  {
    "Category": "bowtie",
    "Challenge": "A,C"
  },
  {
    "Category": "bracelet",
    "Challenge": "B,C"
  },
  {
    "Category": "brain",
    "Challenge": "A"
  },
  {
    "Category": "bread",
    "Challenge": "A"
  },
  {
    "Category": "bridge",
    "Challenge": "A,C"
  },
  {
    "Category": "broccoli",
    "Challenge": "B"
  },
  {
    "Category": "broom",
    "Challenge": "A,C"
  },
  {
    "Category": "bucket",
    "Challenge": "C"
  },
  {
    "Category": "bulldozer",
    "Challenge": "B"
  },
  {
    "Category": "bus",
    "Challenge": "C"
  },
  {
    "Category": "bush",
    "Challenge": "A"
  },
  {
    "Category": "butterfly",
    "Challenge": "A"
  },
  {
    "Category": "cactus",
    "Challenge": "A,C"
  },
  {
    "Category": "cake",
    "Challenge": "A,C"
  },
  {
    "Category": "calculator",
    "Challenge": "A,C"
  },
  {
    "Category": "calendar",
    "Challenge": "A,C"
  },
  {
    "Category": "camel",
    "Challenge": "B"
  },
  {
    "Category": "camera",
    "Challenge": "C"
  },
  {
    "Category": "camouflage",
    "Challenge": "A"
  },
  {
    "Category": "campfire",
    "Challenge": "A"
  },
  {
    "Category": "candle",
    "Challenge": "A,C"
  },
  {
    "Category": "cannon",
    "Challenge": "A,B,C"
  },
  {
    "Category": "canoe",
    "Challenge": "A"
  },
  {
    "Category": "car",
    "Challenge": "A,C"
  },
  {
    "Category": "carrot",
    "Challenge": "A,C"
  },
  {
    "Category": "castle",
    "Challenge": "A,C"
  },
  {
    "Category": "cat",
    "Challenge": "B"
  },
  {
    "Category": "ceiling fan",
    "Challenge": "B"
  },
  {
    "Category": "cello",
    "Challenge": "B"
  },
  {
    "Category": "cell phone",
    "Challenge": "A,C"
  },
  {
    "Category": "chair",
    "Challenge": "A,C"
  },
  {
    "Category": "chandelier",
    "Challenge": "B"
  },
  {
    "Category": "church",
    "Challenge": "A"
  },
  {
    "Category": "circle",
    "Challenge": ""
  },
  {
    "Category": "clarinet",
    "Challenge": "B"
  },
  {
    "Category": "clock",
    "Challenge": "A,C"
  },
  {
    "Category": "cloud",
    "Challenge": "A"
  },
  {
    "Category": "coffee cup",
    "Challenge": "A"
  },
  {
    "Category": "compass",
    "Challenge": "A,C"
  },
  {
    "Category": "computer",
    "Challenge": "C"
  },
  {
    "Category": "cookie",
    "Challenge": "A,C"
  },
  {
    "Category": "cooler",
    "Challenge": "B,C"
  },
  {
    "Category": "couch",
    "Challenge": "B"
  },
  {
    "Category": "cow",
    "Challenge": "B"
  },
  {
    "Category": "crab",
    "Challenge": "B"
  },
  {
    "Category": "crayon",
    "Challenge": "A,C"
  },
  {
    "Category": "crocodile",
    "Challenge": "A,B"
  },
  {
    "Category": "crown",
    "Challenge": "A,C"
  },
  {
    "Category": "cruise ship",
    "Challenge": "B"
  },
  {
    "Category": "cup",
    "Challenge": "A,C"
  },
  {
    "Category": "diamond",
    "Challenge": "A,C"
  },
  {
    "Category": "dishwasher",
    "Challenge": "A,C"
  },
  {
    "Category": "diving board",
    "Challenge": "B"
  },
  {
    "Category": "dog",
    "Challenge": "B"
  },
  {
    "Category": "dolphin",
    "Challenge": "B"
  },
  {
    "Category": "donut",
    "Challenge": "A,C"
  },
  {
    "Category": "door",
    "Challenge": "A,C"
  },
  {
    "Category": "dragon",
    "Challenge": "B"
  },
  {
    "Category": "dresser",
    "Challenge": "B,C"
  },
  {
    "Category": "drill",
    "Challenge": "C"
  },
  {
    "Category": "drums",
    "Challenge": "C"
  },
  {
    "Category": "duck",
    "Challenge": "B"
  },
  {
    "Category": "dumbbell",
    "Challenge": "A,C"
  },
  {
    "Category": "ear",
    "Challenge": "B"
  },
  {
    "Category": "elbow",
    "Challenge": "B"
  },
  {
    "Category": "elephant",
    "Challenge": "B"
  },
  {
    "Category": "envelope",
    "Challenge": "A,C"
  },
  {
    "Category": "eraser",
    "Challenge": "A"
  },
  {
    "Category": "eye",
    "Challenge": "A"
  },
  {
    "Category": "eyeglasses",
    "Challenge": "A,C"
  },
  {
    "Category": "face",
    "Challenge": "A,C"
  },
  {
    "Category": "fan",
    "Challenge": "A,B,C"
  },
  {
    "Category": "feather",
    "Challenge": "A"
  },
  {
    "Category": "fence",
    "Challenge": "A,C"
  },
  {
    "Category": "finger",
    "Challenge": "A"
  },
  {
    "Category": "fire hydrant",
    "Challenge": "A,C"
  },
  {
    "Category": "fireplace",
    "Challenge": "A"
  },
  {
    "Category": "firetruck",
    "Challenge": "B"
  },
  {
    "Category": "fish",
    "Challenge": "A,B"
  },
  {
    "Category": "flamingo",
    "Challenge": "B"
  },
  {
    "Category": "flashlight",
    "Challenge": "B,C"
  },
  {
    "Category": "flip flops",
    "Challenge": "B"
  },
  {
    "Category": "floor lamp",
    "Challenge": "A,C"
  },
  {
    "Category": "flower",
    "Challenge": "A,C"
  },
  {
    "Category": "flying saucer",
    "Challenge": "A,C"
  },
  {
    "Category": "foot",
    "Challenge": "A,B"
  },
  {
    "Category": "fork",
    "Challenge": "A,C"
  },
  {
    "Category": "frog",
    "Challenge": "B"
  },
  {
    "Category": "frying pan",
    "Challenge": "A,C"
  },
  {
    "Category": "garden",
    "Challenge": "B"
  },
  {
    "Category": "garden hose",
    "Challenge": "B"
  },
  {
    "Category": "giraffe",
    "Challenge": "B"
  },
  {
    "Category": "goatee",
    "Challenge": "B"
  },
  {
    "Category": "golf club",
    "Challenge": "B"
  },
  {
    "Category": "grapes",
    "Challenge": "A,C"
  },
  {
    "Category": "grass",
    "Challenge": "A,C"
  },
  {
    "Category": "guitar",
    "Challenge": "A,B"
  },
  {
    "Category": "hamburger",
    "Challenge": "B"
  },
  {
    "Category": "hammer",
    "Challenge": "C"
  },
  {
    "Category": "hand",
    "Challenge": "A"
  },
  {
    "Category": "harp",
    "Challenge": "A,B"
  },
  {
    "Category": "hat",
    "Challenge": "A,C"
  },
  {
    "Category": "headphones",
    "Challenge": "A,C"
  },
  {
    "Category": "hedgehog",
    "Challenge": "B,C"
  },
  {
    "Category": "helicopter",
    "Challenge": "B"
  },
  {
    "Category": "helmet",
    "Challenge": "A"
  },
  {
    "Category": "hexagon",
    "Challenge": "A"
  },
  {
    "Category": "hockey puck",
    "Challenge": "B"
  },
  {
    "Category": "hockey stick",
    "Challenge": "A,C"
  },
  {
    "Category": "horse",
    "Challenge": "B"
  },
  {
    "Category": "hospital",
    "Challenge": "A,B"
  },
  {
    "Category": "hot air balloon",
    "Challenge": "A,C"
  },
  {
    "Category": "hot dog",
    "Challenge": "B"
  },
  {
    "Category": "hot tub",
    "Challenge": "B"
  },
  {
    "Category": "hourglass",
    "Challenge": "A,C"
  },
  {
    "Category": "house",
    "Challenge": "A,C"
  },
  {
    "Category": "house plant",
    "Challenge": "A,B,C"
  },
  {
    "Category": "hurricane",
    "Challenge": "A"
  },
  {
    "Category": "ice cream",
    "Challenge": "A,C"
  },
  {
    "Category": "jacket",
    "Challenge": "B"
  },
  {
    "Category": "jail",
    "Challenge": "A,C"
  },
  {
    "Category": "kangaroo",
    "Challenge": "B"
  },
  {
    "Category": "key",
    "Challenge": "B"
  },
  {
    "Category": "keyboard",
    "Challenge": "B"
  },
  {
    "Category": "knee",
    "Challenge": "B"
  },
  {
    "Category": "knife",
    "Challenge": "A,C"
  },
  {
    "Category": "ladder",
    "Challenge": "A,C"
  },
  {
    "Category": "lantern",
    "Challenge": "A,C"
  },
  {
    "Category": "laptop",
    "Challenge": "B"
  },
  {
    "Category": "leaf",
    "Challenge": "A"
  },
  {
    "Category": "leg",
    "Challenge": "A"
  },
  {
    "Category": "light bulb",
    "Challenge": "A"
  },
  {
    "Category": "lighter",
    "Challenge": "A"
  },
  {
    "Category": "lighthouse",
    "Challenge": "B"
  },
  {
    "Category": "lightning",
    "Challenge": "A"
  },
  {
    "Category": "line",
    "Challenge": ""
  },
  {
    "Category": "lion",
    "Challenge": "B"
  },
  {
    "Category": "lipstick",
    "Challenge": "B"
  },
  {
    "Category": "lobster",
    "Challenge": "B"
  },
  {
    "Category": "lollipop",
    "Challenge": "A,C"
  },
  {
    "Category": "mailbox",
    "Challenge": "A,C"
  },
  {
    "Category": "map",
    "Challenge": "A,C"
  },
  {
    "Category": "marker",
    "Challenge": "A,C"
  },
  {
    "Category": "matches",
    "Challenge": "A,B,C"
  },
  {
    "Category": "megaphone",
    "Challenge": "B"
  },
  {
    "Category": "mermaid",
    "Challenge": "B"
  },
  {
    "Category": "microphone",
    "Challenge": "A,C"
  },
  {
    "Category": "microwave",
    "Challenge": "C"
  },
  {
    "Category": "monkey",
    "Challenge": "B"
  },
  {
    "Category": "moon",
    "Challenge": ""
  },
  {
    "Category": "mosquito",
    "Challenge": "B"
  },
  {
    "Category": "motorbike",
    "Challenge": "B"
  },
  {
    "Category": "mountain",
    "Challenge": "A"
  },
  {
    "Category": "mouse",
    "Challenge": "B"
  },
  {
    "Category": "moustache",
    "Challenge": "A"
  },
  {
    "Category": "mouth",
    "Challenge": "A"
  },
  {
    "Category": "mug",
    "Challenge": "A,C"
  },
  {
    "Category": "mushroom",
    "Challenge": "A,C"
  },
  {
    "Category": "nail",
    "Challenge": "B"
  },
  {
    "Category": "necklace",
    "Challenge": "A,C"
  },
  {
    "Category": "nose",
    "Challenge": "A"
  },
  {
    "Category": "ocean",
    "Challenge": ""
  },
  {
    "Category": "octagon",
    "Challenge": "A"
  },
  {
    "Category": "octopus",
    "Challenge": "B,C"
  },
  {
    "Category": "onion",
    "Challenge": ""
  },
  {
    "Category": "oven",
    "Challenge": "C"
  },
  {
    "Category": "owl",
    "Challenge": "B"
  },
  {
    "Category": "paintbrush",
    "Challenge": "A.B"
  },
  {
    "Category": "paint can",
    "Challenge": "A,C"
  },
  {
    "Category": "palm tree",
    "Challenge": "A"
  },
  {
    "Category": "panda",
    "Challenge": "B"
  },
  {
    "Category": "pants",
    "Challenge": "A,B,C"
  },
  {
    "Category": "paper clip",
    "Challenge": "A"
  },
  {
    "Category": "parachute",
    "Challenge": "A,B,C"
  },
  {
    "Category": "parrot",
    "Challenge": "B"
  },
  {
    "Category": "passport",
    "Challenge": "A,B,C"
  },
  {
    "Category": "peanut",
    "Challenge": "A,B"
  },
  {
    "Category": "pear",
    "Challenge": "A,B"
  },
  {
    "Category": "peas",
    "Challenge": "A,B"
  },
  {
    "Category": "pencil",
    "Challenge": "A,C"
  },
  {
    "Category": "penguin",
    "Challenge": "B"
  },
  {
    "Category": "piano",
    "Challenge": "B"
  },
  {
    "Category": "pickup truck",
    "Challenge": "B"
  },
  {
    "Category": "picture frame",
    "Challenge": "A,B,C"
  },
  {
    "Category": "pig",
    "Challenge": "B"
  },
  {
    "Category": "pillow",
    "Challenge": "A,B,C"
  },
  {
    "Category": "pineapple",
    "Challenge": "A,B,C"
  },
  {
    "Category": "pizza",
    "Challenge": "A,B,C"
  },
  {
    "Category": "pliers",
    "Challenge": "B"
  },
  {
    "Category": "police car",
    "Challenge": "B"
  },
  {
    "Category": "pond",
    "Challenge": "A,B,C"
  },
  {
    "Category": "pool",
    "Challenge": "A,B,C"
  },
  {
    "Category": "popsicle",
    "Challenge": "A,B,C"
  },
  {
    "Category": "postcard",
    "Challenge": "A,B,C"
  },
  {
    "Category": "potato",
    "Challenge": "A,B,C"
  },
  {
    "Category": "power outlet",
    "Challenge": "A,C"
  },
  {
    "Category": "purse",
    "Challenge": "A,B,C"
  },
  {
    "Category": "rabbit",
    "Challenge": "B"
  },
  {
    "Category": "raccoon",
    "Challenge": "B"
  },
  {
    "Category": "radio",
    "Challenge": "B,C"
  },
  {
    "Category": "rain",
    "Challenge": "A,B"
  },
  {
    "Category": "rainbow",
    "Challenge": "A,B"
  },
  {
    "Category": "rake",
    "Challenge": "A,B,C"
  },
  {
    "Category": "remote control",
    "Challenge": "A,B,C"
  },
  {
    "Category": "rhinoceros",
    "Challenge": "B"
  },
  {
    "Category": "rifle",
    "Challenge": "B"
  },
  {
    "Category": "river",
    "Challenge": "A,B,C"
  },
  {
    "Category": "roller coaster",
    "Challenge": "A,B"
  },
  {
    "Category": "rollerskates",
    "Challenge": "A,B"
  },
  {
    "Category": "sailboat",
    "Challenge": "B,C"
  },
  {
    "Category": "sandwich",
    "Challenge": "B"
  },
  {
    "Category": "saw",
    "Challenge": "A,B"
  },
  {
    "Category": "saxophone",
    "Challenge": "A,B"
  },
  {
    "Category": "school bus",
    "Challenge": "A,B"
  },
  {
    "Category": "scissors",
    "Challenge": "B"
  },
  {
    "Category": "scorpion",
    "Challenge": "B"
  },
  {
    "Category": "screwdriver",
    "Challenge": "A,B"
  },
  {
    "Category": "sea turtle",
    "Challenge": "B"
  },
  {
    "Category": "see saw",
    "Challenge": "A,B"
  },
  {
    "Category": "shark",
    "Challenge": "B"
  },
  {
    "Category": "sheep",
    "Challenge": "B"
  },
  {
    "Category": "shoe",
    "Challenge": "A,B"
  },
  {
    "Category": "shorts",
    "Challenge": "A,B,C"
  },
  {
    "Category": "shovel",
    "Challenge": "A,B,C"
  },
  {
    "Category": "sink",
    "Challenge": "A,B"
  },
  {
    "Category": "skateboard",
    "Challenge": "B,C"
  },
  {
    "Category": "skull",
    "Challenge": "B"
  },
  {
    "Category": "skyscraper",
    "Challenge": "A,B,C"
  },
  {
    "Category": "sleeping bag",
    "Challenge": "A,B"
  },
  {
    "Category": "smiley face",
    "Challenge": "A"
  },
  {
    "Category": "snail",
    "Challenge": "B"
  },
  {
    "Category": "snake",
    "Challenge": "B"
  },
  {
    "Category": "snorkel",
    "Challenge": "B"
  },
  {
    "Category": "snowflake",
    "Challenge": "A,B"
  },
  {
    "Category": "snowman",
    "Challenge": "A,B,C"
  },
  {
    "Category": "soccer ball",
    "Challenge": "A"
  },
  {
    "Category": "sock",
    "Challenge": "A"
  },
  {
    "Category": "speedboat",
    "Challenge": "B"
  },
  {
    "Category": "spider",
    "Challenge": "A,B"
  },
  {
    "Category": "spoon",
    "Challenge": "C"
  },
  {
    "Category": "spreadsheet",
    "Challenge": "A,C"
  },
  {
    "Category": "square",
    "Challenge": ""
  },
  {
    "Category": "squiggle",
    "Challenge": "A,C"
  },
  {
    "Category": "squirrel",
    "Challenge": "B"
  },
  {
    "Category": "stairs",
    "Challenge": "A"
  },
  {
    "Category": "star",
    "Challenge": "A"
  },
  {
    "Category": "steak",
    "Challenge": "B"
  },
  {
    "Category": "stereo",
    "Challenge": "B,C"
  },
  {
    "Category": "stethoscope",
    "Challenge": "B,C"
  },
  {
    "Category": "stitches",
    "Challenge": "A,C"
  },
  {
    "Category": "stop sign",
    "Challenge": "A"
  },
  {
    "Category": "stove",
    "Challenge": "B,C"
  },
  {
    "Category": "strawberry",
    "Challenge": "A"
  },
  {
    "Category": "streetlight",
    "Challenge": "A"
  },
  {
    "Category": "string bean",
    "Challenge": "B"
  },
  {
    "Category": "submarine",
    "Challenge": "B"
  },
  {
    "Category": "suitcase",
    "Challenge": "A,C"
  },
  {
    "Category": "sun",
    "Challenge": "A,C"
  },
  {
    "Category": "swan",
    "Challenge": "B"
  },
  {
    "Category": "sweater",
    "Challenge": "B"
  },
  {
    "Category": "swing set",
    "Challenge": "B"
  },
  {
    "Category": "sword",
    "Challenge": "A,C"
  },
  {
    "Category": "syringe",
    "Challenge": "C"
  },
  {
    "Category": "table",
    "Challenge": "A,C"
  },
  {
    "Category": "teapot",
    "Challenge": "B"
  },
  {
    "Category": "teddy-bear",
    "Challenge": "B"
  },
  {
    "Category": "telephone",
    "Challenge": "B"
  },
  {
    "Category": "television",
    "Challenge": "C"
  },
  {
    "Category": "tennis racquet",
    "Challenge": "A,C"
  },
  {
    "Category": "tent",
    "Challenge": "A,C"
  },
  {
    "Category": "The Eiffel Tower",
    "Challenge": "A,C"
  },
  {
    "Category": "The Great Wall of China",
    "Challenge": "A"
  },
  {
    "Category": "The Mona Lisa",
    "Challenge": "B"
  },
  {
    "Category": "tiger",
    "Challenge": "B"
  },
  {
    "Category": "toaster",
    "Challenge": "B"
  },
  {
    "Category": "toe",
    "Challenge": "B"
  },
  {
    "Category": "toilet",
    "Challenge": "B"
  },
  {
    "Category": "tooth",
    "Challenge": "B"
  },
  {
    "Category": "toothbrush",
    "Challenge": "A,C"
  },
  {
    "Category": "toothpaste",
    "Challenge": "B"
  },
  {
    "Category": "tornado",
    "Challenge": "A"
  },
  {
    "Category": "tractor",
    "Challenge": "B"
  },
  {
    "Category": "traffic light",
    "Challenge": "B"
  },
  {
    "Category": "train",
    "Challenge": "B"
  },
  {
    "Category": "tree",
    "Challenge": "A"
  },
  {
    "Category": "triangle",
    "Challenge": ""
  },
  {
    "Category": "trombone",
    "Challenge": "B"
  },
  {
    "Category": "truck",
    "Challenge": "B"
  },
  {
    "Category": "trumpet",
    "Challenge": "B"
  },
  {
    "Category": "t-shirt",
    "Challenge": "B"
  },
  {
    "Category": "umbrella",
    "Challenge": "A"
  },
  {
    "Category": "underwear",
    "Challenge": "A"
  },
  {
    "Category": "van",
    "Challenge": "B,C"
  },
  {
    "Category": "vase",
    "Challenge": "A"
  },
  {
    "Category": "violin",
    "Challenge": "B"
  },
  {
    "Category": "washing machine",
    "Challenge": "B"
  },
  {
    "Category": "watermelon",
    "Challenge": "A,C"
  },
  {
    "Category": "waterslide",
    "Challenge": "B"
  },
  {
    "Category": "whale",
    "Challenge": "A,B"
  },
  {
    "Category": "wheel",
    "Challenge": ""
  },
  {
    "Category": "windmill",
    "Challenge": "B"
  },
  {
    "Category": "wine bottle",
    "Challenge": "A,C"
  },
  {
    "Category": "wine glass",
    "Challenge": "B"
  },
  {
    "Category": "wristwatch",
    "Challenge": "B"
  },
  {
    "Category": "yoga",
    "Challenge": "B"
  },
  {
    "Category": "zebra",
    "Challenge": "B"
  },
  {
    "Category": "zigzag",
    "Challenge": ""
  }
];