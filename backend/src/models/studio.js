const mongoose = require('mongoose');
const Location = require('./location');
const Artist = require('./artist');
const Image = require('./image');

const imageType = {
    PROFILE: 'Profile',
    TATTOO: 'Tattoo',
    FLASH: 'Flash',
    WORKPLACE: 'Workplace'
}

const weekDay = {
    SUNDAY: 'Sunday',
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday'
}

const studioSchema = new mongoose.Schema({
    about: {
        type: String,
        required: true,
        trim: true
    },
    portfolio: [{
        Image,
        imageType
    }],
    artists: [
        Artist
    ],
    location: {
        type: Location,
        required: true
    },
    openTime: [{
        weekDay,
        initialHour: {
            Date
        },
        finalHour: {
            Date
        }
    }],
    rating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Studio = mongoose.model('Studio', studioSchema);

module.exports = Studio;