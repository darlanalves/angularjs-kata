var express = require('express'),
	bodyParser = require('body-parser'),
	merge = require('merge'),
	router = express.Router(),
	app = express(),
	fs = require('fs'),
	path = require('path');

app.use(bodyParser()).use(router).use(express.static('public'));

var server = app.listen(process.env.PORT || 8000, function() {
	console.log('Listening on port %d', server.address().port);
});

var DATA_PATH = './server',
	jsonMatch = /\.json$/i;

router.get('/api/task', listTask);
router.get('/api/task/:taskId', getTask);
router.post('/api/task', createTask);
router.put('/api/task/:taskId', updateTask);
router.delete('/api/task/:taskId', deleteTask);

function taskPath(id) {
	return path.join(DATA_PATH, id + '.json');
}

function readJSON(path) {
	var json = fs.readFileSync(path);
	try {
		json = JSON.parse(json);
	} catch (e) {
		json = {};
	}

	return json;
}

function listTask(req, res, next) {
	fs.readdir(DATA_PATH, function(err, files) {
		var list = [];

		if (err) {
			res.send(500);
			return;
		}

		files.forEach(function(file) {
			if (!jsonMatch.test(file)) return;
			var task = readJSON(path.join(DATA_PATH, file));
			list.push(task);
		});

		res.status(200).json(list);
	});
}

function getTask(req, res, next) {
	var taskId = req.param('taskId');

	if (!taskId) {
		res.send(400);
		return;
	}

	var file = taskPath(taskId);
	if (fs.exists(file, function(exists) {
		if (exists) {
			var task = readJSON(file);
			res.status(200).json(task);
			return;
		}

		res.send(404);
	}));
}

function createTask(req, res, next) {
	if (!req.is('json')) {
		res.send(406);
		return;
	}

	var task = req._body ? req.body : {};

	if (!task.title) {
		res.send(400);
		return;
	}


	var taskId = uuid();

	task.id = taskId;
	var taskJSON = JSON.stringify(task);

	fs.writeFile(taskPath(taskId), taskJSON, function(err) {
		if (err) {
			res.send(500);
			return
		}

		res.status(201).json(task);
	});
}

function updateTask(req, res, next) {
	if (!req.is('json')) {
		res.send(406);
		return;
	}

	var taskId = req.param('taskId'),
		task;

	if (!taskId || !req._body) {
		res.send(400);
		return;
	}

	try {
		task = merge(readJSON(taskPath(taskId)), req.body);
	} catch (e) {
		res.send(500);
		return;
	}

	task.id = taskId;
	var taskJSON = JSON.stringify(task);

	fs.writeFile(taskPath(taskId), taskJSON, function(err) {
		if (err) {
			return res.send(500);
		}

		res.status(200).json(task);
	});
}

function deleteTask(req, res, next) {
	var taskId = req.param('taskId');

	if (!taskId) {
		res.send(400);
		return;
	}

	fs.unlink(taskPath(taskId), function(err) {
		if (err) {
			res.send(500);
			return;
		}

		res.send(200);
	});
}

// https://gist.github.com/jed/982883
function uuid(a) {
	return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid)
}