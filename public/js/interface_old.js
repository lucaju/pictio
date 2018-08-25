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

//list of colours
var colours = ["is-white",
               "is-dark",
              //  "is-primary",
               "is-info",
               "is-warning",
               "is-danger",
               "is-success"]; 


//list of voices
var voices = ["UK English Female",
              "UK English Male",
              "US English Female",
              "UK English Female",
              "UK English Male",
              "US English Female"];

/// ---- Documetn Ready
$(document).ready(function(){

  //Choose a random colour for the interface
  // classColor = colours[Math.floor(Math.random() * colours.length)];
  // $("#main").addClass(classColor);

  //push the first view
  showInfoView();
});

// --- VIEW 1: Show first page: Information View
function showInfoView() {
  
  $("#view").empty();

  //main container
  var view = $('<div id="intro" class="container has-text-centered">').appendTo($("#view"));

  //content
  var htmlContent = '<h1 class="title is-1 is-spaced">Pict • io</h1>';
  htmlContent += '<h2 class="subtitle is-4 is-spaced">An inclusive mini-game for <strong>humans</strong> and <strong>quasi-humans!</strong></h2>';
  htmlContent += '<br/>';

  htmlContent += '<div class="content has-text-centered">';
  htmlContent +=   '<a id="go-play" class="button is-large is-Light">Let\'s Play</a>';
  htmlContent +=   '<br/>';
  htmlContent +=   '<br/>';
  htmlContent +=   '<a id="show-instructions" class="button is-small is-Light is-text">How to play</a>';
  htmlContent += '</div>';
  
  htmlContent += '<div id="instructions"></div>';

  $(htmlContent).appendTo(view);

  //buttons
  $('#show-instructions').click(function() {
    showInstructions(true);
  });

  $('#go-play').click(function() {
    showColorChoice();
  });

} 

// --- VIEW 1.1: Show instructions: how to play
function showInstructions() {

  //remove instruction if it was called before
  $('#show-instructions').remove();

  //main container
  var instructions = $('<div id="intro" class="section">').appendTo($("#instructions"));

  //container
  var htmlContent = '<div class="content has-text-left">';
  htmlContent +=   '<div class="columns">';
  htmlContent +=     '<div class="column is-8 is-offset-2 box">';

  htmlContent +=       '<div class="has-text-centered">';
  htmlContent +=         "<h2 class='title is-3 '>How to Play</h2>";
  htmlContent +=         '<br/>';
  htmlContent +=       '</div>';

  htmlContent +=       '<p>This game provides humans and machine with a common problem to solve as teams, where players must make themselves understood through drawings.</p>';
  htmlContent +=       '<p><strong>Participants:</strong> 2 teams composed of 2 humans and 1 tablet.</p>';
  htmlContent +=       '<p><strong>Contents:</strong> 1 board, 1 dice, 1 frame and 2 pawns.</p>';
  htmlContent +=       "<p><strong>The goal of the game:</strong> Make the team's pawn the first to go all the way through the board.</p>";
  htmlContent +=       '<br/>';
  htmlContent +=       "<p>1. Each team chooses a pawn and places it at the beginning of the board.</p>";
  htmlContent +=       "<p>2. Each team selects one person to be the first drawer. The team players alternate the drawer at each round.</p>";
  htmlContent +=       "<p>3.	The first drawers of each team throw the dice and advance into the board, which provides them with the first challenge. There are three categories of challenges:";
  htmlContent +=       "<ul><li>A. Drawing on the Wall</li>";
  htmlContent +=       "<li>B. Blind Drawing with Left/ Right Hand</li>";
  htmlContent +=       "<li>C. Verbal Description</li></ul></p>";
  htmlContent +=       "<p>4. The drawers can not use other means of communication rather than those indicated for each challenge.</p>";
  htmlContent +=       "<p>5. If the team is able to complete the challenge, they can throw the dice and play one more time. After that, it is the other team’s turn to throw the dice.</p>";
  htmlContent +=       "<p>6. The game continues this way until one of the pawns completes the entire course.</p>";
  htmlContent +=     '</div>';
  htmlContent +=   '</div>';
  htmlContent += '</div>';

  $(htmlContent).appendTo(instructions);
        
}

