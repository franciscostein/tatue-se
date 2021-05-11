const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.save = async ({ email, password, userType }) => {
	try {
		let user = await User.findOne({ email });

		if (user) return formatMessage(400, [{ msg: 'User already exists' }], 'errors');

		user = new User({ email, password, userType });
		user.password = await hashPassword(password);

		await user.save();

		return await generateToken(user);
	} catch (err) {
		console.log(err.message);
		return formatMessage(500, err)
	}
}

const formatMessage = (status, payloadValue, payloadName = 'msg') => {
	return {
		status,
		payload: {
			[payloadName]: payloadValue
		}
	}
}

const generateToken = async user => {
	const payload = {
		user: {
			id: user.id
		}
	}

	return new Promise((resolve, reject) => {
		jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
			if (err) reject(formatMessage(500, [{ msg: err }], 'errors'));
			else resolve(formatMessage(200, token, 'token'));
		});
	});
}

const hashPassword = async password => {
	const salt = await bcrypt.genSalt(13);
	return await bcrypt.hash(password, salt);
}