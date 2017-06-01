const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const json = require('./json');

module.exports = () => {
    const obj = {};

    obj.contact = (req, res) => {
        const transporter = nodemailer.createTransport({
            service: global.config.MAILER_SERVICE,
            auth: {
                user: global.config.MAILER_USER,
                pass: global.config.MAILER_PASS,
            },
        });

       /* const template = fs.readFileSync('./templates/contact.template.html', {encoding: 'utf-8'});
        const compiled = handlebars.compile(template);
        const replacements = {
            phone: req.body.phone,
            message: req.body.message,
            name: req.body.name, 
        };
        const templateToSend = compiled(replacements); */;

        const mailOptions = {
            from: req.body.email,
            to: global.config.MAILER_USER,
            subject: `New Contact from ${req.body.email}`,
            text: req.body.message + req.body.phone + req.body.name,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                json.bad(error, res);
            } else {
                json.good(info.response, res);
            }
        });
    };

    return obj;
}