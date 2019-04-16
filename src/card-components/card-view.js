//modules
import $ from 'jquery';
import cardMustache from './card.html';


export default function cardView (context) {

	const app = context;

	let pageData = {};

	this.init = () => {
		// this.update();
	};

	this.update = (data) => {

		if (!data) data = {action: 'wait'};

		if (data.action == 'new' || data.action == 'wait') {

			let waiting = (data.action == 'new') ? false : true;

			pageData = data;
			pageData.waiting = waiting;
			
			//build page
			const challengeHTML = cardMustache(pageData);
			$('#view').html(challengeHTML);

			$('#play').click(this, callGame);

			//animation
			animation();

		} else if (data.action == 'updateGuess') {
			updateGuess(data);
		} else if (data.action == 'updateTime') {
			updatTime(data);
		} else if (data.action == 'postGame') {
			endGame(data);
		}
	};

	const updateGuess = (data) => {
		$('#guess').html(data.guess);
	};

	const updatTime = (data) => {
		$('#time').html(`${data.time + 1}s`);
	};

	const endGame =  (data) => {
		$('#time').html('');
		$('#guess').html(data.guess);
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

	const callGame = () => {
		$('#play').remove();
		$('#guess').html('...');
		
		emitToGame({
			name: pageData.name,
			action: 'play',
			room: app.socket.room,
			drawCategory: pageData.drawCategory,
		});
	};
	
	const emitToGame = ({
		type = 'card',
		view = 'challenge',
		name = '',
		action = 'play',
		room = '',
		drawCategory = ''
	}) => {
		app.socket.emit(type, {view, name, action, room, drawCategory});
	};

}