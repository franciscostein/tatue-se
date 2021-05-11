const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { formatMessageApi } = require('./messages');

exports.generateToken = async (id, expiresIn = 3600) => {
	const payload = {
		user: { id }
	}

	return new Promise((resolve, reject) => {
		jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
			if (err) reject(formatMessageApi(500, [{ msg: err }], 'errors'));
			else resolve(formatMessageApi(200, token, 'token'));
		});
	});
}

exports.hashPassword = async (password, saltRounds = 13) => {
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(password, salt);
}