// Core modules
var p = require('path')
var ver = require('./package.json').version

// Node modules
var gulp = require('gulp')
var gp_bump = require('gulp-bump')
var gp_clean = require('gulp-clean')
var gp_html = require('gulp-html-replace')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var gp_minify = require('gulp-minify-css')
var gp_less = require('gulp-less')
var p = require('path')

var build = {
  /**
   * Format build directory path
   */
  path: function(path) {
    if( ! path) path = ''
    return p.join('build', path)
  },


  /**
   * Format version query string
   */
  version: function() {
    return '?v' + ver
  }
}

// Bump version
gulp.task('bump', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(gp_bump({
    // type:'prerelease'
  }))
  .pipe(gulp.dest('./'))
})

// Clean build directory
 gulp.task('clean', function () {
  return gulp.src('build', {
    // read: false
  })
  .pipe(gp_clean())
})

// Build index.html
gulp.task('index', function() {
  gulp.src('src/index.html')
  .pipe(gp_html({
    'css': 'css/app.css' + build.version(),
    'vendor-css': 'css/vendor.css' + build.version(),
    'js': 'js/app.js' + build.version(),
    'vendor-js': 'js/vendor.js' + build.version()
  }))
  .pipe(gulp.dest(build.path()))
})

// Copy static assets
gulp.task('assets', function() {
  // Views
  gulp.src('src/panes/*')
  .pipe(gulp.dest(build.path('panes')))
  // Img
  gulp.src('src/img/1920/*')
  .pipe(gulp.dest(build.path('img/1920')))
  gulp.src('src/img/1200/*')
  .pipe(gulp.dest(build.path('img/1200')))
  // Views
  gulp.src('src/panes/partials/*')
  .pipe(gulp.dest(build.path('panes/partials')))
  // Font Awesome
  gulp.src('src/bower_components/font-awesome/fonts/*')
  .pipe(gulp.dest(build.path('fonts')))
})

// Build app CSS
gulp.task('css', function() {
  gulp.src('src/css/style.less')
  .pipe(gp_less({ paths: [
    'src/bower_components/bootstrap/less/mixins.less',
    'src/bower_components/bootstrap/less/variables.less'
  ]}))
  .pipe(gp_rename('app.css'))
  .pipe(gp_minify({keepSpecialComments: 0}))
  .pipe(gulp.dest(build.path('css')))
})

// Build vendor CSS
gulp.task('vendor-css', function() {
  gulp.src([
    'src/bower_components/bootstrap/dist/css/bootstrap.min.css',
    'src/bower_components/font-awesome/css/font-awesome.min.css'
  ])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('vendor.css'))
  .pipe(gp_minify({keepSpecialComments: 0}))
  .pipe(gulp.dest(build.path('css')))
})

// Build app JS
gulp.task('js', function() {
  gulp.src(['src/app.js', 'src/config.js', 'src/controllers/panes.js'])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('app.js'))
  // .pipe(gp_uglify())
  .pipe(gulp.dest(build.path('js')))
})

// Build vendor JS
gulp.task('vendor-js', function() {
  gulp.src([
    'src/bower_components/jquery/dist/jquery.min.js',
    'src/bower_components/bootstrap/dist/js/bootstrap.min.js',
    'src/bower_components/lodash/lodash.min.js',
    'src/bower_components/angular/angular.min.js',
    'src/bower_components/angular-route/angular-route.min.js',
    'src/bower_components/angular-resource/angular-resource.min.js',
    'src/bower_components/angular-sanitize/angular-sanitize.min.js',
    'src/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'src/bower_components/js-yaml/dist/js-yaml.min.js',
    'src/bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
    'src/bower_components/angular-google-maps/dist/angular-google-maps.min.js',
    'src/bower_components/angulartics/dist/angulartics.min.js',
    'src/bower_components/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
  ])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('vendor.js'))
  .pipe(gp_uglify())
  .pipe(gulp.dest(build.path('js')))
})

// Build task
gulp.task('build', ['index', 'assets', 'css', 'vendor-css', 'js', 'vendor-js'])

// Default task
gulp.task('default', ['build'])