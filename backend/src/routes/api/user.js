const express = require('express');
const service = require('../../service/user');
const { userValidation } = require('../../validation/user');

const router = express.Router();

// @route   POST api/users
// @desc    register user
// @access  public
router.post('/', userValidation, async (req, res) => {
	const { status, payload } = await service.save(req.body);

	return res.status(status).json({ ...payload });
});

module.exports = router;