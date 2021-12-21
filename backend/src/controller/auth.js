const { authenticate, sendResetPasswordEmail, resetPassword } = require('../service/auth');

exports.authenticate = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const { status, payload } = await authenticate(email, password);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}

exports.sendResetPasswordEmail = async (req, res, next) => {
	const { email } = req.body;
	
	try {
		const { status, payload } = await sendResetPasswordEmail(email);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}

exports.resetPassword = async (req, res, next) => {
	const { id, token } = req.params;
	const { password } = req.body;

	try {
		const { status, payload } = await resetPassword(id, token, password);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}