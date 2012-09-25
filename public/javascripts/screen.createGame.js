
function createGameScreen() {}

createGameScreen.prototype = {
	
	// executed as constructor
	construct: function() {
		
		// define socket listners
		this.gameServer.on('serverRedirect', function(data) { window.location.replace(data.route); }); 

		// connect to game server
		// this.lobbyServer.emit('playerHandshake', { playerID: 'alpha072' });		
	},
	
	// executed on DOM ready
    ready: function () { 
	
		// define event handlers
		$('#game-create').bind('click', this.createGame.bind(this)); 	
    },
	
	// executed after the document has fully loaded 
    load: function () {
		
	},		
	
	// gathers user data and creates a new game instance
	createGame: function() { 
		
		var gameName = $('#game-name').val(),
			gamePrivacy = $('#game-private').is(':checked');

		this.gameServer.emit('playerCreateGame', { name: gameName, private: gamePrivacy });	
	}
}