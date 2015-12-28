/**
 * Created by maxim on 12/24/15.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var slim = require("gulp-slim");
var templateCache = require('gulp-angular-templatecache');
var concatCss = require('gulp-concat-css');

require('gulp-grunt')(gulp);

var concat = require('gulp-concat');

gulp.task('coffee', function() {
    gulp.src(['app/*.coffee', 'app/**/*.coffee'])
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('build'));
});

gulp.task('coffee:watch', function(){
    gulp.watch(['app/*.coffee', 'app/**/*.coffee'], ['coffee']);
});

gulp.task('sass', function () {
    gulp.src('sass/index.scss')
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

gulp.task('concat', function(){
       return gulp.src([
            "bower_components/angular/angular.min.js",
            "bower_components/angular-ui-router/release/angular-ui-router.min.js",
            "bower_components/angular-animate/angular-animate.min.js",
            "bower_components/angular-local-storage/dist/angular-local-storage.min.js",
            "bower_components/angular-ui-router-anim-in-out/anim-in-out.js",
            "build/_init.js",
            "build/**/*.js",
            "module/**/_*.js",
            "module/**/*.js"
        ])
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('build_prod'))
});

gulp.task ('concatCss', function(){
    return gulp.src(['build/index.css', 'bower_components/angular-ui-router-anim-in-out/css/anim-in-out.css'])
        .pipe(concatCss("index.min.css"))
        .pipe(gulp.dest('build_prod/'));
})

gulp.task('templates', function () {
    var options = {
        root: 'build',
        module: 'app'
    }

    return gulp.src('build/**/*.html')
        .pipe(templateCache(options))
        .pipe(gulp.dest('build/templates'));
});



gulp.task('default', ['grunt-tags:dev'], function(){
    gulp.run('coffee', 'grunt-slim', 'sass', 'sass:watch', 'slim:watch', 'coffee:watch');
});


gulp.task('prod', ['templates','concat', 'grunt-tags:prod', 'concatCss'], function(){
    gulp.run('grunt-slim')
})
