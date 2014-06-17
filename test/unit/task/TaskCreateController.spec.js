describe('TaskCreateController:', function() {
	beforeEach(module('unit-testing'));

	var controllerScope, TaskService;
	beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
		controllerScope = $rootScope.$new();

		TaskService = {
			save: function(task) {

			}
		};

		$controller('TaskCreateController', {
			$scope: controllerScope,
			TaskService: TaskService
		});
	}));

	it('should save a task', function() {
		expect(controllerScope.saveTask).not.toBeUndefined();
		expect(typeof controllerScope.saveTask === "function").toBe(true);

		var saveSpy = spyOn(TaskService, 'save'),
			task = {};

		controllerScope.saveTask(task);

		expect(saveSpy).toHaveBeenCalled();
	});
});