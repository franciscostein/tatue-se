const { formatMessageApi } = require('../utils/messages');
const Studio = require('../models/Studio');

exports.save = async (userId, studioId, name, location, owners, logo, about, social, openTime, photos, reviews) => {
	const studio = await Studio.findOne({ _id: studioId });

	checkIsUserAnOwner(userId, owners, studio ? studio.owners : null);

	const studioFields = buildObject(name, location, owners, logo, about, social, openTime, photos, reviews);

	if (studio) {
		const updated = await update(studioId, studioFields);
		return formatMessageApi(updated._doc, 200);
	} else {
		const inserted = await create(studioFields);
		return formatMessageApi(inserted._doc, 201);
	}
}

const checkIsUserAnOwner = (userId, reqOwners, dbOwners) => {
	const error = new Error('User must be an owner');

	if (!reqOwners && !dbOwners) {
		throw error;
	} else {
		if ((reqOwners && !reqOwners.includes(userId)) || (dbOwners && !dbOwners.includes(userId))) {
			throw error;
		}
	} 
}

const buildObject = (name, location, owners, logo, about, social, openTime, photos, reviews) => {
	const studioFields = {};
	if (name) studioFields.name = name;
	if (location) {
		studioFields.location = {};
		if (location.address) studioFields.location.address = location.address;
		if (location.city) studioFields.location.city = location.city;
		if (location.latitude) studioFields.location.latitude = location.latitude;
		if (location.longitude) studioFields.location.longitude = location.longitude;
	}
	if (owners) {
        studioFields.owners = [];
        studioFields.owners = owners;
    }
	if (logo) studioFields.logo = logo;
	if (about) studioFields.about = about;
	if (social) {
		studioFields.social = {};
		if (social.facebook) studioFields.social.facebook = social.facebook;
		if (social.instagram) studioFields.social.instagram = social.instagram;
		if (social.website) studioFields.social.website = social.website;
		if (social.phone) studioFields.social.phone = social.phone;
	}
    if (openTime) {
        studioFields.openTime = {};
        if (openTime.monday) {
            studioFields.openTime.monday = {};
            studioFields.openTime.monday = openTime.monday;
        }
        if (openTime.tuesday) {
            studioFields.openTime.tuesday = {};
            studioFields.openTime.tuesday = openTime.tuesday;
        }
        if (openTime.wednesday) {
            studioFields.openTime.wednesday = {};
            studioFields.openTime.wednesday = openTime.wednesday;
        }
        if (openTime.thursday) {
            studioFields.openTime.thursday = {};
            studioFields.openTime.thursday = openTime.thursday;
        }
        if (openTime.friday) {
            studioFields.openTime.friday = {};
            studioFields.openTime.friday = openTime.friday;
        }
        if (openTime.saturday) {
            studioFields.openTime.saturday = {};
            studioFields.openTime.saturday = openTime.saturday;
        }
        if (openTime.sunday) {
            studioFields.openTime.sunday = {};
            studioFields.openTime.sunday = openTime.sunday;
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

const update = async (studioId, fields) => {
	return await Studio.findOneAndUpdate(
		{ _id: studioId },
		{ $set: fields },
		{ new: true }
	);
}

const create = async studioFields => {
	const studio = new Studio(studioFields);
	return await studio.save();
}