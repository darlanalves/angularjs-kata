(function(undefined){

var $module = angular.module('todo', ['ui.router']);
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
$module.controller('HomeController', ['$scope', 'TaskService',
	function($scope, TaskService) {
		TaskService.findAll().then(function(list) {
			$scope.tasks = list;
		}, function() {
			$scope.tasks = [];
		});
	}
]);
$module.controller('TaskCreateController', ['$scope', 'TaskService',
	function($scope, TaskService) {
		$scope.task = {};

		$scope.saveTask = function($form) {
			if ($form && $form.$invalid) return;

			TaskService.save($scope.task).then(function(task) {
				$scope.task = task;

				if ($form) $form.$setPristine();
			});
		};
	}
]);
$module.controller('TaskEditController', ['$scope', 'TaskService', '$stateParams',
	function($scope, TaskService, $stateParams) {
		$scope.task = TaskService.findOne($stateParams.taskId);
	}
]);
$module.controller('TaskListController', ['$scope', 'TaskService',
	function($scope, TaskService) {
		TaskService.findAll().then(function(list) {
			$scope.taskList = list;
		});

		$scope.updateTask = function(task) {
			TaskService.save(task);
		};
	}
]);
$module.service('TaskService', ['$http',
	function($http) {
		function cleanupObject(object) {
			var o = angular.copy(object),
				privatePrefix = '$$';

			for (var i in o) {
				if (i.slice(0, 2) === privatePrefix) {
					delete o[i];
				}
			}

			return o;
		}

		return {
			findAll: function() {
				return $http.get('/api/task').then(function(response) {
					return response.data;
				});
			},

			findOne: function(id) {
				return $http.get('/api/task/' + id).then(function(response) {
					return response.data || {};
				});
			},

			save: function(task) {
				task = cleanupObject(task);

				var method = task.id ? 'put' : 'post',
					url = '/api/task' + (task.id ? '/' + task.id : '');

				return $http[method](url, JSON.stringify(task)).then(function(response) {
					return response.data || {};
				});
			},

			remove: function(id) {
				return $http.delete('/api/task/' + id);
			}
		};
	}
]);
}());