(function(undefined){

var $module = angular.module('todo', ['ngMockE2E']);
$module.config(['$stateProvider',
	function($stateProvider) {
		var states = {
			'todo': {
				url: '',
				templateUrl: 'layout.html'
			},

			'todo.list': {
				url: '/tasks',
				templateUrl: 'task.list.html',
				controller: 'TaskListController'
			},

			'todo.create': {
				url: '/tasks/new',
				templateUrl: 'task.create.html',
				controller: 'TaskCreateController'
			},

			'todo.view': {
				url: '/tasks/:taskId',
				templateUrl: 'task.view.html',
				controller: 'TaskViewController'
			}
		};

		angular.forEach(states, function(config, name) {
			$stateProvider.state(name, config);
		});
	}
]);
$module.controller('TaskCreateController', ['$scope', 'TaskService',
	function($scope, TaskService) {

	}
]);
$module.controller('TaskListController', ['$scope', 'TaskService',
	function($scope, TaskService) {

	}
]);
$module.service('TaskService', ['$http',
	function($http) {
		return {
			findAll: function() {
				return $http.get('/api/task')
			},

			save: function(task) {
				return $http.post('/api/task', save);
			},

			findOne: function(id) {
				return $http.get('/api/task/' + id);
			}
		};
	}
]);
$module.controller('TaskViewController', ['$scope', 'TaskService',
	function($scope, TaskService) {

	}
]);
}());