const {Router} = require('express');
const router = Router();
const mongoose = require('mongoose');
const Channel = require('../models/channelModel');


router.get('/', (req,res) => {
    res.send("<h1>Try to acced '/api/channels'</h1>");
});


module.exports = router;
