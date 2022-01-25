const { cloudinary } = require('../utils/cloudinary');
const User = require('../models/User');
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

exports.saveProfilePicture = async (userId, base64) => {
    let user = await User.findById(userId);
    
    if (!user) return apiResponse({ msg: 'User not found'}, 404);

    const { secure_url } = await cloudinary.uploader.upload(base64, {
        upload_preset: 'ml_default',
        folder: userId,
        public_id: 'user-profile-picture'
    });
    user.profilePicture.publicId = secure_url;
    await user.save();

    return apiResponse({ profilePicture: user.profilePicture });
}

exports.getUserInfo = async userId => {
    const user = await User.findById(userId);

    if (!user) return;

    const userInfo = {
        userId: user.id,
        email: user.email,
        profilePicture: user.profilePicture
    }

    return apiResponse(userInfo);
}

exports.getProfilePicture = async userId => {
    const user = await User.findById(userId);

    if (!user) return apiResponse({ msg: 'User not found'}, 404);

    return apiResponse({ profilePicture: user.profilePicture });
}