const mongoose = require('mongoose');
const TattooStyles = require('./tattooStyles');
const Location = require('./location');
const User = require('./user');

const clientSchema = new mongoose.Schema({
    user: {
        type: User,
        required: true
    },
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    profilePicture: {
        type: String,
        trim: true,
        required: true
    },
    tattooNumber: {
        type: Number,
        default: 0
    },
    favoriteStyles: [
        TattooStyles
    ],
    location: {
        type: Location,
        required: true
    },
    notification: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;