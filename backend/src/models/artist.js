const mongoose = require('mongoose');
const TattooStyles = require('./tattooStyles');
const Location = require('./location');
const Image = require('./image');
const User = require('./user');

const artistSchema = new mongoose.Schema({
    user: {
        type: User,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: Image,
        required: true
    },
    location: {
        type: Location,
        required: true
    },
    styles: [
        TattooStyles
    ],
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

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;