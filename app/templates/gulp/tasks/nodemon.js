'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('../config');
var browserifyTask = require('./browserify');
var lessTask = require('./less');
var imagesTask = require('./images');
var openURL = require('open');
var argv = require('yargs').argv;

var tasks = [];

if (argv.clean === true || argv.c) {
    tasks.unshift('clean');
}


gulp.task('nodemon', tasks, function(cb) {
    // We use this `called` variable to make sure the callback is only executed once
    var called = false;
    return nodemon(config.nodemon.options)
        .on('change',  function onChange() {
            //console.log('change');
        })
        .on('start', function onStart() {
            if (!called) {
                lessTask(function() {}, true);
                imagesTask(function() {}, true);

                gulp.watch(config.less.watchSrc, ['less']);
                gulp.watch(config.images.src, ['images']);
                gulp.watch(config.fonts.src, ['fonts']);

                browserifyTask(function() {}, true);

                cb();
            	
				openURL(config.open.url);
            }
            called = true;
        })
        .on('restart', function onRestart() {
            //console.log('restart');
        });
})
