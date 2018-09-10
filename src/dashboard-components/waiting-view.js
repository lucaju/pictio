//modules
import $ from 'jquery';
import waitingMustache from './waiting.html';

function waitingView () {
	
	this.app;

	this.waitingData = {
		status: '',
		colourClass: ''
	};

	this.init = function(context) {
		this.app = context;
		this.update();
	};
	
	this.update = function(data) {
		if (data) {
			this.waitingData.status = data.message;
			// if (data.colour) this.waitingData.colourClass = this.app.interface.inverseClass();
		}

		const waitingHTML = waitingMustache(this.waitingData);
		$('#view').html(waitingHTML);
		
		// $(waitingHTML).appendTo($('#view'));

		if (this.app.interface.inverseClassToggle == true) {
			$('#waiting').addClass('uk-light', {duration:500}); 
		} else {
			$('#waiting').removeClass('uk-light', {duration:500}); 
		}

	};

}

export default new waitingView();