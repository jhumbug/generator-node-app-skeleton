'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('../config');
// var argv = require('yargs').argv;
// var gutil = require('gulp-util'); 

gulp.task('clean', function (cb) {
	del([
	    config.dest + '/**' //matches everything
	], cb);
	
	// gutil.log(gutil.colors.yellow('Exiting without cleaning.'), '(run gulp -c to clean before building)');
	// cb();
});
