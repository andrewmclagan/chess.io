chess.io
========

A chess game server and client implimented with socket.io and node.js.

Documentation
=============

game.core
---------
	+ board
	+ capturedWhite
	+ capturedBlack
    + currentPlayer
	+ gameID
	- movePiece
	- calulateMove
	- getMovePath
	- getGameState

game.server
-----------
	- clientLobbyConnect
	- clientGameConnect
	- clientLobbyDisconnect
	- clientGameDisconnect
	- clientChatSend

game.client
-----------
	+ render (view renderer)
	- serverGameUpdate
	- serverChatUpdate

game.matrix
-----------
	- 
