const User = require('../models/User');
const { hashPassword, generateToken } = require('../utils/auth');
const { apiResponsePayloadName } = require('../utils/messages');

exports.create = async (email, password, userType) => {
    let user = await User.findOne({ email });

    if (user) return apiResponsePayloadName('errors', [{ msg: 'User already exists' }], 400);

    user = new User({ email, password, userType });
    user.password = await hashPassword(password);
    
    await user.save();

    const { error, token } = await generateToken(user.id);
	
    if (token) {
        return apiResponsePayloadName('token', token, 201);
    } else {
        throw new Error(error);
    }
}