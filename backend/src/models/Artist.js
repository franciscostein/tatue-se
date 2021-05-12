const { Schema, model } = require('mongoose');

const artistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    styles: [
        { type: String }
    ],
    portfolio: [
        { type: String }
    ],
    biography: {
        type: String,
        trim: true
    },
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        website: {
            type: String
        }
    }
}, {
    timestamps: true
});

module.exports = Artist = model('Artist', artistSchema);