// --- VIEW 2: Starting the game: choose you colour
function showColorChoice() {

  changeColour(colours[0]); //default
  changeVoice(playerColor); //default

  $("#view").empty();

  //main container
  var view = $('<div id="color-choice" class="container has-text-centered">').appendTo($("#view"));

  //content
  var htmlContent = '<h1 class="title is-1 is-spaced">Choose your color</h1>';
  htmlContent += '<br/>';
  htmlContent += '<p class="field"></p>';
  htmlContent += '<br/>';
  htmlContent += '<br/>';
  htmlContent += '<a id="done" class="button is-large is-Light">Done!</a>';

  $(htmlContent).appendTo(view);

  //buttons
  $.each(colours,function(i,colour) {

    //a button for each color
    var bt = $('<a class="button is-large ' + colour +'"><span class="icon is-small"><i class="fab fa-pushed "></i></span></a>').appendTo($('.field'));

    bt.click(function() {
      changeColour(colour);
      changeVoice(playerColor);
    });

  });

  //button
  $('#done').click(function() {
    showChallenges();
  });

}

// --- VIEW 3: Show challenges
function showChallenges(challenge) {

  $("#view").empty();

  //main container
  var view = $('<div id="intro" class="container has-text-centered">').appendTo($("#view"));

  //content
  var htmlContent = '<h1 class="title is-1 is-spaced">Pick a challenge</h1>';
  htmlContent += '<br/>';
  htmlContent += '<br/>';
  htmlContent += '<div class="columns"></div>';

  $(htmlContent).appendTo(view);

  // get challenges
  $.each(challenges,function(i,challenge) {

    //create a column to each 
    var column = $('<div class="column is-one-third">').appendTo('.columns');
    // var card = '<div class="column is-one-third">';


    //create a card to each one
    var card = '<div id='+ challenge.short +' class="card">';
    card +=   '<div class="card-image">';
    // card +=    '<figure class="image is-4by3">';
    card +=     '<img src="assets/'+challenge.short+'.png">';
    // card +=      '</figure>';
    card +=   '</div>';

    card +=   '<div class="card-content">';
    card +=     '<div class="media">';
    card +=       '<div class="media-content">';
    card +=         '<div class="content is-large">';
    card +=           '<p>'+challenge.name+'</p>';
    card +=         '</div>';
    card +=       '</div>';
    card +=     '<div class="media-right">';
    card +=       '<a class="button is-large"><span class="icon is-small"><i class="fas fa-angle-right"></i></span></a>';
    card +=     '</div>';
    card +=   '</div>';

    card +=  '</div>';
    card += '</div>';

    $(card).appendTo(column);

    //change mouse cursors
    $('#'+challenge.short).css('cursor', 'pointer');

    //button controll
    $('#'+challenge.short).click(function() {
      showChallenge(challenge);
    });

  });

}

