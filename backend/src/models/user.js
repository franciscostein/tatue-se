const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const validator = require('validator');

const userType = {
    ADMIN: 'admin',
    TATTOOIST: 'tattooist',
    CLIENT: 'client'
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email inválido');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlenght: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('senha')) {
                throw new Error('Senha inválida, não utilize "senha"');
            }
        }
    },
    type: {
        type: userType,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;