const { Schema, model } = require('mongoose');

const studioSchema = new Schema({

}, {
    timestamps: true
});

module.exports = Studio = model('studio', studioSchema);