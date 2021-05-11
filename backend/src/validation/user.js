const { check, validationResult } = require('express-validator');

exports.userValidation = [
	check('email', 'e-mail is required').exists(),
	check('email', 'invalid e-mail address').isEmail(),
	check('password', 'password is required').exists(),
	check('password', 'password must be at least 7 characters long').isLength({ min: 7 }),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

		next();
	}
];