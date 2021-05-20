const express = require('express');
const auth = require('../middleware/auth/auth');
const { save } = require('../controller/artist');
const { artistValidation } = require('../middleware/validation/validation');

const router = express.Router();

// @route   POST api/artists
// @desc    create or update artist
// @access  private
router.post('/', [auth, artistValidation], save);

module.exports = router;