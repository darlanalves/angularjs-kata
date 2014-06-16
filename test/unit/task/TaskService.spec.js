describe('TaskService:', function() {
	var $httpBackend;

	beforeEach(module('todo'));

	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	it('findAll(): should load a list of tasks', inject(function(TaskService) {
		$httpBackend.expectGET('/api/task');
		TaskService.findAll();
		$httpBackend.flush();
	}));

	it('findOne(id): should fetch a tasks', inject(function(TaskService) {
		$httpBackend.expectGET(/\/api\/task\/.+/);
		TaskService.findOne();
		$httpBackend.flush();
	}));

	it('save(task): should save a task', inject(function(TaskService) {
		$httpBackend.expectPOST('/api/task');
		TaskService.save({});
		$httpBackend.flush();
	}))

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
});