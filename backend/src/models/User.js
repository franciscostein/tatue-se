const { Schema, model } = require('mongoose');

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

module.exports = User = model('user', userSchema);
