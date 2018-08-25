/*jshint esversion: 6 */
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/Pictio'));
// app.get('/public', express.static(__dirname + '/public'));

// app.get('/', function (req, res) {
  
// });

app.use('/dashboard', express.static(__dirname + '/dashboard'));
app.use('/pictio/', express.static(__dirname + '/public'));


function onConnection(socket){
  socket.on('interface', (data) => socket.broadcast.emit('interface', data));
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  socket.on('guess', (data) => socket.broadcast.emit('guess', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
