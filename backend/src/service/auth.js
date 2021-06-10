const bcrypt = require('bcryptjs');
const { apiResponsePayloadName } = require('../utils/messages');
const { generateToken } = require('../utils/auth');
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