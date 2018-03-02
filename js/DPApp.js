/*global Backbone, DPApp:true, $ */

var DPApp = DPApp || {};

$(function () {
	'use strict';

	// After we initialize the app, we want to kick off the router
	// and controller, which will handle initializing our Views
	DPApp.App.on('start', function () {
		var controller = new DPApp.Controller();
		controller.router = new DPApp.Router({
			controller: controller
		});

		controller.start();
		Backbone.history.start();
	});

	// start the DPApp app (defined in js/DPApp.js)
	DPApp.App.start();
});
