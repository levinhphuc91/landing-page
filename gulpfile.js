'use strict'

var gulp = require('gulp')
var pug = require('gulp-pug')
var sass = require('gulp-sass')
var clean = require('gulp-clean')
var merge = require('merge-stream')
var concat = require('gulp-concat')
var notify = require('gulp-notify')
var runSequence = require('run-sequence')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create()

var distPath = './dist'
var htmlPath = './src/html'
var fontsPath = './src/fonts'
var assetsPath = './src/assets'
var jsPath = './src/js/**/*.js'
var sassPath = './src/sass/**/*.sass'

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
  gulp.watch(sassPath, ['sass'])
  gulp.watch(jsPath, ['js'])
  gulp.watch(htmlPath + '/**/*.pug', ['pug'])
})

gulp.task('clean', function () {
  return gulp.src(distPath, {read: false})
        .pipe(clean())
})

gulp.task('sass', function () {
  return gulp.src(sassPath)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', notify.onError(function (error) {
    return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error
  })))
  .pipe(concat('index.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(distPath))
  .pipe(browserSync.stream())
})

gulp.task('copy-assets', function () {
  gulp.src(assetsPath + '/**/*.{png,jpeg,jpg,gif,svg}')
      .pipe(gulp.dest('./dist/assets'))
      .pipe(browserSync.stream())
})

gulp.task('copy-fonts', function () {
  gulp.src(fontsPath + '/**/*.{eot,svg,ttf,woff,oft}')
      .pipe(gulp.dest('./dist/fonts'))
      .pipe(browserSync.stream())
})

gulp.task('pug', function buildHTML () {
  return gulp.src(htmlPath + '/index.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .on('error', notify.onError(function (error) {
    return 'An error occurred while compiling pug.\nLook in the console for details.\n' + error
  }))
  .pipe(gulp.dest(distPath))
  .pipe(browserSync.stream())
})

gulp.task('vendor', function () {
  var bootstrapJs = gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(distPath + '/vendor'))
  var bootstrapCss = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(distPath + '/vendor'))
  var animatieCss = gulp.src('./node_modules/animate.css/animate.min.css')
    .pipe(gulp.dest(distPath + '/vendor'))
  var bootstrapCssmap = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css.map')
    .pipe(gulp.dest(distPath + '/vendor'))
  var tether = gulp.src('./node_modules/tether/dist/js/tether.min.js')
    .pipe(gulp.dest(distPath + '/vendor'))
  var jquery = gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(distPath + '/vendor'))

  return merge(bootstrapJs, bootstrapCss, bootstrapCssmap, jquery, tether, animatieCss)
})

gulp.task('js', function () {
  return gulp.src(jsPath)
   .pipe(sourcemaps.init())
   .pipe(concat('index.js'))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest(distPath))
   .pipe(browserSync.stream())
})

gulp.task('dev', function (done) {
  runSequence('clean', 'copy-assets', 'copy-fonts', 'vendor', 'sass', 'pug', 'js', 'browser-sync', done)
})

gulp.task('build', function (done) {
  runSequence('clean', 'copy-assets', 'copy-fonts', 'vendor', 'sass', 'pug', 'js', done)
})
