const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const prefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const cssmin = require('gulp-minify-css');
const del = require('del');
const imagemin = require('gulp-imagemin');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const path = {
  public: {
    html: 'public/',
    js: 'public/js/',
    css: 'public/css/',
    img: 'public/images/',
    fonts: 'public/fonts/'
  },

  src: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },

  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'
  }
};

const config = {
  server: {
    baseDir: "./public"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000
};

gulp.task('webserver', () => browserSync(config));

gulp.task('clean', () => del(['public']));

gulp.task('html:build', () => {
  gulp.src(path.src.html)
    .pipe(gulp.dest(path.public.html))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', () => {
  gulp.src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.public.js))
    .pipe(reload({stream: true}));
});

gulp.task('css:build', () => {
  gulp.src('src/style/**/*.css')
    .pipe(gulp.dest(path.public.css))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', () => {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(concat('main.css'))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.public.css))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', () => {
  gulp.src(path.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(path.public.img))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', () => {
  gulp.src(path.src.fonts)
  .pipe(gulp.dest(path.public.fonts))
});

gulp.task('build', [
  'html:build',
  'js:build',
  'css:build',
  'style:build',
  'fonts:build',
  'image:build'
]);

gulp.task('watch', () => {
  gulp.watch([path.watch.html], () => gulp.start('html:build'));

  gulp.watch([path.watch.style], () => gulp.start('style:build'));

  gulp.watch([path.watch.js], () => gulp.start('js:build'));

  gulp.watch([path.watch.img], () => gulp.start('image:build'));

  gulp.watch([path.watch.fonts], () => gulp.start('fonts:build'));
});

gulp.task('default', ['build', 'webserver', 'watch']);
