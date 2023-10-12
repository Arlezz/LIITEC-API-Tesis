const {Router} = require('express');
const router = Router();
const mongoose = require('mongoose');
const Channel = require('../models/channelModel');


router.get('/', (req,res) => {
    res.send("<h1>Welcome to LIITEC API</h1><br></br><h2>Try to create new channe '/api/createChannel'</h2>");
});

router.get('/createChannel', async (req, res) => {
    try {
        const newChannel = new Channel({
            name:req.params.name,
            description: req.params.description,
            owner: req.params.owner,
            project:req.params.project,
            topic: req.params.topic,
            ubications: req.params.ubications,
            sensors: req.params.sensors,
        });

        await newChannel.save();
        res.json({ "message": "Channel created" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error creating channel" });
    }
});

router.get('/createDevice', async (req, res) => {
    const channelId = req.params.channelID;
    try {
        Channel.findById(channelId, function (err, channel) {
            if(err){
                console.error('Error al encontrar el device:', err);
            }else{
                channel.devices.push({
                    deviceId: req.params.deviceId,
                    model: req.params.model,
                    unity: req.params.unity,
                    createdOn: Date.now()
                });
                channel.save((saveErr, saveChannel) => {
                    if(saveErr){
                        console.error('Error al guardar el device:', saveErr);
                    }else{
                        console.log('Device guardado:', saveChannel);
                    }
                });
            }
        });
        res.json({ "message": "Device guardado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error creating device" });
    }
});

module.exports = router;