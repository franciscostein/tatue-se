const { save } = require('../service/tattooStyle');

exports.save = async (req, res, next) => {
    try {
        const { _id, name } = req.body;

        const { status, payload } = await save(_id, name);

        res.status(status).json({ ...payload });
    } catch (err) {
        next(err);
    }
}