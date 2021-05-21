const { authenticate } = require('../service/auth');

exports.authenticate = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const { status, payload } = await authenticate(email, password);

		res.status(status).json({ ...payload });
	} catch (err) {
		next(err);
	}
}