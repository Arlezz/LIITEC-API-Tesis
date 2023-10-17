const {Router} = require('express');
const router = Router();
const mongoose = require('mongoose');
const Channel = require('../models/channelModel');


router.get('/', (req,res) => {
    res.send("<h1>Welcome to LIITEC API</h1><br></br><h2>Try to create new channe '/api/createChannel'</h2>");
});

router.get('/getAll', async (req, res) => {
    try {
      const result = await Channel.find({});
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ "error": "no channels found" });
    }
});

router.post('/createChannel', async (req, res) => {
    try {
        const newChannel = new Channel({
            name:req.body.name,
            description: req.body.description,
            owner: req.body.owner,
            project:req.body.project,
            ubications: req.body.ubications,
            createdOn: Date.now(),
            sensors: req.body.sensors,
        });

        await newChannel.save();
        res.json({ "message": "Channel created" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error creating channel" });
    }
});



router.put('/createDevice', async (req, res) => {
    const channelId = req.body.channelId;
    console.log(channelId);

    try {
        const channel = await Channel.findById(channelId);

        if (!channel) {
            return res.status(404).json({ "error": "Channel not found" });
        }

        channel.devices.push({
            deviceId: req.body.deviceId,
            model: req.body.model,
            unity: req.body.unity,
            createdOn: Date.now()
        });

        const saveChannel = await channel.save();
        console.log('Device guardado:', saveChannel);
        res.json({ "message": "Device guardado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error creating device" });
    }
});

module.exports = router;