//modules
import $ from 'jquery';
import ee from 'event-emitter';

import playerssMustache from './human-players.html';


function PartnersView() {

	let app;

	//emitter
	ee(this);

	app = undefined;
	this.pageData = {
		title: '',
		playersOptions: [],
		inverseColour: undefined,
		individualAccent: false
	};

	this.init = (context) => {

		app = context;

		//data
		this.pageData = {
			title: app.i18next.t('players.page.title'),
			playersOptions: [
				{
					name: app.i18next.t('players.playersOptions.onePlayer'),
					slug:'one',
					colour: 'background-yellow'
				},{
					name: app.i18next.t('players.playersOptions.twoPlayers'),
					slug:  'two',
					colour: 'uk-button-primary',
					extraIcon: true
				}
			],
			inverseColour: app.interface.inverseClass(),
			individualAccent: false
		};

		speak(this.pageData.title);

		//build page
		const playersHTML = playerssMustache(this.pageData);
		$(playersHTML).appendTo($('#view'));

		$('#home-button').click(() => {
			homeButton('home');
		});

		//buttons human players
		for (const option of this.pageData.playersOptions) {
			const bt = $(`#${option.slug}`);

			bt.click(() =>{

				let target;
				if (option.slug == 'one') {
					app.gameState.currentChallenge = 'Blind Drawing with Left/Right Hand';
					app.gameState.players = 1;
					target = 'challenge';
					speak(app.i18next.t('players.speak.onePlayer'));
				} else {
					app.gameState.players = 2;
					target = 'challenges';
					speak(app.i18next.t('players.speak.twoPlayers'));
				}

				exitAnimation(target);
			});
		}

		//translate
		translate();

		//animation
		enterAnimation();

		//emit to socker IO
		emitToDashboard({
			message: app.i18next.t('players.dashboard.message'),
		});

	};

	const translate = () => {
		$('#human-players').localize();
	};

	const enterAnimation = () => {
		const duration = 1500;

		const container = $('#human-players');
		container.css('opacity', 0);
		container.css('marginTop', 100);

		container.animate({
			marginTop: 0,
			opacity: 1,
		}, duration);
	};

	const homeButton = () => {
		$('#human-players').animate({
			marginTop: '-100',
			opacity: 0,
		}, 1500, () => {
			this.emit('changeView', {
				source: 'players',
				target:'home'
			});
		});

		emitToDashboard({
			view: 'waiting'
		});
	};

	const exitAnimation = (target) => {
		const duration = 1500;

		$('#human-players').animate({
			marginTop: '-100',
			opacity: 0,
		}, duration, () => {
			this.emit('changeView', {
				source: 'players',
				target:target
			});
		});
	};

	//speack
	const speak = (msg) => {
		app.speak(msg);
	};

	const emitToDashboard = ({
		type = 'interface',
		view = 'players',
		room = app.socket.id,
		colour = '',
		message = ''
	}) => {
		app.socket.emit(type, { view, room, colour, message});
	};

}

export default new PartnersView();