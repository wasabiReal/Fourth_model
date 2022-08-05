const {src, dest, parallel, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const include = require('gulp-file-include');


let path = {
    build: {
        html: "docs/",
        css: "docs/css/",
        js: "docs/js/",
        img: "docs/images/",
        fonts: "docs/fonts/"
    },
    src: {
        html: "src/*.html",
        css: "src/scss/style.scss",
        js: "src/js/**/*.js",
        img: "src/images/**/*",
        fonts: "src/fonts/**/*"
    },
    watch: {
        html: "src/**/*.html",
        css: "src/scss/**/*.scss",
        js: "src/js/**/*.js",
        img: "src/images/**/*",
        fonts: "src/fonts/**/*"
    }
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'docs/'
        },
        notify: false,
        online: true
    })
}

function html() {
    return src(path.src.html)
    .pipe(include())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream())
}

function fonts() {
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}

function images() {
    return src(path.src.img)
    .pipe(imagemin())
	.pipe(dest(path.build.img))
    .pipe(browserSync.stream())
}

function styles() {
    return src([path.src.css])
    .pipe(sass())
    .pipe(concat('style.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }} ))
	.pipe(dest(path.build.css))
	.pipe(browserSync.stream())
}

function scripts() {
    return src(path.src.js)
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream())
}

function startwatch() {
    watch(path.watch.fonts, fonts);
    watch(path.watch.html, html);
	watch(path.watch.css, styles);
    watch(path.watch.js, scripts);
    watch(path.watch.img, images);

}

exports.browsersync = browsersync;
exports.html = html;
exports.fonts = fonts;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.default = parallel(html, fonts, images, styles, scripts, browsersync, startwatch);