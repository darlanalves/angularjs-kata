$module.controller('TaskListController', ['$scope', 'TaskService',
	function($scope, TaskService) {
		$scope.taskList = TaskService.findAll();
	}
]);