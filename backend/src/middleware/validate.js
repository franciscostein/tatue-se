const apiError = require('../utils/errors/apiError');

const validate = schema => {
    return async (req, res, next) => {
        try {
            const validatedBody = await schema.validate(req.body);
            req.body = validatedBody;
            next();
        } catch (err) {
            next(apiError.badRequest(err));
        }
    }
}

module.exports = validate;