// Set envoironment mode
//var env = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV = 'production';

// Defining base pathes
const paths = {
    bower: 'bower_components/',
    node: 'node_modules/',
    dev: 'src/',
    theme: './',
};

// browser-sync watched files
const browserSyncWatchFiles = [
    paths.theme + 'css/*.min.css',
    paths.theme + 'js/*.min.js',
    paths.theme + 'images/**/*.*',
    paths.theme + '*.html'
];

// browser-sync options
const browserSyncOptions = {
    // proxy: 'localhost',
    open: true,
    // notify: false,
    server: './'
};


import gulp from 'gulp';
import gutil from 'gulp-util';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import twconfig from './tailwind.config.js'
import terser from 'gulp-terser';
import babel from 'gulp-babel';
import jshint from 'gulp-jshint';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import strip from 'gulp-strip-comments';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import notify from 'gulp-notify';

const { src, dest, watch, series } = gulp;
const sass = gulpSass(dartSass);
const reload = browserSync.reload;

function styles() {
    return src(paths.dev + 'scss/**/*.scss')
    .pipe(plumber(function(error) {
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
        // outputStyle: 'compressed',
        // outputStyle: 'compact',
        // outputStyle: 'nested',
        outputStyle: 'expanded',
        indentType: "tab",
        indentWidth: 1,
        includePaths: [
            paths.bower,
            paths.node,
        ]
    }).on('error', sass.logError))
    .pipe(postcss([
        tailwindcss(twconfig),
        autoprefixer(),
    ]))
    .pipe(plumber.stop())
    .pipe(sourcemaps.write('.', {includeContent: false}))
    .pipe(dest(paths.theme + 'css'))
    .pipe(reload({stream:true})) // Inject Styles when min style file is created
    .pipe(notify({ message: 'Styles task complete', onLast: true }))
};


function html(){
    return src(paths.dev + 'html/**/*.html')
    .pipe(dest(paths.theme))
};

function scripts() {
    return src([
        paths.dev + 'scripts/*.js',
    ])
    .pipe(plumber(function(error) {
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
    }))
    .pipe(babel({
        presets: [
            [
                "@babel/env",
                {
                    modules: false
                }
            ]
        ],
        compact: true,
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('app.js'))
    .pipe(strip())
    .pipe(terser())
    .pipe(dest(paths.theme + 'js'))
    .pipe(reload({stream: true}));
};

function copyAssets(cb) {
    // jquery
    // src(paths.node + 'jquery/dist/*.**')
    // .pipe(dest(paths.theme + 'js/libs/jquery'));
    cb();
};

function browserSyncStart(cb) {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions);
    cb();
};

function watchTask(cb){
    watch(paths.dev + 'html/**.html', series(html, styles));
    watch(paths.dev + 'scss/**/*.scss', styles);
    watch(paths.dev + 'scripts/*.js', scripts);
    cb();
}

export default series(
    html,
    styles,
    scripts,
    copyAssets,
    browserSyncStart,
    watchTask
);
