describe('TaskListController:', function() {
	beforeEach(module('unit-testing'));

	var controllerScope,
		TaskService;

	beforeEach(inject(function($rootScope) {
		controllerScope = $rootScope.$new();

		TaskService = {
			findAll: function() {}
		};
	}));

	describe('when the controller runs', function() {
		it('should list all tasks', inject(function($controller) {
			var taskList = [],
				listSpy = spyOn(TaskService, 'findAll').andReturn(taskList);

			$controller('TaskListController', {
				$scope: controllerScope,
				TaskService: TaskService
			});

			expect(listSpy).toHaveBeenCalled();
			expect(controllerScope.taskList).toBe(taskList);
		}));
	});
});