const TattooStyle = require('../models/TattooStyle');
const { formatMessageApi } = require('../utils/messages');

exports.save = async (id, name) => {
    let tattooStyle = await TattooStyle.findById(id);

    const tattooStyleFields = buildObject(name);

    if (tattooStyle) {
        const updated = await update(id, tattooStyleFields);
        return formatMessageApi(updated._doc);
    } else {
        const inserted = await create(tattooStyleFields);
        return formatMessageApi(inserted._doc, 201);
    }
}

exports.getAll = async () => {
    const tattooStyles = await TattooStyle.find();

    if (tattooStyles) {
        return formatMessageApi(tattooStyles);
    } else {
        return formatMessageApi({}, 204);
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