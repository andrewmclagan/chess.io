
function lobbyScreen() {}

lobbyScreen.prototype = {

	// executed as constructor
	construct: function() {
	
		// define socket listners
		this.system.on('serverHandshake', this.handshake.bind(this)); 
		this.lobbyServer.on('serverChatSend', this.updateChat.bind(this));
		this.lobbyServer.on('serverGameList', this.updateGameList.bind(this)); 

		// connect to game server
		this.system.emit('playerHandshake', { playerID: 'alpha072' });
	},
	
	// default onReady function
    ready: function () { 
	
		// define event handlers
		$('#chat-send').bind('click', this.chatSend.bind(this)); 			
    },
	
	// executed after the document has fully loaded 
    load: function () {
	
	},	
	
	// handshake completed server response
	handshake: function(data) {
		
		if(data.status == 'CONNECTED') {
			this.lobbyServer.emit('playerConnect', {});
		}
		else {
			// display error data.message
		}
	},
	
	// update list of game instances
	updateGameList: function(data) {
	
		var $gameListNode = $('#game-list');

		if(data.gameInstances.length > 0) {
			for(var i = 0; i < data.gameInstances.length; i++) { 
				$gameListNode.append('<li>' + data.gameInstances[i].name + '</li>');
			}
		}
		else { 
			$gameListNode.html('<li>There are currently no games</li>');
		}
	},
	
	// updates chat board
	updateChat: function(data) {

		// ALSO CAHCE THIS OBJECT
		// so pretty much on boot cache in the view ... thingy u make
		$('#chat-board').html( function(index, oldHTML){
		
			return oldHTML + '<div class="chat-item"><span class="chat-username">' + data.username + ':  </span><span class="chat-msg">' + data.message + '</span></div>';
		});	
	},
	
	// send a chat message
	chatSend: function() {

		var $messageNode = $('#chat-message'),
			$buttonNode = $('#chat-send')
			message = $messageNode.val();
			
		$messageNode.val('');
		this.lobbyServer.emit('playerChatSend', { message: message });
	},	
}