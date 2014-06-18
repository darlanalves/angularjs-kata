describe('TaskEditController:', function() {
	beforeEach(module('todo-dev'));

	var controllerScope,
		TaskService;

	beforeEach(inject(function($rootScope) {
		controllerScope = $rootScope.$new();

		TaskService = {
			findOne: function(task) {
				return {
					id: 45,
					title: 'test'
				};
			}
		};
	}));

	it('should show one task', inject(function($controller) {
		var viewSpy = spyOn(TaskService, 'findOne').andCallThrough(),
			$stateParams = {
				taskId: 1
			};

		$controller('TaskEditController', {
			$scope: controllerScope,
			TaskService: TaskService,
			$stateParams: $stateParams
		});

		expect(viewSpy).toHaveBeenCalledWith($stateParams.taskId);
		expect(controllerScope.task).toBeDefined();
	}));

});