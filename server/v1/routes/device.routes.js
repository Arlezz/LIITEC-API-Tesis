const { Router } = require("express");
const router = Router();
var dotenv = require('dotenv');
dotenv.config({path: '.env'});
const DeviceController = require("../../controller/device.controller");

//User levels authorization
const { USER_LEVEL_0, USER_LEVEL_1, USER_LEVEL_2 } = process.env;

//Middleware
const authorization = require("../../auth/api.middleware");

/**
 * @openapi
 * /devices:
 *   get:
 *     summary: Get all devices (Requires level 2 authentication)
 *     tags:
 *       - Devices
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination (default 1, optional)
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page (default 10, optional)
 *     responses:
 *       200:
 *         description: 
 *           This path returns all existing devices in the system.
 *           Requires level 2 authentication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 next:
 *                   type: string
 *                   example: "/api/v1/devices?page=1&page_size=10"
 *                 previous:
 *                   type: string
 *                   example: null
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Data'
 *       404:
 *         description: The requested devices were not found on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Devices not found
 *       500:
 *         description: There was an error getting the devices from the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting devices
 */

/**
 * @openapi
 * /channels/{channelId}/devices:
 *   get:
 *     summary: Get my devices (Requires level 0 authentication)
 *     tags:
 *       - Devices
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path 
 *         name: channelId
 *         schema:
 *           type: string
 *           example: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         description: ID of the channel from which devices are returned 
 *         required: true
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination (default 1)
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page (default 10)
 *     responses:
 *       200:
 *         description: Returns a list of devices from the channel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 next:
 *                   type: string
 *                   example: "/api/v1/channels/ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7/devices?page=2&page_size=10"
 *                 previous:
 *                   type: string
 *                   example: null
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Device'
 *       401:
 *         description: You do not have the necessary permissions to access this route.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access Forbidden
 *       404:
 *         description: The requested devices were not found on the channel.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Devices not found
 *       500:
 *         description: There was an error getting the devices from the channel.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting devices
 * 
 */

/**
 * @openapi
 * /channels/{channelId}/devices/{deviceId}:
 *   get:
 *     summary: Get a device by id (Requires level 0 authentication)
 *     tags:
 *       - Devices
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: string
 *         description: ID of the device to return
 *         required: true
 *       - in: path  
 *         name: channelId
 *         schema:
 *           type: string
 *           example: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         description: ID of the channel from which the device is returned
 *         required: true
 *     responses:
 *       200:
 *         description: This route returns the existing device in the channel
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Cambiado a 'object'
 *               properties:
 *                 device:  # Cambiado a 'device'
 *                   $ref: '#/components/schemas/Device'
 *       401:
 *         description: You do not have the necessary permissions to access this route.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access Forbidden
 *       404:
 *         description: The requested devices were not found on the channel.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Device not found
 *       500:
 *         description: There was an error obtaining the channel device.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting device
 */

/**
 * @openapi
 * /channels/{channelId}/devices:
 *   post:
 *     summary: Create a device (Requires level 1 authentication)
 *     tags:
 *       - Devices
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path  
 *         name: channelId
 *         schema:
 *           type: string
 *           example: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         description: ID of the channel on which the device is to be created.
 *         required: true
 *     requestBody:
 *       description: Data to create a device. Name and description are optional. The type can be "analog", "digital" or "both".
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Sensor de intensidad de gases
 *             description: Sensor de la estacion meteorologica
 *             model: MQ-135
 *             type: both
 *             measures:
 *                 variable: gas instensity
 *                 unit: ppm
 *     responses:
 *       200:
 *         description: Device successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Device created successfully
 *       401:
 *         description: You do not have the necessary permissions to access this route.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access Forbidden
 *       404:
 *         description: The requested resources were not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Channel not found
 *       500:
 *         description: An error occurred while creating the channel device.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error creating device
 * 
 */

/**
 * @openapi
 * /channels/{channelId}/devices/{deviceId}:
 *   put:
 *     summary: Updates the data of a device (Requires level 1 authentication)
 *     tags:
 *       - Devices
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: string
 *         description: ID of the device to update
 *         required: true
 *       - in: path  
 *         name: channelId
 *         schema:
 *           type: string
 *           example: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         description: ID of the channel from which the device is updated
 *         required: true
 *     requestBody:
 *       description: 
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Sensor de la granja b
 *             description: Sensor de la granja de pollos
 *             isActive: false
 *     responses:
 *       200:
 *         description: The device has been successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Device successfully updated
 *       400:
 *         description: No changes have been detected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No changes to detected
 *       401:
 *         description: You do not have the necessary permissions to access this route.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access Forbidden
 *       404:
 *         description: The requested resources were not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Device not found
 *       500:
 *         description: The request was not completed. The server met an unexpected condition.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error updating device
 */

/**
 * @openapi
 * /channels/{channelId}/devices/{deviceId}:
 *   delete:
 *     summary: Delete a device (Requires level 1 authentication)
 *     tags:
 *       - Devices
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: string
 *         description: ID of the device to delete
 *         required: true
 *       - in: path  
 *         name: channelId
 *         schema:
 *           type: string
 *           example: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         description: ID of the channel from which the device is deleted
 *         required: true
 *     responses:
 *       200:
 *         description: The device has been successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Device deleted successfully
 *       401:
 *         description: You do not have the necessary permissions to access this route.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access Forbidden
 *       404:
 *         description: The requested resources were not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Device not found
 *       500:
 *         description: The request was not completed. The server met an unexpected condition.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error deleting device
 * 
 */

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
