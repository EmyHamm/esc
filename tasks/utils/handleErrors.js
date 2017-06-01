const notify = require('gulp-notify');
const gutil = require('gulp-util');

export default function handleErrors (...args) {
    gutil.beep();

    this.emit('end');

    notify.onError({
        title: 'Error',
        message: '<%= error.message %>',
    }).apply(this, args);
};
