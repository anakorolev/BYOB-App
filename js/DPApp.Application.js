/*global Backbone, DPApp:true */

var DPApp = DPApp || {};

(function () {
	'use strict';

	var TodoApp = Mn.Application.extend({
		setRootLayout: function () {
			this.root = new DPApp.RootLayout();
		}
	});

	// The Application Object is responsible for kicking off
	// a Marionette application when its start function is called
	//
	// This application has a singler root Layout that is attached
	// before it is started.  Other system components can listen
	// for the application start event, and perform initialization
	// on that event
	DPApp.App = new TodoApp();

	DPApp.App.on('before:start', function () {
		DPApp.App.setRootLayout();
	});

})();
