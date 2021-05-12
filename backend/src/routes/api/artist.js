const express = require('express');
const auth = require('../../middleware/auth/auth');
const { save } = require('../../service/artist');
const { artistValidation } = require('../../validation/validation');

const router = express.Router();

// @route   POST api/artists
// @desc    create or update artist
// @access  private
router.post('/', [auth, artistValidation], async (req, res) => {
    const { status, payload } = await save(req.user.id, req.body);

    return res.status(status).json({ ...payload });
});

module.exports = router;