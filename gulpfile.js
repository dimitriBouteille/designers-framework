const gulp = require("gulp")
const sass = require("gulp-sass")
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const headerFile = require('./tools/header.js')
const header = require('gulp-header')
const clean = require('gulp-clean')


const config = {
    scssDir :       'scss/**/*.scss',
    cssOutput :     'dist/css',
    cssGlobal :     'dist/css/**/*.css',
    cssMinGlobal :  'dist/css/**/*.min.css'
}

/**
 * Watch Sass file
 */
function watch() {

    gulp.watch(config.scssDir, compileSass);
}
watch.description = `Watch scss file in ${config.scssDir}`

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
        .pipe(gulp.dest(config.cssOutput))
}
compileSass.description = `Compile scss file from ${config.scssDir} to ${config.cssOutput}`

/**
 * Add header
 * @returns {*}
 */
function addHeader() {
    return gulp
        .src(config.cssGlobal)
        .pipe(header(headerFile))
        .pipe(gulp.dest(config.cssOutput))
}
addHeader.description = 'Add Header'

/**
 * Remove all css min files
 * @returns {*}
 */
function cleanMinCssFiles() {

    return gulp
        .src(config.cssMinGlobal, {read: false})
        .pipe(clean())
}
cleanMinCssFiles.description = 'Remove all css min files'

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


module.exports = {
    watch,
    minifyCss : gulp.series(compileSass, cleanMinCssFiles, minifyCss, addHeader),
    default: gulp.series(compileSass, cleanMinCssFiles, minifyCss, addHeader)
}