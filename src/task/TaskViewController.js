$module.controller('TaskViewController', ['$scope', 'TaskService', '$stateParams',
	function($scope, TaskService, $stateParams) {
		$scope.task = TaskService.findOne($stateParams.taskId);
	}
]);