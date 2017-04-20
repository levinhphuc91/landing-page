'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');

var distPath = './dist';
var htmlPath = './src/html';
var assetsPath = './src/assets';
var sassPath = './src/sass/**/*.sass';

gulp.task('clean', function () {
    return gulp.src(distPath, {read: false})
        .pipe(clean());
});

gulp.task('sass', function () {
 return gulp.src(sassPath)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('index.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(distPath));
});

gulp.task('copy-assets', function () {
  gulp.src(assetsPath + '/**/*.{png,jpeg,jpe,gif,svg}')
      .pipe(gulp.dest('./dist/assets'));
});

gulp.task('sass:watch', function () {
  gulp.watch(sassPath, ['sass']);
});

gulp.task('dev', function(done) {
  runSequence ( 'clean', 'copy-assets', 'sass', 'pug', 'sass:watch', done);
});

gulp.task('pug', function buildHTML() {
  return gulp.src(htmlPath + '/index.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest(distPath))
});

gulp.task('build', function(done) {
  runSequence ( 'clean', 'copy-assets', 'sass', 'pug', done);
});
