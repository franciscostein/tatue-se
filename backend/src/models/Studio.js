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
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	logo: {
		publicId: String
	},
	about: {
		type: String,
		trim: true
	},
	openTime: {
		monday: {
			open: Date,
			close: Date
		},
		tuesday: {
			open: Date,
			close: Date
		},
		wednesday: {
			open: Date,
			close: Date
		},
		thursday: {
			open: Date,
			close: Date
		},
		friday: {
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
			close: Date
		},
		sunday: {
			open: Date,
			close: Date
		},
		required: true
	},
	photos: {
		type: [{ 
			publicId: String,
		}],
		validate: [arrayLimit, '{Path} exceeds the limit of 30']
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