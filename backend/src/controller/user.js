const { create, getUserInfo } = require('../service/user');

exports.register = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const { status, payload } = await create(email, password);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}

exports.registerAdmin = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const { status, payload } = await create(email, password, userType = 'admin');

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}

exports.getUserInfo = async (req, res, next) => {
	try {
		const { status, payload } = await getUserInfo(req.user.id);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}