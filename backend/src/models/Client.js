const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	fullName: {
		type: String,
		trim: true,
		required: true
	},
	profilePicture: {
		publicId: String
	},
	location: {
		city: String,
		latitude: String,
		longitude: String,
	}
}, {
	timestamps: true
});

module.exports = Client = model('client', clientSchema);