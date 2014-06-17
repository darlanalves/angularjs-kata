angular.module("todo").run(['$templateCache', function(a) { a.put('/task/view.html', '<p><strong>Title</strong>: {{ task.title }} <strong>Id</strong>: {{ task.id }}</p>');
	a.put('/task/list.html', '<h2>Tasks</h2><table><thead><th>#</th><th>title</th></thead><tbody><tr ng-repeat="task in taskList"><td>{{task.id}}</td><td>{{task.title}}</td></tr></tbody></table>');
	a.put('/task/create.html', '<span>Title</span><input type="text" ng-model="task.title"><button type="button" ng-click="saveTask()">Save</button>');
	 }]);