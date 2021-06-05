const express = require('express');
const auth = require('../middleware/auth/auth');
const { clientValidation } = require('../middleware/validation/validation');
const { save } = require('../controller/client');

const router = express.Router();

// @route   POST api/clients
// @desc    create or update client
// @access  private
router.post('/', [auth, clientValidation], save);

module.exports = router;