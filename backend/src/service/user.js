const User = require('../models/User');
const Artist = require('../models/Artist');
const Studio = require('../models/Studio');
const { hashPassword, generateToken } = require('../utils/auth');
const { apiResponsePayloadName, apiResponse } = require('../utils/messages');

exports.create = async (email, password, profilePicture, userType) => {
    let user = await User.findOne({ email });

    if (user) return apiResponsePayloadName('errors', [{ msg: 'User already exists' }], 400);

    user = new User({ email, password, profilePicture, userType });
    user.password = await hashPassword(password);
    
    await user.save();

    const { error, token } = await generateToken(user.id);
	
    if (token) {
        return apiResponsePayloadName('token', token, 201);
    } else {
        throw new Error(error);
    }
}

exports.getUserInfo = async userId => {
    const user = await User.findById(userId);

    if (!user) return;

    const artist = await Artist.findOne({ user: userId }).select([ '_id', 'profilePicture' ]);
    const studio = await Studio.findOne({ user: userId }).select('_id');

    const userInfo = {
        userEmail: user.email,
        artistId: artist && artist._id,
        artistProfilePicture: artist && artist.profilePicture,
        studioId: studio && studio._id
    }

    return apiResponse(userInfo);
}