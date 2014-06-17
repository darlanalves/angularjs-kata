var gulp = require('gulp'),
	util = require('gulp-util'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	karma = require('gulp-karma'),
	templateCache = require('gulp-templatecache'),
	wrap = require('gulp-wrap'),
	pipeline = require('multipipe'),
	colors = util.colors,
	log = util.log,
	spawn = require('child_process').spawn,
	wrapper = '(function(undefined){\n\n<%= contents %>\n}());';

gulp.task('min', function() {
	var pipe = pipeline(
		gulp.src(['src/module.js', 'src/routes.js', 'src/**/*.js']),
		concat('app.js'),
		wrap(wrapper),
		gulp.dest('public'),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest('public')
	);

	pipe.on('error', createLogger('min'));
});

gulp.task('sass', function() {
	var pipe = pipeline(
		gulp.src('scss/*.scss'),
		sass({
			outputStyle: 'compressed',
			errLogToConsole: true
		}),
		concat('app.css'),
		gulp.dest('public')
	);

	pipe.on('error', createLogger('sass'));
});

gulp.task('mocks', function() {
	var pipe = pipeline(
		gulp.src('public/mock/**/*.js'),
		concat('mocks.js'),
		gulp.dest('public')
	);

	pipe.on('error', createLogger('mocks'));
})

gulp.task('server', function() {
	require('./server');
});

gulp.task('views', function() {
	var pipe = pipeline(
		gulp.src('views/**/*.html'),
		templateCache({
			output: 'views.js',
			strip: 'views',
			moduleName: 'todo',
			minify: {
				collapseBooleanAttributes: true,
				collapseWhitespace: true
			}
		}),
		gulp.dest('public')
	);

	pipe.on('error', createLogger('views'));
});

gulp.task('test', function() {
	var karma = spawn('./node_modules/karma/bin/karma', ['start', 'test/karma.conf.js']),
		testLogger = createLogger('test');

	karma.stderr.on('data', function(data) {
		console.log('' + data);
	});

	karma.stdout.on('data', function(data) {
		console.log('' + data);
	});

	karma.on('close', function(code) {
		if (code !== 0) {
			console.log('Karma exited with code ' + code);
		}
	});
})

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['min']);
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('views/**/*.html', ['views']);
	gulp.watch('public/mock/**/*.js', ['mocks']);
});

gulp.task('default', ['min', 'sass', 'watch']);

function createLogger(name) {
	return function() {
		var i = arguments.length,
			args = new Array(i);

		while (i--) args[i] = arguments[i];

		args.unshift(colors.red('>>' + name) + ': ');
		log.apply(null, args);
	};
}