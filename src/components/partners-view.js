
//modules
import $ from 'jquery';
import partnersMustache from './partners.html';


export default function (context) {

	const app = context;

	const pageData = {
		title: 'Choose your partner',
		inverseColour: app.interface.inverseClass(),
		done: app.i18next.t('personas.done'),
		personas:  app.personas,
		showName: false,
		individualAccent: false
	};

	const partnerHTML = partnersMustache(pageData);
	
	$(partnerHTML).appendTo($('#view'));

	$('#partner-choice').localize();
	
	//emit to socker IO
	if(app.IOon) {
		app.socket.emit('interface', {
			view: 'partner-color'
		});
	}

	//buttons
	$.each(app.personas,function(i,persona) {

		let bt = $(`#${persona.slug}`);

		let colorClass;

		if(persona.colour == 'light') {
			colorClass = 'uk-button-default uk-background-default';
		} else if(persona.colour == 'blue') {
			colorClass = 'uk-button-primary';
		} else if(persona.colour == 'dark') {
			colorClass = 'uk-button-secondary';
		} else if(persona.colour == 'yellow') {
			colorClass = 'uk-button-default background-yellow';
		}

		//a button for each color
		bt.addClass(colorClass);
		

		bt.click(function() {

			let persona = app.getPersona($(this).attr('id'));

			if (app.currentPersona != persona) {

				app.currentPersona = persona;

				//colour
				app.interface.changeColour(persona.colour);

				if (app.interface.inverseClassToggle == true) {
					$('#title').addClass('uk-light', {duration:500}); 
				} else {
					$('#title').removeClass('uk-light', {duration:500}); 
				}

				//translation colour
				let translatedColor = '';

				if (pageData.individualAccent) {
					translatedColor = app.i18next.t(
						`personas.colours.${persona.colour}`,
						{lng:app.getLanguageCode(persona.language)}
					);
				} else {
					translatedColor = app.i18next.t(
						`personas.colours.${persona.colour}`
					);
				}
				
				//speak
				let textToSpeak = '';
				if (pageData.showName) textToSpeak = `${persona.name}. `;
				textToSpeak += translatedColor;

				app.speak(textToSpeak,persona.language);

				if(app.IOon) {
					app.socket.emit('interface', {
						view:'choose-color',
						color: app.currentPersona.colour
					});
				}

			}

		});

	});

	//button
	$('#done').click(function() {
		exitAnimation();
	});

	function enterAnimation() {
		//animation
		$('#partner-choice').css('opacity',0);
		$('#partner-choice').css('marginTop',100);
		
		//animation
		$('#partner-choice').animate({
			marginTop: 0,
			opacity: 1,
		}, 1500);
	}

	function exitAnimation() {
		$('#partner-choice').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, function() {
			app.interface.changeView('challenges');
		} );
	}

	enterAnimation();

}