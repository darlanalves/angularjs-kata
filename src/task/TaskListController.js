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