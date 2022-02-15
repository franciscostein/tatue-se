const { Schema, model } = require('mongoose');

const tattooStyleSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true
	}
});

module.exports = TattooStyle = model('tattooStyle', tattooStyleSchema);