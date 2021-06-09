const express = require('express');
const auth = require('../middleware/auth/auth');
const { studioValidation } = require('../middleware/validation/validation');
const { save, getAll, getOne } = require('../controller/studio');

const router = express.Router();

// @route   POST api/studios
// @desc    create or update studio
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

module.exports = router;