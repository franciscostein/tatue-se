const express = require('express');
const auth = require('../middleware/auth/auth');
const { studioValidation } = require('../middleware/validation/validation');
const { save, getAll, getOne, deleteOne } = require('../controller/studio');

const router = express.Router();

// @route   POST api/studios
// @desc    create or update studio for authenticated user
// @access  private
router.post('/', [auth, studioValidation], save);

// @route   GET api/studios
// @desc    get all studios
// @access  public
router.get('/', getAll);

// @route   GET api/studios/:id
// @desc    get studio by id
// @access  public
router.get('/:id', getOne);

// @route   DELETE api/studios
// @desc    delete studio by userId
// @access  private
router.delete('/:id', auth, deleteOne);

module.exports = router;