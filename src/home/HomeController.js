$module.controller('HomeController', ['$scope', 'TaskService',
	function($scope, TaskService) {
		TaskService.findAll().then(function(list) {
			$scope.tasks = list;
		}, function() {
			$scope.tasks = [];
		});
	}
]);