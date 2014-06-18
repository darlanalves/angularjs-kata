$module.service('TaskService', ['$http',
	function($http) {
		function cleanupObject(object) {
			var o = angular.copy(object),
				privatePrefix = '$$';

			for (var i in o) {
				if (i.slice(0, 2) === privatePrefix) {
					delete o[i];
				}
			}

			return o;
		}

		return {
			findAll: function() {
				return $http.get('/api/task').then(function(response) {
					return response.data;
				});
			},

			findOne: function(id) {
				return $http.get('/api/task/' + id).then(function(response) {
					return response.data || {};
				});
			},

			save: function(task) {
				task = cleanupObject(task);

				var method = task.id ? 'put' : 'post',
					url = '/api/task' + (task.id ? '/' + task.id : '');

				return $http[method](url, JSON.stringify(task)).then(function(response) {
					return response.data || {};
				});
			},

			remove: function(id) {
				return $http.delete('/api/task/' + id);
			}
		};
	}
]);