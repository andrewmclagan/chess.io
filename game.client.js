// Constructor
function gameClient() { this.init(); }

// Prototype
gameClient.prototype = {	

	game: null,

	/* executed as constructor */
	init: function() {

		// define socket listners
		this.socket.on('serverChatUpdate', this.chatUpdate.bind(this));
		this.socket.on('serverGameUpdate', this.gameUpdate.bind(this));
		
		// connect to server
		this.initConnection();
	},
	
	/* server handshake */
	initConnection: function() {

		// if (lobby)
			// do lobby stuff
		// if (game)
			// init this.game = new gameCore(data.gameID);
			// initial game state this.game.updateGameState(data);
	},
	
	/* updates the game board and arbitraries */
	gameUpdate: function(data) {

		// update game state
		// this.game.update(data) (only updates the data in the object)
		// now render it
		// this.render.gameBoard(data.gameState.gameBoard)
		// this.render.captured(data.gameState.whiteCaptured,data.gameState.blackCaptured)
		// this.render.gameTime(data.gameState.whiteCaptured,data.gameState.blackCaptured)
		// ...
	},
	
	/* updates the chat board */
	chatUpdate: function(data) {

		// this.render.chatBoard(data.username, data.message);
	},
	
	/* sends a chat message to the server */
	chatDispatch: function() {

		// this.socket.emit('chatSend', { message: message });
	},

	/* sends move request to the server */
	moveRequest: function() {

		// this.getGameState();
	}
}	

// export
exports.gameServer = function(io) {
	return new gameServer(io);
};
