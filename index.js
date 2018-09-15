//Modules
const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

//Router
app.use('/', express.static(__dirname + '/dist'));
app.use('/dashboard', express.static(__dirname + '/dashboard'));
app.use('/locales', express.static(__dirname + '/locales'));
app.use('/assets', express.static(__dirname + '/assets'));

//IO Connection
function onConnection(socket){
	socket.on('interface', (data) => socket.broadcast.emit('interface', data));
	socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
	socket.on('guess', (data) => socket.broadcast.emit('guess', data));
	socket.on('timer', (data) => socket.broadcast.emit('timer', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));