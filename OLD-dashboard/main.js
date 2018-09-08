'use strict';

(function() {

  var socket = io();
  var canvas = document.getElementsByClassName('whiteboard')[0];
  var colors = document.getElementsByClassName('color');
  var context = canvas.getContext('2d');

  var inverseClassToggle = false;

  var classElement; 
  var classColor; 
  var classBlend; 

  var currentChallenge;           //current challenge
  var currentDrawChallenge;       //current draw category

  var current = {
    color: 'black'
  };
  var drawing = false;

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

  for (var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
  }

  socket.on('interface', onInterfaceEvent);
  socket.on('drawing', onDrawingEvent);
  socket.on('guess', onGuessEvent);

  window.addEventListener('resize', onResize, false);
  onResize();


  function drawLine(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;

    socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }

  function onMouseDown(e){
    drawing = true;
    current.x = e.clientX;
    current.y = e.clientY;
  }

  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
  }

  function onMouseMove(e){
    if (!drawing) { return; }
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
    current.x = e.clientX;
    current.y = e.clientY;
  }

  function onColorUpdate(e){
    current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  function onDrawingEvent(data){
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);


    $('#guess').html(data.guess);
  }





  function onInterfaceEvent(data){
    if(data.view == "choose-color") {
      colorChoice(data);
    } else if(data.view == "choose-chalenge") {
      ChallengeChoice(data);
    } else if(data.view == "challenge-instruction") {
      challengeInfo(data);
    } else if(data.view == "show-game") {
      showGame(data);
    } else if(data.view == "game-lost") {
      gameLost(data);
    } else if(data.view == "game-win") {
      gameWin(data);
    }

    
  }

  function gameLost(data) {

    clearCanvas();
    $("#game").addClass("uk-hidden");
    
    var html = `
    <div class="${inverseClass()}">
      <h2 class="uk-h2">Time's up!</h2>
      <h1 class="uk-heading-primary">You got all wrong!</h1>
      <h4 class="uk-h4 uk-margin-remove-bottom">You were supposed to draw</h4>
    </div>


    <div uk-grid>
      <div class="uk-width-expand"></div>
        <div class="uk-card uk-card-default uk-width-2-3 uk-margin-small-left uk-padding-remove-left uk-box-shadow-large uk-border-rounded">
        <div id="${currentDrawChallenge}" class="uk-card-body uk-background-primary uk-box-shadow-large uk-light">
          <h2 class="uk-h2">${currentDrawChallenge}</h2>
        </div>
      </div>
      <div class="uk-width-expand"></div>
    </div>

    <div class="uk-margin-large-top ${inverseClass()}">
      <div uk-grid>
        <div class="uk-width-expand"></div>
        <div class="uk-width-2-3">
          <h3 class="uk-h3">Best guesses were</h3>
          <div class="tags"></div>
        </div>
        <div class="uk-width-expand"></div>
      </div>
    </div>

  `;

    $("#status").append(html);

    var guessList = $(".tags"); //DOM
    $.each(data.bestGuesses, function(i,guess) {
      guessList.append(`<span class="uk-label uk-label-primary">${guess}</span>\n`);
    });

  }

  function gameWin(data) {

    clearCanvas();
    $("#game").addClass("uk-hidden");
    
    var html = `
    <div class="${inverseClass()}">
      <h1 class="uk-heading-primary">You did it!</h1>
    </div>


    <div uk-grid>
      <div class="uk-width-expand"></div>
        <div class="uk-card uk-card-default uk-width-2-3 uk-margin-small-left uk-padding-remove-left uk-box-shadow-large uk-border-rounded">
        <div id="${currentDrawChallenge}" class="uk-card-body uk-background-primary uk-box-shadow-large uk-light">
          <h2 class="uk-h2">${currentDrawChallenge}</h2>
        </div>
      </div>
      <div class="uk-width-expand"></div>
    </div>

    <div class="uk-margin-large-top ${inverseClass()}">
      <div uk-grid>
        <div class="uk-width-expand"></div>
        <div class="uk-width-2-3">
          <h3 class="uk-h3">Best guesses were</h3>
          <div class="tags"></div>
        </div>
        <div class="uk-width-expand"></div>
      </div>
    </div>

  `;

    $("#status").append(html);

    var guessList = $(".tags"); //DOM
    $.each(data.bestGuesses, function(i,guess) {
      guessList.append(`<span class="uk-label uk-label-primary">${guess}</span>\n`);
    });

  }




  function colorChoice(data) {
    $("#status").empty();
    $("#status").html('The team is choosing a colour');

    if(data.color) {
      changeColour(data.color);

      if (inverseClassToggle == true) {
        $('#intro').addClass('uk-light', {duration:500}); 
      } else {
        $('#intro').removeClass('uk-light', {duration:500}); 
      }
    }

  }

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

  function ChallengeChoice(data) {
    $("#status").empty();
    $("#status").html('The team is selecting a challenge');
    $("#status").append(`<div class="sk-folding-cube">
      <div class="sk-cube1 sk-cube"></div>
      <div class="sk-cube2 sk-cube"></div>
      <div class="sk-cube4 sk-cube"></div>
      <div class="sk-cube3 sk-cube"></div>
    </div>`);
  }

  function inverseClass() {

    if(inverseClassToggle) {
      return "uk-light";
    } else {
      return "uk-dark";
    }

  }

  function challengeInfo(data) {
    
    var challenge = data.challenge;
    currentChallenge = challenge; //save current challenge
    currentDrawChallenge = data.currentDrawChallenge;

    $("#status").empty();


    var html = `<div id="${challenge.short}">
                  <h2 id="title" class="uk-h2 ${inverseClass()}">${challenge.name}</h2>
                  <div class="${inverseClass()}">${challenge.description}</div>
                </div>`


    $("#status").append(html);
  }

  function showGame(data) {

    if(data.action == "initiate") {

      var challenge = data.challenge;

      $("#status").empty();

      $("#game").removeClass("uk-hidden");
      $("#game").addClass(inverseClass());

      $("#game-challenge-name").html(challenge.name);

      $("#number").html("...");
      $("#guess").html("...");


    } else  if(data.action == "timer") {

      $("#number").html(data.timer);
    }

  }
  

  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function onGuessEvent(data) {
    $("#guess").html(data.attemp);

    if(data.action == "clear") {
      clearCanvas();
    }
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

})();
