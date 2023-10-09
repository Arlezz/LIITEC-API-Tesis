const {Router} = require('express');
const router = Router();
const mongoose = require('mongoose');
const Channel = require('../models/channelModel');



//make a function to get all the channels from the mongo database and return it as a json, accessible only by the administrator
router.get('/', (req,res) => {
    res.json({"title":"channels"});
});

router.get('/create', async (req, res) => {
    try {
        const newChannel = new Channel({
            name: 'Nombre del Canal',
            description: 'Descripción del Canal',
            owner: 'Propietario del Canal',
            project: 'Proyecto del Canal',
            topic: 'Tema del Canal',
        });
        newChannel.timeseries.push({
            value: 27,
            timestamp: Date.now(), // Debe ser una función que obtenga la hora actual
            granularity: 5,
        });
        newChannel.timeseries.push({
            value: 20,
            timestamp: Date.now(), // Debe ser una función que obtenga la hora actual
            granularity: 5,
        });
        newChannel.timeseries.push({
            value: 15,
            timestamp: Date.now(), // Debe ser una función que obtenga la hora actual
            granularity: 5,
        });

        await newChannel.save(); // Guarda el nuevo canal en la base de datos

        res.json({ "message": "Channel created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error creating channel" });
    }
});

module.exports = router;