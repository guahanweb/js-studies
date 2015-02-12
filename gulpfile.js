(function () {
    'use strict';

    var gulp = require('gulp');
    var inject = require('gulp-inject');
    var bowerFiles = require('main-bower-files');
    var mochaPhantomJS = require('gulp-mocha-phantomjs');
    var rename = require('gulp-rename');
    var preprocess = require('gulp-preprocess');
    var argv = require('yargs').argv;
    var gutil = require('gulp-util');

    var coverage = !!argv.coverage;

    gulp.task('processIndex', function () {
        return gulp.src('build/templates/testIndex.html')
            .pipe(preprocess({ context: { coverage: coverage }}))
            .pipe(rename('index.html'))
            .pipe(gulp.dest('test'));
    });

    gulp.task('injectIntoIndex', ['processIndex'], function () {
        return gulp.src('test/index.html')
            .pipe(inject(
                gulp.src(bowerFiles({ includeDev: true }), { read: false }),
                { name: 'bower', relative: true }
            ))
            .pipe(inject(
                gulp.src(['src/js/**/*.js'], { read: false }),
                { name: 'all', relative: true }
            ))
            .pipe(inject(
                gulp.src(['test/suites/**/*.js'], { read: false }),
                { name: 'suites', relative: true }
            ))
            .pipe(gulp.dest('test'));
    });

    gulp.task('test', ['injectIntoIndex'], function () {
        var options = !coverage ? {} : {
            reporter: 'build/report/mochaBlanketAdapter.js',
            dump: 'test/coverage.html'
        };

        return gulp.src('test/index.html', { read: false })
            .on('data', processWinPath)
            .pipe(mochaPhantomJS(options))
            .on('end', function () {
                if (coverage) {
                    gutil.log('Generated coverage report to', gutil.colors.cyan(options.dump));
                }
            });
    });

    function processWinPath(file) {
        var path = require('path');
        if (process.platform === 'win32') {
            file.path = path.relative('.', file.path);
        }
    }
})();