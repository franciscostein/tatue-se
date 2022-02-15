const { Schema, model } = require('mongoose');
const { arrayLimit7 } = require('../utils/validation');

const studioSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		unique: true,
		required: true
	},
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
		latitude: {
			type: String,
			required: true
		},
		longitude: {
			type: String,
			required: true
		}
	},
	logo: {
		publicId: String
	},
	cover: {
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
			opens: String,
			closes: String,
			isOpen: Boolean
		},
		tuesday: {
			opens: String,
			closes: String,
			isOpen: Boolean
		},
		wednesday: {
			opens: String,
			closes: String,
			isOpen: Boolean
		},
		thursday: {
			opens: String,
			closes: String,
			isOpen: Boolean
		},
		friday: {
			opens: String,
			closes: String,
			isOpen: Boolean
		},
		saturday: {
			opens: String,
			closes: String,
			isOpen: Boolean
		},
		sunday: {
			opens: String,
			closes: String,
			isOpen: Boolean
		}
	},
	photos: {
		type: [{ 
			publicId: String,
		}],
		validate: [arrayLimit7, '{Path} exceeds the limit of 7']
	}
}, {
	timestamps: true
});

module.exports = Studio = model('studio', studioSchema);