$module.controller('TaskCreateController', ['$scope', 'TaskService',
	function($scope, TaskService) {
		$scope.task = {};

		$scope.saveTask = function() {
			TaskService.save($scope.task);
		};
	}
]);