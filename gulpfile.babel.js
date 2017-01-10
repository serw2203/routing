'use strict';
import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import del from 'del';
import paths from './src/config';

const browser = browserify({
      entries: `./${paths.SRC}/${paths.ENTRY_POINT}`,
      extensions: ['.js', '.jsx'],
      debug: true,
  });

gulp.task('build', ['sass'],
  () => browser.transform(babelify).bundle()
        .on('error', (error) => {
            gulpUtil.log(gulpUtil.colors.red.bold('BROWSERIFY ERROR: --->'));
            gulpUtil.log(gulpUtil.colors.yellow('      ' + error.message));
            gulpUtil.log(gulpUtil.colors.red.bold('<---'));
            browser.emit('end');
          })
        .pipe(source(paths.OUT))
        .pipe(gulp.dest(paths.DEST_BUILD))
        .pipe(browserSync.reload({ stream: true }))
);

gulp.task('sass',
  () =>  gulp.src(`${paths.SRC}/sass/**/*.sass`)
        .pipe(gulpSass())
        .pipe(gulp.dest('dest/css'))
);

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: paths.DEST_BUILD,
            middleware: (request, response, next) => {
              response.setHeader('Access-Control-Allow-Origin', '*');
              next();
            },
          },
        port: 8000,
        notify: false,
      });
  });

gulp.task('watch', ['build', 'browser-sync'], () => {
    gulp.watch(`./${paths.SRC}/**/*.+(js|jsx|sass)`, ['build']);
  });

gulp.task('clean', () => {
    del([`${paths.DEST_BUILD}/*`, `!${paths.DEST_BUILD}/index.html`], false);
  });

gulp.task('default', ['clean', 'build']);
