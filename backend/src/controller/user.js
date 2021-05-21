const { create } = require('../service/user');

exports.register = async (req, res, next) => {
	const { email, password, userType } = req.body;

	try {
		const { status, payload } = await create(email, password, userType);

		res.status(status).json({ ...payload });
	} catch (err) {
		next(err);
	}
}