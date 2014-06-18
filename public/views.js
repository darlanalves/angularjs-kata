angular.module("todo").run(['$templateCache', function(a) { a.put('/task/list.html', '<article><section class="light"><header class="header"><div class="left"><button><i class="icon-reorder"></i></button></div><div class="center">Tasks</div><div class="right"><button ui-sref="task-create"><i class="icon-plus"></i></button></div></header></section><section class="dark"><ul class="list task-list"><li ng-repeat="task in taskList" ng-class="{done: task.done}"><input type="checkbox" ng-model="task.done" ng-change="updateTask(task)" id="task-{{task.id}}" class="checkbox"><label class="list-item" for="task-{{task.id}}">{{task.title}}</label><a ui-sref="task-edit({taskId: task.id})" class="right"></a></li></ul></section></article>');
	a.put('/task/edit.html', '<h2>{{task.title}}</h2><form ng-submit="saveTask(taskForm)" name="taskForm"><label><input type="text" ng-model="task.title" placeholder="e.g. wash the dishes"></label><label><input type="checkbox" ng-model="task.done">done</label><label><textarea rows="3" ng-model="task.description" placeholder="Type in a comment"></textarea></label><button type="submit">Update</button></form>');
	a.put('/task/create.html', '<h2>New task</h2><form class="form form-new-task" ng-submit="saveTask(taskForm)" name="taskForm"><div class="input-container"><label>Task name<input type="text" ng-model="task.title" placeholder="e.g. wash the dishes"></label></div><div class="button-container"><button type="submit" class="button" ng-disabled="taskForm.$invalid">Create</button></div></form>');
	a.put('/home.html', '<article><section class="light"><header class="header"><div class="left"><button><i class="icon-reorder"></i></button></div><div class="center">Hello!</div><div class="right"><button><i class="icon-star"></i></button></div></header></section><section class="dark"><p>You have <strong><a ui-sref="task-list" class="anchor">{{tasks.length}} tasks</a></strong></p></section></article>');
	 }]);