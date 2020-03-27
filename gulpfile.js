const { src, dest, series } = require('gulp')
const gp_rename = require('gulp-rename')
const gp_clean_css = require('gulp-clean-css')
const gp_less = require('gulp-less')

// Copy npm assets
const assets_npm = function() {
  return src([
    // Vendor CSS
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',

    // Vendor JS
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'
  ])
  .pipe(dest('hugo/resources/assets/vendor'))
}

// Copy bootstrap less
const assets_bootstrap = function() {
  return src([
    'node_modules/bootstrap/less/mixins.less',
    'node_modules/bootstrap/less/variables.less',
    'node_modules/bootstrap/less/variables.less',
    ])
  .pipe(dest('hugo/static/assets/bootstrap/less'))
}

// Copy bootstrap less mixins
const assets_mixins = function() {
  return src([
    'node_modules/bootstrap/less/mixins/*'
    ])
  .pipe(dest('hugo/static/assets/bootstrap/less/mixins'))
}

// Copy font awesome assets
const assets_font_awesome = function() {
  return src('node_modules/font-awesome/fonts/*')
  .pipe(dest('hugo/static/assets/fonts'))
}

// Build app CSS
const css = function() {
  return src('hugo/resources/src/css/style.less')
  .pipe(gp_less({ paths: [
    'hugo/static/'
  ] }))
  .pipe(gp_rename('app.css'))
  .pipe(gp_clean_css())
  .pipe(dest('hugo/resources/assets/css'))
}

exports.build = series(assets_npm, assets_bootstrap, assets_mixins, assets_font_awesome, css)
exports.default = exports.build
