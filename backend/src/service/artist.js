const ObjectId = require('mongodb').ObjectID;
const { uploadImage } = require('../utils/cloudinary');
const { apiResponse } = require('../utils/messages');
const Artist = require('../models/Artist');

exports.save = async (
	userId,
	{ fullName, biography, workplaces, tattooStyles, social, pricing }
) => {
	const artist = await Artist.findOne({ user: userId });

	const artistFields = buildObject(
		fullName,
		biography,
		workplaces,
		tattooStyles,
		social,
		pricing
	);
	artistFields.user = userId;

	if (artist) {
		const { _doc } = await update(userId, artistFields);
		const updatedArtist = findArtistWithWorkplaces(_doc._id);
		return apiResponse(updatedArtist);
	} else {
		const { _doc } = await create(artistFields);
		const insertedArtist = findArtistWithWorkplaces(_doc._id);
		return apiResponse(insertedArtist, 201);
	}
};

exports.savePhoto = async (userId, base64Image, type) => {
	const artist = await Artist.findOne({ user: userId });

	if (!artist) return apiResponse({ msg: 'Artist not found' }, 404);

	let response = null;

	if (base64Image) {
		response = await uploadImage(
			base64Image,
			`${userId}/artist`,
			'profile'
		);
	}

	if (type === 'profilePicture') {
		artist.profilePicture.publicId = response ? response.secure_url : null;
	} else if (type === 'cover') {
		artist.cover.publicId = response ? response.secure_url : null;
	}
	await artist.save();

	return apiResponse({ [type]: artist[type] });
};

exports.savePortfolio = async (userId, photos) => {
	const artist = await Artist.findOne({ user: userId });

	if (!artist) return apiResponse({ msg: 'Artist not found' }, 404);

	if (photos.some(photo => photo.base64)) {
		const changedPhotos = [];

		for (let index = 0; index < photos.length; index++) {
			const photo = photos[index];

			if (photo.base64) {
				const { secure_url } = await uploadImage(
					photo.base64,
					`${userId}/artist`,
					index
				);
				photo.publicId = secure_url;
			}
			changedPhotos.push(photo);
		}
		artist.portfolio = changedPhotos;
		await artist.save();
	}
	return apiResponse({ portfolio: artist.portfolio });
};

exports.getAll = async (filter, studioId) => {
	let select,
		populate = [];
	const find = studioId ? { workplaces: ObjectId(studioId) } : {};

	if (filter === 'cardInfo') {
		select = ['fullName', 'tattooStyles', 'profilePicture', 'cover'];
		populate = ['tattooStyles'];
	} else {
		select = ['-user'];
		populate = ['workplaces', 'tattooStyles'];
	}

	const artists = await Artist.find(find)
		.select(select)
		.populate(populate)
		.exec();

	if (artists) {
		return apiResponse(artists);
	} else {
		return apiResponse({}, 404);
	}
};

exports.getOne = async artistId => {
	const artist = await Artist.findById(artistId)
		.populate(['workplaces', 'tattooStyles'])
		.exec();

	if (artist) {
		return apiResponse(artist._doc);
	} else {
		return apiResponse({}, 404);
	}
};

exports.getOwnProfile = async userId => {
	const artist = await Artist.findOne({ user: userId })
		.populate('workplaces', ['logo', 'name', 'location'])
		.exec();

	if (artist) {
		return apiResponse(artist);
	} else {
		return apiResponse({}, 404);
	}
};

exports.deleteByUserId = async userId => {
	const { deletedCount } = await Artist.deleteOne({ user: userId });

	if (deletedCount > 0) {
		return apiResponse(null);
	} else {
		return apiResponse({}, 404);
	}
};

const buildObject = (
	fullName,
	biography,
	workplaces,
	tattooStyles,
	social,
	pricing
) => {
	const artistFields = {};
	if (fullName) artistFields.fullName = fullName;
	if (biography) artistFields.biography = biography;
	if (workplaces) artistFields.workplaces = workplaces;
	if (tattooStyles) artistFields.tattooStyles = tattooStyles;
	if (social) {
		artistFields.social = {};
		if (social.facebook) artistFields.social.facebook = social.facebook;
		if (social.instagram) artistFields.social.instagram = social.instagram;
		if (social.website) artistFields.social.website = social.website;
		if (social.phone) artistFields.social.phone = social.phone;
		if (social.email) artistFields.social.email = social.email;
	}
	if (pricing) {
		artistFields.pricing = {};
		if (pricing.hourRate) artistFields.pricing.hourRate = pricing.hourRate;
		if (pricing.minRate) artistFields.pricing.minRate = pricing.minRate;
		if (pricing.currency) artistFields.pricing.currency = pricing.currency;
	}
	return artistFields;
};

const update = async (userId, fields) => {
	return await Artist.findOneAndUpdate(
		{ user: userId },
		{ $set: fields },
		{ new: true }
	);
};

const create = async artistFields => {
	const artist = new Artist(artistFields);
	return await artist.save();
};

const findArtistWithWorkplaces = async artistId => {
	return await Artist.findById(artistId)
		.populate('workplaces', {
			name: 1,
			logo: 1,
			location: { address: 1 },
		})
		.exec();
};
