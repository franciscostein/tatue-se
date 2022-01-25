const express = require('express');
const auth = require('../middleware/auth/auth');
const { studioValidation } = require('../middleware/validation/validation');
const { save, saveLogo, getAll, getOne, getOwn, deleteOne } = require('../controller/studio');

const router = express.Router();

// @route   POST api/studios
// @desc    create or update studio for authenticated user
// @access  private
router.post('/', [auth, studioValidation], save);

// @route   POST api/studios/logo
// @desc    save studio logo for authenticated user
// @access  private
router.post('/logo', auth, saveLogo);

// @route   GET api/studios
// @desc    get all studios
// @access  public
router.get('/', getAll);

// @route   GET api/studios/:id
// @desc    get studio by id
// @access  public
router.get('/:id', getOne);

// @route   GET api/studios/profile/me
// @desc    get own studio by userId in token
// @access  private
router.get('/profile/me', auth, getOwn);

// @route   DELETE api/studios
// @desc    delete studio by userId
// @access  private
router.delete('/:id', auth, deleteOne);

module.exports = router;