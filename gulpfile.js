var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var postcss = require('gulp-postcss');
var cssnext = require('gulp-cssnext');
var notify = require('gulp-notify');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task('css',function(){
    gulp.src(['app/src/css/*.css'])
        .pipe(plumber())
        .pipe(postcss([require('postcss-nested')]))
        .pipe(cssnext([require('gulp-cssnext')]))
        .pipe(gulp.dest('app/dist/css/'))
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
});
