const mongoose = require('mongoose');
const Location = require('./location');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
    },
    location: {
        type: Location,
        required: true
    },
    styles: [{
        type: Schema.Types.ObjectId,
        ref: 'TattooStyles'
    }],
    portfolio: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
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