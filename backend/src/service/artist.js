const { apiResponse } = require('../utils/messages');
const Artist = require('../models/Artist');

exports.save = async (userId, { fullName, location, profilePicture, coverImage, biography, workplaces, tattooStyles, portfolio, social, pricing }) => {
	const artist = await Artist.findOne({ user: userId });

	const artistFields = buildObject(fullName, location, profilePicture, coverImage, biography, workplaces, tattooStyles, portfolio, social, pricing);
	artistFields.user = userId;

	if (artist) {
		const updated = await update(userId, artistFields);
		return apiResponse(updated._doc);
	} else {
		const inserted = await create(artistFields);
		return apiResponse(inserted._doc, 201);
	}
}

exports.getAll = async () => {
	const artists = await Artist.find({})
									.populate('workplaces')
									.populate('tattooStyles')
									.exec();

	if (artists) {
		return apiResponse(artists);
	} else {
		return apiResponse({}, 204);
	}
}

exports.getOne = async artistId => {
	const artist = await Artist.findById(artistId);

	if (artist) {
		return apiResponse(artist._doc);
	} else {
		return apiResponse({}, 204);
	}
}

exports.getOwnProfile = async userId => {
	const artist = await Artist.find({ user: userId });

	if (artist) {
		return apiResponse(artist);
	} else {
		return apiResponse({}, 204);
	}
}

exports.deleteByUserId = async userId => {
	const { deletedCount } = await Artist.deleteOne({ user: userId });

	if (deletedCount > 0) {
		return apiResponse();
	} else {
		return apiResponse({}, 204);
	}
}

const buildObject = (fullName, location, profilePicture, coverImage, biography, workplaces, tattooStyles, portfolio, social, pricing) => {
	const artistFields = {};
	if (fullName) artistFields.fullName = fullName;
	if (location) {
		artistFields.location = {};
		if (location.city) artistFields.location.city = location.city;
		if (location.latitude) artistFields.location.latitude = location.latitude;
		if (location.longitude) artistFields.location.longitude = location.longitude;
	}
	if (profilePicture) artistFields.profilePicture = profilePicture;
	if (coverImage) artistFields.coverImage = coverImage;
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