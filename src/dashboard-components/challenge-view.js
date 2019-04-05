//modules
import $ from 'jquery';
import challengeMustache from './challenge.html';


function challengeView () {

	this.init = () => {
		// this.update();
	};

	this.update = (data) => {

		if (data.players == 1) {
			data.extraIcon = false;
			data.players = `${data.players} Human Player`;
		} else {
			data.extraIcon = true;
			data.players = `${data.players} Human Players`;
		}
		
		
		//build page
		const challengeHTML = challengeMustache(data);
		
		$('#view').html(challengeHTML);

		//animation
		animation();
	};
	

	//animation
	const animation = () => {
		const duration = 1500;

		let container = $('#challenge');
		container.css('opacity', 0);
		container.css('marginTop', 100);

		let card = $('.uk-card');
		let cardHeight = card.height();
		card.css('height', 0);
		card.css('opacity', 0);

		//animation
		container.animate({
			marginTop: 0,
			opacity: 1,
		}, duration);

		card.delay(1000).animate({
			height: cardHeight,
			opacity: 1,
		}, duration);
	};

}

export default new challengeView();