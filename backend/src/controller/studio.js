const { save } = require('../service/studio');

exports.save = async (req, res, next) => {
    try {
        const { _id, name, location, owners, logo, about, social, openTime, photos, reviews } = req.body;

        const { status, payload } = await save(req.user.id, _id, name, location, owners, logo, about, social, openTime, photos, reviews);

        res.status(status).json({ ...payload });
    } catch (err) {
        next(err);
    }
}