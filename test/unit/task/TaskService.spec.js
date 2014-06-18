describe('TaskService:', function() {
	var $httpBackend;

	beforeEach(module('todo-dev'));

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('save(task)', function() {
		it('should save a task and do not persist private properties as task properties', inject(function(TaskService, $rootScope) {
			var response,
				task = {
					$$id: 123,
					title: 'Foo'
				};

			runs(function() {
				function continueTest(response_) {
					response = response_;
				}

				$httpBackend.when('POST', '/api/task').respond(201, {
					title: 'Foo'
				});
				TaskService.save(task).then(continueTest, continueTest);
				$httpBackend.flush();
			});

			waitsFor(function() {
				return response;
			}, 'the task to be saved', 100);

			runs(function() {
				expect(typeof response).toBe('object')
				expect(response.title).toBe(task.title);
				expect(response.$$id).toBeUndefined();
			});
		}));
	});

	describe('findAll()', function() {
		it('should load a list of tasks', inject(function(TaskService) {
			var list;

			runs(function() {
				$httpBackend.whenGET('/api/task').respond(function() {
					return [200, [{
						id: 123,
						title: 'Task'
					}]];
				});

				TaskService.findAll().then(function(response) {
					list = response.data;
				}, function() {
					list = null;
				});

				$httpBackend.flush();
			});

			waitsFor(function() {
				return list;
			}, 'the list of tasks', 100);

			runs(function() {
				expect(list instanceof Array).toBe(true);
			});
		}));
	});

	describe('findOne(id)', function() {
		it('should fetch a task', inject(function(TaskService) {
			var taskResponse,
				task = {
					id: 123,
					title: 'Sample task'
				};

			runs(function() {
				$httpBackend.whenGET(/^\/api\/task\/[^\/]+$/).respond(200, task);
				TaskService.findOne().then(function(response) {
					taskResponse = response;
				});
				$httpBackend.flush();
			});

			waitsFor(function() {
				return taskResponse;
			}, 'a task to be loaded', 100);

			runs(function() {
				expect(taskResponse.id).toBeDefined();
				expect(taskResponse.title).toBe(task.title);
			});
		}));
	});

	describe('remove(id)', function() {
		it('should remove a task', inject(function($httpBackend, TaskService) {
			var response;

			runs(function() {
				$httpBackend.whenDELETE('/api/task/123').respond(200);
				TaskService.remove(123).then(function(response_) {
					response = response_;
				});
				$httpBackend.flush();
			});

			waitsFor(function() {
				return response;
			}, 'a task to be removed', 100);

			runs(function() {
				expect(response.status).toBe(200);
			});
		}));
	});

});