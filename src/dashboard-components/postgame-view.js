//modules
import $ from 'jquery';
import postgameMustache from './postgame.html';


export default function (context) {

	const app = context;

	let status = app.gameState.success ? 'success' : 'wrong';
	let category = app.gameState.currentCategory;

	//slug - because JSON notation doesn't work well with spaces
	let categorySlug = category.replace(/\s/g, '-').toLowerCase();

	const pageData = {
		inverseColour: app.interface.inverseClass(),
		success: app.gameState.success,
		status: app.i18next.t(`postgame.${status}`),
		supposedPhrase: app.i18next.t('postgame.supposed'),
		itis: app.i18next.t('postgame.it-is'),
		category:  app.i18next.t(`categories.${categorySlug}`),
		back: app.i18next.t('postgame.back'),
		bestGuessPhrase: app.i18next.t('postgame.best-guesses')
	};

	const postgameHTML = postgameMustache(pageData);

	$(postgameHTML).appendTo($('#view'));

	// get limited list of best guess
	let list = app.getBestGuesses();

	let guessList = $('#view').find('.tags'); //DOM
	$.each(list, function (i, guess) {
		let slug = guess.replace(/\s/g, '-').toLowerCase();
		let translation = app.i18next.t(`categories.${slug}`);
		guessList.append(`<span class="uk-label uk-label-primary" data-i18n="categories.${slug}">${translation}</span>\n`);
	});


	$('postgame').localize();

	//speak
	let speech = '';
	if (app.gameState.success) {
		speech = `${pageData.status}. ${pageData.itis} ${pageData.category}.`;
	} else {
		speech = `${pageData.status}. ${pageData.supposedPhrase} ${pageData.category}.`;
	}

	app.speak(speech,app.currentPersona.language);


	$('#back').click(function () {
		$('#postgame').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, function () {
			app.interface.changeView('challenges');
		});

	});

	if(app.IOon) {
		app.socket.emit('interface', {
			view: 'post-game',
			action: 'initiate',
			bestGuesses: list,
		});
	}

}