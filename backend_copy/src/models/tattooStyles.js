const mongoose = require('mongoose');

const tattooStylesSchema = new mongoose.Schema({
    tattooStyles: {
        type: String,
        enum: [
            'Any',
            'Black & Gray',
            'Blackwork',
            'Chicano',
            'Dotwork',
            'Fineline',
            'Geometric',
            'Poked',
            'Dark Art',
            'Japanese (Irezumi)',
            'Lettering',
            'Neo Traditional',
            'School',
            'Ornamental',
            'Realism',
            'Illustrative',
            'Old School (Traditional)',
            'Polka Style',
            'Tribal',
            'Watercolor',
            'Surrealism',
            'Cosmetic',
            'Ignorant',
        ],
        default: 'Any'
    }
});

const TattooStyles = mongoose.model('TattooStyles', tattooStylesSchema);

module.exports = TattooStyles;