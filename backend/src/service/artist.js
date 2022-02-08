const ObjectId = require('mongodb').ObjectID;
const { uploadImage } = require('../utils/cloudinary');
const { apiResponse } = require('../utils/messages');
const Artist = require('../models/Artist');

exports.save = async (userId, { fullName, profilePicture, cover, biography, workplaces, tattooStyles, portfolio, social, pricing }) => {
	const artist = await Artist.findOne({ user: userId });

	const artistFields = buildObject(fullName, profilePicture, cover, biography, workplaces, tattooStyles, portfolio, social, pricing);
	artistFields.user = userId;

	if (artist) {
		const updated = await update(userId, artistFields);
		return apiResponse(updated._doc);
	} else {
		const inserted = await create(artistFields);
		return apiResponse(inserted._doc, 201);
	}
}

exports.uploadProfilePicture = async (userId, base64Image) => {
	const artist = await Artist.findOne({ user: userId });

	if (!artist) return apiResponse({ msg: 'Artist not found' }, 404);

	const { secure_url } = await uploadImage(base64Image, `${userId}/artist`, 'profile');
	artist.profilePicture.publicId = secure_url;
	await artist.save();

	return apiResponse({ profilePicture: artist.profilePicture });
}

exports.getAll = async (filter, studioId) => {
	let select, populate = [];
	const find = studioId ? { workplaces: ObjectId(studioId) } : {};

	if (filter === 'cardInfo') {
		select = [ 'fullName', 'tattooStyles', 'profilePicture', 'cover' ];
		populate = [ 'tattooStyles' ];
	} else {
		select = [ '-user' ];
		populate = [ 'workplaces', 'tattooStyles' ];
	}

	const artists = await Artist.find(find).select(select).populate(populate).exec();

	if (artists) {
		return apiResponse(artists);
	} else {
		return apiResponse({}, 404);
	}
}

exports.getOne = async artistId => {
	const artist = await Artist.findById(artistId)
								.populate([ 'workplaces', 'tattooStyles' ]).exec();

	if (artist) {
		return apiResponse(artist._doc);
	} else {
		return apiResponse({}, 404);
	}
}

exports.getOwnProfile = async userId => {
	const artist = await Artist.findOne({ user: userId })
												.populate('workplaces', [ 'logo', 'name', 'location' ])
												.exec();

	if (artist) {
		return apiResponse(artist);
	} else {
		return apiResponse({}, 404);
	}
}

exports.deleteByUserId = async userId => {
	const { deletedCount } = await Artist.deleteOne({ user: userId });

	if (deletedCount > 0) {
		return apiResponse();
	} else {
		return apiResponse({}, 404);
	}
}

const buildObject = (fullName, profilePicture, cover, biography, workplaces, tattooStyles, portfolio, social, pricing) => {
	const artistFields = {};
	if (fullName) artistFields.fullName = fullName;
	if (profilePicture) artistFields.profilePicture = profilePicture;
	if (cover) artistFields.cover = cover;
	if (biography) artistFields.biography = biography;
	if (workplaces) artistFields.workplaces = workplaces;
	if (tattooStyles) artistFields.tattooStyles = tattooStyles;
	if (portfolio) artistFields.portfolio = portfolio;
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
}

const update = async (userId, fields) => {
	return await Artist.findOneAndUpdate(
		{ user: userId },
		{ $set: fields },
		{ new: true }
	);
}

const create = async artistFields => {
	const artist = new Artist(artistFields);
	return await artist.save();
}