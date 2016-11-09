import gulp         from "gulp";
import gutil        from "gulp-util";
import browserify   from "browserify";
import source       from "vinyl-source-stream";
import del          from "del";

const paths = require('./config').paths;
const src     = './' + paths.SRC + '/';
const entry   = src + paths.ENTRY_POINT;
const watches = [src + '**/*.js', src + '**/*.jsx'];

gulp.task('build', () => {
    return browserify({
        entries: entry,
        extensions: ['.js', '.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    })
        .transform('babelify').bundle()
        .on('error', (e) => {
            gutil.log(gutil.colors.red.bold('BROWSERIFY_ERROR'));
            gutil.log(gutil.colors.green(e.message));
            this.emit('end');
        })
        .pipe( source(paths.OUT) )
        .pipe( gulp.dest(paths.DEST_BUILD) );
});

gulp.task('watch', ['build'], () => {
    gulp.watch(watches, ['build']);
});

gulp.task('clean', () => {
    del([paths.DEST_BUILD + '/*', '!' + paths.DEST_BUILD + '/.keep'], false);
});

gulp.task('default', ['clean', 'build']);