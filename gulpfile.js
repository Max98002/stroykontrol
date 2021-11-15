'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlMin = require('gulp-htmlmin');
const browserSync = require('browser-sync');
const renameFile = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const dist = './dist/';

gulp.task('moveHtml', () => {
  return gulp.src('src/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(dist))
    .pipe(browserSync.stream());
});

gulp.task('moveStyle', () => {
  return gulp.src('./src/assets/scss/**/*.+(scss|sass)')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(renameFile({
      suffix: '.min',
      prefix: ''
    }))
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(cleanCss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(dist + 'assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('movejs', () => {
  return gulp.src('./src/js/*.js')
    .pipe(gulp.dest(dist + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('moveImage', () => {
  return gulp.src('./src/assets/image/**/*')
    .pipe(gulp.dest(dist + 'assets/image'))
    .pipe(browserSync.stream());
});

gulp.task('moveFonts', () => {
  return gulp.src('./src/assets/fonts/**/*')
    .pipe(gulp.dest(dist + 'assets/fonts'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './dist/',
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    port: 4000,
    notify: true
  });

  gulp.watch('./src/*.html', gulp.parallel('moveHtml'));
  gulp.watch('./src/assets/scss/**/*.+(sass|scss)', gulp.parallel('moveStyle'));
  gulp.watch('./src/assets/image/**/*').on('all', gulp.parallel('moveImage'));
  gulp.watch('./src/assets/fonts/**/*').on('all', gulp.parallel('moveFonts'));
  gulp.watch('./src/js/*').on('all', gulp.parallel('movejs'));

});

gulp.task('build', gulp.parallel('moveHtml', 'moveStyle', 'movejs', 'moveImage', 'moveFonts'));

gulp.task('default', gulp.parallel('watch', 'build'));