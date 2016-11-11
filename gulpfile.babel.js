"use strict";
import gulp from "gulp";
import gulpUtil from "gulp-util";
import gulpSass from "gulp-sass";
import browserSync from "browser-sync";
import browserify from "browserify";
import source from "vinyl-source-stream";
import del from "del";

const paths = require('./config').paths;

gulp.task('build',  () => {
    return browserify({
        entries: `./${paths.SRC}/${paths.ENTRY_POINT}`,
        extensions: ['.js', '.jsx'],
        debug: true,
        paths: ['./node_modules/**/*','./bower_components/**/*']
    })
        .transform('babelify').bundle()
        .on('error', (e) => {
            gulpUtil.log(gulpUtil.colors.red.bold('BROWSERIFY_ERROR'));
            gulpUtil.log(gulpUtil.colors.green(e.message));
            this.emit('end');
        })
        .pipe(source(paths.OUT))
        .pipe(gulp.dest(paths.DEST_BUILD))
        .pipe(browserSync.reload(
            {stream: true}
        ));
});

gulp.task('sass', () => {
    return gulp.src(`${paths.SRC}/sass/**/*.sass`)
        .pipe(gulpSass())
        .pipe(gulp.dest(`dest/css`));
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: paths.DEST_BUILD
        },
        port: 8000,
        notify: false
    });
});

gulp.task('watch', ['build', 'browser-sync'], () => {
    gulp.watch(`./${paths.SRC}/**/*.+(js|jsx|sass)`, ['build']);
});

gulp.task('clean', () => {
    del([`${paths.DEST_BUILD}/*`, `!${paths.DEST_BUILD}/index.html`], false);
});

gulp.task('default', ['clean', 'build']);