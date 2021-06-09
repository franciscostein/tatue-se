const { save, getAll } = require('../service/client');

exports.save = async (req, res, next) => {
    try {
        const { fullName, profilePicture, location } = req.body;

        const { status, payload } = await save(req.user.id, fullName, profilePicture, location);

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