import gulp from 'gulp';
import path from 'path';
import chalk from 'chalk';
import del from 'del';
import { serve } from './serve';
import { processStyles } from './styles';
import { optimizeImages } from './images';
import { config } from '../config';

function onWatchAdd(filePath) {
    console.log(`File ${chalk.underline.green(filePath)} has been added. `);
}

function onWatchChange(filePath) {
    console.log(`File ${chalk.underline.yellow(filePath)} was changed `);
}

function onWatchRemove(filePath) {
    const srcPath = path.relative(path.resolve(config.src), filePath);
    const destPath = path.resolve(config.dist, srcPath);
    del.sync(destPath);

    console.log(`File ${chalk.underline.red(filePath)} has been removed`);
}

function onWatchError(error) {
    console.log(chalk.underline.red('Error happened', error));
}

function addEvents(watcher) {
    return watcher
        .on('add', onWatchAdd)
        .on('change', onWatchChange)
        .on('unlink', onWatchRemove)
        .on('error', onWatchError)
}

export function watch(done) {
    const watchers = [
        gulp.watch(
            config.dev.views,
            gulp.series(serve.reload),
        ),

        gulp.watch(
            `${config.dev.sassModules}/**/*.`,
            styles.processStyles,
        ),
    ];

    watchers.map(watcher => addEvents(watcher));

    console.log(chalk.green('Watching changes...'));
    done();
}

