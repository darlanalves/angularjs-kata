(function(undefined){

var $module = angular.module('todo', ['ui.router']);
$module.config(['$stateProvider',
	function($stateProvider) {
		var states = {
			'todo-list': {
				url: '/tasks',
				templateUrl: 'task.list.html',
				controller: 'TaskListController'
			},

			'todo-create': {
				url: '/tasks/new',
				templateUrl: 'task.create.html',
				controller: 'TaskCreateController'
			},

			'todo-view': {
				url: '/tasks/:taskId',
				templateUrl: '/task.view.html',
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
		$scope.task = {};

		$scope.saveTask = function() {
			TaskService.save($scope.task);
		};
	}
]);
$module.controller('TaskListController', ['$scope', 'TaskService',
	function($scope, TaskService) {
		$scope.taskList = TaskService.findAll();
	}
]);
$module.service('TaskService', ['$http',
	function($http) {
		return {
			findAll: function() {
				return $http.get('/api/task')
			},

			save: function(task) {
				return $http.post('/api/task', JSON.stringify(task));
			},

			findOne: function(id) {
				return $http.get('/api/task/' + id);
			}
		};
	}
]);
$module.controller('TaskViewController', ['$scope', 'TaskService', '$stateParams',
	function($scope, TaskService, $stateParams) {
		$scope.task = TaskService.findOne($stateParams.taskId);
	}
]);
}());