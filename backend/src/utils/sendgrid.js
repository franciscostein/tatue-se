const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.createResetPasswordEmail = (emailTo, onetimeLink) => {
    return {
        to: emailTo,
        from: {
            name: 'tatue-se',
            email: process.env.SENDGRID_HOST_EMAIL
        },
        subject: 'Reset password',
        body: onetimeLink,
        html: `<a src=${onetimeLink}>Click here to reset you password.</a>`
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