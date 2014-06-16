var gulp = require('gulp'),
	util = require('gulp-util'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	karma = require('gulp-karma'),
	wrap = require('gulp-wrap'),
	pipeline = require('multipipe'),
	colors = util.colors,
	log = util.log,
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

gulp.task('server', function() {
	require('./server');
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['min']);
	gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', ['min', 'sass', 'watch']);

function createLogger(name) {
	return function() {
		var i = arguments.length,
			args = new Array(i);

		while (i--) args[i] = arguments[i];

		args.unshift(colors.red('>>' + name) + ': ');
		log.apply(args);
	};
}