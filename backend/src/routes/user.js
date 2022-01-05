const express = require('express');
const { register, updateProfilePicture, registerAdmin, getUserInfo } = require('../controller/user');
const { userValidation } = require('../middleware/validation/validation');
const adminAuth = require('../middleware/auth/authAdmin');
const auth = require('../middleware/auth/auth');

const router = express.Router();

// @route   POST api/users
// @desc    register user
// @access  public
router.post('/', userValidation, register);

// @route   POST api/users/admin
// @desc    register admin user
// @access  private, admins only
router.post('/admin', [adminAuth, userValidation], registerAdmin);

// @route   PATCH api/users/profile-picture
// @desc    save profile picture for registered user
// @access  private
router.patch('/profile-picture', auth, updateProfilePicture);

// @route   GET api/users/info
// @desc    get basic info from artist and studio related to the user
// @access  private
router.get('/info', auth, getUserInfo);

module.exports = router;