angular.module('todo-dev', ['todo', 'ngMock']);
angular.module('todo-dev').run(function($httpBackend) {

	$httpBackend.whenGET('/api/task').respond(200, [
		makeTask(),
		makeTask(),
		makeTask()
	]);

	$httpBackend.whenGET('/api/task/0').respond(404);
	$httpBackend.whenGET(/\/api\/task\/.+/).respond(200, makeTask());

	var $uid = 1;

	function makeTask() {
		var task = {
			id: $uid,
			title: 'Task #' + $uid
		};

		$uid++;

		return task;
	}
});