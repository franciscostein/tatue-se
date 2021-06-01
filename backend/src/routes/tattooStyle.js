const express = require('express');
const { save } = require('../controller/tattooStyles');
const { tattooStylesValidation } = require('../middleware/validation/validation');
const authAdmin = require('../middleware/auth/authAdmin');

const router = express.Router();

// @route   POST api/tattoo-styles
// @desc    create or update a tattoo style if it already exists
// @access  private, admins only
router.post('/', [authAdmin, tattooStylesValidation], save);

module.exports = router;