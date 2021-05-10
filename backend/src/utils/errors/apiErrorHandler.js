const apiError = require('./apiError');

const apiErrorHandler = (err, req, res, next) => {
    if (err instanceof apiError) {
        return res.status(err.code).json(err.message);
    }

    return res.status(500).json('Something went wrong');
}

module.exports = apiErrorHandler;