// --- VIEW 4: SHow Challenge
function showChallenge(challenge) {

  var tagColor = classColor;
  if (classColor == "is-white") tagColor = "is-info";

  $("#view").empty();

  currentChallenge = challenge; //save current challenge

  //main container
  var view = $('<div id="'+challenge.short+'" class="container has-text-centered">').appendTo($("#view"));

  var columns = $('<div class="columns">').appendTo(view);
  var column = $('<div class="column is-three-fifths is-offset-one-fifth">').appendTo(columns);

  //content
  var htmlContent = '<h1 class="title is-2 is-spaced">'+challenge.name+'</h1>';
  htmlContent +=  '<br/>';
  htmlContent +=   '<div class="content has-text-left">';
  htmlContent +=    challenge.description;
  htmlContent +=  '</div>';

  $(htmlContent).appendTo(column);

  //pick a draw category
  var filteredCatetories = filterCategories(challenge.code);
  var randomDraw = filteredCatetories[Math.floor(Math.random() * filteredCatetories.length)];
  currentDrawChallenge = randomDraw.Category; // save current draw category
  
  //add more content
  htmlContent = '<br/><div class="box">';
  htmlContent +=   '<div class="media-content">';
  htmlContent +=     '<div class="content has-text-centered">';
  htmlContent +=       '<p class="is-size-5 has-text-weight-semibold">Here is what you have to draw</p>';
  htmlContent +=       '<p class="is-size-5 has-text-weight-semibold"><span class="tag is-large '+ tagColor +'">'+currentDrawChallenge+'</span></p>';
  htmlContent +=       '<p class="is-size-5 has-text-weight-semibold">Time: '+challenge.time+'s</p>';
  htmlContent +=     '</div>';
  htmlContent +=   '</div>';
  htmlContent += '</div>';
  htmlContent += '<br/>';

  $(htmlContent).appendTo(column);

 //buttons
  var play = $('<a class="button '+classColor+' is-inverted is-outlined is-large">I am ready</a>').appendTo(view);
  play.click(function() {
    showGame(challenge);
  });

  $('<br/><br/>').appendTo(view);

  var back = $('<a class="button is-text '+classColor+' is-medium">Back</a>').appendTo(view);
  back.click(function() {
    showChallenges();
  });

}

// --- VIEW 5: SHow Game
function showGame(challenge) {

  firstSpeak = true; //reset first speak

  $("#view").empty();

  //container
  var view = $('<div id="game" class="container has-text-centered">').appendTo($("#view"));

  //content
  var htmlContent = '<div class="columns">';
  htmlContent +=     '<div class="column">';
  htmlContent +=         '<a id="back" class="button is-small is-text hide">back</a>';
  htmlContent +=         '<a id="start-drawing" class="button is-medium is-Light">Start</a>';
  htmlContent +=     '</div>';
  htmlContent +=     '<div class="column">';
  htmlContent +=       '<div id="timer"><span class="tag is-warning is-large">'+ challenge.time +' seconds</span></div>';
  htmlContent +=     '</div>';
  htmlContent +=     '<div class="column">';
  htmlContent +=       '<a id="clear-drawing" class="button is-medium is-Light">Clear</a>';
  htmlContent +=     '</div>';
  htmlContent +=   '</div>';
  htmlContent +=   '<div class="box is-paddingless">';
  htmlContent +=     '<canvas id="canvas" resize></canvas>'; //drawing area 
  htmlContent +=   '</div>';
  htmlContent +=   '<div><h3 id="guess" class="title is-3">...</h3></div>';

  $(htmlContent).appendTo(view);

  //buttons
  $('#start-drawing').click(function() {
    startDrawing(challenge);
    $('#back').removeClass('hide');
  });

  $('#clear-drawing').click(function() {
    $("#guess")[0].innerHTML = "...";
    clearDrawing(challenge);
  });

  $('#back').click(function() {
    timer.stop();
    guessAttemps = [];
    showChallenges();
  });

}

// --- VIEW 6: Game Lost
function gameLost(challenge) { 

  $("#view").empty();
  //container
  var view = $('<div id="postGameLost" class="container has-text-centered">').appendTo($("#view"));

  var columns = $('<div class="columns">').appendTo(view);
  var column = $('<div class="column is-three-fifths is-offset-one-fifth">').appendTo(columns);

  //content
  var htmlContent = '<h1 class="title is-4 is-spaced">'+currentChallenge.name+'</h1>';
  htmlContent += '<br/><br/>';
  htmlContent += "<h1 class='title is-2 is-spaced'>Time's up</h1>";
  htmlContent += "<h1 class='title is-2 is-spaced'>We got all wrong!</h1>";
  htmlContent += '<br/><br/>';

  htmlContent += '<div class="box">';
  htmlContent +=   '<div class="media-content">';
  htmlContent +=     '<div class="content has-text-centered">';
  htmlContent +=       '<p class="is-size-5 has-text-weight-semibold">You were supposed to draw</p>';
  htmlContent +=       '<p class="is-size-5 has-text-weight-semibold"><span class="tag is-large '+ classColor +'">'+currentDrawChallenge+'</span></p>';
  htmlContent +=     '</div>';
  htmlContent +=   '</div>';
  htmlContent += '</div>';

  htmlContent += '<br/><br/>';
  htmlContent += '<div class="content">';
  htmlContent +=   '<p class="is-size-4">My best guesses were</p>';
  htmlContent += '<div class="tags has-text-centered"></div>';
  htmlContent += '<br/><br/>';
  htmlContent += '</div>';

  $(htmlContent).appendTo(column);

  //speak
  var speak = "We got all wrong! You were supposed to draw " + currentDrawChallenge +"";
  responsiveVoice.speak(speak, voice);

  //button
  var back = $('<a class="button is-text '+classColor+' is-medium">Back</a>').appendTo(column);
  back.click(function() {
    showChallenges();
  });

  // get limited list of best guess
  var list = getBestGuesses(guessAttemps);

  var guessList = view.find(".tags"); //DOM
  $.each(list, function(i,guess) {
    guessList.append('<span class="tag">'+guess+'</span>');
  });

}

