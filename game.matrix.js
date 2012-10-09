function moveMatrix() {}

moveMatrix.prototype = {

	/* game board */
	board:		[	[false,false,false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false,false,false],
				[false,false,    0,    1,    2,    3,    4,    5,    6,    7,false,false],
				[false,false,    8,    9,   10,   11,   12,   13,   14,   15,false,false],
				[false,false,   16,   17,   18,   19,   20,   21,   22,   23,false,false],
				[false,false,   24,   25,   26,   27,   28,   29,   30,   31,false,false],
				[false,false,   32,   33,   34,   35,   36,   37,   38,   39,false,false],
				[false,false,   40,   41,   42,   43,   44,   45,   46,   47,false,false],
				[false,false,   48,   49,   50,   51,   52,   53,   54,   55,false,false],
				[false,false,   56,   57,   58,   59,   60,   61,   62,   63,false,false],
				[false,false,false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false,false,false]	],
				
	saveMoves: function() {

		/* PAWNS */
		this.findMoves('WHITEPAWN',this.moveWhitePawn.bind(this));	// PAWN
		this.findMoves('BLACKPAWN',this.moveBlackPawn.bind(this));	// PAWN
		
		/* MISC */
		this.findMoves('ROOK',this.moveRook.bind(this));		// ROOK		
		this.findMoves('KNIGHT',this.moveKnight.bind(this));		// KNIGHT		
		this.findMoves('BISHOP',this.moveBishop.bind(this));		// BISHOP		
		this.findMoves('QUEEN',this.moveQueen.bind(this));		// QUEEN			
		this.findMoves('KING',this.moveKing.bind(this));		// KING
	},
	
	// finds all possible moves on a square for a piece,
	findMoves: function(piece, pieceCallback) {
	
		var validPositions = [];
	
		for(var row = 3; row < 11; row++) { // get first row proper
			for(var col = 2; col < 10; col++) { // get first column proper
				validPositions = pieceCallback(row,col);
				this.saveMove(piece, validPositions, row, col);
			}
		}	
	},
	
	// saves a pieces possible moves for a particular orginating position on the board to the database
	saveMove: function(piece, validPositions, row, col) {
		console.log(piece);
		console.log('ROW: '+row+' COL: '+col);
		console.log(validPositions);
	},
	
	/* Piece Moves */
	
	moveWhitePawn: function(row, col) {
		var validPositions = [];
		if(row == 9) {
			validPositions = validPositions.concat(this.pathNorth(2,row,col));
			validPositions = validPositions.concat(this.pathNorthEast(1,row,col));
			validPositions = validPositions.concat(this.pathNorthWest(1,row,col));
		}
		else {
			validPositions = validPositions.concat(this.pathNorth(1,row,col));
			validPositions = validPositions.concat(this.pathNorthEast(1,row,col));
			validPositions = validPositions.concat(this.pathNorthWest(1,row,col));
		}
		
		return validPositions;	
	},
	
	moveBlackPawn: function(row, col) {
		var validPositions = [];
		if(row == 4) {
			validPositions = validPositions.concat(this.pathSouth(2,row,col));
			validPositions = validPositions.concat(this.pathSouthEast(1,row,col));
			validPositions = validPositions.concat(this.pathSouthWest(1,row,col));
		}
		else {
			validPositions = validPositions.concat(this.pathSouth(1,row,col));
			validPositions = validPositions.concat(this.pathSouthEast(1,row,col));
			validPositions = validPositions.concat(this.pathSouthWest(1,row,col));
		}
		
		return validPositions;		
	},

	moveRook: function(row, col) {
		var validPositions = [];
		validPositions = validPositions.concat(this.pathNorth(8,row,col));
		validPositions = validPositions.concat(this.pathEast(8,row,col));
		validPositions = validPositions.concat(this.pathSouth(8,row,col));
		validPositions = validPositions.concat(this.pathWest(8,row,col));
		
		return validPositions;
	},

	moveKnight: function(row, col) {
		var validPositions = [];
		
		if(arrayTemp = this.pathKnightNorthEast(row,col))
			validPositions = validPositions.concat(arrayTemp);
		if(arrayTemp =  this.pathKnightNorthEastEast(row,col))
			validPositions = validPositions.concat(arrayTemp);
		if(arrayTemp =  this.pathKnightSouthEast(row,col))
			validPositions = validPositions.concat(arrayTemp);
		if(arrayTemp =  this.pathKnightSouthEastEast(row,col))
			validPositions = validPositions.concat(arrayTemp);
		if(arrayTemp =  this.pathKnightSouthWest(row,col))
			validPositions = validPositions.concat(arrayTemp);
		if(arrayTemp =  this.pathKnightSouthWestWest(row,col))
			validPositions = validPositions.concat(arrayTemp);
		if(arrayTemp =  this.pathKnightNorthWest(row,col))
			validPositions = validPositions.concat(arrayTemp);
		if(arrayTemp =  this.pathKnightNorthWestWest(row,col))
			validPositions = validPositions.concat(arrayTemp);
		
		return validPositions;	
	},

	moveBishop: function(row, col) {
		var validPositions = [];
		validPositions = validPositions.concat(this.pathNorthEast(8,row,col));
		validPositions = validPositions.concat(this.pathSouthEast(8,row,col));
		validPositions = validPositions.concat(this.pathSouthWest(8,row,col));
		validPositions = validPositions.concat(this.pathNorthWest(8,row,col));
		
		return validPositions;	
	},

	moveQueen: function(row, col) {
		var validPositions = [];
		validPositions = validPositions.concat(this.pathNorth(8,row,col));
		validPositions = validPositions.concat(this.pathNorthEast(8,row,col));
		validPositions = validPositions.concat(this.pathEast(8,row,col));
		validPositions = validPositions.concat(this.pathSouthEast(8,row,col));
		validPositions = validPositions.concat(this.pathSouth(8,row,col));
		validPositions = validPositions.concat(this.pathSouthWest(8,row,col));
		validPositions = validPositions.concat(this.pathWest(8,row,col));
		validPositions = validPositions.concat(this.pathNorthWest(8,row,col));
		
		return validPositions;	
	},

	moveKing: function(row, col) {
		var validPositions = [];
		validPositions = validPositions.concat(this.pathNorth(1,row,col));
		validPositions = validPositions.concat(this.pathNorthEast(1,row,col));
		validPositions = validPositions.concat(this.pathEast(1,row,col));
		validPositions = validPositions.concat(this.pathSouthEast(1,row,col));
		validPositions = validPositions.concat(this.pathSouth(1,row,col));
		validPositions = validPositions.concat(this.pathSouthWest(1,row,col));
		validPositions = validPositions.concat(this.pathWest(1,row,col));
		validPositions = validPositions.concat(this.pathNorthWest(1,row,col));
		
		return validPositions;		
	},	
	
	/* Move Paths */

	// north *
	pathNorth: function(pathLength,currentRow,currentCol) {
		var validPositions = [];
		var i = 0;
		for(var row = (currentRow - 1); row > 0; row--) { 
			if(this.board[row][currentCol] !== false && i < pathLength)
				validPositions.push(this.board[row][currentCol]);
			i++;
		}
		return { path: 'N', positions: validPositions };
	},
	
	// north east *
	pathNorthEast: function(pathLength,currentRow,currentCol) {
		var validPositions = [];
		var i = 0;
		for(var row = (currentRow - 1), col = (currentCol + 1); row > 0 && col < this.board[0].length; row--) { // move north one and east one
			if(this.board[row][col] !== false && i < pathLength)
				validPositions.push(this.board[row][col]);
			i++;
			col++;
		}
		return { path: 'NE', positions: validPositions };
	},
	
	// east *
	pathEast: function(pathLength,currentRow,currentCol) {
		var validPositions = [];
		var i = 0;
		for(var col = (currentCol + 1); col < this.board[0].length; col++) { // move east one
			if(this.board[currentRow][col] !== false && i < pathLength)
				validPositions.push(this.board[currentRow][col]);
			i++;
		}
		return { path: 'E', positions: validPositions };
	},
	
	// south east *
	pathSouthEast: function(pathLength,currentRow,currentCol) {
		var validPositions = [];
		var i = 0;
		for(var row = (currentRow + 1), col = (currentCol + 1); row < this.board.length && col < this.board[0].length; row++) { // south one and east one
			if(this.board[row][col] !== false && i < pathLength)
				validPositions.push(this.board[row][col]);
			i++;
			col++;
		}
		return { path: 'SE', positions: validPositions };
	},			
	
	// south *
	pathSouth: function(pathLength,currentRow,currentCol) {
		var validPositions = [];
		var i = 0;
		for(var row = (currentRow + 1); row < this.board.length; row++) { 
			if(this.board[row][currentCol] !== false && i < pathLength)
				validPositions.push(this.board[row][currentCol]);
			i++;
		}
		return { path: 'S', positions: validPositions };
	},
	
	// south west *
	pathSouthWest: function(pathLength,currentRow,currentCol) {
		var validPositions = [];
		var i = 0;	
		for(var row = (currentRow + 1), col = (currentCol - 1); row < this.board.length && col > 0; row++) { // south one and west one
			if(this.board[row][col] !== false && i < pathLength)
				validPositions.push(this.board[row][col]);
			i++;
			col--;
		}
		return { path: 'SW', positions: validPositions };
	},
	
	// west *
	pathWest: function(pathLength,currentRow,currentCol) {
		var validPositions = [];
		var i = 0;
		for(var col = (currentCol - 1); col > 0; col--) { 
			if(this.board[currentRow][col] !== false && i < pathLength)
				validPositions.push(this.board[currentRow][col]);
			i++;
		}
		return { path: 'W', positions: validPositions };
	},	
	
	// north west *
	pathNorthWest: function(pathLength,currentRow,currentCol) {
		var validPositions = [];
		var i = 0;
		for(var row = (currentRow - 1), col = (currentCol - 1); row > 0 && col > 0; row--) { // north one and west one
			if(this.board[row][col] !== false && i < pathLength)
				validPositions.push(this.board[row][col]);
			i++;
			col--;		
		}
		return { path: 'NW', positions: validPositions };
	},
	
	/* Knight Move Paths */
	
	// ## *
	// #
	// #
	pathKnightNorthEast: function(currentRow,currentCol) {
		var validPositions = [];
		var falseMove = false;
		
		if(this.board[(currentRow-1)][(currentCol)] !== false)	// move north one
			validPositions.push(this.board[(currentRow-1)][(currentCol)]);
		if(this.board[(currentRow-2)][(currentCol)] !== false)	// move north two
			validPositions.push(this.board[(currentRow-2)][(currentCol)]);
		if(this.board[(currentRow-3)][(currentCol)] !== false)	// move north three
			validPositions.push(this.board[(currentRow-3)][(currentCol)]);					
		if(this.board[(currentRow-3)][(currentCol+1)] !== false) {	// move north three, east one
			validPositions.push(this.board[(currentRow-3)][(currentCol+1)]);
			return { path: 'KNE', positions: validPositions };
		}
		else 
			return false;
	},
	
	// ### *
	// #
	pathKnightNorthEastEast: function(currentRow,currentCol) {
		var validPositions = [];
		
		if(this.board[(currentRow-1)][(currentCol)] !== false)	// move north one
			validPositions.push(this.board[(currentRow-1)][(currentCol)]);				
		if(this.board[(currentRow-2)][(currentCol)] !== false)	// move north two
			validPositions.push(this.board[(currentRow-2)][(currentCol)]);				
		if(this.board[(currentRow-2)][(currentCol+1)] !== false)	// move north two, east one
			validPositions.push(this.board[(currentRow-2)][(currentCol+1)]);				
		if(this.board[(currentRow-2)][(currentCol+2)] !== false) {	// move north two, east two
			validPositions.push(this.board[(currentRow-2)][(currentCol+2)]);				
			return { path: 'KNEE', positions: validPositions };
		}
		else 
			return false;
	},
	
	// ## *
	//  #
	//  #
	pathKnightNorthWest: function(currentRow,currentCol) {
		var validPositions = [];
		
		if(this.board[(currentRow-1)][(currentCol)] !== false)	// move north one
			validPositions.push(this.board[(currentRow-1)][(currentCol)]);				
		if(this.board[(currentRow-2)][(currentCol)] !== false)	// move north two
			validPositions.push(this.board[(currentRow-2)][(currentCol)]);				
		if(this.board[(currentRow-3)][(currentCol)] !== false)	// move north three
			validPositions.push(this.board[(currentRow-3)][(currentCol)]);				
		if(this.board[(currentRow-3)][(currentCol-1)] !== false) {	// move north three, west one
			validPositions.push(this.board[(currentRow-3)][(currentCol-1)]);				
			return { path: 'KNW', positions: validPositions };
		}
		else 
			return false;		
	},
	
	// ### *
	//   #
	pathKnightNorthWestWest: function(currentRow,currentCol) {
		var validPositions = [];
		
		if(this.board[(currentRow-1)][(currentCol)] !== false)	// move north one
			validPositions.push(this.board[(currentRow-1)][(currentCol)]);				
		if(this.board[(currentRow-2)][(currentCol)] !== false)	// move north two
			validPositions.push(this.board[(currentRow-2)][(currentCol)]);				
		if(this.board[(currentRow-2)][(currentCol-1)] !== false)	// move north two, west one
			validPositions.push(this.board[(currentRow-2)][(currentCol-1)]);				
		if(this.board[(currentRow-2)][(currentCol-2)] !== false) {	// move north two, west two
			validPositions.push(this.board[(currentRow-2)][(currentCol-2)]);				
			return { path: 'KNWW', positions: validPositions };
		}
		else 
			return false;		
	},
	
	// #  *
	// #
	// ##
	pathKnightSouthEast: function(currentRow,currentCol) {
		var validPositions = [];
		
		if(this.board[(currentRow+1)][(currentCol)] !== false)	// move south one
			validPositions.push(this.board[(currentRow+1)][(currentCol)]);				     
		if(this.board[(currentRow+2)][(currentCol)] !== false)	// move south two
			validPositions.push(this.board[(currentRow+2)][(currentCol)]);				
		if(this.board[(currentRow+3)][(currentCol)] !== false)	// move south three
			validPositions.push(this.board[(currentRow+3)][(currentCol)]);				
		if(this.board[(currentRow+3)][(currentCol+1)] !== false) {	// move south three, east one
			validPositions.push(this.board[(currentRow+3)][(currentCol+1)]);				
			return { path: 'KSE', positions: validPositions };
		}
		else 
			return false;		
	}, 
	
	// #   *
	// ###
	pathKnightSouthEastEast: function(currentRow,currentCol) {
		var validPositions = [];
		
		if(this.board[(currentRow+1)][(currentCol)] !== false)	// move south one
			validPositions.push(this.board[(currentRow+1)][(currentCol)]);				
		if(this.board[(currentRow+2)][(currentCol)] !== false)	// move south two
			validPositions.push(this.board[(currentRow+2)][(currentCol)]);				
		if(this.board[(currentRow+2)][(currentCol+1)] !== false)	// move south two, east one
			validPositions.push(this.board[(currentRow+2)][(currentCol+1)]);				
		if(this.board[(currentRow+2)][(currentCol+2)] !== false) {	// move south two, east two
			validPositions.push(this.board[(currentRow+2)][(currentCol+2)]);				
			return { path: 'KSEE', positions: validPositions };
		}
		else 
			return false;		
	},
	
	//  # *
	//  #
	// ##
	pathKnightSouthWest: function(currentRow,currentCol) {
		var validPositions = [];
		
		if(this.board[(currentRow+1)][(currentCol)] !== false)	// move south one
			validPositions.push(this.board[(currentRow+1)][(currentCol)]);				
		if(this.board[(currentRow+2)][(currentCol)] !== false)	// move south two
			validPositions.push(this.board[(currentRow+2)][(currentCol)]);				
		if(this.board[(currentRow+3)][(currentCol)] !== false)	// move south three
			validPositions.push(this.board[(currentRow+3)][(currentCol)]);				
		if(this.board[(currentRow+3)][(currentCol-1)] !== false) {	// move south three, east one
			validPositions.push(this.board[(currentRow+3)][(currentCol-1)]);				
			return { path: 'KSW', positions: validPositions };
		}
		else 
			return false;		
	},
	
	//   # *
	// ###
	pathKnightSouthWestWest: function(currentRow,currentCol) {
		var validPositions = [];
		
		if(this.board[(currentRow+1)][(currentCol)] !== false)	// move south one
			validPositions.push(this.board[(currentRow+1)][(currentCol)]);				
		if(this.board[(currentRow+2)][(currentCol)] !== false)	// move south two
			validPositions.push(this.board[(currentRow+2)][(currentCol)]);				
		if(this.board[(currentRow+2)][(currentCol-1)] !== false)	// move south two, west one
			validPositions.push(this.board[(currentRow+2)][(currentCol-1)]);				
		if(this.board[(currentRow+2)][(currentCol-2)] !== false) {	// move south two, west two
			validPositions.push(this.board[(currentRow+2)][(currentCol-2)]);				
			return { path: 'KSWW', positions: validPositions };
		}
		else 
			return false;		
	}
}
