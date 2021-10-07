const { save, getAll, getOneByStudioId, getOwnByUserId, deleteById } = require('../service/studio');

exports.save = async (req, res, next) => {
    try {
        const { status, payload } = await save(req.user.id, req.body);

        res.status(status).json(payload);
    } catch (err) {
        next(err);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const { status, payload } = await getAll(req.query.search);

        res.status(status).json(payload);
    } catch (err) {
        next(err);
    }
}

exports.getOne = async (req, res, next) => {
	try {
		const { status, payload } = await getOneByStudioId(req.params.id);

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
		const { status, payload } = await deleteById(req.user.id);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}