const { formatMessageApi } = require('../utils/messages');
const Studio = require('../models/Studio');

exports.save = async (userId, studioId, name, location, owners, logo, about, social, businessHours, photos, reviews) => {
	const studio = await Studio.findOne({ _id: studioId });

	checkIsUserAnOwner(userId, owners, studio ? studio.owners : null);

	const studioFields = buildObject(name, location, owners, logo, about, social, businessHours, photos, reviews);

	if (studio) {
		const updated = await update(studioId, studioFields);
		return formatMessageApi(updated._doc);
	} else {
		const inserted = await create(studioFields);
		return formatMessageApi(inserted._doc, 201);
	}
}

exports.getAll = async () => {
    const studios = await Studio.find();

    if (studios) {
        return formatMessageApi(studios);
    } else {
        return formatMessageApi({}, 204);
    }
}

exports.getOne = async id => {
	const studio = await Studio.findById(id);

	if (studio) {
		return formatMessageApi(studio._doc);
	} else {
		return formatMessageApi({}, 204);
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

const buildObject = (name, location, owners, logo, about, social, businessHours, photos, reviews) => {
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