/*global DPApp:true, Backbone, $ */

var DPApp = DPApp || {};

(function () {
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	// TodoList Router
	// ---------------
	//
	// Handles a single dynamic route to show
	// the active vs complete todo items
	DPApp.Router = Mn.AppRouter.extend({
		appRoutes: {
			'*filter': 'filterItems'
		}
	});

	// TodoList Controller (Mediator)
	// ------------------------------
	//
	// Control the workflow and logic that exists at the application
	// level, above the implementation detail of views and models
	DPApp.Controller = Mn.Object.extend({

		initialize: function () {
			this.todoList = new DPApp.TodoList();
		},

		// Start the app by showing the appropriate views
		// and fetching the list of todo items, if there are any
		start: function () {
			this.showHeader(this.todoList);
			this.showFooter(this.todoList);
			this.showTodoList(this.todoList);
			this.showCanvas();
			this.todoList.on('all', this.updateHiddenElements, this);
			this.todoList.fetch();
		},

		updateHiddenElements: function () {
			$('#main, #footer').toggle(!!this.todoList.length);
		},

		showHeader: function (todoList) {
			var header = new DPApp.HeaderLayout({
				collection: todoList
			});
			DPApp.App.root.showChildView('header', header);
		},

		showFooter: function (todoList) {
			var footer = new DPApp.FooterLayout({
				collection: todoList
			});
			DPApp.App.root.showChildView('footer', footer);
		},

		showTodoList: function (todoList) {
			DPApp.App.root.showChildView('main', new DPApp.ListView({
				collection: todoList
			}));
		},

		showCanvas: function () {
			var canvas = new DPApp.RobotView();
			console.log(canvas);
			DPApp.App.root.showChildView('canvas', canvas);
		},

		// Set the filter to show complete or all items
		filterItems: function (filter) {
			var newFilter = filter && filter.trim() || 'all';
			filterChannel.request('filterState').set('filter', newFilter);
		}
	});
})();
