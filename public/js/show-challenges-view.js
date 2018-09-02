//modules
import $ from 'jquery';
import showChallenges from 'html-loader!../show-challenges.html';
import challengeCard from 'html-loader!../challenge-card.html';


export default function (context) {

	const app = context;

	$(showChallenges).appendTo($('#view'));

	$('#show-challenges').localize();

	//emit to socker IO
	app.socket.emit('interface', {
		view: 'show-challenges'
	});


	// get challenges
	// $.each(app.gameVariables.challenges, function (i, challenge) {

	for (let challenge of app.gameVariables.challenges) {

		console.log(challenge);

		let col = challengeCard;

		$(col).appendTo($('#columns'));

		//change mouse cursors
		let card = $(`#${challenge.short}`);

		card.css('cursor', 'pointer');

	// 	//button controll
	// 	card.click(function () {
	// 		$('#challenges').animate({
	// 			marginTop: '-100',
	// 			opacity: 0,
	// 		}, 1500, function () {
	// 			showChallenge(challenge);
	// 		});

	// 	});

	// 	socket.emit('interface', {
	// 		view: 'choose-chalenge'
	// 	});


	// 	// card.css('transform','rotate(60deg)');
	// 	let cDelay = 400 + (i * 100) + (Math.random() * 200);
	// 	let cRotate = -3 + (Math.random() * 6);
	// 	let ctop = -500 + (Math.random() * 1000);

	// 	card.css('left', -1500);
	// 	card.css('top', ctop);

	// 	card.delay(cDelay).animate({
	// 		top: 0,
	// 		left: 0,
	// 	}, {
	// 		duration: 1000,
	// 		specialEasing: {
	// 			width: 'linear',
	// 			height: 'easeOutBounce'
	// 		},
	// 		start: function () {
	// 			$(this).rotate({
	// 				duration: 1200,
	// 				angle: 150,
	// 				animateTo: cRotate
	// 			});
	// 		}
	// 	});

	}
	// });

	//animation
	$('#challenges').css('opacity', 0);
	$('#challenges').css('marginTop', 100);

	$('#challenges').animate({
		marginTop: 0,
		opacity: 1,
	}, 1100);

}