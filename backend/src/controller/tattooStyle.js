const { save, getAll, getManyByIds } = require('../service/tattooStyle');

exports.save = async (req, res, next) => {
    try {
        const { _id, name } = req.body;

        const { status, payload } = await save(_id, name);

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

exports.getMany = async (req, res, next) => {
    try {
        const { _ids } = req.body;

        const { status, payload } = await getManyByIds(_ids);

        res.status(status).json(payload);
    } catch (err) {
        next(err);
    }
}