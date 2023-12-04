const { Router } = require("express");
const router = Router();
const DeviceController = require("../controller/DeviceController");

//User levels authorization
const { USER_LEVEL_1, USER_LEVEL_2 } = process.env;

//Middleware
const authorization = require("../auth/apiAuth");

//Routes
router.get("/devices", authorization.requireAPIKeyOfType(USER_LEVEL_2), DeviceController.getDevices);

//Create Device 
router.post("/channels/:channelId/devices",authorization.requireAPIKeyOfType(USER_LEVEL_1),DeviceController.createDevice);

//Get my devices
router.get("/channels/:channelId/devices",authorization.requireAPIKeyOfType(USER_LEVEL_1),DeviceController.getMyDevices);

//Get a device by id
router.get("/channels/:channelId/devices/:deviceId",authorization.requireAPIKeyOfType(USER_LEVEL_1),DeviceController.getDeviceById);

//Delete a device
router.delete("/channels/:channelId/devices/:deviceId",authorization.requireAPIKeyOfType(USER_LEVEL_1),DeviceController.deleteDevice);

module.exports = router;
