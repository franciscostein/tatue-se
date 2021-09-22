const { save, getAll, getOne, deleteById } = require('../service/studio');

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
		const { status, payload } = await deleteById(req.user.id);

		res.status(status).json(payload);
	} catch (err) {
		next(err);
	}
}