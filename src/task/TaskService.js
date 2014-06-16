$module.service('TaskService', ['$http',
	function($http) {
		return {
			findAll: function() {
				return $http.get('/api/task')
			},

			save: function(task) {
				return $http.post('/api/task', save);
			},

			findOne: function(id) {
				return $http.get('/api/task/' + id);
			}
		};
	}
]);