const {Router} = require('express');
const router = Router();
const mongoose = require('mongoose');
const Channel = require('../models/channelModel');
const Device = require('../models/deviceModel');



//make a function to get all the channels from the mongo database and return it as a json, accessible only by the administrator
router.get('/', (req,res) => {
    res.send("<h1>Welcome to LIITEC API</h1><br></br><h2>Try to create new channe '/api/createChannel'</h2>");
});

router.get('/createChannel', async (req, res) => {
    try {
        const newChannel = new Channel({
            name:"Channel 1",
            description:"Channel 1 description",
            owner:"admin",
            project:"Project 1",
            topic:"topic1",
            ubication:{
                latitude:"0",
                longitude:"0"
            },
            sensors:[]
        });
        
        await newChannel.save(); // Guarda el nuevo canal en la base de datos

        res.json({ "message": "Channel created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error creating channel" });
    }
});

router.get('/createDevice', async (req, res) => {
    try {
        const newDevice = new Device({
            channelAsociated:"Channel 1",
            name:"Temperature",
            value:[
                {
                    data: 0,
                    createdOn: Date.now()
                },
                {
                    data: 1,
                    createdOn: Date.now()
                },
                {
                    data: 2,
                    createdOn: Date.now()
                }
            ],
            createdOn: Date.now()          
        });
        
        await newDevice.save(); // Guarda el nuevo canal en la base de datos

        res.json({ "message": "Device created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error creating device" });
    }
});

module.exports = router;