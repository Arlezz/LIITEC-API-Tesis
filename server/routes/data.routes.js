const {Router} = require('express');
const router = Router();
const DataController = require('../controller/DataController');

//User levels authorization
const { USER_LEVEL_2 } = process.env;

//Middleware
const authorization = require('../auth/apiAuth');

//Get all data
router.get("/data", authorization.requireAPIKeyOfType(USER_LEVEL_2),DataController.getDatas);

//Get data from a device
router.get("/data/:deviceId", authorization.requireAPIKeyOfType(USER_LEVEL_2),DataController.getDataFromDevice);

//Get data from a device with a agregation
router.get("/data/:deviceId/agregate", authorization.requireAPIKeyOfType(USER_LEVEL_2),DataController.getDataFromDeviceWithAgregate);

//Get last data from a device
router.get("/data/:deviceId/last", authorization.requireAPIKeyOfType(USER_LEVEL_2),DataController.getLastDataFromDevice);



module.exports = router;