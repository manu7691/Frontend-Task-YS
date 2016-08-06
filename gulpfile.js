var gulp = require('gulp'),
    // Create sourcemaps for JS/CSS files
    sourcemaps = require('gulp-sourcemaps'),
    // Minify JS files and remove comments on it
    minify = require('gulp-minify'),
    // Process SASS - CSS
    sass = require('gulp-sass'),
    // Rename files
    rename = require('gulp-rename');

// Paths where JS/CSS are located
var path_js_files = 'src/AppBundle/Resources/assets/js/*.js';
var path_sass_files = 'src/AppBundle/Resources/assets/gfx/scss/*.scss';

// Task to process JS files
gulp.task('process-js',function(){
    var destination_min_js = 'web/bundles/app/js/';
    return gulp.src(path_js_files)
    .pipe(sourcemaps.init())
    .pipe(minify({
        ext:{
             min:'.min.js'
        }}
    ))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destination_min_js));
});

// Build CSS from SASS files
gulp.task('process-sass',function(){
    var destination_min_css = 'web/bundles/app/css/';
    return gulp.src([path_sass_files])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./',{includeContent: false}))
        .pipe(gulp.dest(destination_min_css));
});

// Check when JS/CSS files change to trigger minifying tasks
gulp.task('watch',function(){
    gulp.watch(path_js_files,['process-js']);
    gulp.watch(path_sass_files,['process-sass']);
});

gulp.task('default',['watch']);