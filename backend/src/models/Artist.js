const { Schema, model } = require('mongoose');

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
		name: {
			type: String
		},
		latitude: {
			type: String
		},
		longitude: {
			type: String
		},
		required: true
	},
	profilePicture: {
		type: String
	},
	biography: {
		type: String,
		trim: true
	},
	styles: [{ 
		type: Schema.Types.ObjectId,
		ref: 'tattooStyles'
	}],
	portfolio: [{ 
		publicId: String,
		validate: [arrayLimit, '{Path} exceeds the limit of 50']
	}],
	social: {
		facebook: {
			type: String
		},
		instagram: {
			type: String
		},
		website: {
			type: String
		}
	},
	pricing: {
		value: {
			type: Number
		},
		currency: {
			type: String
		}
	}
}, {
	timestamps: true
});

const arrayLimit = value => value.length <= 50;

module.exports = Artist = model('artist', artistSchema);