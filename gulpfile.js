var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');//每一个依赖注入不用写两遍，自动生成带[]的；
var useref = require('gulp-useref');//将html中引用的js 文件或 css文件进行合并到一个文件下

var paths = {
  sass: ['./scss/**/*.scss'],
  templatecache:['./www/**/*.html'],
  ng_annotate: ['./www/module/**/*.js'],
	useref: ['./www/*.html']
};

gulp.task('templatecache', function () {
  return gulp.src('www/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('www/build/js'));
});

gulp.task('ng_annotate', function (done) {
	gulp.src('./www/**/*.js')
		.pipe(ngAnnotate({single_quotes: true}))
		.pipe(gulp.dest('./www/build/js'))
		.on('end', done);
});

gulp.task('useref', function (done) {
	gulp.src('./www/*.html')
		.pipe(useref())
		.pipe(gulp.dest('./www/build'))
		.on('end', done);
});

gulp.task('default', ['sass','templatecache','ng_annotate','useref']);//任务名称

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.templatecache,['templatecache']),
  gulp.watch(paths.ng_annotate, ['ng_annotate']);
	gulp.watch(paths.useref, ['useref']);
});
