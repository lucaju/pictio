
//modules
import $ from 'jquery';
import homeMustache from './home.html';
import instructionsMustache from './instructions.html';

export default function (context) {

	const app = context;

	const homeData = {
		subtitle: 'An inclusive mini-game for <strong>humans</strong> and <strong>quasi-humans!</strong>',
		buttons: {
			play: "Let's Play",
			intructions: 'How to play?'
		},
		languages: [
			{
				name: 'English',
				iso: 'en'
			},
			{
				name: 'Português',
				iso: 'pt',
			}
		]
	};

	const instructionData = {
		title: 'How to Play',
		text:  ''
	};

	const homeHTML = homeMustache(homeData);
	$(homeHTML).appendTo($('#view'));

	const instructionsHTML = instructionsMustache(instructionData);
	$(instructionsHTML).appendTo($('#view'));

	$('#intro').localize();
	$('#instructions').localize();

	app.i18next.on('languageChanged', () => {
		$('#intro').localize();
		$('#instructions').localize({ joinArrays: ' ' });
	});


	$('#go-play').click(function() {

		app._initArtyom(); // initialize languate
	
		$('#intro').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, function() {
			app.interface.changeView('partners');
		} );

	});

}