const gulp = require('gulp');
const rename = require('gulp-rename');
const nunjucks = require('gulp-nunjucks');

// Default Level Render
gulp.task('default', function () {
	gulp.src('./templates/**/*.njk', { 'base': './templates' })
		.pipe(nunjucks.compile({'basedir': ''}))
		.pipe(rename(function (path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest('public'));
});
