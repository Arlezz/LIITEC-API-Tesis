const { Router } = require("express");
const router = Router();
const ChannelController = require("../controller/ChannelController");

//Middleware
const authorization = require("../auth/apiAuth");

//Get all channels
router.get("/channels",authorization.requireAPIKeyOfType(process.env.USER_LEVEL_2),ChannelController.getChannels);

//Get a channel by id
router.get("/channels/:id",authorization.requireAPIKeyOfType(process.env.USER_LEVEL_1), ChannelController.getChannelById);

//Get my channels
router.get("/users/:userId/channels", authorization.requireAPIKeyOfType(process.env.USER_LEVEL_1), ChannelController.getMyChannels);

//Create a channel
router.post("/channels",authorization.requireAPIKeyOfType(process.env.USER_LEVEL_1), ChannelController.createChannel);

//Update a channel
router.put("/channels/:id",authorization.requireAPIKeyOfType(process.env.USER_LEVEL_1), ChannelController.updateChannel);

//Delete a channel
router.delete("/channels/:id",authorization.requireAPIKeyOfType(process.env.USER_LEVEL_1), ChannelController.deleteChannel);

module.exports = router;