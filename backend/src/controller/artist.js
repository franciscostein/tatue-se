const { save, uploadProfilePicture, getAll, getArtistByStudio, getOne, getOwnProfile, deleteByUserId } = require('../service/artist');

exports.save = async (req, res, next) => {
	try {
		const { status, payload } = await save(req.user.id, req.body);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}

exports.uploadProfilePicture = async (req, res, next) => {
	try {
		const { status, payload } = await uploadProfilePicture(req.body);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}

exports.getAll = async (req, res, next) => {
	try {
		const studioId = req.headers.studioid;
		let response = {};

		if (studioId) {
			response = await getArtistByStudio(studioId);
		} else {
			response = await getAll(req.query.filter);
		}

		res.status(response.status).json(response.payload);
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

exports.getOwnProfile = async (req, res, next) => {
	try {
		const { status, payload } = await getOwnProfile(req.user.id);

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