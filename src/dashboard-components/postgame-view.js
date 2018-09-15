//modules
import $ from 'jquery';
import postgameMustache from './postgame.html';


function PostGameView() {

	this.init = function () {
		
	};

	this.update = function(data) {

		//build page
		const postgameHTML = postgameMustache(data);
		$(postgameHTML).appendTo($('#view'));

		// get limited list of best guess
		const guessList = $('#view').find('.tags'); //DOM

		for (let guess of data.bestGuesses) {
			const slug = guess.replace(/\s/g, '-').toLowerCase();
			guessList.append(`<span class="uk-label uk-label-primary" data-i18n="categories.${slug}">${guess}</span>\n`);	
		}

	};

}

export default new PostGameView();