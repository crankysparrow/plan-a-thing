const gulp = require('gulp');
const sass = require('gulp-sass');

function styles() {
  return gulp.src('./src/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
}

function watch() {
  gulp.watch('./src/**/*.scss', styles);
}

exports.styles = styles;

exports.dev = gulp.series(styles, watch);