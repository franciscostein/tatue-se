const validator = require('validator');

const userValidation = (email, password) => {
	if (!validator.isEmail(email)) return 'Invalid e-mail address';
	if (password.toLowerCase().includes('password')) return `Password shouldn't include 'password'`;
	return null;
}

module.exports = userValidation;