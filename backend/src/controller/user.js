const { create, saveProfilePicture, getUserInfo, getProfilePicture } = require('../service/user');

exports.register = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const { status, payload } = await create(email, password);

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
}

exports.registerAdmin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const { status, payload } = await create(email, password, userType = 'admin');

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
}

exports.updateProfilePicture = async (req, res, next) => {
	try {
		const { base64 } = req.body;
		const { status, payload } = await saveProfilePicture(req.user.id, base64);

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
}

exports.getUserInfo = async (req, res, next) => {
	try {
		const { status, payload } = await getUserInfo(req.user.id);

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
}

exports.getUserProfilePicture = async (req, res, next) => {
	try {
		const { status, payload } = await getProfilePicture(req.user.id);

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
}