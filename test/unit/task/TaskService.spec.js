describe('TaskService:', function() {
	var $httpBackend;

	beforeEach(module('unit-testing'));

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('save(task)', function() {
		it('should save a task', inject(function(TaskService, $rootScope) {
			var response;

			runs(function() {
				var task = {
					id: 123,
					title: 'Foo'
				};

				function continueTest(response_) {
					response = response_;
				}

				$httpBackend.when('POST', '/api/task').respond(201, {
					success: true
				});
				TaskService.save(task).then(continueTest, continueTest);
				$httpBackend.flush();
			});

			waitsFor(function() {
				return response;
			}, 'the task to be saved', 100);

			runs(function() {
				expect(response).toBeDefined();
				expect(response.status).toBe(201);
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
		it('should fetch a tasks', inject(function(TaskService) {
			var response,
				task = {
					id: 123,
					title: 'Sample task'
				};

			runs(function() {
				$httpBackend.whenGET(/^\/api\/task\/[^\/]+$/).respond(200, task);
				TaskService.findOne().then(function(response_) {
					response = response_;
				});
				$httpBackend.flush();
			});

			waitsFor(function() {
				return response;
			}, 'a task to be loaded', 100);

			runs(function() {
				var task_ = response.data;

				expect(task_.id).toBeDefined();
				expect(task_.title).toBe(task.title);
			});
		}));
	});

});