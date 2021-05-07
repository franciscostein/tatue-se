const express = require('express');
const service = require('../../service/user');

const router = express.Router();

// @route   POST api/users
// @desc    register user
// @access  public
router.post('/', async (req, res) => {
	const { email, password, userType } = req.body;

	const { status, payload } = await service.save(email, password, userType);
	// const result = await service.save(email, password, userType);

	console.log(status, payload);

	return res.status(status).json({ ...payload });
});

module.exports = router;