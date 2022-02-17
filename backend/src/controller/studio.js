const {
	save,
	saveImage,
	saveImages,
	getAll,
	getOneByStudioId,
	getOwnByUserId,
	deleteById,
} = require('../service/studio');

exports.save = async (req, res, next) => {
	try {
		const { status, payload } = await save(req.user.id, req.body);

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
};

exports.saveImage = async (req, res, next) => {
	try {
		const { base64, type } = req.body;
		const { status, payload } = await saveImage(req.user.id, base64, type);

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
};

exports.saveImages = async (req, res, next) => {
	try {
		const { status, payload } = await saveImages(req.user.id, req.body);

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
};

exports.getAll = async (req, res, next) => {
	try {
		const { status, payload } = await getAll(req.query.search);

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
};

exports.getOne = async (req, res, next) => {
	try {
		const { status, payload } = await getOneByStudioId(req.params.id);

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
};

exports.getOwn = async (req, res, next) => {
	try {
		const { status, payload } = await getOwnByUserId(req.user.id);

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
};

exports.deleteOne = async (req, res, next) => {
	try {
		const { status, payload } = await deleteById(req.user.id);

		res.status(status).json(payload);
	} catch (error) {
		next(error);
	}
};
