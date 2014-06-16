angular.module('todo').run(function($httpBackend) {

	$httpBackend.whenGET('/api/task').respond(function(method, url, data) {
		var list = [
			makeTask(),
			makeTask()
		];

		return [200, list];
	});

	$httpBackend.whenPOST('/api/task').respond(function(method, url, data) {
		return 201;
	});

	$httpBackend.whenGET(/\/api\/task\/.+/).respond(function(method, url, data) {
		var task = makeTask();

		return [200, task];
	});

	$httpBackend.whenGET(/.* /).passThrough();
	$httpBackend.whenPOST(/.* /).passThrough();

	var $taskUid = 1;

	function makeTask() {
		$taskUid++;

		return {
			id: $taskUid,
			title: 'Task ' + $taskUid,
			done: Math.random() * 1 > 5 ? true : false
		};
	}
})