describe('TaskListController:', function() {
	var $controller, $scope, controller = 'TaskListController';

	beforeEach(module('todo-dev'));
	beforeEach(inject(function($rootScope, _$controller_) {
		$scope = $rootScope.$new();
		$controller = _$controller_;
	}));

	describe('the user can see a list of all tasks', function() {
		it('should load a list of all tasks and write it to $scope.taskList', inject(function($q) {
			var taskList = [],
				deferred = $q.defer(),
				TaskService = {
					findAll: function() {}
				},
				listSpy = spyOn(TaskService, 'findAll').andReturn(deferred.promise);

			$controller('TaskListController', {
				$scope: $scope,
				TaskService: TaskService
			});

			deferred.resolve(taskList);
			$scope.$root.$digest();
			expect($scope.taskList).toBe(taskList);
		}));
	});

	describe('$scope.updateTask(task): the user can change task properties', function() {
		it('should have a method that updates the task when it changes', inject(function($q) {
			var TaskService = {
					save: function() {},
					findAll: function() {
						var defer = $q.defer();
						defer.resolve([]);
						return defer.promise;
					}
				},

				saveSpy = spyOn(TaskService, 'save')

			$controller('TaskListController', {
				$scope: $scope,
				TaskService: TaskService
			});

			var task = {};

			expect(typeof $scope.updateTask).toBe('function');
			$scope.updateTask(task);

			expect(saveSpy).toHaveBeenCalledWith(task);
		}));
	});
});