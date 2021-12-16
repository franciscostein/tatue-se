const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.generateResetPasswordEmail = (emailTo, onetimeLink) => {
    return {
        to: emailTo,
        from: {
            name: 'tatue-se',
            email: process.env.SENDGRID_HOST_EMAIL
        },
        subject: 'Reset password',
        body: onetimeLink,
        html: `link: ${onetimeLink}`
    }
}

exports.sendEmail = async email => {
    try {
        await sendgrid.send(email);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}