/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');
 
/**
 * Application configuration.
 */
app = express(); 
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * Application routes.
 */
require('./routes');

/**
 * Init HTTP and Game server
 */ 
var http = http.createServer(app).listen(80); // http server
var gameServer = require('./game.server').gameServer(http);  // game server


/**
 * Init ticker
 */
var appTicker = setTimeout(function(){
	
	// end game on no player activity
	// save game states to DB incase server crashes
	// consider moving this into the internals of GameServer.js	
	
	/*Chat.find(function(error, chats) {
		for(i = 0; i < chats.length; i++) 
			if(chats[i].users.length < 1)
				delete chats[i];	
	});*/
	
}, 3000)
