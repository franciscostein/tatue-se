const Client = require('../models/Client');
const { formatMessageApi } = require('../utils/messages');

exports.save = async (userId, fullName, profilePicture, location) => {
    const client = await Client.findOne({ user: userId });

    const clientFields = buildObject(fullName, profilePicture, location);
    clientFields.user = userId;

    if (client) {
        const updated = await update(userId, clientFields);
        return formatMessageApi(updated._doc);
    } else {
        const inserted = await create(clientFields);
		return formatMessageApi(inserted._doc, 201);
    }
}

exports.getAll = async () => {
    const clients = await Client.find();

    if (clients) {
        return formatMessageApi(clients);
    } else {
        return formatMessageApi({}, 204);
    }
}

const buildObject = (fullName, profilePicture, location) => {
    const clientFields = {};
    if (fullName) clientFields.fullName = fullName;
    if (profilePicture) clientFields.profilePicture = profilePicture;
    if (location) {
        clientFields.location = {};
        if (location.city) clientFields.location.city = location.city;
        if (location.latitude) clientFields.location.latitude = location.latitude;
        if (location.longitude) clientFields.location.longitude = location.longitude;
    }
    return clientFields;
}

const update = async (userId, fields) => {
	return await Client.findOneAndUpdate(
		{ user: userId },
		{ $set: fields },
		{ new: true }
	);
}

const create = async clientFields => {
	const client = new Client(clientFields);
	return await client.save();
}