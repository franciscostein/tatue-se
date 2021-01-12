const mongoose = require('mongoose');
const Tattooist = require('./tattooist');

const studioSchema = new mongoose.Schema({
    about: {
        type: String,
        required: true,
        trim: true
    },
    portfolio: {

    },
    artists: {
        type: [
            Tattooist
        ]
    },
    location: {

    },
    openTime: {

    },
    rating: {

    }
}, {
    timestamps: true
});

const Studio = mongoose.model('Studio', studioSchema);

module.exports = Studio;