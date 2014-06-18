describe('TaskCreateController:', function() {
	var $scope, $controller, controller = 'TaskCreateController';
	beforeEach(module('todo-dev'));
	beforeEach(inject(function($rootScope, _$controller_) {
		$scope = $rootScope.$new();
		$controller = _$controller_;
	}));

	describe('the user can go to a page to create a new task', function() {
		it('should create an empty task on scope', function() {
			$controller(controller, {
				$scope: $scope
			});

			expect(typeof $scope.task).toBe('object');
		});

		it('should have a method to save a task', function() {
			$controller(controller, {
				$scope: $scope
			});
			expect(typeof $scope.saveTask).toBe('function');
		});
	});

	describe('saveTask($form): the user asks to save a task', function() {
		it('should save the task and update $scope.task with the response from service', inject(function($q) {
			var TaskService = {
				save: function() {}
			};

			var deferred = $q.defer(),
				newTask = {
					id: 123,
					title: 'Foo'
				};

			spyOn(TaskService, 'save').andReturn(deferred.promise);

			$controller(controller, {
				$scope: $scope,
				TaskService: TaskService
			});

			var currentTask = $scope.task;
			$scope.saveTask();
			deferred.resolve(newTask);
			$scope.$root.$digest();

			expect($scope.task).toBe(newTask);
			expect($scope.task).not.toBe(currentTask);
		}));

		it('should reset the form to a pristine state if a FormController is passed to $scope.saveTask()', inject(function($q) {
			function noop() {};

			var TaskService = {
				save: noop
			};

			var $form = {
				$setPristine: noop
			};

			var newTask = {
					id: 123,
					title: 'Foo'
				},
				deferred = $q.defer();

			spyOn(TaskService, 'save').andReturn(deferred.promise);
			var pristineSpy = spyOn($form, '$setPristine');

			$controller(controller, {
				$scope: $scope,
				TaskService: TaskService
			});

			$scope.saveTask($form);
			deferred.resolve();
			$scope.$root.$digest();
			expect(pristineSpy).toHaveBeenCalled();
		}));

		it('should not continue if a FormController is passed in and it is invalid', function() {
			function noop() {};

			var TaskService = {
				save: noop
			};

			var $form = {
				$invalid: true,
				$setPristine: noop
			};

			var saveSpy = spyOn(TaskService, 'save'),
				pristineSpy = spyOn($form, '$setPristine');

			$controller(controller, {
				$scope: $scope,
				TaskService: TaskService
			});

			$scope.saveTask($form);

			expect(saveSpy).not.toHaveBeenCalled();
			expect(pristineSpy).not.toHaveBeenCalled();
		});
	});
});