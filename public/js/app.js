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
        "chroma": "lib/chroma.min",
        "io":"/socket.io/socket.io",
        "i18next": "lib/i18next.min",
        "i18nextBackend": "lib/i18nextXHRBackend.min",
        "jqueryI18next": "lib/jquery-i18next.min"
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
    'io',
    'i18next',
    'i18nextBackend',
    'jqueryI18next',
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
              io,
              i18next,
              i18nextBackend,
              jqueryI18next,
              interfaceView) {


        /// MAIN SETTINGS

        icons(UIkit);


        /// APP

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

            this.i18next = i18next;

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

                console.log(this);

                

                

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


                app.i18next
                    .use(i18nextBackend)
                    .init({
                        debug: true,
                        lng: 'en',
                        fallbackLng: 'en',
                        backend: {
                            loadPath: 'locales/{{lng}}.json'
                        }
                    }, function(err, t) {

                        console.log(app.i18next);
                        
                        jqueryI18next.init(app.i18next, $);

                        // console.log(app.i18next.t("pt.translation.general"));

                        // jqueryI18next.init(app.i18next, $, {
                        //         tName: 't', // --> appends $.t = i18next.t
                        //         i18nName: 'i18n', // --> appends $.i18n = i18next
                        //         handleName: 'localize', // --> appends $(selector).localize(opts);
                        //         selectorAttr: 'data-i18n', // selector for translating elements
                        //         targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
                        //         optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
                        //         useOptionsAttr: false, // see optionsAttr
                        //         parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
                        //       });

                        app.interface.init();
                    });





                // this.i18next.init({
                //     lng: 'en', // evtl. use language-detector https://github.com/i18next/i18next-browser-languageDetector
                //     resources: { // evtl. load via xhr https://github.com/i18next/i18next-xhr-backend
                //         en: {
                //             translation: {
                //                 intro: {
                //                     subtitle: 'An inclusive mini-game for <strong>humans</strong> and <strong>quasi-humans!</strong>',
                //                     PlayBT: "Let's Play",
                //                     intructionsBT: "How to play?"
                //                 }
                //             }
                //         },
                //         pt: {
                //             translation: {
                //                 intro: {
                //                     subtitle: 'Um game inclusive para <strong>humanos</strong> e <strong>quasi-humanos!</strong>',
                //                     PlayBT: "Jogar",
                //                     intructionsBT: "Instruções"
                //                 }
                //             }
                //         }
                //     }
                // }, function(err, t) {
                //     // jqueryI18next.init(app.i18next, $);

                //     jqueryI18next.init(app.i18next, $, {
                //             tName: 't', // --> appends $.t = i18next.t
                //             i18nName: 'i18n', // --> appends $.i18n = i18next
                //             handleName: 'localize', // --> appends $(selector).localize(opts);
                //             selectorAttr: 'data-i18n', // selector for translating elements
                //             targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
                //             optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
                //             useOptionsAttr: false, // see optionsAttr
                //             parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
                //           });

                //     app.interface.init();
                // });
    
                // console.log(i18next);
        
                // jqueryI18next.init(i18next, $, {
                //     tName: 't', // --> appends $.t = i18next.t
                //     i18nName: 'i18n', // --> appends $.i18n = i18next
                //     handleName: 'localize', // --> appends $(selector).localize(opts);
                //     selectorAttr: 'data-i18n', // selector for translating elements
                //     targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
                //     optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
                //     useOptionsAttr: false, // see optionsAttr
                //     parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
                //   });


                
            };

        };

        this.app = new App();
        this.app.init();

    });