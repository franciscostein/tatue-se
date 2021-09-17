const { Schema, model } = require('mongoose');
const { arrayLimit } = require('../utils/validation');

const studioSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	location: {
		address: {
			type: String,
			required: true
		},
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
	owners: [{
		type: Schema.Types.ObjectId,
		ref: 'user',
		unique: true,
		required: true
	}],
	logo: {
		publicId: String
	},
	coverImage: {
		publicId: String
	},
	about: {
		type: String,
		trim: true
	},
	social: {
		facebook: String,
		instagram: String,
		website: String,
		phone: String,
		email: String
	},
	businessHours: {
		monday: {
			opens: Date,
			closes: Date
		},
		tuesday: {
			opens: Date,
			closes: Date
		},
		wednesday: {
			opens: Date,
			closes: Date
		},
		thursday: {
			opens: Date,
			closes: Date
		},
		friday: {
			opens: Date,
			closes: Date
		},
		saturday: {
			opens: Date,
			closes: Date
		},
		sunday: {
			opens: Date,
			closes: Date
		}
	},
	photos: {
		type: [{ 
			publicId: String,
		}],
		validate: [arrayLimit, '{Path} exceeds the limit of 10']
	},
	reviews: [{
		rating: Number,
		description: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			unique: true
		}
	}]
}, {
	timestamps: true
});

module.exports = Studio = model('studio', studioSchema);