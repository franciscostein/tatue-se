const express = require('express');
const { userValidation } = require('../middleware/validation/validation');
const { authenticate } = require('../controller/auth');

const router = express.Router();

// @route   POST api/auth
// @desc    authenticate user & get token
// @access  public
router.post('/', userValidation, authenticate);

module.exports = router;