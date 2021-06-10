const express = require('express');
const auth = require('../middleware/auth/auth');
const { clientValidation } = require('../middleware/validation/validation');
const { save, getAll, getOne, deleteOne } = require('../controller/client');

const router = express.Router();

// @route   POST api/clients
// @desc    create or update client
// @access  private
router.post('/', [auth, clientValidation], save);

// @route   GET api/clients
// @desc    get all clients
// @access  public
router.get('/', getAll);

// @route   GET api/clients/:id
// @desc    get client by id
// @access  public
router.get('/:id', getOne);

// @route   DELETE api/clients
// @desc    delete client by userId
// @access  private
router.delete('/', auth, deleteOne);

module.exports = router;