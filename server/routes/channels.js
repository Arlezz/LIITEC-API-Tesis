const {Router} = require('express');
const router = Router();
const Channel = require('../models/channelModel');
const { v4: uuidv4 } = require('uuid');

//Middleware
const authorization = require('../auth/apiAuth');     

//All users actions
router.get('/', (req,res) => {
    res.send("<h1>Welcome to LIITEC API</h1><br></br><h2>Try to create new channe '/api/createChannel'</h2>");
});

//Admin actions
router.get('/getAll',authorization.requireAPIKeyOfType('superUser'), async (req, res) => {
    try {
      const result = await Channel.find({});
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ "error": "no channels found" });
    }
});

//Advanced user actions
router.post('/createChannel',authorization.requireAPIKeyOfType('advancedUser'), async (req, res) => {
    try {

        const channelIdentificator = "ch-"+uuidv4(); //uuidv4() genera un id unico para cada canal
        const channelOwner = req.body.owner;

        const newChannel = new Channel({
            channelId: channelIdentificator,
            name:req.body.name,
            description: req.body.description,
            owner: channelOwner,
            project:req.body.project,
            ubications: req.body.ubications,
            createdOn: Date.now(),
            devices: req.body.sensors,
        });

        res.redirect(`/api/user/addChannel?channelId=${channelIdentificator}&channelOwner=${channelOwner}`);

        await newChannel.save();


    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error creating channel" });
    }
});


//Advanced user actions
router.put('/createDevice',authorization.requireAPIKeyOfType('advancedUser'), async (req, res) => {
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