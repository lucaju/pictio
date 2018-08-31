
//modules
import $ from 'jquery';
// import jqueryUI from 'jquery-ui';
// import UIkit from 'uikit';

import homeView from './homeView';




export default function interfaceView(context) {

	this.context = context;

	this.currentView = 'home';

	this.init = function() {
		// console.log('aqui!');
		// console.log(app);
		// this.changeView("home");
	};

	this.changeView = function(viewName) {

		//clean view
		const view = $('#view');
		view.empty();

		homeView(this.context);

	};

}

// export InterfaceView

//         const interfaceView = new InterfaceView();
//         return interfaceView;

//    });
