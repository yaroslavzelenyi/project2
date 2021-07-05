import { task, watch, src, dest, parallel } from 'gulp';
import browserSync, { reload, stream } from 'browser-sync';
import sass, { logError } from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import rename from "gulp-rename";

task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    watch("src/*.html").on('change', reload);
});

task('styles', function() {
    return src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest("src/css"))
        .pipe(stream());
});

task('watch', function() {
    watch("src/sass/**/*.+(scss|sass)", parallel('styles'));
});

task('default', parallel('watch', 'server', 'styles'));