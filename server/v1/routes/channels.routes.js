const { Router } = require("express");
const router = Router();
var dotenv = require('dotenv');
dotenv.config({path: '.env'});
const ChannelController = require("../../controller/channel.controller");

//User levels authorization
const { USER_LEVEL_0, USER_LEVEL_1, USER_LEVEL_2 } = process.env;

//Middleware
const authorization = require("../../auth/apiAuth");

// Channels Resource
router.get("/channels", authorization.requireAPIKeyOfType(USER_LEVEL_2), ChannelController.getChannels);
router.post("/channels", authorization.requireAPIKeyOfType(USER_LEVEL_1), ChannelController.createChannel);

// Individual Channel Resource
router.get("/channels/:id", authorization.requireAPIKeyOfType(USER_LEVEL_0), ChannelController.getChannelById);
router.put("/channels/:id", authorization.requireAPIKeyOfType(USER_LEVEL_1), ChannelController.updateChannel);
router.delete("/channels/:id", authorization.requireAPIKeyOfType(USER_LEVEL_1), ChannelController.deleteChannel);

// User's Channels Resource
router.get("/users/:userId/channels", authorization.requireAPIKeyOfType(USER_LEVEL_1), ChannelController.getMyChannels);

// Access to Channel Resource
router.post("/channels/:id/access", authorization.requireAPIKeyOfType(USER_LEVEL_1), ChannelController.giveUserAccessToChannel);

module.exports = router;