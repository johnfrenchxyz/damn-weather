const gulp = require('gulp');
const rename = require('gulp-rename');
const nunjucks = require('gulp-nunjucks');
const fs = require('fs');

var siteData = JSON.parse(fs.readFileSync('portfolio.json'));
siteData.basedir = '';

// Default Level Render
gulp.task('default', function () {
	gulp.src('./templates/**/*.njk')
		.pipe(nunjucks.compile(siteData))
		.pipe(rename(function (path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest('public'));
});
