const User = require('../models/User');
// const { formatMessageApi } = require('../utils/messages');
const { hashPassword, generateToken } = require('../service/auth');

exports.register = async (req, res, next) => {
	const { email, password, userType } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) res.status(400).json({ errors: [{ msg: 'User already exists' }]});

		user = new User({ email, password, userType });
		user.password = await hashPassword(password);

		await user.save();

		const generatedToken = await generateToken(user.id);

		res.status(201).json(generatedToken);
	} catch (err) {
		next(err);
	}
}

// exports.save = async ({ email, password, userType }) => {
// 	try {
// 		let user = await User.findOne({ email });

// 		if (user) return formatMessageApi([{ msg: 'User already exists' }], 400, 'errors');

// 		user = new User({ email, password, userType });
// 		user.password = await hashPassword(password);

// 		await user.save();

// 		return await generateToken(user.id);
// 	} catch (err) {
// 		console.log(err.message);
// 		return formatMessageApi(err, 500);
// 	}
// }