// --- VIEW 7: Game Win
function gameWin() { 

  timer.stop(); //stop timer

  $("#view").empty();

  //container
  var view = $('<div id="postGameLost" class="container has-text-centered">').appendTo($("#view"));

  var columns = $('<div class="columns">').appendTo(view);
  var column = $('<div class="column is-three-fifths is-offset-one-fifth">').appendTo(columns);

  //content
  var htmlContent = '<h1 class="title is-4 is-spaced">'+currentChallenge.name+'</h1>';
  htmlContent += '<br/><br/>';
  htmlContent += "<h1 class='title is-2 is-spaced'>We did it!</h1>";
  htmlContent += '<br/><br/>';

  htmlContent += '<div class="box">';
  htmlContent +=   '<div class="media-content">';
  htmlContent +=     '<div class="content has-text-centered">';
  htmlContent +=       '<p class="is-size-4 has-text-weight-semibold"><span class="tag is-large '+ classColor +'">'+currentDrawChallenge+'</span></p>';
  htmlContent +=     '</div>';
  htmlContent +=   '</div>';
  htmlContent += '</div>';

  htmlContent += '<br/><br/>';
  htmlContent += '<div class="content">';
  htmlContent +=   '<p class="is-size-4">My best guesses were</p>';
  htmlContent += '<div class="tags has-text-centered"></div>';
  htmlContent += '<br/><br/>';
  htmlContent += '</div>';

  $(htmlContent).appendTo(column);

    //speak
    var speak = "We did it! It is " + currentDrawChallenge;
    responsiveVoice.speak(speak, voice);

  //buttons
  var back = $('<a class="button is-text '+classColor+' is-medium">Back</a>').appendTo(column);
  back.click(function() {
    showChallenges();
  });

  // get limited list of best guess
  var list = getBestGuesses(guessAttemps);

  var guessList = view.find(".tags"); //DOM
  $.each(list, function(i,guess) {
    guessList.append('<span class="tag">'+guess+'</span>');
  });

}

// --- function to change interface colour and assing it to the player
function changeColour(colour) {
  if(classColor) $("#main").removeClass(classColor); // remove previous colours

  playerColor = colour;
  classColor = colour;
  $("#main").addClass(classColor);
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

  $('#timer .tag').html(timer.getTimeValues().toString());

  timer.addEventListener('secondsUpdated', function (e) {
      $('#timer .tag').html(timer.getTimeValues().toString());
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

  var verbal = "I see " + attemp;
  var speak;

  if (firstSpeak == true) {
    speak = "I see " + attemp;
    firstSpeak = false;
  } else {
    speak = attemp;
  }

  $("#guess")[0].innerHTML = verbal;

  if(!responsiveVoice.isPlaying()) {
    responsiveVoice.speak(speak, voice);
  }

}

////-- if  draw is right
function drawIsRight(attemp) {

  magentIsOn = false;

  var verbal = "I know! I know! It is " + attemp;
  var speak = "I know! I know! It is " + attemp;

  $("#guess")[0].innerHTML = verbal;

  responsiveVoice.speak(speak, voice);

  setTimeout(function() {
      gameWin();
    }, 3000);

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