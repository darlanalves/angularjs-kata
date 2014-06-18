describe('HomeController', function() {
	var $controller, $scope, controller = 'HomeController';

	beforeEach(module('todo-dev'));
	beforeEach(inject(function($rootScope, _$controller_) {
		$controller = _$controller_;
		$scope = $rootScope.$new();
	}));

	describe('the controller loads the task list when is loaded', function() {
		it('should put the task list on $scope.tasks', inject(function($q) {
			var TaskService = {
					findAll: function() {}
				},
				deferred = $q.defer(),
				taskList = [];

			spyOn(TaskService, 'findAll').andReturn(deferred.promise);

			$controller(controller, {
				$scope: $scope,
				TaskService: TaskService
			});

			deferred.resolve(taskList);
			$scope.$root.$digest();
			expect($scope.tasks).toBe(taskList);
		}));

		it('should put an empty array $scope.tasks in case of failure', inject(function($q) {
			var TaskService = {
					findAll: function() {}
				},
				deferred = $q.defer(),
				taskList = [];

			spyOn(TaskService, 'findAll').andReturn(deferred.promise);

			$controller(controller, {
				$scope: $scope,
				TaskService: TaskService
			});

			deferred.reject(new Error());
			$scope.$root.$digest();
			expect($scope.tasks instanceof Array).toBe(true);
			expect($scope.tasks.length).toBe(0);
		}));
	});
});