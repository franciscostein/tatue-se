const bcrypt = require('bcryptjs');
const { formatMessageApi } = require('../utils/messages');
const { generateToken } = require('../utils/auth');
const User = require('../models/User');

exports.authenticate = async (email, password) => {
	let user = await User.findOne({ email });

	if (!user) return formatMessageApi([{ msg: 'Invalid credentials' }], 400, 'errors');

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) return formatMessageApi([{ msg: 'Invalid credentials' }], 400, 'errors');

	const { error, token } = await generateToken(user.id);

	if (token) {
        return formatMessageApi(token, 200, 'token');
    } else {
        throw new Error(error);
    }
}