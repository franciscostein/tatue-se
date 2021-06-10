const express = require('express');
const auth = require('../middleware/auth/auth');
const { save, getAll, getOne, deleteOne } = require('../controller/artist');
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

// @route   GET api/artists/:id
// @desc    get artist by id
// @access  public
router.get('/:id', getOne);

// @route   DELETE api/artists
// @desc    delete artist by userId
// @access  private
router.delete('/', auth, deleteOne);

module.exports = router;