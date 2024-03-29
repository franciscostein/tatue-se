const {
    save,
    savePhoto,
    savePortfolio,
    getAll,
    getOne,
    getOwnProfile,
    deleteByUserId,
} = require('../service/artist');

exports.save = async (req, res, next) => {
    try {
        const { status, payload } = await save(req.user.id, req.body);

        res.status(status).json(payload);
    } catch (err) {
        next(err);
    }
};

exports.savePhoto = async (req, res, next) => {
    try {
        const { base64, type } = req.body;
        const { status, payload } = await savePhoto(req.user.id, base64, type);

        res.status(status).json(payload);
    } catch (err) {
        next(err);
    }
};

exports.savePortfolio = async (req, res, next) => {
    try {
        const { status, payload } = await savePortfolio(req.user.id, req.body);

        res.status(status).json(payload);
    } catch (error) {
        next(error);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const studioId = req.headers.studioid;

        const { status, payload } = await getAll(req.query.filter, studioId);

        res.status(status).json(payload);
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        const { status, payload } = await getOne(req.params.id);

        res.status(status).json(payload);
    } catch (err) {
        next(err);
    }
};

exports.getOwnProfile = async (req, res, next) => {
    try {
        const { status, payload } = await getOwnProfile(req.user.id);

        res.status(status).json(payload);
    } catch (err) {
        next(err);
    }
};

exports.deleteOne = async (req, res, next) => {
    try {
        const { status, payload } = await deleteByUserId(req.user.id);

        res.status(status).json(payload);
    } catch (err) {
        next(err);
    }
};
