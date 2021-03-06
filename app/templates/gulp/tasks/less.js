var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var less 		 = require('gulp-less')
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').less;
var autoprefixer = require('gulp-autoprefixer');

var lessTask = function(callback, devMode) {

    var run = function () {
        return gulp.src(config.src)
            .pipe(sourcemaps.init())
            .pipe(less(config.settings))
            .on('error', handleErrors)
            .pipe(sourcemaps.write({
            	sourceRoot: function(file) { // set this when use less that's outside of the app directory (in node_modules, etc)
        	        return './';
        	    }
        	}))
            .pipe(autoprefixer({ browsers: ['last 2 version'] }))
            .pipe(gulp.dest(config.dest))
            .pipe(browserSync.reload({stream:true}));
    };

    if (run()) callback();
}

gulp.task('less', lessTask);

// Exporting the task so we can call it directly in our watch task
module.exports = lessTask;
