const validator = require('validator');

export const emailValidation = email => {
	if (!validator.isEmail(email)) throw new Error('Invalid e-mail address');
}

export const validatePassword = password => {
	if (password.toLowerCase().includes('password')) throw new Error(`Password shouldn't include "password"`);
}