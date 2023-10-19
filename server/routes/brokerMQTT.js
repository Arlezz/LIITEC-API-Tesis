const {Router} = require('express');
const router = Router();
const mqttHandler = require('../controller/mqttHandler');
const sensorData = require('../models/sensorDataModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


//Middleware
const authorization = require('../auth/apiAuth');


//Advanced user actions
router.get('/connect',authorization.requireAPIKeyOfType('advancedUser'), async (req,res) => {
    const { host, email, password } = req.body;

    if (!host || !email || !password) {
        return res.status(400).json({ "error": "Missing params" });
    }

    const user = await User.findOne({email:email});
    //console.log(user);

    if (!user) {
        return res.status(404).json({ "error": "User not found" });
    }

    bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
            return res.status(500).json({ "error": "Error comparing passwords" });
        }

        if (!result) {
            return res.status(400).json({ "error": "Wrong password" });
        }
    });    
    
    try{
        const currentUser = await User.findOne({email:email});
        
        if (!currentUser) {
            return res.status(404).json({ "error": "User not found" });
        } else if(currentUser.channels.length === 0){
            return res.status(400).json({ "error": "User has no channels, try create one" });
        } else {

            const mqttClient = new mqttHandler(
                host,
                email,
                password
            );
        
            mqttClient.connect();

            const channels = currentUser.channels;
            console.log(channels);
            console.log(channels.length);

            channels.forEach((channel) => {
                const channelId = channel.channelId; // Supongamos que el campo es 'channelId'
                mqttClient.suscribeChannel(channelId);
            });
        
            res.json({ "message": "Connected to broker" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "User not found" });
    }
});


router.post('/sendMessage/:message', async(req,res) => {
    try {
        const newSensorData = new sensorData({
            channelID:req.params.channelID,
            deviceID:req.params.deviceID,
            value: req.params.value,
            createdOn: Date.now()
        });
        
        mqttHandler.sendMessage(req.params.message);
        await newSensorData.save();
        res.json({ "message": "Channel created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error creating channel" });
    }
    res.send("<h1>Message sent</h1>");
});


module.exports = router;