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
var browserSync = require('browser-sync').create();

var distPath = './dist';
var htmlPath = './src/html';
var fontsPath = './src/fonts';
var assetsPath = './src/assets';
var sassPath = './src/sass/**/*.sass';

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch(sassPath, ['sass']);
    gulp.watch(htmlPath + '/**/*.pug', ['pug']);
});


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
  .pipe(browserSync.stream());
});

gulp.task('copy-assets', function () {
  gulp.src(assetsPath + '/**/*.{png,jpeg,jpe,gif,svg}')
      .pipe(gulp.dest('./dist/assets'));
});

gulp.task('copy-fonts', function () {
  gulp.src(fontsPath + '/**/*.{eot,svg,ttf,woff,oft}')
      .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('pug', function buildHTML() {
  return gulp.src(htmlPath + '/index.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest(distPath))
  .pipe(browserSync.stream());
});

gulp.task('vendor', function() {
  var bootstrapJs = gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(distPath + '/vendor'));
  var bootstrapCss = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(distPath + '/vendor'));
  var bootstrapCssmap = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css.map')
    .pipe(gulp.dest(distPath + '/vendor'));
  var tether = gulp.src('./node_modules/tether/dist/js/tether.min.js')
    .pipe(gulp.dest(distPath + '/vendor'));
  var jquery = gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(distPath + '/vendor'));

  return merge(bootstrapJs, bootstrapCss, bootstrapCssmap, jquery, tether);
});

gulp.task('build', function(done) {
  runSequence ( 'clean', 'copy-assets', 'copy-fonts','vendor', 'sass', 'pug', done);
});
