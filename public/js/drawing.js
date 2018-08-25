// Initialize Variables
var path, ink, scores;
var timerGoogle = 0, lastTimestamp = 0, lastTimestamp_check = 0;
var d_scores = {};

var magentIsOn = false;

var socket;

var prevPoints;

$(document).ready(function(){
  // socket = io();
});


// Install Paper.js
paper.install(window);

//--- Initialize...
function startMagenta() {

  initInk();              // Initialize Ink array ()
  paper.setup('canvas');  // Setup Paper #canvas

  var tool = new Tool();  // Inititalize Paper Tool

  // Paper Tool Mouse Down Event
  tool.onMouseDown = function(event) {

    if (magentIsOn == true) {
      // New Paper Path and Settings
      path = new Path();          
      path.strokeColor = 'black'; 
      path.strokeWidth = 2;//7;

      // Get Time [ms] for each Guess (needed for accurate Google AI Guessing)
      var thisTimestamp = event.event.timeStamp;
      if(timerGoogle === 0){
        timerGoogle = 1; 
        var timerGoogle = 0;
      }else{
        var timeDelta = thisTimestamp - lastTimestamp;
        var time = ink[2][ink[2].length-1] + timeDelta;
      }
    
      // Get XY point from event w/ time [ms] to update Ink Array
      updateInk(event.point, time);
      // Draw XY point to Paper Path
      path.add(event.point);

      prevPoints = event.point;
      
      // Reset Timestamps
      lastTimestamp = thisTimestamp;
    }

  };

  // Paper Tool Mouse Drag Event
  tool.onMouseDrag = function(event) {
    
    if (magentIsOn == true) {
      // Get Event Timestamp and Timestamp Delta
      var thisTimestamp = event.event.timeStamp ;
      var timeDelta = thisTimestamp - lastTimestamp;

      // Get new Time for Ink Array
      var time = ink[2][ink[2].length-1] + timeDelta;
      
      // Get XY point from event w/ time [ms] to update Ink Array
      updateInk(event.point, time);

      // Draw XY point to Paper Path
      path.add(event.point);
      
      // Reset Timestamps
      lastTimestamp = thisTimestamp;

      // Check Google AI Quickdraw every 250 m/s 
      if (thisTimestamp - lastTimestamp_check > 1000){
        checkQuickDraw();
        lastTimestamp_check = thisTimestamp;
      }

      var canvasSize = getCanvasDimensions();

      socket.emit('drawing', {
        x0: prevPoints.x /canvasSize.width,
        y0: prevPoints.y/canvasSize.height,
        x1: event.point.x/canvasSize.width,
        y1: event.point.y/canvasSize.height
      });

      prevPoints = event.point;

    }
  };

}

//--- Initialize Ink Array
function initInk() {
  ink = [[],[],[]];
}

//--- Update Ink Array w/ XY Point + Time
function updateInk(point, time) {
  ink[0].push(point.x);
  ink[1].push(point.y);
  ink[2].push(time);
}

//--- Clear Paper Drawing Canvas --/// only canvsas... interface is handled in interfaca.js
function clearDrawing() {

  // Remove Paper Path Layer
  paper.project.activeLayer.removeChildren();
  paper.view.draw();

  // Init Ink Array
  initInk();
  
  // Resert Variables
  timerGoogle = 0;
  d_scores = {};

}

//--- Get Paper Canvas Dimensions Width/Height
function getCanvasDimensions() {
  var w = document.getElementById('canvas').offsetWidth;
  var h = document.getElementById('canvas').offsetHeight;
  return {height: h, width: w};
}

//--- Check Quickdraw Google AI API
function checkQuickDraw() {

  // Get Paper Canvas Weight/Height
  var c_dims = getCanvasDimensions();

  // Set Base URL for Quickdraw Google AI API
  var url = 'https://inputtools.google.com/request?ime=handwriting&app=quickdraw&dbg=1&cs=1&oe=UTF-8';
  
  // Set HTTP Headers
  var headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  };

  // Init HTTP Request
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  Object.keys(headers).forEach(function(key,index) {
      xhr.setRequestHeader(key, headers[key]); 
  });

  // HTTP Request On Load
  xhr.onload = function() {
    if (xhr.status === 200) {
      res = xhr.responseText; // HTTP Response Text
      parseResponse(res);     // Parse Response
    } else if (xhr.status !== 200) {
      console.log('Request failed.  Returned status of ' + xhr.status);
    }
  };

  // Create New Data Payload for Quickdraw Google AI API
  var data = {
    "input_type":0,
    "requests":[
      {
        "language":"quickdraw",
        "writing_guide":{"width": c_dims.width, "height":c_dims.height},
        "ink": [ink]
      }
    ]
  };

  // Convert Data Payload to JSON String
  var request_data = JSON.stringify(data);

  // Send HTTP Request w/ Data Payload
  xhr.send(request_data);

}

// Parse Quickdraw Google AI API Response
function parseResponse(res){

  // Convert Response String to JSON
  var res_j = JSON.parse(res);

  // Extract Guess Score String from Response and Convert to JSON
  scores = JSON.parse(res_j[1][0][3].debug_info.match(/SCORESINKS: (.+) Combiner:/)[1]);

  // var activeScore = scores;
  var activeScore = filterGuess(scores);

  var attemp = activeScore[0][0];

  addToGuessAttemps(attemp);

  //----TEST AND GET BACK TO THE INTERFACE
  if(currentDrawChallenge != attemp) {
    drawIsWrong(attemp);
  } else {
    drawIsRight(attemp);
  }

}

///add atemot to a list
function addToGuessAttemps(newAttempt) {

  var repeat = false;

  for (var i=0; i<guessAttemps.length; i++) {
    if (guessAttemps[i] == newAttempt) {
      repeat = true;
    }
  }

  if (repeat == false) {
    guessAttemps.push(newAttempt);
  }

}

//--- filter guesses
function filterGuess(scores) {

  var currentGuesses = scores.slice();

  //if it is the first guess
  if (guessAttemps.length == 0) {
    return scores;
  }

  for (var i=0; i<guessAttemps.length; i++) {
    for (var j=0; j<currentGuesses.length; j++) {
      if (guessAttemps[i] == currentGuesses[j][0]) {
        currentGuesses.splice(j,1);
      }
    }
  }

  if(currentGuesses.length == 0) {
    currentGuesses = scores.slice();
  }

  return currentGuesses;

}