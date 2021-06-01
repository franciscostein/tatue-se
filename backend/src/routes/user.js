const express = require('express');
const { register, registerAdmin } = require('../controller/user');
const { userValidation } = require('../middleware/validation/validation');
const adminAuth = require('../middleware/auth/authAdmin');

const router = express.Router();

// @route   POST api/users
// @desc    register user
// @access  public
router.post('/', userValidation, register);

// @route   POST api/users/admin
// @desc    register admin user
// @access  private, admins only
router.post('/admin', [adminAuth, userValidation], registerAdmin);

module.exports = router;