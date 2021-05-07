const express = require('express');
const auth = require('../utils/middleware/auth');
const authAdmin = require('../utils/middleware/authAdmin');
const User = require('../models/user');

const router = new express.Router();

// login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    }
    catch(e) {
        res.status(400).send(e);
    }
});

// logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(toke => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    }
    catch(e) {
        res.status(500).send();
    }
});

// logout all
router.post('/users/logout-all', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.send();
    }
    catch(e) {
        res.status(500).send(e);
    }
});

// get
router.get('/users/:id', auth, async (req, res) => {
    if (!req.user.type === 'ADMIN') {
        res.send(req.user);
    }

    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).send();
        }
        
        res.send(user);
    }
    catch(e) {
        res.status(500).send(e);
    }
});

// insert new
router.post('/users', authAdmin, async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    }
    catch(e) {
        res.status(400).send(e);
    }
});

// update
router.patch('/users/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdatesUser = ['password'];
    const allowedUpdatesAdmin = ['email', 'password', 'type'];
    let isValidOperation = false;

    if (req.user.type === 'ADMIN') {
        isValidOperation = updates.every(update => allowedUpdatesAdmin.includes(update));
    }
    else {
        isValidOperation = updates.every(update => allowedUpdatesUser.includes(update));
    }

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Update denied' });
    }

    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).send();
        }

        updates.forEach(update => user[update] = req.body[update]);

        await user.save();

        res.send(user);
    }
    catch(e) {
        res.status(500).send(e);
    }
});

// delete
router.delete('/users/:id', authAdmin, async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }
    catch(e) {
        res.status(500).send();
    }
});

module.exports = router;