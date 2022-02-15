const express = require('express');
const auth = require('../middleware/auth/auth');
const {
    save,
    savePhoto,
    savePortfolio,
    getAll,
    getOne,
    getOwnProfile,
    deleteOne,
} = require('../controller/artist');
const { artistValidation } = require('../middleware/validation/validation');

const router = express.Router();

// @route   POST api/artists
// @desc    create or update artist for authenticated user
// @access  private
router.post('/', [auth, artistValidation], save);

// @route   POST api/artists/image
// @desc    save artist's cover or profile picture
// @access  private
router.post('/image', auth, savePhoto);

// @route   POST api/artists/images
// @desc    save artist portfolio for authenticated user
// @access  private
router.post('/images', auth, savePortfolio);

// @route   GET api/artists
// @desc    get all artists
// @access  public
router.get('/', getAll);

// @route   GET api/artists/:id
// @desc    get artist by id
// @access  public
router.get('/:id', getOne);

// @route   GET api/artists/profile/me
// @desc    get artist own profile by its token
// @access  private
router.get('/profile/me', auth, getOwnProfile);

// @route   DELETE api/artists
// @desc    delete artist by userId
// @access  private
router.delete('/', auth, deleteOne);

module.exports = router;
