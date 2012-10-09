// Constructor
function gameServer(http) { this.init(http); }

// Prototype
gameServer.prototype = {

	gameInstances: new Array(),
	
	init: function(http) {
		
		// init socket server
		var io = require('socket.io').listen(http);
		var self = this; 
		
		// system wide socket event listners
		var system = io.of('/system').on('connection', function(socket) {
			
			// Player connects to server
			socket.on('playerHandshake', function(data) {
				// database.retrieve( 'Player', data.playerID, function(data) { 	// Retrieve player from database
					// init player vars
					var player = { username: data.username, ID: 'XXX', currentGame: null, team: null, rank: 0, score: 0 };
					socket.set('player', player, function() {
						socket.emit('serverHandshake', { status: 'CONNECTED' }); // emit connected to server
					});					
				// }
				/*noResult {
					// create player with no playerID??
				}
				/*error {
					socket.emit('serverInitialConnect', { status: 'ERROR', message: 'Could not retrieve player data' });
				}*/
			});			
		});
		
		// lobbyRoom socket event listners
		var lobbyRoom = io.of('/lobby').on('connection', function(socket) {
		
			// Player connects to lobby
			socket.on('playerConnect', function(data) {
								
				socket.emit('serverGameList', { gameInstances: this.gameInstances } ); // send list of gameInstances[]
				
				// announce connection in lobby chat
				socket.emit('serverChatSend', { username: 'SERVER', message: 'You have joinned the game' });
				socket.broadcast.emit('serverChatSend', { username: 'SERVER', message: '<strong>' + socket.username + '</strong> has joinned the game'});							
			});			
			
			// Recieve chat message from Player
			socket.on('playerChatSend', function(data){

				lobbyRoom.emit('serverChatSend', { username: socket.username, message: data.message });
			});
			
			// Player disconnects from lobby
			socket.on('playerDisconnect', function(data) {

			});	
		});			
		
		// gameRoom socket event listners
		var gameRoom = io.of('/game').on('connection', function(socket) {

			// Player creates a game
			socket.on('playerCreateGame', function(data) {
				
				socket.get('player', function(error, player) { // retrieve player vars
					console.log(error);
					player.currentGame = this.createGame( player.ID, data.name, data.private ); // create game & assign current game
					player.team = 'WHITE'; // assign initial team
					
					socket.set('player', player, function() { // set player vars
						lobbyRoom.emit('serverGameList', { gameInstances: this.gameInstances }); // update lobby gameIstances
						socket.emit('serverRedirect', { route: '/game/' + player.currentGame }); // redirect player to the new game
					});
				});
			});
		
			// Player connects to a game
			socket.on('playerConnect', function(data) {
				
				// playerSocket.currentGame = game.gameID
				// playerSocket.team = 'BLACK'
				// send updated initial game state to player
			});
			
			// Player disconnects from game
			socket.on('playerDisconnect', function(data) {
			
			});		
		});
	},
	
	// creates a new game instance and places it into the local gameInstances[] array
	createGame: function( playerID, gameName ) {
	
		var game = new gameCore(this.GUID(), playerID, gameName);
		this.gameInstances.push(game);
		return game.ID;
	},
	
	// returns a game instance
	getGameInstance: function(ID) {
	
		var length = this.gameInstances.length;
		for(i = 0; i < length; i++) {
			if(this.gameInstances[i].ID == ID) {
				return this.gameInstances[i];
			}
		}
	}
}	

// export
exports.gameServer = function(io) {
	return new gameServer(io);
};
