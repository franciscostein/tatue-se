const express = require('express');
const auth = require('../middleware/auth/auth');
const { clientValidation } = require('../middleware/validation/validation');
const { save, getAll } = require('../controller/client');

const router = express.Router();

// @route   POST api/clients
// @desc    create or update client
// @access  private
router.post('/', [auth, clientValidation], save);

// @route   GET api/clients
// @desc    get all clients
// @access  public
router.get('/', getAll);

module.exports = router;