function gameScreen() {}

gameScreen.prototype = {

	// executed on DOM ready
    ready: function () { 
	
		// define event handlers
		$('#send-message').bind('click', this.chatSend.bind(this)); 			
		$('#game-board').find('li').not('.tag').bind('hover', this.positionHover.bind(this));
    },
	
	// executed after the document has fully loaded 
    load: function () {
		
	},	
		
	// send a chat message
	chatSend: function() {

		var $messageNode = $('#message'),
			$buttonNode = $('#send-message')
			message = $messageNode.val();
			
		$messageNode.val('');
		this.socket.emit('chatSend',{ message: message });
	},
	
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
