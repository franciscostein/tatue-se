const TattooStyle = require('../models/TattooStyle');
const { formatMessageApi } = require('../utils/messages');

exports.save = async (id, name) => {
    let tattooStyle = await TattooStyle.findById(id);

    const tattooStyleFields = buildObject(name);

    if (tattooStyle) {
        const updated = await update(id, tattooStyleFields);
        return formatMessageApi(updated._doc, 200);
    } else {
        const inserted = await create(tattooStyleFields);
        return formatMessageApi(inserted._doc, 201);
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