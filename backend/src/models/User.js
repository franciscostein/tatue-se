const { Schema, model } = require('mongoose');
const Artist = require('./Artist');
const Studio = require('./Studio');

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlenght: 7,
            trim: true,
        },
        profilePicture: {
            publicId: String,
        },
        userType: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// 'this' only refereces document on non-arrow functions
userSchema.pre('deleteOne', { document: true }, function (next) {
    Artist.deleteOne({ user: this._id }).exec();
    Studio.deleteOne({ owner: this._id }).exec();
    next();
});

module.exports = User = model('user', userSchema);
