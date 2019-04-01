//Modules
const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

let lang = 'en';

//Router
// app.use(express.static('dist'));
// app.use('/fr', express.static('dist'));
// app.use('/', express.static(__dirname + '/dist'));
// app.use('/fr', express.static(__dirname + '/dist'));
app.use('/dashboard', express.static(__dirname + '/dashboard'));
app.use('/locales', express.static(__dirname + '/locales'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/card', express.static(__dirname + '/card'));

app.use('/lang', function (req, res) {
	res.send({lang:lang});
});

// app.use('/en', function (req, res) {
// 	lang = 'en';
// 	res.redirect('/');
// });

// app.use('/fr', function (req, res) {
// 	lang = 'fr';
// 	res.redirect('/');
// });

// app.use('/pt', function (req, res) {
// 	// lang = 'pt';
// 	// res.redirect('/');
// 	console.log(lang);
// 	res.send(__dirname + '/dist/app.bundle.js');
// 	res.redirect('/');
// });

app.use('/', function (req, res) {
	// lang = 'en';
	// res.redirect('/');
	// console.log(req.originalUrl);
	res.sendFile(__dirname + '/dist/' + req.originalUrl);
});

// app.get('/card', function (req, res) {
// 	console.log('opa');
// 	res.redirect('/card');
	
// });

//IO Connection
function onConnection(socket){
	socket.on('interface', (data) => socket.broadcast.emit('interface', data));
	socket.on('card', (data) => socket.broadcast.emit('card', data));
	socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
	socket.on('guess', (data) => socket.broadcast.emit('guess', data));
	socket.on('timer', (data) => socket.broadcast.emit('timer', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));