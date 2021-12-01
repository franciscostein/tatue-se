const { apiResponse } = require('../utils/messages');
const Studio = require('../models/Studio');

exports.save = async (userId, { name, location, logo, coverImage, about, social, businessHours, photos, reviews }) => {
	const studio = await Studio.findOne({ owner: userId });

	const studioFields = buildObject(name, location, logo, coverImage, about, social, businessHours, photos, reviews);
	studioFields.owner = userId;

	if (studio) {
		const updated = await update(userId, studioFields);
		return apiResponse(updated._doc);
	} else {
		const inserted = await create(studioFields);
		return apiResponse(inserted._doc, 201);
	}
}

exports.getAll = async search => {
    let studios = {};
	
	if (!search) {
		studios = await Studio.find().select('-owner');
	} else if (search === 'idName') {
		studios = await Studio.find().select(['_id', 'name']);
	} else if (search === 'idNameLogoAddress') {
		studios = await Studio.find().select(['_id', 'name', 'logo', 'location.address']);
	}

    if (studios) {
        return apiResponse(studios);
    } else {
        return apiResponse({}, 204);
    }
}

exports.getOneByStudioId = async studioId => {
	const studio = await Studio.findById(studioId).select('-owner');

	if (studio) {
		return apiResponse(studio._doc);
	} else {
		return apiResponse({}, 204);
	}
}

exports.getOwnByUserId = async userId => {
	const studio = await Studio.findOne({ 'owner': userId }).select('-owner');

	if (studio) {
		return apiResponse(studio);
	} else {
		return apiResponse({}, 204);
	}
}

exports.deleteById = async userId => {
	const { deletedCount } = await Studio.deleteOne({ owner: userId });

	if (deletedCount > 0) {
		return apiResponse();
	} else {
		return apiResponse({}, 204);
	}
}

const buildObject = (name, location, logo, coverImage, about, social, businessHours, photos, reviews) => {
	const studioFields = {};
	if (name) studioFields.name = name;
	if (location) {
		studioFields.location = {};
		if (location.address) studioFields.location.address = location.address;
		if (location.latitude) studioFields.location.latitude = location.latitude;
		if (location.longitude) studioFields.location.longitude = location.longitude;
	}
	if (logo) studioFields.logo = logo;
	if (coverImage) studioFields.coverImage = coverImage;
	if (about) studioFields.about = about;
	if (social) {
		studioFields.social = {};
		if (social.facebook) studioFields.social.facebook = social.facebook;
		if (social.instagram) studioFields.social.instagram = social.instagram;
		if (social.website) studioFields.social.website = social.website;
		if (social.phone) studioFields.social.phone = social.phone;
		if (social.email) artistFields.social.email = social.email;
	}
    if (businessHours) {
        studioFields.businessHours = {};
        if (businessHours.monday) {
            studioFields.businessHours.monday = {};
            studioFields.businessHours.monday = businessHours.monday;
        }
        if (businessHours.tuesday) {
            studioFields.businessHours.tuesday = {};
            studioFields.businessHours.tuesday = businessHours.tuesday;
        }
        if (businessHours.wednesday) {
            studioFields.businessHours.wednesday = {};
            studioFields.businessHours.wednesday = businessHours.wednesday;
        }
        if (businessHours.thursday) {
            studioFields.businessHours.thursday = {};
            studioFields.businessHours.thursday = businessHours.thursday;
        }
        if (businessHours.friday) {
            studioFields.businessHours.friday = {};
            studioFields.businessHours.friday = businessHours.friday;
        }
        if (businessHours.saturday) {
            studioFields.businessHours.saturday = {};
            studioFields.businessHours.saturday = businessHours.saturday;
        }
        if (businessHours.sunday) {
            studioFields.businessHours.sunday = {};
            studioFields.businessHours.sunday = businessHours.sunday;
        }
    }
	if (photos) {
        studioFields.photos = [];
        studioFields.photos = photos;
    }
	if (reviews) {
		studioFields.reviews = [];
		if (reviews.rating) studioFields.reviews.rating = reviews.rating;
		if (reviews.description) studioFields.reviews.description = reviews.description;
		if (reviews.user) studioFields.reviews.user = reviews.user;
	}
	return studioFields;
}

const update = async (userId, fields) => {
	return await Studio.findOneAndUpdate(
		{ owner: userId },
		{ $set: fields },
		{ new: true }
	);
}

const create = async studioFields => {
	const studio = new Studio(studioFields);
	return await studio.save();
}