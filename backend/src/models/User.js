const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		minlenght: 7,
		trim: true
	},
	userType: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
		required: true
	}
}, {
	timestamps: true
});

module.exports = User = mongoose.model('User', userSchema);