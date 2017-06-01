const http = require('http');
const dotenv = require('dotenv');
const expressConfig = require('./server/express');
const app = expressConfig();
const server = http.createServer(app);

dotenv.load({path: '.env'});

const { env } = process;
const config = Object.assign({}, {
    SERVER_HOST: env.SERVER_HOST,
    SERVER_PORT: env.SERVER_PORT,
    MAILER_SERVICE: env.MAILER_SERVICE,
    MAILER_USER: env.MAILER_USER,
    MAILER_PASS: env.MAILER_PASS,
    ENV: env.NODE_ENV,
});

server.listen(config.SERVER_PORT, () => {
    console.log(`The application is running at: ${config.SERVER_HOST}${config.SERVER_PORT}
        and the environment is currently: ${config.ENV}`);
});


global.config = config;