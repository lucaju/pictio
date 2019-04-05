//modules
import $ from 'jquery';
import ee from 'event-emitter';

import homeMustache from './home.html';
import instructionsMustache from './instructions.html';
import aboutMustache from './about.html';


function HomeView() {

	let app;

	//emitter
	ee(this);
	
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

	this.init = (context) => {

		app = context;

		//data
		this.homeData = {
			subtitle: app.i18next.t('intro.subtitle'),
			buttons: {
				play: app.i18next.t('intro.buttons.play'),
				intructions: app.i18next.t('intro.buttons.intructions')
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
			title: app.i18next.t('instructions.title'),
			text: app.i18next.t('instructions.text')
		};

		this.aboutData = {
			title: app.i18next.t('about.title'),
			text: app.i18next.t('about.text'),
			sponsortitle: app.i18next.t('about.sponsortitle'),
			youtubeid: app.i18next.t('about.youtubeid')
		};
		

		//build page
		const homeHTML = homeMustache(this.homeData);
		$(homeHTML).appendTo($('#view'));

		const instructionsHTML = instructionsMustache(this.instructionData);
		$(instructionsHTML).appendTo($('#view'));

		const aboutHTML = aboutMustache(this.aboutData);
		$(aboutHTML).appendTo($('#view'));

		//translation
		translate();

		//button
		$('#go-play').click(this, play);

		emitToDashboard({
			view: 'waiting'
		});

	};

	const translate = () => {
		$('#intro').localize();

		$('#instructions').localize({
			joinArrays: ' '
		});
		$('#about').localize({
			joinArrays: ' '
		});

		app.i18next.on('languageChanged', () => {
			$('#intro').localize();
			$('#instructions').localize({
				joinArrays: ' '
			});
			udpateAboutVideo();
		});
	};

	const udpateAboutVideo = () => {
		this.aboutData.youtubeid = app.i18next.t('about.youtubeid');
		const aboutHTML = aboutMustache(this.aboutData);
		$('#about').remove();
		$(aboutHTML).appendTo($('#view'));

		$('#about').localize({
			joinArrays: ' '
		});
	};

	const play = () => {

		const duration = 1500;

		if(!app.artyom.initialized) app._initArtyom(); // initialize languate

		app.speak(app.i18next.t('intro.speak.play'));

		$('#intro').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, () => {
			this.emit('changeView', {
				source: 'home',
				target:'players' //'partners'
			});
		});

	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'waiting',
		message = ''
	}) => {	
		app.socket.emit(type, {view, message});
	};

}

export default new HomeView();