/*jshint esversion: 6 */

/*****
@author: Luciano Frizzera <lucaju@gmail.com>
*/

requirejs.config({
    //By default load any module IDs from node_modules/
    baseUrl: 'js/',
    paths: {
        "jquery": "lib/jquery.min",
        "jqueryUI": 'lib/jquery-ui.min',
        "uikit": "lib/uikit.min",
        "uikiticons": 'lib/uikit-icons.min',
        "easytimer": 'lib/easytimer.min',
        "paper": "lib/paper-full.min",
        "responsivevoice": "lib/responsivevoice",
        "artyom": "lib/artyom.window.min", //"artyom"
        "chroma": "lib/chroma.min"
        
    }
});


requirejs([
    'jquery',
    'jqueryUI',
    'uikit',
    'uikiticons',
    'easytimer',
    'paper',
    'responsivevoice',
    'artyom',
    'chroma',
    'interfaceView'
   ],
    function ($,
              jqueryUI,
              UIkit,
              icons,
              easytimer,
              paper,
              responsiveVoice,
              artyom,
              chroma,
              interfaceView) {

        icons(UIkit);

        const App = function() {

            //main variables
            this.interface = interfaceView;
            

            this.currentChallenge;           //current challenge
            this.currentDrawChallenge;       //current draw category
            this.guessAttemps = [];          //current list of guess attemps
            this.classColor;                 //Class colour (can be the same as playercolour) -> chanfe the interface color
            this.playerColor;                //color choose by the player
            this.voice;                      //voice, attached to the colour

            this.invertedColor;

            this.timer = new Timer();        //innitiate timer object
            this.firstSpeak = true;          //regulates is it is the first time the machine speak on each time that users play the challenge

            this.inverseClassToggle = false;

            this.classElement; 
            this.classBlend; 

            this.socket;

            this.attempNumber = 0;

            //list of colours
            this.colours = ["light",
                           "blue",
                           "dark",
                           "yellow"]; 


            //list of voices
            this.voices = ["UK English Female",
                           "UK English Male",
                           "US English Female",
                           "US English Male"];



            this.init = function() {

                this.interface.init();

                

                // changeColour(colours[0]); //default
                // playerColor = colours[0];
                // changeVoice(playerColor); //default
                
                // showInfoView();

              // showGame(challenges[0]);
              // showGame("wall");

              //socket.io
                $(document).ready(function(){
                    app.socket = io();
                  });
                
            };

        };

        this.app = new App();
        this.app.init();

    });