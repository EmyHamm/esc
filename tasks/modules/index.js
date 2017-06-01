import gulp from 'gulp';
import chalk from 'chalk';
import { processStyles } from './styles';
//import { optimizeImages } from './images';
import { serve } from './serve';
import { watch } from './watch';
import { config } from '../config';


const stylesTask = gulp.task('styles');
//const imageTask = gulp.task('images');
gulp.task('styles', processStyles);
//gulp.task('images', optimizeImages);
gulp.task(serve);
gulp.task(watch);

if (config.args.env !== 'production') {
    gulp.task(
        'default',
        gulp.parallel('styles'),
        gulp.parallel(serve, watch),
    )
}

const defaultTask = gulp.task('default');