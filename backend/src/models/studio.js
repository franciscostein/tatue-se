const mongoose = require('mongoose');
const Tattooist = require('./tattooist');
const Image = require('./image');

const imageType = {
    PROFILE: 'profile',
    TATTOO: 'tattoo',
    FLASH: 'flash',
    WORKPLACE: 'workplace'
}

const studioSchema = new mongoose.Schema({
    about: {
        type: String,
        required: true,
        trim: true
    },
    portfolio: [
        Image,
        imageType
    ],
    artists: [
        Tattooist
    ],
    location: {
        type: String,
        required: true
    },
    openTime: [{
        weekDay,
        hour
    }],
    rating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Studio = mongoose.model('Studio', studioSchema);

module.exports = Studio;