/*
 * Cast screen, displays the cast UI
 * @package touchCast
 * @author Andrew McLagan
*/

function gameScreen() {}

gameScreen.prototype = {
	
	// executed as constructor
	construct: function() {
		
		// game state vars 
		this.board =	[	[null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null]	];
		this.teamACaptured =	[];
		this.teamBCaptured =	[];
		this.settings =			[];
		this.gameTime =			null;
		this.moveTime =			null;

		// define socket listners
		this.socket.on('chatUpdate', this.chatUpdate.bind(this));
		this.socket.on('gameUpdate', this.gameUpdate.bind(this));
		
		// connect to game server
		this.gameConnect(prompt('username'));
	},
	
	// executed on DOM ready
    ready: function () { 
	
		// define event handlers
		$('#send-message').bind('click', this.chatSend.bind(this)); 			
		$('#game-board').find('li').not('.tag').bind('hover', this.positionHover.bind(this));
    },
	
	// executed after the document has fully loaded 
    load: function () {
		
	},	
	
	// connect to the game server
	gameConnect: function(username) {
	
		this.socket.emit('playerConnect',{ username: username });
	},
	
	// updates the game board
	gameUpdate: function(data) {

		this.board = data.board;
		this.renderGameBoard(this.board);
	},
	
	// updates the chat board
	chatUpdate: function(data) {

		this.renderChatBoard(data.username,data.message);
	},
	
	// send a chat message
	chatSend: function() {

		var $messageNode = $('#message'),
			$buttonNode = $('#send-message')
			message = $messageNode.val();
			
		$messageNode.val('');
		this.socket.emit('chatSend',{ message: message });
	},
	
	calculateMoves: function(position) {
	
		// retrueve piece
		var piece = this.board[position[0],position[1]];
	
		// is this players piece ?
		if( 1 ) {
			
			var validPositions = [];
			
			// calculate all valid moves for this piece
			if(Piece.type == 'PAWN') {
				//forward
				//diagonal forward right
				//diagonal forward left
			}
			if(Piece.type == 'ROOK') {
				//forward
				//left
				//backwards
				//right
			}
			if(Piece.type == 'KNIGHT') {
				//forward 2 left 1
				//forward 1 left 2
				//forward 2 right 1
				//forward 1 right 2
				//backward 2 left 1
				//backward 1 left 2
				//backward 2 right 1
				//backward 1 right 2								
			}
			if(Piece.type == 'BISHOP') {
				//diagonal forward right
				//diagobal backwards right
				//diagonal backwards left
				//diagonal forwards right
			}
			if(Piece.type == 'QUEEN') {
				// forwards
				// forwards diagonal right 
				// right
				// backwards diagonal right
				// backwards
				// backwards diagonal left
				// left
				// forwards diagonal left
			}
			if(Piece.type == 'KING') {
				// forwards
				// forwards diagonal right 
				// right
				// backwards diagonal right
				// backwards
				// backwards diagonal left
				// left
				// forwards diagonal left			
			}			
		}
	},
	
	
	
	//////// maybe move these rener funcs to their own file and object and sctructure, totally encapsulated
	//////////////////
	//////////////////
	renderGameBoard: function(board) {

		// cache jquery nodes
		// need to do object level caching to save CPU when accessing this func multiple times
		// precahce all the board tiles into memory in the constructor loop'em
		var $gameBoardNode = $('#game-board');
			
		// render board
		for( var r = 0; r < board.length; r++ ) { // get first row
		
			for( var p = 0; p < board[r].length; p++ ) { // get first position
			
				if( board[r][p] ) {
					$('#r'+r+'p'+p).html(board[r][p].type);
					$('#r'+r+'p'+p).addClass('type-' + board[r][p].id);
				}
			}
		}
		
	},
	
	renderChatBoard: function(username, message) {
	
		// ALSO CAHCE THIS OBJECT
		// so pretty much on boot cache in the view ... thingy u make
		$('#chat-board').html( function(index, oldHTML){
		
			return oldHTML + '<div class="chat-item"><span class="chat-username">' + username + ':  </span><span class="chat-msg">' + message + '</span></div>';
		});	
	},
	
	positionHover: function(e) {
	
		var $target = $(e.target),
			position = [$(e.target).attr('id')[1], $(e.target).attr('id')[3]];
		
		// tile background hover
		if(e.type == "mouseenter")
			$target.css('background-color','#eee'); // change this to add class !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
		else if(e.type === 'mouseleave') 
			$target.css('background-color','#fff'); // change this to add class !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
		
		// path highlight
		var validMoves = this.calculateMoves(position);
	}
	
}