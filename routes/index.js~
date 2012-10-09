// includes and inits
var mongoose = require('mongoose'),
	db = mongoose.createConnection('localhost', 'game');

// Login
app.get('/', function(req, res){

	res.render('index', { screen: 'index' });
});

// Lobby
app.get('/lobby', function(req, res){

	res.render('lobby', { screen: 'lobby' });
});

// Game
app.get('/game/:id', function(req, res){

	res.render('./game', { screen: 'game' });
});

// Create Game
app.get('/create/game', function(req, res){

	res.render('./createGame', { screen: 'createGame' });
});
