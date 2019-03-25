const gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    headerFile = require('./tools/header.js'),
    header = require('gulp-header')


const config = {
    scssDir :       'scss/**/*.scss',
    cssOutput :     'dist/css',
    cssGlobal :     'dist/css/**/*.css',
}

/**
 * Watch Sass file
 */
function watch() {

    gulp.watch(config.scssDir, compileSass);
}
watch.description = `Watch scss file in ${config.scssDir}`
exports.watch = watch

/**
 * Compile Scss files
 * @returns {*}
 */
function compileSass() {

    return gulp
        .src(config.scssDir)
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })]))
        .pipe(header(headerFile))
        .pipe(gulp.dest(config.cssOutput))
}
compileSass.description = `Compile scss file from ${config.scssDir} to ${config.cssOutput}`
exports.compileSass = compileSass

/**
 * Minify Css files
 * @returns {*}
 */
function minifyCss() {

    return gulp
        .src(config.cssGlobal)
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.cssOutput))
}
minifyCss.description = `Minify Css file from ${config.cssGlobal} to ${config.cssOutput}`
exports.minityCss = minifyCss

/**
 * Default task
 */
var build = gulp.parallel(compileSass, minifyCss);
gulp.task('default', build);