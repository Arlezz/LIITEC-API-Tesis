const {Router} = require('express');
const router = Router();
var dotenv = require('dotenv');
dotenv.config({path: '.env'});
const DataController = require('../../controller/data.controller');

//User levels authorization
const { USER_LEVEL_0, USER_LEVEL_1, USER_LEVEL_2 } = process.env;

//Middleware
const authorization = require('../../auth/api.middleware');


/**
 * @openapi
 * /data:
 *   get:
 *     summary: Get all data from all devices (Requires level 2 authentication)
 *     tags: 
 *       - Data
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
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           example: desc
 *         description: Order of data by date of creation (default desc, optional)
 *       - in: query
 *         name: variable
 *         schema:
 *           type: string
 *           example: temperature
 *         description: Variable to filter data (optional)
 *     responses:
 *       200:
 *         description: Returns a list of data from all devices 
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
 *                   example: "/api/v1/data?page=2&page_size=10"
 *                 previous:
 *                   type: string
 *                   example: null
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Data'
 *       404:
 *         description: The requested data were not found on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Data not found
 *       500:
 *         description: There was an error getting the devices from the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting data
 */

/**
 * @openapi
 * /data/{deviceId}:
 *   get:
 *     summary: Get all data from a device (Requires level 0 authentication)
 *     tags:
 *       - Data
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path 
 *         name: deviceId
 *         schema:
 *           type: string
 *           example: dv-089f98d5-25f4-4150-ab4e-18be2f098da2
 *         description: ID of the device to get data from
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
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           example: desc
 *         description: Order of data by date of creation (default desc, optional)
 *       - in: query
 *         name: variable
 *         schema:
 *           type: string
 *           example: temperature
 *         description: Variable to filter data (optional)
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           example: 2023-12-20
 *         description: |
 *           Start date to filter data. (optional) Format: YYY-MM-DD
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           example: 2023-12-27
 *         description: |
 *           End date to filter data. (optional) Format: YYY-MM-DD
 *     responses:
 *       200:
 *         description: Returns a list of data from a device
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
 *                   example: "/api/v1/data/dv-089f98d5-25f4-4150-ab4e-18be2f098da2?page=2&page_size=10"
 *                 previous:
 *                   type: string
 *                   example: null
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Data'
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
 *         description: The requested data were not found on the device.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No data found for this device
 *       500:
 *         description: There was an error getting the data from the device.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting data
 */

/**
 * @openapi
 * /data/{deviceId}/agregate:
 *   get:
 *     summary: Get all data from a device with aggregation. (Requires level 0 authentication)
 *     tags:
 *       - Data
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path 
 *         name: deviceId
 *         schema:
 *           type: string
 *           example: dv-089f98d5-25f4-4150-ab4e-18be2f098da2
 *         description: ID of the device to get data from.
 *         required: true
 *       - in: query
 *         name: variable
 *         schema:
 *           type: string
 *           example: temperature
 *         description: Variable to filter data (optional)
 *       - in: query
 *         name: operation
 *         schema:
 *           type: string
 *           example: avg
 *         description: Operation to be performed (avg, min, max, sum. Default avg)
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           example: 2023-12-20
 *         description: |
 *           Start date to filter data. (optional) Format: YYY-MM-DD
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           example: 2023-12-27
 *         description: |
 *           End date to filter data. (optional) Format: YYY-MM-DD
 *     responses:
 *       200:
 *         description: Returns the device variables with the aggregation operation applied.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   avg:
 *                     type: number
 *                     example: 25.453098592619718
 *                   count:
 *                     type: integer
 *                     example: 710
 *                   variable:
 *                     type: string
 *                     example: temperature
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
 *         description: The requested data were not found on the device.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No data found for this device
 *       500:
 *         description: There was an error getting the data from the device.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting data
 */

/**
 * @openapi
 * /data/{deviceId}/last:
 *   get:
 *     summary: Get last data from a device (Requires level 0 authentication)
 *     tags:
 *       - Data
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path 
 *         name: deviceId
 *         schema:
 *           type: string
 *           example: dv-089f98d5-25f4-4150-ab4e-18be2f098da2
 *         description: ID of the device from which the latest data is obtained.
 *         required: true
 *       - in: query
 *         name: variable
 *         schema:
 *           type: string
 *           example: temperature
 *         description: Variable to filter data (optional)
 *     responses:
 *       200:
 *         description: Returns the last data from a device
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   timestamp:
 *                     type: string
 *                     example: 2023-12-21T21:14:53.000Z
 *                   value:
 *                     type: integer
 *                     example: 24.89999962
 *                   createdOn:
 *                     type: string
 *                     example: 2023-12-21T21:14:55.078Z
 *                   variable:
 *                     type: string
 *                     example: temperature
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
 *         description: The requested data were not found on the device.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No data found for this device
 *       500:
 *         description: There was an error getting the data from the device.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting data
 * 
 */

/**
 * @openapi
 * /data/{channelId}/export:
 *   get:
 *     summary: Export data from a channel in csv format. (Requires level 1 authentication)
 *     tags:
 *      - Data
 *     security:
 *      - ApiKeyAuth: []
 *     parameters:
 *       - in: path 
 *         name: channelId
 *         schema:
 *           type: string
 *           example: ch-2cf804f3-5290-412f-ace7-8df8bb8e74bb
 *         description: ID of the channel to get data from.
 *         required: true
 *     responses:
 *       200:
 *         description: Returns a csv file with the data from the channel.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File generated.
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
 *         description: The requested data were not found on the channel.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No data found for this channel
 *       500:
 *         description: There was an error getting the data from the channel.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting data
 */



//Get all data
router.get("/data", authorization.requireAPIKeyOfType(USER_LEVEL_2),DataController.getDatas);

//Get data from a device
router.get("/data/:deviceId", authorization.requireAPIKeyOfType(USER_LEVEL_0),DataController.getDataFromDevice);

//Get data from a device with a agregation
router.get("/data/:deviceId/agregate", authorization.requireAPIKeyOfType(USER_LEVEL_0),DataController.getDataFromDeviceWithAgregate);

//Get last data from a device
router.get("/data/:deviceId/last", authorization.requireAPIKeyOfType(USER_LEVEL_0),DataController.getLastDataFromDevice);

//Export data from a channel
router.get("/data/:channelId/export", authorization.requireAPIKeyOfType(USER_LEVEL_1),DataController.exportDataFromChannel);

//get nariables from a channel
router.get("/data/:channelId/variables", authorization.requireAPIKeyOfType(USER_LEVEL_1),DataController.getVariablesFromChannel);

module.exports = router;