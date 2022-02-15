const { uploadImage } = require('../utils/cloudinary');
const { apiResponse } = require('../utils/messages');
const Studio = require('../models/Studio');

exports.save = async (
    userId,
    { name, location, logo, cover, about, social, businessHours, photos }
) => {
    const studio = await Studio.findOne({ owner: userId });

    const studioFields = buildObject(
        name,
        location,
        logo,
        cover,
        about,
        social,
        businessHours,
        photos
    );
    studioFields.owner = userId;

    if (studio) {
        const updated = await update(userId, studioFields);
        return apiResponse(updated._doc);
    } else {
        const inserted = await create(studioFields);
        return apiResponse(inserted._doc, 201);
    }
};

exports.saveImage = async (userId, base64Image, type) => {
    const studio = await Studio.findOne({ owner: userId });

    if (!studio) return apiResponse({ msg: 'Studio not found' }, 404);

    let response = null;

    if (base64Image) {
        response = await uploadImage(base64Image, `${userId}/studio`, type);
    }

    if (type === 'logo') {
        studio.logo.publicId = response ? response.secure_url : null;
    } else if (type === 'cover') {
        studio.cover.publicId = response ? response.secure_url : null;
    }
    await studio.save();

    return apiResponse({ [type]: studio[type] });
};

exports.saveImages = async (userId, images) => {
    const studio = await Studio.findOne({ owner: userId });

    if (!studio) return apiResponse({ msg: 'Studio not found' }, 404);

    if (images.some(image => image.base64)) {
        const changedImages = [];

        for (let index = 0; index < images.length; index++) {
            const image = images[index];

            if (image.base64) {
                const { secure_url } = await uploadImage(
                    image.base64,
                    `${userId}/studio`,
                    index
                );
                image.publicId = secure_url;
            }
            changedImages.push(image);
        }
        studio.photos = changedImages;
        await studio.save();
    }
    return apiResponse({ photos: studio.photos });
};
exports.getAll = async search => {
    let studios = {};

    if (!search) {
        studios = await Studio.find().select('-owner');
    } else if (search === 'idName') {
        studios = await Studio.find().select(['_id', 'name']);
    } else if (search === 'idNameLogoAddress') {
        studios = await Studio.find().select([
            '_id',
            'name',
            'logo',
            'location.address',
        ]);
    }

    if (studios) {
        return apiResponse(studios);
    } else {
        return apiResponse({}, 404);
    }
};

exports.getOneByStudioId = async studioId => {
    const studio = await Studio.findById(studioId);

    if (studio) {
        return apiResponse(studio._doc);
    } else {
        return apiResponse({}, 404);
    }
};

exports.getOwnByUserId = async userId => {
    const studio = await Studio.findOne({ owner: userId });

    if (studio) {
        return apiResponse(studio);
    } else {
        return apiResponse({}, 404);
    }
};

exports.deleteById = async userId => {
    const { deletedCount } = await Studio.deleteOne({ owner: userId });

    if (deletedCount > 0) {
        return apiResponse();
    } else {
        return apiResponse({}, 404);
    }
};

const buildObject = (
    name,
    location,
    logo,
    cover,
    about,
    social,
    businessHours,
    photos
) => {
    const studioFields = {};
    if (name) studioFields.name = name;
    if (location) {
        studioFields.location = {};
        if (location.address) studioFields.location.address = location.address;
        if (location.latitude)
            studioFields.location.latitude = location.latitude;
        if (location.longitude)
            studioFields.location.longitude = location.longitude;
    }
    if (logo) studioFields.logo = logo;
    if (cover) studioFields.cover = cover;
    if (about) studioFields.about = about;
    if (social) {
        studioFields.social = {};
        if (social.facebook) studioFields.social.facebook = social.facebook;
        if (social.instagram) studioFields.social.instagram = social.instagram;
        if (social.website) studioFields.social.website = social.website;
        if (social.phone) studioFields.social.phone = social.phone;
        if (social.email) studioFields.social.email = social.email;
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
    return studioFields;
};

const update = async (userId, fields) => {
    return await Studio.findOneAndUpdate(
        { owner: userId },
        { $set: fields },
        { new: true }
    );
};

const create = async studioFields => {
    const studio = new Studio(studioFields);
    return await studio.save();
};
