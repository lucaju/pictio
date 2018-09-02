
//modules
import $ from 'jquery';
import homeHTML from 'html-loader!../home.html';
import instructionsHTML from 'html-loader!../instructions.html';

export default function (context) {

	const app = context;

	$(homeHTML).appendTo($('#view'));
	$(instructionsHTML).appendTo($('#view'));


	$('#intro').localize();
	$('#instructions').localize();

	app.i18next.on('languageChanged', () => {
		$('#intro').localize();
		$('#instructions').localize();
	});


	$('#go-play').click(function() {

		app._initArtyom(); // initialize languate
	
		$('#intro').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, function() {
			app.interface.changeView('partner-choice');
		} );

	});

}