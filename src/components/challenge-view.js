//modules
import $ from 'jquery';
import challengeMustache from './challenge.html';


export default function (context) {

	const app = context;
	
	const challenge = app.getChallenge(app.gameState.currentChallenge);

	//pick a draw category
	const filteredCatetories = filterCategories(challenge.code);
	const randomDraw = filteredCatetories[Math.floor(Math.random() * filteredCatetories.length)];
	const currentDrawChallenge = randomDraw.Category; // save current draw category
	const categorySlug = currentDrawChallenge.replace(/\s/g, '-').toLowerCase();

	app.gameState.currentCategory = currentDrawChallenge;


	//-- Filter category by cahllenge code 
	function filterCategories(code) {

		let filteredCat = [];

		//loop categories draw
		for (let cat of app.mechanics.catChallenges) {
			// $.each(catChallenges, function(i,cat) {

			// if category fits in only one challenge
			if (cat.Challenge.length == 1) {
				if (cat.Challenge == code) filteredCat.push(cat);

				// cartegory fits into more than one category
			} else {

				//split comma separated cateories
				let chArray = cat.Challenge.split(',');

				//loop
				for (let chall of chArray) {
					if (chall == code) filteredCat.push(cat);
				}
				
			}
		}

		return filteredCat;
	}

	const pageData = {
		name: app.i18next.t(`challenges.challenges.${challenge.short}.name`),
		short: challenge.short,
		description: app.i18next.t(`challenges.challenges.${challenge.short}.description`),
		draw: app.i18next.t('challenges.page.draw'),
		drawCategory: app.i18next.t(`categories.${categorySlug}`),
		categorySlug: categorySlug,
		time: challenge.time,
		ready: app.i18next.t('challenges.page.ready'),
		back: app.i18next.t('challenges.page.back'),
		inverseColour: app.interface.inverseClass(),
	};

	const challengeHTML = challengeMustache(pageData);

	$(challengeHTML).appendTo($('#view'));

	$('#challenge').localize();
 
	//buttons
	$('.uk-card').click(function () {
		callGame();
	});

	$('#play').click(function () {
		callGame();
	});

	function callGame() {
		$('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, function () {
			app.interface.changeView('game');
		});
	}

	$('#back').click(function () {
		$('#challenge').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, function () {
			app.interface.changeView('challenges');
		});

	});

	if(app.IOon) {
		app.socket.emit('interface', {
			view: 'challenge',
			name: pageData.name,
			short: pageData.short,
			description: pageData.description,
			drawCategory: pageData.drawCategory,
			time: pageData.time,
			colourClass: pageData.inverseColour,
		});
	}


	//animation
	function enterAnimation() {
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
		}, 1500);

		card.delay(1000).animate({
			height: cardHeight,
			opacity: 1,
		}, 1500);
	}

	enterAnimation();

}