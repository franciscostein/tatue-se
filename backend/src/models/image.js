const mongoose = require('mongoose');
const User = require('./user');

const imageSchema = new mongoose.Schema({
    name: {
        type: string,
        trim: true,
    },
    description: {
        type: string,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        data: Buffer,
        contentType: String
    },
    owner: User
}, {
    timestamps: true
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;