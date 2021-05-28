const { Schema, model } = require('mongoose');
const { arrayLimit } = require('../utils/validation');

const artistSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	fullName: {
		type: String,
		required: true,
		trim: true
	},
	location: {
		city: String,
		latitude: String,
		longitude: String
	},
	profilePicture: {
		publicId: String
	},
	biography: {
		type: String,
		trim: true
	},
	workplace: [{
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
		website: String
	},
	pricing: {
		value: Number,
		currency: String
	}
}, {
	timestamps: true
});

module.exports = Artist = model('artist', artistSchema);