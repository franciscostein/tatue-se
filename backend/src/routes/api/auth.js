const express = require('express');
const { userValidation } = require('../../validation/user');
const { authenticate } = require('../../service/auth');

const router = express.Router();

// @route   POST api/auth
// @desc    authenticate user & get token
// @access  public
router.post('/', userValidation, async (req, res) => {
    const { status, payload } = await authenticate(req.body);

    return res.status(status).json({ ...payload });
});

module.exports = router;