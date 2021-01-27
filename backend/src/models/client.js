const mongoose = require('mongoose');
const TattooStyles = require('./tattooStyles');
const Location = require('./location');
const User = require('./user');
const Image = require('./image');

const clientSchema = new mongoose.Schema({
    user: {
        type: User.schema,
        required: true
    },
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    profilePicture: {
        type: Image.schema,
        required: true
    },
    tattooNumber: {
        type: Number,
        default: 0
    },
    favoriteStyles: [
        TattooStyles.schema
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