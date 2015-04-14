var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    config = require('../config'),
	browserifyTask = require('./browserify'),
	open = require("open");


gulp.task('nodemon', function(cb) {
    // We use this `called` variable to make sure the callback is only executed once
    var called = false;
    return nodemon(config.nodemon.options)
        .on('change',  function onChange() {
            //console.log('change');
        })
        .on('start', function onStart() {
            if (!called) {
                gulp.watch(config.less.watchSrc, ['less']);
                gulp.watch(config.images.src, ['images']);
                gulp.watch(config.fonts.src, ['fonts']);

                browserifyTask(function() {}, true);

                cb();
            	
				open(config.open.url);
            }
            called = true;
        })
        .on('restart', function onRestart() {
            //console.log('restart');
        });
})
