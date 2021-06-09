const express = require('express');
const auth = require('../middleware/auth/auth');
const { save, getAll } = require('../controller/artist');
const { artistValidation } = require('../middleware/validation/validation');

const router = express.Router();

// @route   POST api/artists
// @desc    create or update artist
// @access  private
router.post('/', [auth, artistValidation], save);

// @route   GET api/artists
// @desc    get all artists
// @access  public
router.get('/', getAll);

module.exports = router;