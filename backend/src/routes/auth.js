const express = require('express');
const { userValidation } = require('../middleware/validation/validation');
const {
    authenticate,
    sendResetPasswordEmail,
    resetPassword,
} = require('../controller/auth');

const router = express.Router();

// @route   POST api/auth
// @desc    authenticate user & get token
// @access  public
router.post('/', userValidation, authenticate);

// @route   POST api/auth/forgot-password
// @desc    create and send an one time link via e-mail
// @access  public
router.post('/forgot-password', sendResetPasswordEmail);

// @route   POST api/auth/reset-password/:id/:token
// @desc    reset user password
// @access  public
router.post('/reset-password/:id/:token', resetPassword);

module.exports = router;
