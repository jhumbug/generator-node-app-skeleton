var gulp = require('gulp');

// Run this to compress all the things!
gulp.task('staging', ['images', 'fonts', 'minifyCss', 'uglifyJs', 'ftp:staging']);
