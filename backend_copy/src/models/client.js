const mongoose = require('mongoose');
const Location = require('./location');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    profilePicture: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
    },
    tattooNumber: {
        type: Number,
        default: 0
    },
    favoriteStyles: [{
        type: Schema.Types.ObjectId,
        ref: 'TattooStyles'
    }],
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