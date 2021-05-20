const Artist = require('../models/Artist');
const { buildArtistObject, update, create } = require('../service/artist');

exports.save = async (req, res, next) => {
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
		next(err);
	}
}