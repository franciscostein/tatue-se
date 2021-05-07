const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validate = require('../validation/user');

exports.save = async (email, password, userType) => {
	try {
		const validationError = validate(email, password);

		if (validationError) formatMessage(400, { errors: [{ msg: validationError }] })

		let user = await User.findOne({ email });

		if (user) return formatMessage(400, { errors: [{ msg: 'User already exists' }] })

		user = new User({ email, password, userType });
		
		const salt = await bcrypt.genSalt(13);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = {
			user: {
				id: user.id
			}
		}

		jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
			if (err) formatMessage(500, { errors: [{ msg: err }] })

			return formatMessage(500, token);
		});
	} catch (err) {
		console.log(err.message);
		return formatMessage(500, err)
	}
}

const formatMessage = (status, payloadObject) => {
	return {
		status,
		payload: {
			payloadObject
		}
	}
}