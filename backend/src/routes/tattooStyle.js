const express = require('express');
const { save, getAll } = require('../controller/tattooStyle');
const { tattooStylesValidation } = require('../middleware/validation/validation');
const authAdmin = require('../middleware/auth/authAdmin');

const router = express.Router();

// @route   POST api/tattoo-styles
// @desc    create or update a tattoo style if it already exists
// @access  private, admins only
router.post('/', [authAdmin, tattooStylesValidation], save);

// @route   GET api/tattoo-styles
// @desc    get all tattoo styles
// @access  public
router.get('/', getAll);

module.exports = router;