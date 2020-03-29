const { src, dest, parallel } = require('gulp')
const del = require('del')

// Copy npm assets
const vendor_js_css = function() {
  return src([
    // Vendor CSS
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',

    // Vendor JS
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'
  ])
  .pipe(dest('resources/assets/vendor'))
}

// Copy font awesome assets
const vendor_fonts = function() {
  return src('node_modules/font-awesome/fonts/*')
  .pipe(dest('static/assets/fonts'))
}

const clean = function() {
  return del([
    'resources/assets/vendor',
    'static/assets/fonts',
    'public'
  ])
}

exports.clean = clean
exports.build = parallel(vendor_js_css, vendor_fonts)
exports.default = exports.build
