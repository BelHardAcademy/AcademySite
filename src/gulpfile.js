var gulp    = require('gulp'),
    concat  = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify  = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS);


    gulp.task('vendor', function() {
        return gulp.src([ // Берем все необходимые библиотеки
            'public/js/libs/*.js', // Берем js файлы
            ])
            .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
            .pipe(uglify()) // Сжимаем JS файл
            .pipe(gulp.dest('public/js')); // Выгружаем в папку app/js
    });