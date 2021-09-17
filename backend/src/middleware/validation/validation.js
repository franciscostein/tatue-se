const { check, validationResult } = require('express-validator');

exports.userValidation = [
	check('email', 'e-mail is required').exists(),
	check('email', 'invalid e-mail address').isEmail(),
	check('password', 'password is required').exists(),
	check('password', 'password must be at least 7 characters long').isLength({ min: 7 }),
	(req, res, next) => errorHandler(req, res, next)
];

exports.artistValidation = [
	check('fullName', 'fullName is required').exists(),
	check('location', 'location is required').exists(),
	check('location.city', 'city is required').exists(),
	check('location.latitude', 'latitude is required').exists(),
	check('location.longitude', 'longitude is required').exists(),
	(req, res, next) => errorHandler(req, res, next)
]

exports.tattooStylesValidation = [
	check('name', 'name is required').exists(),
	(req, res, next) => errorHandler(req, res, next)
]

exports.clientValidation = [
	check('fullName', 'fullName is required').exists(),
	(req, res, next) => errorHandler(req, res, next)
]

exports.studioValidation = [
	check('name', 'name is required').exists(),
	check('location', 'location is required').exists(),
	check('location.address', 'address is required').exists(),
	check('location.city', 'city is required').exists(),
	check('location.latitude', 'latitude is required').exists(),
	check('location.longitude', 'longitude is required').exists(),
	(req, res, next) => errorHandler(req, res, next)
]

const errorHandler = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

	next();
}