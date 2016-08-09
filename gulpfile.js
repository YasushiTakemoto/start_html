var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var jade = require('gulp-jade-php');
var postcss = require('gulp-postcss');
var cssnext = require('gulp-cssnext');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

var SortedCSS = [
    'app/src/css/app.css',
    'app/src/css/foundation.css',
    'app/src/css/test.css'
];

gulp.task('imagemin', function(){
    gulp.src('app/src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/dist/img/'))
        .pipe(reload({stream:true}));  
});

gulp.task('css',function(){
    gulp.src(SortedCSS)
        .pipe(plumber())
        .pipe(postcss([require('postcss-nested')]))
        .pipe(cssnext([require('gulp-cssnext')]))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('app/'))
        .pipe(notify('css task finished'))
        .pipe(reload({stream:true}));        
});

gulp.task('jade',function(){
    gulp.src('app/src/jade/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty:true}))
        .pipe(gulp.dest('app/'))
        .pipe(notify('jade task finished'))
        .pipe(reload({stream:true}));
});

gulp.task('js', function() {
  return gulp.src('app/src/js/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('app/dist/js/'))
    .pipe(notify('js task finished'))
    .pipe(reload({stream:true}));
});

gulp.task('default',function(){
    browserSync.init({
        server: "app/"
    });
    gulp.watch('app/src/css/*.css',['css']);
    gulp.watch('app/src/jade/*.jade',['jade']);
    gulp.watch('app/src/js/*.js',['js']);
    gulp.watch('app/src/img/**/*',['imagemin']);
});
