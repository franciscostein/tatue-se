const { save, getAll, getOne, deleteByUserId } = require('../service/artist');

exports.save = async (req, res, next) => {
	try {
		// const { fullName, location, profilePicture, coverImage, biography, workplaces, tattooStyles, portfolio, social, pricing } = req.body;

		// const { status, payload } = await save(req.user.id, fullName, location, profilePicture, coverImage, biography, workplaces, tattooStyles, portfolio, social, pricing);

		const { status, payload } = await save(req.user.id, req.body);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}

exports.getAll = async (req, res, next) => {
	try {
		const { status, payload } = await getAll();

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}

exports.getOne = async (req, res, next) => {
	try {
		const { status, payload } = await getOne(req.params.id);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}

exports.deleteOne = async (req, res, next) => {
	try {
		const { status, payload } = await deleteByUserId(req.user.id);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}