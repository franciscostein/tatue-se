const { uploadImage } = require('../utils/cloudinary');
const User = require('../models/User');
const { hashPassword, generateToken } = require('../utils/auth');
const { apiResponsePayloadName, apiResponse } = require('../utils/messages');

exports.create = async (email, password, userType) => {
    let user = await User.findOne({ email });

    if (user)
        return apiResponsePayloadName(
            'errors',
            [{ msg: 'User already exists' }],
            400
        );

    user = new User({ email, password, userType });
    user.password = await hashPassword(password);
    await user.save();

    const { error, token } = await generateToken(user.id);

    if (token) {
        return apiResponsePayloadName('token', token, 201);
    } else {
        throw new Error(error);
    }
};

exports.saveProfilePicture = async (userId, base64) => {
    let user = await User.findById(userId);

    if (!user) return apiResponse({ msg: 'User not found' }, 404);

    const { secure_url } = await uploadImage(base64, userId, 'profile');
    user.profilePicture.publicId = secure_url;
    await user.save();

    return apiResponse({ profilePicture: user.profilePicture });
};

exports.getUserInfo = async userId => {
    const user = await User.findById(userId);

    if (!user) return;

    const userInfo = {
        userId: user.id,
        email: user.email,
        profilePicture: user.profilePicture,
    };
    return apiResponse(userInfo);
};

exports.getProfilePicture = async userId => {
    const user = await User.findById(userId);

    if (!user) return apiResponse({ msg: 'User not found' }, 404);

    return apiResponse({ profilePicture: user.profilePicture });
};

exports.deleteUser = async userId => {
    const user = await User.findById(userId);

    if (!user) return apiResponse({ msg: 'User not found' }, 404);

    await user.deleteOne();

    return apiResponse({ userId });
};
