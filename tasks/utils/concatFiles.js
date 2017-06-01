const fs = require('fs');
const path = require('path');

export function concat(opts, cb) {
    const output = opts.src.map(filePath => fs.readFileSync(filePath).toString());

    fs.exists(opts.dest, exists => {
        if (!exists) {
            fs.mkdirSync(opts.dest);
        }

        fs.writeFile(path.join(opts.dest, opts.fileName), out.join('\n'), err => {
            if (err) {
                console.log(err);
            } else if (cb) {
                cb();
            }
        });
    });
}
