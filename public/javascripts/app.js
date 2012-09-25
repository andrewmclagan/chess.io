$.app = {

    screen: undefined,
	
	// executed as constructor 
	construct: function() {
        
		if ($.app.screen !== undefined) {
			
			// setup socket namespaces
			$.app.screen.systemServer = io.connect('http://localhost/lobby'); 
			$.app.screen.lobbyServer = io.connect('http://localhost/lobby'); 
			$.app.screen.gameServer = io.connect('http://localhost/game'); 
			
            $.app.screen.construct.call($.app.screen); // this var is not predefined?? performace issue???
        }	
	},

	// executed after the DOM is ready
    ready: function () {
	
        if ($.app.screen !== undefined) {
            $.app.screen.ready.call($.app.screen);
        }
    },
	
	// executed after the DOM has fully loaded 
    load: function () {
	
        if ($.app.screen !== undefined) {
            $.app.screen.load.call($.app.screen);
		}
	}
};
