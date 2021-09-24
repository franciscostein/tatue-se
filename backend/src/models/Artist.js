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
	coverImage: {
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
		ref: 'tattooStyle'
	}],
	portfolio: {
		type: [{
			publicId: String
		}],
		validate: [arrayLimit, '{Path} exceeds the limit of 50']
	},
	social: {
		facebook: {
			type: String,
			default: null
		},
		instagram: {
			type: String,
			default: null
		},
		website: {
			type: String,
			default: null
		},
		phone: {
			type: String,
			default: null
		},
		email: {
			type: String,
			default: null
		}
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