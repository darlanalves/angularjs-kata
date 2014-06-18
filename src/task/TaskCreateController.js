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