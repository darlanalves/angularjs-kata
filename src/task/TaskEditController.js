$module.controller('TaskEditController', ['$scope', 'TaskService', '$stateParams',
	function($scope, TaskService, $stateParams) {
		$scope.task = TaskService.findOne($stateParams.taskId);
	}
]);