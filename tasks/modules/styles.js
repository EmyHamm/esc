import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import csswring from 'csswring';
import sass from 'gulp-sass';
import gutil from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import cssmin from 'gulp-cssmin'
import mqpacker from 'css-mqpacker';
import { config } from '../config';
import { server } from './serve';
import handleErrors from '../utils/handleErrors';

const dev = false;
const processors = [];

if (dev) {
    processors.concat(autoprefixer({
        browsers: config.browsers,
    }));
} else {
    processors.concat(autoprefixer({
        browsers: config.browsers,
    }), mqpacker, csswring({
        preserveHacks: true,
        removeAllComments: true,
    }))
}

export function processStyles(done) {
    return gulp.src(config.dev.sass)
        .pipe(sass(/* options */))
        .pipe(cssmin())
        .pipe(dev ? sourcemaps.write() : gutil.noop())
        .pipe(dev ? gutil.noop() : rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest(config.prod.styles))
        .pipe(server.stream())
        done();
}
