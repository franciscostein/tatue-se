const mongoose = require('mongoose');
const TattooStyles = require('./tattooStyles');
const Location = require('./location');
const Image = require('./image');
const User = require('./user');

const artistSchema = new mongoose.Schema({
    user: {
        type: User.schema,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: Image.schema,
        required: true
    },
    location: {
        type: Location,
        required: true
    },
    styles: [
        TattooStyles.schema
    ],
    portfolio: [
        Image.schema
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