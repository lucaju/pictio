
//modules
import $ from 'jquery';
import colorChoiceHTML from 'html-loader!../partner-choice.html';


export default function (context) {

	const app = context;
	
	$(colorChoiceHTML).appendTo($('#view'));

	$('#partner-choice').localize();
	
	//emit to socker IO
	app.socket.emit('interface', {
		view: 'partner-color'
	});

	//buttons
	$.each(app.personas,function(i,persona) {

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
		let bt= $(`<button id="${persona.name}" class="uk-button uk-button-large ${colorClass} uk-border-rounded uk-margin-small-right"><span uk-icon="icon: nut; ratio: 1.5"></span></button>`).appendTo($('#field'));
		

		bt.click(function() {
			// onChangeColor();

			let persona = app.getPersona($(this).attr('id'));

			if (app.currentPersona != persona) {

				app.currentPersona = persona;

				app.interface.changeColour(persona.colour);
				// app.changel(app.playerColor);
				
				let translateColor = app.i18next.t('personaChoice.colours.'+persona.colour);
				let textToSpeak = persona.name + '. ' + translateColor;


				app.speak(textToSpeak,persona.language);

				if (app.interface.inverseClassToggle == true) {
					$('#title').addClass('uk-light', {duration:500}); 
				} else {
					$('#title').removeClass('uk-light', {duration:500}); 
				}
				
				app.socket.emit('interface', {
					view:'choose-color',
					color: app.currentPersona.colour
				});

			}
		
    
		});

	});

	//button
	$('#done').click(function() {

		$('#partner-choice').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, function() {
			
			app.interface.changeView('show-challenges');
		} );
		
	});

	//animation
	$('#color-choice').css('opacity',0);
	$('#color-choice').css('marginTop',100);
	
	//animation
	$('#color-choice').animate({
		marginTop: 0,
		opacity: 1,
	}, 1500);

}