const { Router } = require("express");
const router = Router();
const ChannelController = require("../controller/ChannelController");

//Middleware
const authorization = require("../auth/apiAuth");

//Get all channels
router.get("/channels",authorization.requireAPIKeyOfType("superUser"),ChannelController.getChannels);

//Get a channel by id
router.get("/channels/:id",authorization.requireAPIKeyOfType("advancedUser"), ChannelController.getChannelById);

//Get my channels
router.get("/users/:userId/channels", authorization.requireAPIKeyOfType("advancedUser"), ChannelController.getMyChannels);

//Create a channel
router.post("/channels",authorization.requireAPIKeyOfType("advancedUser"), ChannelController.createChannel);

//Update a channel
router.put("/channels/:id",authorization.requireAPIKeyOfType("advancedUser"), ChannelController.updateChannel);

//Delete a channel
router.delete("/channels/:id",authorization.requireAPIKeyOfType("advancedUser"), ChannelController.deleteChannel);

module.exports = router;