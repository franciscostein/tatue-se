const express = require('express');
const { register } = require('../controller/user');
const { userValidation } = require('../middleware/validation/validation');

const router = express.Router();

// @route   POST api/users
// @desc    register user
// @access  public
router.post('/', userValidation, register);

module.exports = router;