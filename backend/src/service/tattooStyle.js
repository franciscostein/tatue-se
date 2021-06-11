const TattooStyle = require('../models/TattooStyle');
const { apiResponse } = require('../utils/messages');

exports.save = async (id, name) => {
    let tattooStyle = await TattooStyle.findById(id);

    const tattooStyleFields = buildObject(name);

    if (tattooStyle) {
        const updated = await update(id, tattooStyleFields);
        return apiResponse(updated._doc);
    } else {
        const inserted = await create(tattooStyleFields);
        return apiResponse(inserted._doc, 201);
    }
}

exports.getAll = async () => {
    const tattooStyles = await TattooStyle.find();

    if (tattooStyles) {
        return apiResponse(tattooStyles);
    } else {
        return apiResponse({}, 204);
    }
}

exports.getManyByIds = async ids => {
    const tattooStyles = await TattooStyle.find({ '_id': ids });

    if (tattooStyles) {
        return apiResponse(tattooStyles);
    } else {
        return apiResponse({}, 204);
    }
}

exports.deleteById = async tattooStyleId => {
	const { deletedCount } = await TattooStyle.deleteOne({ '_id': tattooStyleId });

	if (deletedCount > 0) {
		return apiResponse();
	} else {
		return apiResponse({}, 204);
	}
}

const buildObject = name => {
    const tattooStyle = {};
    tattooStyle.name = name;
    return tattooStyle;
}

const update = async (id, fields) => {
    return await TattooStyle.findOneAndUpdate(
        { _id: id },
        { $set: fields },
        { new: true }
    );
}

const create = async tattooStyleFields => {
    const tattooStyle = new TattooStyle(tattooStyleFields);
    return await tattooStyle.save();
}