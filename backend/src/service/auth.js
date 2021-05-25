const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { formatMessageApi } = require('../utils/messages');
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

exports.hashPassword = async (password, saltRounds = 13) => {
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(password, salt);
}

const generateToken = async (id, expiresIn = 3600) => {
	const payload = {
		user: { id }
	}

	return new Promise((resolve, reject) => {
		jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
			if (err) reject({ error: err, token: null });
			else resolve({ error: null, token });
		});
	});
}

exports.generateToken = generateToken;