const { cloudinary } = require('../utils/cloudinary');
const { apiResponse } = require('../utils/messages');
const Artist = require('../models/Artist');

exports.save = async (userId, { fullName, profilePicture, coverImage, biography, workplaces, tattooStyles, portfolio, social, pricing }) => {
	const artist = await Artist.findOne({ user: userId });

	const artistFields = buildObject(fullName, profilePicture, coverImage, biography, workplaces, tattooStyles, portfolio, social, pricing);
	artistFields.user = userId;

	if (artist) {
		const updated = await update(userId, artistFields);
		return apiResponse(updated._doc);
	} else {
		const inserted = await create(artistFields);
		return apiResponse(inserted._doc, 201);
	}
}

exports.uploadProfilePicture = async fileString => {
	const uploadResponse = await cloudinary.uploader.upload(fileString.base64, {
		upload_preset: 'ml_default'
	});

	return apiResponse(uploadResponse);
}

exports.getAll = async filter => {
	let artists = {}

	if (filter === 'cardInfo') {
		artists = await Artist.find({})
								.select([ 'fullName', 'tattooStyles', 'profilePicture', 'coverImage' ])
								.populate([ 'tattooStyles' ])
								.exec();
	} else {
		artists = await Artist.find({})
								.select('-user')
								.populate([ 'workplaces', 'tattooStyles' ])
								.exec();
	}

	if (artists) {
		return apiResponse(artists);
	} else {
		return apiResponse({}, 404);
	}
}

exports.getArtistByStudio = async studioId => {
	const artists = await Artist.find({ workplaces: studioId })
								.select([ 'fullName', 'tattooStyles', 'profilePicture', 'coverImage' ])
								.populate([ 'tattooStyles' ])
								.exec();

	if (artists) {
		return apiResponse(artists);
	} else {
		return apiResponse({}, 404);
	}
}

exports.getOne = async artistId => {
	const artist = await Artist.findById(artistId)
								.select('-user')
								.populate([ 'workplaces', 'tattooStyles' ]).exec();

	if (artist) {
		return apiResponse(artist._doc);
	} else {
		return apiResponse({}, 404);
	}
}

exports.getOwnProfile = async userId => {
	const artist = await Artist.findOne({ user: userId })
												.select('-user')
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

const buildObject = (fullName, profilePicture, coverImage, biography, workplaces, tattooStyles, portfolio, social, pricing) => {
	const artistFields = {};
	if (fullName) artistFields.fullName = fullName;
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