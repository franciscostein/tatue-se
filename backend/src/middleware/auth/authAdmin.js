const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;

        const user = await User.findById(req.user.id);

        if (user.userType !== 'admin') return res.status(403).json({ msg: 'Access denied' });
        
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid '});
    }
}