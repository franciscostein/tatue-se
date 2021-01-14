const mongoose = require('mongoose');
const TattooStyles = require('./tattooStyles');
const Image = require('./image');

const tattooistSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: String,
        trim: true,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    styles: {
        type: [
            TattooStyles
        ]
    },
    portfolio: [
        Image
    ],
    instagram: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    biography: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Tattooist = mongoose.model('Studio', tattooistSchema);

module.exports = Tattooist;