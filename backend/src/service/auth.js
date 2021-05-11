const bcrypt = require('bcryptjs');
const { formatMessageApi } = require('../utils/messages');
const { generateToken } = require('../utils/auth');
const User = require('../models/User');

exports.authenticate = async ({ email, password }) => {
	try {
		let user = await User.findOne({ email });

		if (!user) return formatMessageApi(400, [{ msg: 'Invalid credentials' }], 'errors');

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) return formatMessageApi(400, [{ msg: 'Invalid credentials' }], 'errors');

		return await generateToken(user.id);
	} catch (err) {
		console.error(err);
		return formatMessageApi(500, 'Server error');
	}
}