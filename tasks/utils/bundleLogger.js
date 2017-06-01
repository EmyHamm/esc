const prettyHrtime = require('pretty-hrtime');
const chalk = require('chalk');

let startTime;

export const log = {
    start: () => {
        startTime = process.hrtime();
        console.log('Bundling...');
    },

    end: () => {
        const taskTime = process.hrtime(startTime);
        const prettyTime = prettyHrtime(taskTime);
        console.log('Bundled in', chalk.magenta(prettyTime));
    },
};
