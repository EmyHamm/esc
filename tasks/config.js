const fs = require('fs');
const minimist = require('minimist');

console.log(minimist(process.argv.slice(2)));


export const config = {
    args: minimist(process.argv.slice(2)),
    dev: {
        images: './public/static/images/*.',
        sass: './public/static/styles/main.sass',
        sassModules: './public/static/styles/**/*.sass',
        css: './public/static/styles/',
        src: '/',
    },

    prod: {
        images: './dist/images/',
        styles: './dist/styles/',
        url: 'https://forrdev.com',
    },

    browsers: [
        'last 2 version',
        'safari 5',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4',
    ],
};
