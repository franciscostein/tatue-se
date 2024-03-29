const { Schema, model } = require('mongoose');
const { arrayLimit13 } = require('../utils/validation');

const artistSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			unique: true,
			required: true,
		},
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
		profilePicture: {
			publicId: String,
		},
		cover: {
			publicId: String,
		},
		biography: {
			type: String,
			trim: true,
		},
		workplaces: [
			{
				type: Schema.Types.ObjectId,
				ref: 'studio',
				required: true,
			},
		],
		tattooStyles: [
			{
				type: Schema.Types.ObjectId,
				ref: 'tattooStyle',
			},
		],
		portfolio: {
			type: [
				{
					publicId: String,
				},
			],
			validate: [arrayLimit13, '{Path} exceeds the limit of 13'],
		},
		social: {
			facebook: {
				type: String,
				default: '',
			},
			instagram: {
				type: String,
				default: '',
			},
			website: {
				type: String,
				default: '',
			},
			phone: {
				type: String,
				default: '',
			},
			email: {
				type: String,
				default: '',
			},
		},
		pricing: {
			hourRate: Number,
			minRate: Number,
			currency: {
				type: String,
				default: 'EUR',
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Artist = model('artist', artistSchema);
