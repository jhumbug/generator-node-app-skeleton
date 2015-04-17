var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var config     = require('../config').images;
var browserSync  = require('browser-sync');

var imagesTask = function(callback, devMode) {

    var run = function () {
		return gulp.src(config.src)
		    .pipe(changed(config.dest)) // Ignore unchanged files
		    .pipe(imagemin()) // Optimize
		    .pipe(gulp.dest(config.dest))
		    .pipe(browserSync.reload({stream:true}));
	};

	if (run()) callback();
}

gulp.task('images', imagesTask);

// Exporting the task so we can call it directly in our watch task
module.exports = imagesTask;
