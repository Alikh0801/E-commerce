const nodemailer = require('nodemailer');
const config = require('../config');


const sendEmail = async (options) => {

    //Connect Google service
    const connectEmail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email_user,
            pass: config.email_pass
        }
    });

    //Mail content
    const mailOptions = {
        from: `"A&Z Perfumery" <${config.email_user}>`,
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    //Send mail
    await connectEmail.sendMail(mailOptions);
};

module.exports = sendEmail;