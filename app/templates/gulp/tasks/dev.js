var gulp = require('gulp');

// Run this to compress all the things!
gulp.task('dev', ['images', 'fonts', 'minifyCss', 'uglifyJs', 'ftp:dev']);
