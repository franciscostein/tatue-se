const { Schema, model } = require('mongoose');
const { arrayLimit } = require('../utils/validation');

const artistSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		unique: true,
		required: true
	},
	fullName: {
		type: String,
		required: true,
		trim: true
	},
	location: {
		city: {
			type: String,
			required: true
		},
		latitude: {
			type: String,
			required: true
		},
		longitude: {
			type: String,
			required: true
		}
	},
	profilePicture: {
		publicId: String
	},
	biography: {
		type: String,
		trim: true
	},
	workplaces: [{
		type: Schema.Types.ObjectId,
		ref: 'studio'
	}],
	tattooStyles: [{ 
		type: Schema.Types.ObjectId,
		ref: 'tattooStyles'
	}],
	portfolio: {
		type: [{
			publicId: String
		}],
		validate: [arrayLimit, '{Path} exceeds the limit of 50']
	},
	social: {
		facebook: String,
		instagram: String,
		website: String,
		phone: String,
		email: String
	},
	pricing: {
		hourRate: Number,
		minRate: Number,
		currency: String
	}
}, {
	timestamps: true
});

module.exports = Artist = model('artist', artistSchema);