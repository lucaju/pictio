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
		text: '',
		sponsorTitle:''
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
			},
			{
				name: 'Français',
				iso: 'fr',
			}
			]
		};

		this.instructionData = {
			title: this.app.i18next.t('instructions.title'),
			text: this.app.i18next.t('instructions.text')
		};

		this.aboutData = {
			title: this.app.i18next.t('about.title'),
			text: this.app.i18next.t('about.text'),
			sponsortitle: this.app.i18next.t('about.sponsortitle'),
			youtubeid: this.app.i18next.t('about.youtubeid')
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

		this.emitToDashboard({
			view: 'waiting'
		});

		this.emitToCard({
			action: 'new',
		});

	};

	this.translate = function() {
		const _this = this;

		$('#intro').localize();

		$('#instructions').localize({
			joinArrays: ' '
		});
		$('#about').localize({
			joinArrays: ' '
		});

		this.app.i18next.on('languageChanged', () => {
			$('#intro').localize();
			$('#instructions').localize({
				joinArrays: ' '
			});
			_this.udpateAboutVideo();

			//change about 
		});
	};

	this.udpateAboutVideo = function() {
		this.aboutData.youtubeid = this.app.i18next.t('about.youtubeid');
		const aboutHTML = aboutMustache(this.aboutData);
		$('#about').remove();
		$(aboutHTML).appendTo($('#view'));

		$('#about').localize({
			joinArrays: ' '
		});
	};

	this.play = function(e) {

		const _this = e.data;
		const duration = 1500;

		_this.app._initArtyom(); // initialize languate

		_this.app.speak('Awesome. Lets play Pict io!');

		$('#intro').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, function () {
			_this.emit('changeView', {
				source: 'home',
				target:'players' //'partners'
			});
		});

	};

	this.emitToCard = function ({
		type = 'card',
		action = 'new'
	}) {
		if (this.app.IOon) {
			this.app.socket.emit(type, {
				action: action,
			});
		}
	};

	this.emitToDashboard = function ({
		type = 'interface',
		view = 'waiting',
	}) {
		if (this.app.IOon) {
			this.app.socket.emit(type, {
				view: view,
				message: ''
			});
		}
	};

}

export default new HomeView();