/* eslint-disable */

const gulp = require('gulp');
const sass = require('gulp-sass');
const fileinclude = require('gulp-file-include');
const named = require('vinyl-named');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mmq = require('gulp-merge-media-queries');
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const path = {
  js: 'src/js',
  html: 'src/html',
  sass: 'src/sass',
  css: 'src/css'
};

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      host: '192.168.0.136',
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('js', () =>
  gulp
    .src(`./${path.js}/pages/*.js`)
    .pipe(plumber())
    .pipe(named())
    .pipe(
      webpackStream({
        module: {
          rules: [
            {
              loader: 'babel-loader',
              test: /\.(js)$/,
              exclude: /(node_modules)/
            }
          ]
        }
      })
    )
    .pipe(gulp.dest(`./${path.js}`))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('js-min', () =>
  gulp
    .src(`./${path.js}/pages/*.js`)
    .pipe(plumber())
    .pipe(named())
    .pipe(
      webpackStream(
        {
          module: {
            rules: [
              {
                loader: 'babel-loader',
                test: /\.(js)$/,
                exclude: /(node_modules)/
              }
            ]
          },
          mode: 'production'
        },
        webpack
      )
    )
    .pipe(gulp.dest(`./${path.js}`))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('sass', () =>
  gulp
    .src(`${path.sass}/**/*.sass`)
    .pipe(
      sass({ outputStyle: 'expand', precision: 5 }).on(
        'error',
        notify.onError()
      )
    )
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 3 versions'],
          cascade: false
        })
      ])
    )
    .pipe(
      mmq({
        log: true
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.css))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('html', () =>
  gulp
    .src([`${path.html}/pages/*.html`])
    .pipe(plumber())
    .pipe(
      fileinclude({
        prefix: '@',
        basepath: '@file'
      })
    )
    .pipe(gulp.dest('./src/'))
);

gulp.task('removedist', () => del.sync('dist'));

gulp.task('watch', ['html', 'sass', 'js', 'browser-sync'], () => {
  gulp.watch(`${path.sass}/**/*.sass`, ['sass']);
  gulp.watch([`${path.js}/blocks/*.js`], ['js']);
  gulp.watch([`${path.js}/pages/*.js`], ['js']);
  gulp.watch([`${path.html}/**/*.html`, `${path.html}/svg/*.svg`], ['html']);
  gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('build', ['removedist', 'html', 'sass', 'js-min'], () => {
  const buildFiles = gulp.src(['src/*.html']).pipe(gulp.dest('dist'));

  const buildFonts = gulp.src(['src/fonts/**/*']).pipe(gulp.dest('dist/fonts'));

  const buildCss = gulp
    .src([`${path.css}/main.min.css`])
    .pipe(gulp.dest('dist/css'));

  const buildJs = gulp.src([`${path.js}/*.js`]).pipe(gulp.dest('dist/js'));

  const buildImg = gulp.src(['src/img/**/*']).pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['watch']);
