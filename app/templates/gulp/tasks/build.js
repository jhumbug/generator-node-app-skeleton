var gulp = require('gulp');

gulp.task('build', ['less', 'images', 'fonts', 'minifyCss', 'uglifyJs']);
gulp.task('build:dev', ['less', 'images', 'fonts']);