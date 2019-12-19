//Modules
const chalk = require('chalk');
const express = require('express');
const {DateTime} = require('luxon');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;
process.title = 'Node Pict.io';

const gameInstances = [];
const gamesWaitingCard = [];
const gamesWaitingDashboard = [];
const eventsWaitingGames = [];

//Router
// app.use(express.static(path.join(__dirname, 'dist')));
// app.use('/assets', express.static(__dirname + '/assets'));
app.use('/locales', express.static(__dirname + '/locales'));
app.use('/card', express.static(__dirname + '/card'));
app.use('/dashboard', express.static(__dirname + '/dashboard'));
app.use(express.static('dist'));

// -----------

app.get('/:event', async (req, res) => {
	// console.log('root', req.url);
	// console.log('event: ', req.params.event);

	eventsWaitingGames.push(req.params.event);

	// res.type('.html');
	res.sendFile(__dirname + '/dist/');

});


app.use('/card/:socketID', (req, res) => {
	// console.log('card', req.url);

	const gameInstance = getGameInstance(req.params.socketID);
	if (gameInstance) gamesWaitingCard.push(gameInstance);

	res.type('.html');
	res.sendFile(__dirname + '/card/');
});

app.use('/dashboard/:socketID', (req, res) => {
	// console.log('dashboard', req.url);

	//check event
	let gameInstance = getGameInstanceByEventName(req.params.socketID);
	if (!gameInstance) gameInstance = getGameInstance(req.params.socketID);

	if (gameInstance) gamesWaitingDashboard.push(gameInstance);

	// res.type('.html');
	res.sendFile(__dirname + '/dashboard/');
});

//IO Connection
function onConnection(socket) {

	// console.log(chalk.blue('Connection Event: '), socket);
	socket.emit('connected', {
		socketID: socket.id
	});


	socket.on('gameCreated', (data) => {

		storeGameInstance(socket.id);

		socket.join(socket.id, () => {
			// let rooms = Object.keys(socket.rooms);
			// console.log('Game Rooms: ', rooms);
			// socket.emit('roomJoined', {socketID: socket.id, roomID: socket.id});
		});
	});

	socket.on('cardAdded', (data) => {

		const gameInstance = gamesWaitingCard.shift();

		if (gameInstance) {

			addCardToGame(socket.id, gameInstance.id);

			socket.join(gameInstance.id, () => {
				// let rooms = Object.keys(socket.rooms);
				// console.log('Card Rooms: ', rooms);
				socket.emit('roomJoined', {
					socketID: socket.id,
					roomID: gameInstance.id
				});
			});
		}
	});

	socket.on('dashboardAdded', (data) => {

		const gameInstance = gamesWaitingDashboard.shift();

		if (gameInstance) {
			addDashboardToGame(socket.id, gameInstance.id);

			socket.join(gameInstance.id, () => {
				// let rooms = Object.keys(socket.rooms);
				// console.log('Dashboard Rooms: ', rooms);
				socket.emit('roomJoined', {
					socketID: socket.id,
					roomID: gameInstance.id
				});
			});
		}
	});

	socket.on('card', (data) => {
		// console.log(chalk.blue('Card Event: '), data);
		socket.to(`${data.room}`).emit('card', data);
	});

	socket.on('guess', (data) => {
		// console.log(chalk.blue('Guess Event: '), data);
		socket.to(`${data.room}`).emit('guess', data);
		// socket.broadcast.emit('guess', data);
	});

	socket.on('timer', (data) => {
		// console.log(chalk.blue('Timer Event: '), data);
		socket.to(`${data.room}`).emit('timer', data);
		// socket.broadcast.emit('timer', data);
	});

	socket.on('interface', (data) => {
		// console.log(chalk.blue('Interface Event: '), data);
		socket.to(`${data.room}`).emit('interface', data);
		// socket.broadcast.emit('interface', data);
	});

	socket.on('drawing', (data) => {
		// console.log(chalk.blue('Drawing Event: '), data);
		socket.to(`${data.room}`).emit('drawing', data);
		// socket.broadcast.emit('drawing', data);
	});

}

const storeGameInstance = (socketID) => {

	const game = {
		id: socketID,
		room: socketID,
		event: undefined,
		card: undefined,
		dashboard: undefined,
		startDate: DateTime.local()
	};

	if (eventsWaitingGames.length > 0) {
		game.event = eventsWaitingGames.shift();
	}

	gameInstances.push(game);

	console.log(gameInstances);
};

const addCardToGame = (cardID, gameID) => {
	const gameInstance = getGameInstance(gameID);
	if (gameInstance) gameInstance.card = cardID;
	// console.log(gameInstances);
};


const addDashboardToGame = (dashID, gameID) => {
	const gameInstance = getGameInstance(gameID);
	if (gameInstance) gameInstance.dashboard = dashID;
	// console.log(gameInstances);
};

const getGameInstance = socketID => {
	return gameInstances.find(instance => {
		return instance.id === socketID;
	});
};

const getGameInstanceByEventName = event => {
	gameInstances.reverse();
	const game =  gameInstances.find(instance => {
		return instance.event == event;
	});
	gameInstances.reverse();
	return game;
};

io.on('connection', onConnection);

http.listen(port, () => console.log(chalk.blue('listening on port ') + port));