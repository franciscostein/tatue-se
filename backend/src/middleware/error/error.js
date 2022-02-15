const error = (error, req, res, next) => {
    console.error('Middleware, server error:', error);
    res.status(500).json({ msg: error.message });
}

module.exports = error;