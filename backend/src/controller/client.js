const { save, getAll, getOne, getOwnByUserId, deleteByUserId } = require('../service/client');

exports.save = async (req, res, next) => {
    try {
        const { fullName, profilePicture, location } = req.body;

        const { status, payload } = await save(req.user.id, fullName, profilePicture, location);

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

exports.getOwn = async (req, res, next) => {
    try {
        const { status, payload } = await getOwnByUserId(req.user.id);

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