

//Modules
const express = require('express');


// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

// const webpackConfig= require('./webpack.config.js');
// const compiler = webpack(webpackConfig);

// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/Pictio'));
// app.get('/public', express.static(__dirname + '/public'));

// app.get('/', function (req, res) {
  
// });

app.use('/dashboard', express.static(__dirname + '/dashboard'));
app.use('/', express.static(__dirname + '/public'));

// app.use(webpackDevMiddleware(compiler, {
// 	publicPath: webpackConfig.output.publicPath
// }));


function onConnection(socket){
	socket.on('interface', (data) => socket.broadcast.emit('interface', data));
	socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
	socket.on('guess', (data) => socket.broadcast.emit('guess', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
