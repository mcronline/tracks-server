const express = require('express');
const mongoose = require('mongoose');
const modelName = require('../models/modelName');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model(modelName.TRACKS);

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {

    const tracks = await Track.find({ userId : req.user._id});

    res.send(tracks);

});

router.post('/tracks', async (req, res) => {

    const { name, locations } = req.body;

    if(!name || !locations)
        return res.status(422).send('Please specify name and location');

    const track = new Track({
        name,
        locations,
        userId : req.user._id
    });

    try{
        await track.save();
        res.send(track)
    }catch(err){
        res.status(422).send('Could not save the track:' + err.message);
    }

});

module.exports = router;



