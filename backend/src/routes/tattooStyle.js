const express = require('express');
const { save, getAll, getMany, deleteOne } = require('../controller/tattooStyle');
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

// @route   GET api/tattoo-styles/many
// @desc    get tattoo styles by their ids
// @access  public
router.get('/many', getMany);

// @route   DELETE api/tattoo-styles/:id
// @desc    delete tattoo style by id if authenticated user is an admin
// @access  private
router.delete('/:id', authAdmin, deleteOne);

module.exports = router;