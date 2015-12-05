'use strict';

var gulp = require("gulp"),
		connect = require("gulp-connect"),
		opn = require("opn"),
		rename = require("gulp-rename"),
		sass = require("gulp-sass"),
		uncss = require('gulp-uncss'),
		minifyCss = require('gulp-minify-css');

//start local server
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
  opn('http://localhost:8888')
});


//html
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

//sass
gulp.task('scss', function () {
  gulp.src('app/sass/main.scss')
  	.pipe(sass())
  	.pipe(gulp.dest('app/css'))
  	.pipe(connect.reload());
});

//css
gulp.task('css', function() {
	gulp.src('app/css/main.css')
		.pipe(minifyCss(''))
  	.pipe(rename('main.min.css'))
  	.pipe(gulp.dest('app/css'))
  	.pipe(connect.reload());
});
//js
gulp.task('js', function () {
  gulp.src('./app/js/*.js')
  	.pipe(gulp.dest('app/js'))
    .pipe(connect.reload());
});

//watch
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/sass/*.scss'], ['scss']);
  gulp.watch(['./app/css/*.css'], ['css']);
  gulp.watch(['./app/js/*.js'], ['js']);
});

gulp.task('minify-css', function() {
  return gulp.src('styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/'));
});

gulp.task('default', ['connect', 'html', 'css', 'js', 'watch']);