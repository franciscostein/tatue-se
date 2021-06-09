const { save, getAll } = require('../service/artist');

exports.save = async (req, res, next) => {
	try {
		const { fullName, location, profilePicture, biography, workplace, tattooStyles, portfolio, social, pricing } = req.body;

		const { status, payload } = await save(req.user.id, fullName, location, profilePicture, biography, workplace, tattooStyles, portfolio, social, pricing);

		res.status(status).json({ ...payload });
	} catch (err) {
		next(err);
	}
}

exports.getAll = async (req, res, next) => {
	try {
		const { status, payload } = await getAll();

		res.status(status).json({ ...payload });
	} catch (err) {
		next(err);
	}
}