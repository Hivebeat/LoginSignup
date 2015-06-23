'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var reactify = require('reactify');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var rename = require('gulp-rename');
var react = require('gulp-react');
var sourcemaps = require('gulp-sourcemaps');
var sourceFile = './src/scripts/app.js';
var destFolder = './dist/scripts';
var destFileName = 'app.js';
var $ = require('gulp-load-plugins')();


var reload = browserSync.reload;
var bundler = watchify(browserify({
    entries: [sourceFile],
    debug: true,
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}));

gulp.task('styles', function() {
    return $.rubySass('src/styles/main.scss', {loadPath: './src/bower_components/'})
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('src/styles'))
        .pipe(rename('_importme.scss'))
        .pipe(gulp.dest('src/styles'));
});

gulp.task('build-styles', function() {
    return gulp.src('src/styles/main.scss')
        .pipe($.plumber())
        .pipe($.rubySass('src/styles/main.scss'))
        .pipe($.autoprefixer({
            browsers: ['last 1 version']
        }))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('dist/styles'));
});

function rebundle() {
    bundler.transform(reactify);
    return bundler.bundle()
        .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe(source(destFileName))
        .pipe(gulp.dest(destFolder))
        .on('end', function() {
            reload();
        });
}

bundler.on('update', rebundle);
bundler.on('log', $.util.log);


gulp.task('scripts', rebundle);
gulp.task('buildScripts', function() {
    var b = browserify();
    b.transform(reactify);
    b.add(sourceFile);
    return b.bundle()
        .pipe(source(destFileName))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});


gulp.task('bundle', ['styles', 'scripts'], function() {
    return gulp.src('./src/*.html')
        .pipe($.useref.assets())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('buildBundle', ['styles', 'buildScripts'], function() {
    return gulp.src('./src/*.html')
        .pipe($.useref.assets())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});


gulp.task('watch', ['html', 'bundle'], function() {
    browserSync({
        notify: false,
        logPrefix: 'BS',
        server: ['dist', 'src']
    });

    gulp.watch('src/scripts/**/*', ['scripts']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch(['src/styles/**/*.scss'], ['styles', reload]);
    gulp.watch('src/images/**/*', reload);
});


gulp.task('build', ['build-styles'], function() {
    return gulp.src('src/scripts/**/*')
//        .pipe(sourcemaps.init())
  //      .pipe(react())
//        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'build', 'jest']);
