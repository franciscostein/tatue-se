const express = require('express');
const service = require('../../service/user');
const validation = require('../../validation/user');

const router = express.Router();

// @route   POST api/users
// @desc    register user
// @access  public
router.post('/', validation.userValidation, async (req, res) => {
	const { email, password, userType } = req.body;

	const { status, payload } = await service.save(email, password, userType);

	return res.status(status).json({ ...payload });
});

module.exports = router;