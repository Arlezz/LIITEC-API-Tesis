const {Router} = require('express');
const router = Router();


//make a function to get all the channels from the mongo database and return it as a json, accessible only by the administrator
router.get('/', async (req,res) => {
    const channels = await Channel.find();
    res.json(channels);
});

module.exports = router;