"use strict";
/* jshint node: true */
var gulp = require('gulp');

gulp.task('pre-commit', function() {
	var guppy = require('git-guppy')(gulp);
	var gulpFilter = require('gulp-filter');
	var jshint = require('gulp-jshint');
	var config = require('./package');

	return gulp.src(guppy.src('pre-commit'))
		.pipe(gulpFilter(['*.js']))
		.pipe(jshint(config.jshintConfig))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});


gulp.task('test', function() {
	var mocha = require('gulp-mocha');

	return gulp.src('./test/*.js', {read: false})
		.pipe(mocha());
});

gulp.task('coverage', function() {
	var istanbul = require('gulp-istanbul');
	var mocha = require('gulp-mocha');

	gulp.src('./src/*.js')
		.pipe(istanbul({includeUntested:true}))
		.pipe(istanbul.hookRequire())
		.on('finish', function() {
			gulp.src('./test/*.js')
				.pipe(mocha())
				.pipe(istanbul.writeReports({
					dir: './coverage',
					reporters: ['text-summary', 'html', 'lcov']
				}));
		});
});

gulp.task('test:coverage', ['coverage'], function() {
	var codecov = require('gulp-codecov.io');

	gulp.src('./coverage/lcov.info')
		.pipe(codecov());
});
