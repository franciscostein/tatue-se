const { save, getAll, getOne } = require('../service/studio');

exports.save = async (req, res, next) => {
    try {
        const { _id, name, location, owners, logo, about, social, businessHours, photos, reviews } = req.body;

        const { status, payload } = await save(req.user.id, _id, name, location, owners, logo, about, social, businessHours, photos, reviews);

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