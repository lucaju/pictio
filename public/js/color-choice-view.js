
//modules
import $ from 'jquery';
import colorChoiceHTML from 'html-loader!../color-choice.html';


export default function (context) {

	const app = context;
	
	$(colorChoiceHTML).appendTo($('#view'));

	$('#color-choice').localize();
	
	//emit to socker IO
	app.socket.emit('interface', {
		view: 'choose-color'
	});

	//buttons
	$.each(app.colours,function(i,colour) {

		let colorClass;

		if(colour == 'light') {
			colorClass = 'uk-button-default uk-background-default';
		} else if(colour == 'blue') {
			colorClass = 'uk-button-primary';
		} else if(colour == 'dark') {
			colorClass = 'uk-button-secondary';
		} else if(colour == 'yellow') {
			colorClass = 'uk-button-default background-yellow';
		}

		//a button for each color
		let bt= $(`<button id="${colour}" class="uk-button uk-button-large ${colorClass} uk-border-rounded uk-margin-small-right"><span uk-icon="icon: nut; ratio: 1.5"></span></button>`).appendTo($('#field'));
		
		bt.click(function() {
			// onChangeColor();
			let btColor = $(this).attr('id');

			if (app.playerColor != btColor) {

				app.playerColor = btColor;

				app.interface.changeColour(app.playerColor);
				app.changeVoice(app.playerColor);
				
				app.speak(app.playerColor);

				if (app.inverseClassToggle == true) {
					$('#title').addClass('uk-light', {duration:500}); 
				} else {
					$('#title').removeClass('uk-light', {duration:500}); 
				}
        
				app.socket.emit('interface', {
					view:'choose-color',
					color: app.playerColor
				});

			}
		
    
		});

	});

	//button
	$('#done').click(function() {

		$('#color-choice').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, function() {
			// showChallenges();
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