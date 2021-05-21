const { formatMessageApi } = require('../utils/messages');
const Artist = require('../models/Artist');

exports.buildArtistObject = ({ fullName, location, profilePicture, biography, workplace, tattooStyles, portfolio, social, pricing }) => {
	const artistFields = {}
	if (fullName) artistFields.name = fullName;
	if (location) {
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
		if (social.facebook) artistFields.social.facebook = social.facebook;
		if (social.instagram) artistFields.social.instagram = social.instagram;
		if (social.website) artistFields.social.website = social.website;
	}
	if (pricing) {
		if (pricing.value) artistFields.pricing.value = pricing.value;
		if (pricing.currency) artistFields.pricing.currency = pricing.currency;
	}
	return artistFields;
}

exports.update = async (artist, artistFields, userId) => {
	artist = await Artist.findOneAndUpdate(
		{ user: userId },
		{ $set: artistFields },
		{ new: false }
	);
	return formatMessageApi(artist, 200, 'artist');
}

exports.create = async (artist, artistFields) => {
	artist = new Artist(artistFields);
	await artist.save();

	return formatMessageApi(artist, 200, 'artist');
}