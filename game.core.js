// Constructor
function gameCore() {}

// Prototype
gameCore.prototype = {

	board: 		new Uint8Array([  8,  9, 10, 11, 12, 10,  9,  8,
					  7,  7,  7,  7,  7,  7,  7,  7,
					  0,  0,  0,  0,  0,  0,  0,  0,
					  0,  0,  0,  0,  0,  0,  0,  0,
					  0,  0,  0,  0,  0,  0,  0,  0,
					  0,  0,  0,  0,  0,  0,  0,  0,
					  1,  1,  1,  1,  1,  1,  1,  1,
					  2,  3,  4,  5,  6,  4,  3,  2]),
	pieceMap: 	{1: { type: 'PAWN',	colour: 'WHITE' },
			2: { type: 'ROOK', 	colour: 'WHITE' },
			3: { type: 'KNIGHT', 	colour: 'WHITE' },
			4: { type: 'BISHOP', 	colour: 'WHITE' },
			5: { type: 'QUEEN', 	colour: 'WHITE' },
			6: { type: 'KING', 	colour: 'WHITE' },
			7: { type: 'PAWN', 	colour: 'BLACK' },
			8: { type: 'ROOK', 	colour: 'BLACK' },
			9: { type: 'KNIGHT', 	colour: 'BLACK' }, 
			10: { type: 'BISHOP', 	colour: 'BLACK' },
			11: { type: 'QUEEN', 	colour: 'BLACK' },
			12: { type: 'KING', 	colour: 'BLACK' } },
	whiteCaptured:	new Uint8Array(16),
	blackCaptured:	new Uint8Array(16),
	gameTime:	null,
	moveTime:	null,
	currentPlayer:	'WHITE',
	WPlayerID:	null,
	BPlayerID:	null,
	ID:		'',
	gameTitle:	'No Title',
	private:	false, 
	moveCache:	null,
	
	/* object constructor */
	constructor: function(gameState) {

		if(gameState.ID == null) {	// if new game
			this.ID = this.GUID();
		}
		this.updateGameState(gameState);
	},

	/* Moves a piece to given position */
	movePiece: function(pieceCode, curPos, destPos) {
		
		var piece = this.getPiece(pieceCode);
		var movePath = this.calculateMovePath(piece, this.getMovePath(piece, curPos, destPos)); // determine move path

		this.board[curPos] = 0; // remove piece from position

		if(movePath[lastArrayPos] == 'ENEMY' ) { // does destination have enemy (2 ways: look in last array pos, or loop array looking for destPos) choose ;east computation

			// move enemy to teamACaptured[]
			// increase teamScore
		}

		this.board[destPos] = pieceCode; // place piece in destination
	},

	/* calculates all possible moves for a piece  */
	calculateMoves: function(pieceCode, curPos) {

		var piece = this.getPiece(pieceCode),
		    validPositions = [];

		if(this.currentPlayer == piece.colour) {

			var movePaths = this.getMovePaths(piece, curPos);

			for(var i = 0; i < movePaths.length; i++ ) 
				validPositions.concat( this.calculateMovePath(piece, movePaths[i]) );
		}
	}
	
	/* Calculates obstacles and functions in a move path */
	calculateMovePath: function(pieceCode, movePath) {
		
		var validPositions = [];		

		if(this.currentPlayer == piece.colour) {	// is this players piece

			///////////////////switch it up
			if(piece.type == 'KNIGHT') {	// is piece KNIGHT

				// look for collision at end point with friendly

					// all moves in this path are invalid

				// look for collision at end point with enemy

					// mark end point position red
			}
			if(piece.type == 'PAWN') {	// is piece PAWN
	
				// look for collisions with friendlies

					// all moves in this path are invalid from this point

				// look for collision with enemies on non angled paths

					// all moves in this path are invalid from this point

				// look for collisions at angled paths

					// piece is enemy

						// highlight position red
	
					// piece is friendly || empty

						// remove the position 
	
				// look for last square promation

					// highlight position yellow
			}
			if(piece.type == 'KING') {	// is piece KING

				// has team caslted 
	
					// can team caslte

						// highlight appropriate rook square

				// look for collisions with friendlies

					// all moves in this path are invalid from this point

				// look for collision with enemies on non angled paths

					// all moves in this path are invalid from this point
			}
			if(piece.type == 'KING' || 'QUEEN' || 'BISHOP' ... ) {	// other pieces			

				// look for collisions with friendlies

					// remove positions in this direction from this position
	
				// look for collisions with enemies

					// mark position red
			}

			return validPositions;
		}
	},
	
	/* Return a movement paths for a piece from the DB */
	getMovePaths: function(piece, curPos) {
	
	},

        /* Return a movement path for a piece from the DB */
        getMovePath: function(piece, curPos, destPos) {

        }

	/* Returns parts of the gameState that have changed since last update */
	getGameState: function() {

		return {
			board: this.board,
			whiteCaptured: this.whieCaptured,
			blackCaptured: this.blackCaptured,
			gameTime: this.gameTime,
			moveTime: this.moveTime,
			currentPlayer: this.currentPlayer,
			ID: this.ID,
			private: this.private,	
		}
	},

	/* updates the game state vars */
	updateGameState: function(gameState) {
		
		var length = gameState.length;
		for(var i = 0; i < length; i++ ) {
			if(gameState[i] !== null) 
				this[gameState[i]] = gameState[i];
		}
	},

	/* Return a piece from a binary piece code */
        getPiece: function(pieceCode) {
		return this.pieceMap[pieceCode];
        },
	
	// generates a random GUID string
        GUID: function() {

                var S4 = function () {
                        return Math.floor( Math.random() * 0x10000 ).toString(16); /* 65536 */
                };

                return ( S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4() );
        }
}	

// export
exports.Game = function() {
	return new gameCore();
};
