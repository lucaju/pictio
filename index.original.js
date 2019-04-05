//Modules
const chalk = require ('chalk');
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;


//Router
// app.use(express.static('dist'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/dashboard', express.static(__dirname + '/dashboard'));
app.use('/locales', express.static(__dirname + '/locales'));
// app.use('/assets', express.static(__dirname + '/assets'));
app.use('/card', express.static(__dirname + '/card'));


app.get('/:lang', (req, res) => {
	console.log(req.params);
});

app.use('/dashboard/:room', (req,res) => {
	console.log(req.params);
});

app.use('/card/:socketID', (req,res) => {
	const socketID = req.params.socketID;
	gameRoom = socketID;
	res.type('.html');
	res.sendFile(__dirname + '/card/');
});

let gameRoom = '';

//IO Connection
function onConnection(socket){

	// console.log(chalk.blue('Connection Event: '), socket);
	socket.emit('connected', {socketID: socket.id});

	socket.join(gameRoom, () => {
		// let rooms = Object.keys(socket.rooms);
		// console.log('Room event: ', rooms);
		socket.emit('roomJoined', {socketID: socket.id, roomID: gameRoom});
	}); 

	socket.on('card', (data) => {
		// console.log(chalk.blue('Card Event: '), data);
		socket.to(`${data.room}`).emit('card', data);
	});
	
	socket.on('guess', (data) => {
		// console.log(chalk.blue('Guess Event: '), data);
		socket.to(`${data.room}`).emit('guess', data);
		socket.broadcast.emit('guess', data);
	});

	socket.on('timer', (data) => {
		// console.log(chalk.blue('Timer Event: '), data);
		socket.to(`${data.room}`).emit('timer', data);
		socket.broadcast.emit('timer', data);
	});

	socket.on('interface', (data) => {
		// console.log(chalk.blue('Interface Event: '), data);
		socket.broadcast.emit('interface', data);
	});

	socket.on('drawing', (data) => {
		// console.log(chalk.blue('Drawing Event: '), data);
		socket.broadcast.emit('drawing', data);
	});
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));