const { Router } = require("express");
const router = Router();
var dotenv = require('dotenv');
dotenv.config({path: '.env'});
const DeviceController = require("../../controller/device.controller");

//User levels authorization
const { USER_LEVEL_0, USER_LEVEL_1, USER_LEVEL_2 } = process.env;

//Middleware
const authorization = require("../../auth/apiAuth");


//Get all devices
router.get("/devices", authorization.requireAPIKeyOfType(USER_LEVEL_2), DeviceController.getDevices);

//Create Device 
router.post("/channels/:channelId/devices",authorization.requireAPIKeyOfType(USER_LEVEL_1),DeviceController.createDevice);

//Get my devices
router.get("/channels/:channelId/devices",authorization.requireAPIKeyOfType(USER_LEVEL_0),DeviceController.getMyDevices);

//Get a device by id
router.get("/channels/:channelId/devices/:deviceId",authorization.requireAPIKeyOfType(USER_LEVEL_0),DeviceController.getDeviceById);

//Update a device
router.put("/channels/:channelId/devices/:deviceId",authorization.requireAPIKeyOfType(USER_LEVEL_1),DeviceController.updateDevice);

//Delete a device
router.delete("/channels/:channelId/devices/:deviceId",authorization.requireAPIKeyOfType(USER_LEVEL_1),DeviceController.deleteDevice);

module.exports = router;
