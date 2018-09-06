
//modules
import $ from 'jquery';
import homeMustache from './home.html';
import instructionsMustache from './instructions.html';

export default function (context) {

	const app = context;

	const homeData = {
		subtitle: app.i18next.t('intro.subtitle'),
		buttons: {
			play: app.i18next.t('intro.buttons.play'),
			intructions: app.i18next.t('intro.buttons.intructions')
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
		title: app.i18next.t('instructions.title'),
		text:  app.i18next.t('instructions.text')
	};

	const homeHTML = homeMustache(homeData);
	$(homeHTML).appendTo($('#view'));

	const instructionsHTML = instructionsMustache(instructionData);
	$(instructionsHTML).appendTo($('#view'));

	$('#intro').localize();
	$('#instructions').localize().localize({ joinArrays: ' ' });

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