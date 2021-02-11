const express = require('express');
const auth = require('../utils/middleware/auth');
const Artist = require('../models/artist');
const router = new express.Router();

// get all
router.get('/artists', auth, async (req, res) => {
// router.get('/artists', async (req, res) => {
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
// router.get('/artists/:id', async (req, res) => {
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
// router.post('/artists', auth, async (req, res) => {
router.post('/artists', async (req, res) => {
        const artist = new Artist({ ...req.body });

    try {
        await artist.save();
        res.status(201).send(artist);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

module.exports = router;