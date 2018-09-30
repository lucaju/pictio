//modules
import $ from 'jquery';
import ee from 'event-emitter';

import homeMustache from './home.html';
import instructionsMustache from './instructions.html';
import aboutMustache from './about.html';


function HomeView() {

	//emitter
	ee(this);
	
	this.app = undefined;
	this.homeData = {
		subtitle: '',
		buttons: {},
		languages: []
	};
	this.instructionData = {
		title: '',
		text: ''
	};
	this.aboutData = {
		title: '',
		text: ''
	};

	this.init = function (context) {

		this.app = context;

		//data
		this.homeData = {
			subtitle: this.app.i18next.t('intro.subtitle'),
			buttons: {
				play: this.app.i18next.t('intro.buttons.play'),
				intructions: this.app.i18next.t('intro.buttons.intructions')
			},
			languages: [{
				name: 'English',
				iso: 'en'
			},
			{
				name: 'Português',
				iso: 'pt',
			}
			]
		};

		this.instructionData = {
			title: this.app.i18next.t('instructions.title'),
			text: this.app.i18next.t('instructions.text')
		};

		this.aboutData = {
			title: this.app.i18next.t('about.title'),
			text: this.app.i18next.t('about.text')
		};

		//build page
		const homeHTML = homeMustache(this.homeData);
		$(homeHTML).appendTo($('#view'));

		const instructionsHTML = instructionsMustache(this.instructionData);
		$(instructionsHTML).appendTo($('#view'));

		const aboutHTML = aboutMustache(this.aboutData);
		$(aboutHTML).appendTo($('#view'));

		//translation
		this.translate();

		//button
		$('#go-play').click(this,this.play);

	};

	this.translate = function() {
		$('#intro').localize();

		$('#instructions').localize().localize({
			joinArrays: ' '
		});
		$('#about').localize().localize({
			joinArrays: ' '
		});

		this.app.i18next.on('languageChanged', () => {
			$('#intro').localize();
			$('#instructions').localize({
				joinArrays: ' '
			});
			$('#about').localize({
				joinArrays: ' '
			});
		});
	};

	this.play = function(e) {

		const _this = e.data;
		const duration = 1500;

		_this.app._initArtyom(); // initialize languate

		$('#intro').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, function () {
			_this.emit('changeView', 'partners');
		});

	};

}

export default new HomeView();