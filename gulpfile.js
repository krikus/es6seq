"use strict";
/* jshint node: true */
var gulp = require('gulp');

gulp.task('pre-commit', function(){
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
