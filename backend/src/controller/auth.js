const bcrypt = require('bcryptjs');
const { formatMessageApi } = require('../utils/messages');
const { generateToken } = require('../service/auth');
const User = require('../models/User');

exports.authenticate = async ({ email, password }) => {
	try {
		let user = await User.findOne({ email });

		if (!user) return formatMessageApi([{ msg: 'Invalid credentials' }], 400, 'errors');

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) return formatMessageApi([{ msg: 'Invalid credentials' }], 400, 'errors');

		return await generateToken(user.id);
	} catch (err) {
		console.error(err);
		return formatMessageApi('Server error', 500);
	}
}