/**
 * Created by maxim on 12/24/15.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var slim = require("gulp-slim");
require('gulp-grunt')(gulp);




gulp.task('coffee', function() {
    gulp.src(['app/*.coffee', 'app/**/*.coffee'])
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('build'));
});

gulp.task('coffee:watch', function(){
    gulp.watch(['app/*.coffee', 'app/**/*.coffee'], ['coffee']);
});

gulp.task('sass', function () {
    gulp.src('sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build'));
});

gulp.task('sass:watch', function () {
    gulp.watch('sass/*.scss', ['sass']);
});


gulp.task('slim', function(){
    gulp.src("app/templates/*.slim")
        .pipe(slim({
            pretty: true
        }))
        .pipe(gulp.dest("build"));
});

gulp.task('slim:watch', function () {
    gulp.watch([
        'app/**/*.slim',
        'index.slim'
    ], ['grunt-slim']);
});


gulp.task('defaultff', function() {

    gulp.run('coffee','grunt-tags', 'grunt-slim', 'sass', 'sass:watch', 'slim:watch', 'coffee:watch');
});


gulp.task('default', ['grunt-tags'], function(){
    gulp.run('coffee', 'grunt-slim', 'sass', 'sass:watch', 'slim:watch', 'coffee:watch');
});
