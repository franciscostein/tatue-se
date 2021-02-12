const express = require('express');
const auth = require('../utils/middleware/auth');
const User = require('../models/user');

const router = new express.Router();

// logging in
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    }
    catch(e) {
        res.status(400).send(e);
    }
});

module.exports = router;