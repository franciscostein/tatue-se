const express = require('express');
const auth = require('../utils/middleware/auth');
const authAdmin = require('../utils/middleware/authAdmin');
const Artist = require('../models/artist');
const router = new express.Router();

// get all
router.get('/artists', auth, async (req, res) => {
    try {
        const artists = await Artist.find();

        if (!artists) {
            return res.status(404).send();
        }

        res.send(artists);
    } 
    catch(e) {
        res.status(500).send(e);
    }
});

// get by id
router.get('/artists/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const artist = await Artist.findOne({ _id });

        if (!artist) {
            return res.status(404).send();
        }

        res.send(artist);
    }
    catch(e) {
        res.status(500).send(e);
    }
});

// insert
router.post('/artists', auth, async (req, res) => {
        const artist = new Artist({ ...req.body });

    try {
        await artist.save();

        res.status(201).send(artist);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

// update
router.patch('/artists/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const notAllowedUpdates = ['user'];
    const isValidOperation = updates.every(update => !notAllowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Update denied' });
    }

    try {
        const artist = await Artist.findOne({ _id: req.params.id });

        if (!artist) {
            return res.status(404).send();
        }

        updates.forEach(update => artist[update] = req.body[update]);

        await artist.save();

        res.send(artist);
    }
    catch(e) {
        res.status(500).send(e);
    }
});

// delete
router.delete('/artists/:id', authAdmin, async (req, res) => {
    try {
        const artist = await Artist.findOneAndDelete({ _id: req.params.id });

        if (!artist) {
            return res.status(404).send();
        }

        res.send(artist);
    }
    catch(e) {
        res.status(500).send();
    }
});

module.exports = router;