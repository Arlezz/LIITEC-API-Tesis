const { Router } = require("express");
const router = Router();
const DeviceController = require("../controller/DeviceController");

//Middleware
const authorization = require("../auth/apiAuth");

//Routes

//Create Device
router.post("/devices",authorization.requireAPIKeyOfType("superUser"), DeviceController.createDevice);

module.exports = router;
