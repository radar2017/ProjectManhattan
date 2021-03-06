// Gulp packages (npm install --save-dev gulp-<package>)
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

// Gulp tasks
gulp.task('sass', function() {
    gulp.src('public/css-dev/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }));
});

gulp.task('compress', function() {
    gulp.src(['public/js-dev/*.js', '!public/js-dev/*.min.js']) // do not minify exists min.js
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('js')); // folder name for js minified 

    gulp.src(['public/css-dev/*.css', '!public/css-dev/*.min.css']) // do not minify exists min.css
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('concat', function() {
    gulp.src(['public/css/style.min.css'])
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['sass', 'compress'], function() {
    gulp.watch('public/css-dev/*.scss', ['sass']);
    gulp.watch(['public/js-dev/*.js', 'public/css-dev/*.css'], ['compress']);
    gulp.watch('public/css/*.min.css', ['concat']);
});