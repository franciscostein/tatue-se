const bcrypt = require('bcryptjs');
const { formatMessageApiPayloadName } = require('../utils/messages');
const { generateToken } = require('../utils/auth');
const User = require('../models/User');

exports.authenticate = async (email, password) => {
	let user = await User.findOne({ email });

	if (!user) return formatMessageApiPayloadName([{ msg: 'Invalid credentials' }], 400, 'errors');

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) return formatMessageApiPayloadName([{ msg: 'Invalid credentials' }], 400, 'errors');

	const { error, token } = await generateToken(user.id);

	if (token) {
        return formatMessageApiPayloadName(token, 200, 'token');
    } else {
        throw new Error(error);
    }
}