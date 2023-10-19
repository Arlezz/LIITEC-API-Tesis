const {Router} = require('express');
const router = Router();
const User = require('../models/userModel');

//Middleware
const authorization = require('../auth/apiAuth');


router.get('/addChannel', authorization.requireAPIKeyOfType('advancedUser'), async (req, res) => {

    try {
        const user = await User.findOne({ email: req.query.channelOwner });

        if (!user) {
            return res.status(404).json({ "error": "Channel not found" });
        }

        user.channels.push(
            {
                channelId: req.query.channelId,
                createdOn: Date.now()
            }
        )

        await user.save();

        res.json({ "message": "Canal guardado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error creating channel" });
    }
});

module.exports = router;
