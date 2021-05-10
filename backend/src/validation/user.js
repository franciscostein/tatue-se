const { check, validationResult } = require('express-validator');

exports.userValidation = [
	check('email', 'e-mail is required').not().isEmpty(),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

		next();
	}
];