const { Router } = require("express");
const router = Router();
const ChannelController = require("../controller/ChannelController");

//Middleware
const authorization = require("../auth/apiAuth");



//Get all channels
router.get("/channels",authorization.requireAPIKeyOfType("superUser"),ChannelController.getChannels);
//Create a channel
router.post("/channels",authorization.requireAPIKeyOfType("advancedUser"), ChannelController.createChannel);
//Get a channel by id
router.get("/channels/:id",authorization.requireAPIKeyOfType("advancedUser"), ChannelController.getChannelById);
//Get my channels
router.get("/users/:email/channels", authorization.requireAPIKeyOfType("advancedUser"), ChannelController.getMyChannels);



module.exports = router;
