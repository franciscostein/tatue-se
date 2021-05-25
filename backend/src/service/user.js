const User = require('../models/User');
const { hashPassword, generateToken } = require('../service/auth');
const { formatMessageApi } = require('../utils/messages');

exports.create = async (email, password, userType) => {
    let user = await User.findOne({ email });

    if (user) return formatMessageApi([{ msg: 'User already exists' }], 400, 'errors');
    
    user = new User({ email, password, userType });
    user.password = await hashPassword(password);
    
    await user.save();
    
    const { error, token } = await generateToken(user.id);
	
    if (token) {
        return formatMessageApi(token, 201, 'token');
    } else {
        throw new Error(error);
    }
}