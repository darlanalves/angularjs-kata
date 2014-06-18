$module.config(['$stateProvider',
	function($stateProvider) {
		var states = {
			'index': {
				url: '',
				controller: 'HomeController',
				templateUrl: '/home.html'
			},
			'task-list': {
				url: '/tasks',
				templateUrl: '/task/list.html',
				controller: 'TaskListController'
			},

			'task-create': {
				url: '/tasks/new',
				templateUrl: '/task/create.html',
				controller: 'TaskCreateController'
			},

			'task-edit': {
				url: '/tasks/:taskId',
				templateUrl: '/task/edit.html',
				controller: 'TaskEditController'
			}
		};

		angular.forEach(states, function(config, name) {
			$stateProvider.state(name, config);
		});
	}
]);