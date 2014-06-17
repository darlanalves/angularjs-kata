$module.config(['$stateProvider',
	function($stateProvider) {
		var states = {
			'index': {
				url: '',
				controller: ['$state',
					function($state) {
						$state.go('todo-list');
					}
				]
			},
			'todo-list': {
				url: '/tasks',
				templateUrl: '/task/list.html',
				controller: 'TaskListController'
			},

			'todo-create': {
				url: '/tasks/new',
				templateUrl: '/task/create.html',
				controller: 'TaskCreateController'
			},

			'todo-view': {
				url: '/tasks/:taskId',
				templateUrl: '/task/view.html',
				controller: 'TaskViewController'
			}
		};

		angular.forEach(states, function(config, name) {
			$stateProvider.state(name, config);
		});
	}
]);