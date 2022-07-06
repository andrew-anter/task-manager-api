const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'andrew.anter@gmail.com',
        subject: 'Welcome to the task manager app',
        text: `welcome to the app, ${name}. Let me know how you get along with the app`
    });
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'andrew.anter@gmail.com',
        subject: 'Goodbye',
        text: `Goodbuy ${name}, we are looking forward to see you again onboard`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}