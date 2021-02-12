const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userType = {
    ADMIN: 'admin',
    ARTIST: 'artist',
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

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error(`Couldn't find any user for the giving credentials`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error(`Couldn't find any user for the giving credentials`);
    }

    return user;
}

// hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 13);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;