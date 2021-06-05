const { save } = require('../service/client');

exports.save = async (req, res, next) => {
    try {
        const { user, fullName, profilePicture, location } = req.body;

        const { status, payload } = await save(user, fullName, profilePicture, location);

        res.status(status).json({ ...payload });
    } catch (err) {
        next(err);
    }
}