const { formatMessageApi } = require('../utils/messages');
const Artist = require('../models/Artist');

exports.save = async (userId, body) => {
	const artistFields = buildArtistObject(body);
	artistFields.user = userId;

	try {
		let artist = await Artist.findOne({ user: userId });

		if (artist) {
			return await update(artist, artistFields, userId);
		} else {
			return await create(artist, artistFields);
		}
	} catch (err) {
		console.log(err.message);
		return formatMessageApi(err, 500);
	}
}

const buildArtistObject = ({ name, profilePicture, location, styles, portfolio, biography, social }) => {
	const artistFields = {}
	if (name) artistFields.name = name;
	if (profilePicture) artistFields.profilePicture = profilePicture;
	if (location) artistFields.location = location;
	if (styles) artistFields.styles = styles;
	if (portfolio) artistFields.portfolio = portfolio;
	if (biography) artistFields.biography = biography;
	if (social) {
		if (social.youtube) artistFields.social.youtube = social.youtube;
		if (social.twitter) artistFields.social.twitter = social.twitter;
		if (social.facebook) artistFields.social.facebook = social.facebook;
		if (social.instagram) artistFields.social.instagram = social.instagram;
		if (social.website) artistFields.social.website = social.website;
	}
	return artistFields;
}

const update = async (artist, artistFields, userId) => {
	artist = await Artist.findOneAndUpdate(
		{ user: userId },
		{ $set: artistFields },
		{ new: false }
	);
	return formatMessageApi(artist, 200, 'artist');
}

const create = async (artist, artistFields) => {
	artist = new Artist(artistFields);
	await artist.save();

	return formatMessageApi(artist, 200, 'artist');
}