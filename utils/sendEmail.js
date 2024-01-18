const nodeMailer = require('nodemailer');
require('dotenv').config();
const sendEmail = async (opt) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        },
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 30000
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: opt.email,
        subject: opt.subject,
        text: opt.message
    };
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;