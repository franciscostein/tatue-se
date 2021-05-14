const { Schema, model } = require('mongoose');

const clientSchema = new Schema({

}, {
	timestamps: true
});

module.exports = Client = model('client', clientSchema);