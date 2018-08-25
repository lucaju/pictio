/*jshint esversion: 6 */
define([
    'jquery',
    'jqueryUI',
    'uikit',
    'homeView'
   ],function (d3, moment, chroma, homeView) {

        const InterfaceView = function() {

            this.currentView = "home";

            this.init = function() {
                this.changeView("home");
            };

            this.changeView = function(viewName) {

                //clean view
                const view = $("#view");
                view.empty();

                homeView(view);

            };

        };

        const interfaceView = new InterfaceView();
        return interfaceView;

   });
