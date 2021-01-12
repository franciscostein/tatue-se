const mongoose = require('mongoose');

const tattooistSchema = new mongoose.Schema({

}, {
    timestamps: true
});

const Tattooist = mongoose.model('Studio', tattooistSchema);

module.exports = Tattooist;