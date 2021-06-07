const express = require('express');
const auth = require('../middleware/auth/auth');
const { studioValidation } = require('../middleware/validation/validation');
const { save } = require('../controller/studio');

const router = express.Router();

// @route   POST api/studios
// @desc    create or update studio
// @access  private
router.post('/', [auth, studioValidation], save);

module.exports = router;