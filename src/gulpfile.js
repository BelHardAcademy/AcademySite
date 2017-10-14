var gulp = require('gulp'),
    concat = require('gulp-concat');


gulp.task('vendor', function() {  
    return gulp.src('public/js/vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/js/vendor.js'))
});