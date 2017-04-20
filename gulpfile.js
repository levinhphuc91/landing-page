'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');
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
  .pipe(gulp.dest(distPath))
  .pipe(livereload());
});

gulp.task('copy-assets', function () {
  gulp.src(assetsPath + '/**/*.{png,jpeg,jpe,gif,svg}')
      .pipe(gulp.dest('./dist/assets'));
});

gulp.task('dev:watch', function () {
  livereload.listen({
    reloadPage: 'http://127.0.0.1:8080/index.html'
  });
  gulp.watch(sassPath, ['sass']);
  gulp.watch(htmlPath + '/**/*.pug', ['pug']);
});

gulp.task('pug', function buildHTML() {
  return gulp.src(htmlPath + '/index.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest(distPath))
  .pipe(livereload());
});

gulp.task('vendor', function() {
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(distPath + '/vendor'));
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(distPath + '/vendor'));
  var jquery = gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(distPath + '/vendor'));

  return merge(bootstrap, jquery);
});

gulp.task('dev', function(done) {
  runSequence ( 'clean', 'copy-assets', 'vendor' , 'sass', 'pug', 'dev:watch', done);
});

gulp.task('build', function(done) {
  runSequence ( 'clean', 'copy-assets', 'vendor', 'sass', 'pug', done);
});
