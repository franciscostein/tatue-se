const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { apiResponsePayloadName, apiResponse } = require('../utils/messages');
const { generateToken } = require('../utils/auth');
const { generateResetPasswordEmail, sendEmail } = require('../utils/sendgrid');
const { generateEmailToken, hashPassword } = require('../utils/auth');
const User = require('../models/User');

exports.authenticate = async (email, password) => {
	const invalidCredentialsError = apiResponsePayloadName('errors', [{ msg: 'Invalid credentials' }], 400);

	let user = await User.findOne({ email });

	if (!user) return invalidCredentialsError;

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) return invalidCredentialsError;

	const { error, token } = await generateToken(user.id);

	if (token) {
        return apiResponsePayloadName('token', token, 200);
    } else {
        throw new Error(error);
    }
}

exports.sendResetPasswordEmail = async emailAddress => {
	const user = await User.findOne({ email: emailAddress });
	
	if (!user) return apiResponse({ msg: 'User not found' }, 404);
	
	const token = generateEmailToken(user.email, user.password);
	const link = `${process.env.FRONTEND_DOMAIN}/reset-password/${user._id}/${token}`;
	const email = generateResetPasswordEmail(user.email, link);
	const sent = sendEmail(email);

	if (sent) {
		return apiResponse({ msg: 'E-mail sent! Please check your inbox for instructions.' });
	} else {
		throw new Error('There was an error. E-mail not sent, please try again.');
	}
}

exports.resetPassword = async (userId, token, newPassword) => {
	const user = await User.findById(userId);
	let expiredToken = false;

	if (!user) return apiResponse({ msg: 'User not found' }, 404);

	const secret = process.env.JWT_SECRET + user.password;
	const response = jwt.verify(token, secret, (error, decoded) => {
		if (error && error.name === 'TokenExpiredError') expiredToken = true;
	});

	if (expiredToken) {
		return apiResponse({ msg: 'Token expired, please request another link.'}, 401);
	} else if (response.email !== user.email) {
		return apiResponse({ msg: `E-mails don't match.` }, 404);
	} else {
		user.password = await hashPassword(newPassword);
		await user.save();
		return apiResponse({ msg: 'Password changed!' });
	}
}