var gulp = require('gulp');
var argv = require('yargs').argv;

var tasks = ['nodemon'];

if (argv.clean === true || argv.c) {
	tasks.unshift('clean');
}

gulp.task('default', tasks);