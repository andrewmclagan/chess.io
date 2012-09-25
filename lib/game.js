// imports
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// Piece
function Piece(type, team) { 
	
	this.type = type;
	this.team = team;
}

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// Constructor
function Game(gameID) { this.init(gameID); }

// Prototype
Game.prototype = {

	/* game state vars */
    board:	[	[new Piece('ROOK', 'A'), new Piece('KNIGHT', 'A'), new Piece('BISHOP', 'A'), new Piece('QUEEN', 'A'), new Piece('KING', 'A'), new Piece('BISHOP', 'A'), new Piece('KNIGHT', 'A'), new Piece('ROOK', 'A')],
				[new Piece('PAWN', 'A'), new Piece('PAWN', 'A'), new Piece('PAWN', 'A'), new Piece('PAWN', 'A'), new Piece('PAWN', 'A'), new Piece('PAWN', 'A'), new Piece('PAWN', 'A'), new Piece('PAWN', 'A')],
				[null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null],
				[new Piece('PAWN', 'B'), new Piece('PAWN', 'B'), new Piece('PAWN', 'B'), new Piece('PAWN', 'B'), new Piece('PAWN', 'B'), new Piece('PAWN', 'B'), new Piece('PAWN', 'B'), new Piece('PAWN', 'B')],
				[new Piece('ROOK', 'B'), new Piece('KNIGHT', 'B'), new Piece('BISHOP', 'B'), new Piece('QUEEN', 'B'), new Piece('KING', 'B'), new Piece('BISHOP', 'B'), new Piece('KNIGHT', 'B'), new Piece('ROOK', 'B')]	],
	whiteCaptured:	[],
	blackCaptured:	[],
	settings:		[],
	gameTime:		null,
	moveTime:		null,
	currentPlayer:	'WHITE',
	
	/* non gmae state vars */
	ID:			'',
	private:		false,
	
	init: function(gameID) {
		
		// init socket server
		var io = require('socket.io').listen(http);
		var self = this; 
		
		// listen for socket events
		io.sockets.on('connection', function(socket) {
			
			// Player connects
			socket.on('playerConnect', function(data) {

				// build player
				socket.username = data.username;
				socket.score = 0;
				if( io.sockets.clients().length == 1 )
					socket.team = 'A';
				else
					socket.team = 'B';
				
				// update players board
				socket.emit('gameUpdate', { board: self.board });
				
				// announce the event
				socket.emit('chatUpdate', { username: 'SERVER', message: 'You have joinned the game' });
				socket.broadcast.emit('chatUpdate', { username: 'SERVER', message: '<strong>' + socket.username + '</strong> has joinned the game'});							
			});
			
			// Recieve chat message
			socket.on('chatSend', function(data){
				
				io.sockets.emit('chatUpdate', { username: socket.username, message: data.message });
			});
			
			// Player disconnects
			socket.on('playerDisconnect', function(data) {
			

			});
		});			
	},
	
	calculateMoves: function() {
	
	},
	
	highlightMoves: function() {
	
	},
	
	movePiece: function() {
	
	}
}	

// export
exports.Game = function(io) {
	return new Game(io);
};