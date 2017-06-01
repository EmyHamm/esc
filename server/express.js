const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const contact = require('./contact')();

module.exports = () => {
    const app = express();
    const PATHS = {
        public: path.join(__dirname, '../public'),
        dist: path.join(__dirname, '../dist'),
    };


    app.set('view engine', 'ejs');
    app.set('views', PATHS.public);

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
        next();
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(morgan('dev'));
    app.use(express.static(PATHS.public));
    app.use(express.static(PATHS.dist));

    app.get('/', (req, res) => {
        res.render('index');
    });
    app.post('/contact', contact.contact);

    return app;
};