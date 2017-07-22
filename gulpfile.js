const gulp = require('gulp');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
gulp.task('default', function() {})

gulp.task('clean', function() {
    return gulp.src(['build', 'dist'])
        .pipe(clean({
            force: true
        }))
})

gulp.task('dev', function() {
    runSequence('clean', ['views'])
})

gulp.task('build', ['views'],function(){
    
})


gulp.task('views', function() {
    return gulp.src('./src/views/**')
        .pipe(gulp.dest('./build/views'))
        .pipe(gulp.dest('./dist/views'))
})