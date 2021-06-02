const { formatMessageApi } = require('../utils/messages');
const Artist = require('../models/Artist');

exports.save = async (userId, fullName, location, profilePicture, biography, workplace, tattooStyles, portfolio, social, pricing) => {
	const artist = await Artist.findOne({ user: userId });

	const artistFields = buildObject(fullName, location, profilePicture, biography, workplace, tattooStyles, portfolio, social, pricing);
	artistFields.user = userId;

	if (artist) {
		const updated = await update(userId, artistFields);
		return formatMessageApi(updated._doc, 200);
	} else {
		const inserted = await create(artistFields);
		return formatMessageApi(inserted._doc, 201);
	}
}

const buildObject = (fullName, location, profilePicture, biography, workplace, tattooStyles, portfolio, social, pricing) => {
	const artistFields = {};
	if (fullName) artistFields.fullName = fullName;
	if (location) {
		artistFields.location = {};
		if (location.city) artistFields.location.city = location.city;
		if (location.latitude) artistFields.location.latitude = location.latitude;
		if (location.longitude) artistFields.location.longitude = location.longitude;
	}
	if (profilePicture) artistFields.profilePicture = profilePicture;
	if (biography) artistFields.biography = biography;
	if (workplace) artistFields.workplace = workplace;
	if (tattooStyles) artistFields.tattooStyles = tattooStyles;
	if (portfolio) artistFields.portfolio = portfolio;
	if (social) {
		artistFields.social = {};
		if (social.facebook) artistFields.social.facebook = social.facebook;
		if (social.instagram) artistFields.social.instagram = social.instagram;
		if (social.website) artistFields.social.website = social.website;
	}
	if (pricing) {
		artistFields.pricing = {};
		if (pricing.value) artistFields.pricing.value = pricing.value;
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