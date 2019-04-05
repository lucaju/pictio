//modules
import $ from 'jquery';
import waitingMustache from './waiting.html';


function WaitingView () {

	let app;
	
	app = undefined;
	this.waitingData = {
		status: '',
		colourClass: ''
	};

	this.init = (context) => {
		app = context;
		this.update();
	};
	
	this.update = function(data) {

		//receive data
		if (data) {
			this.waitingData.status = data.message;
		}

		//build page
		const waitingHTML = waitingMustache(this.waitingData);
		$('#view').html(waitingHTML);

		invertColour();

	};

	const invertColour = () => {
		const duration = 500;

		if (app.interface.inverseClassToggle == true) {
			$('#waiting').addClass('uk-light', {
				duration: duration
			});
		} else {
			$('#title').removeClass('uk-light', {
				waiting: duration
			});
		}
	};

}

export default new WaitingView();