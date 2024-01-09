const { Router } = require("express");
const router = Router();
var dotenv = require('dotenv');
dotenv.config({path: '.env'});
const ChannelController = require("../../controller/channel.controller");

//User levels authorization
const { USER_LEVEL_0, USER_LEVEL_1, USER_LEVEL_2 } = process.env;

//Middleware
const authorization = require("../../auth/api.middleware");




/**
 * @openapi
 * /channels:
 *   get:
 *     summary: Get all channels (Requires level 2 authentication)
 *     tags:
 *       - Channels
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
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
 *         description: Returns a list of all channels.
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
 *                   example: "/api/v1/channels?page=2&page_size=10"
 *                 previous:
 *                   type: string
 *                   example: null
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Channel'
 *                 devicesCount:
 *                   type: integer
 *                   example: 2
 *                 devices:
 *                   type: string
 *                   example: "/api/v1/channels/ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7/devices"
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
 *         description: The requested resource was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Channels not found
 *       500:
 *         description: The request was not completed. The server met an unexpected condition.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting channels
 */

/**
 * @openapi
 * /channels/{id}:
 *   get:
 *     summary: Get a channel by id (Requires level 0 authentication)
 *     tags:
 *       - Channels
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path 
 *         name: id
 *         schema:
 *           type: string
 *           example: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         description: ID of the channel to return
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the channel with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   $ref: '#/components/schemas/Channel'
 *                 devicesCount:
 *                   type: integer
 *                   example: 2
 *                 devices:
 *                   type: string
 *                   example: "/api/v1/channels/ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7/devices"
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
 *         description: The requested resource was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Channel not found
 *       500:
 *         description: The request was not completed. The server met an unexpected condition.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting channel
 */

/**
 * @openapi
 * /channels:
 *   post:
 *     summary: Create a new channel (Requires level 1 authentication)
 *     tags:
 *       - Channels
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       description: Data to create a new channel. The "ubication" field is optional, if it is not provided, the channel will be created without ubication. The "owner" field must be the id of the user who is creating the channel.
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Canal de ejemplo
 *             description: Canal de prueba para la documentación
 *             project: Proyecto 2024
 *             owner: 658355548398f5fa3b69e862
 *             ubication:
 *               latitude: 40.7128
 *               longitude: -74.0060
 *     responses:
 *       200:
 *         description: Channel created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Channel created successfully
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
 *       500:
 *         description: The request was not completed. The server met an unexpected condition.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting channels
 * 
 */

/**
 * @openapi
 * /channels/{id}:
 *   put:
 *     summary: Update a channel by id (Requires level 1 authentication)
 *     tags:
 *       - Channels
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path 
 *         name: id
 *         schema:
 *           type: string
 *           example: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         description: ID of the channel to update
 *         required: true
 *     requestBody:
 *       description: Data to update a channel. All fields are optional, but at least one must be provided.
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Canal Principal
 *             description: Es un canal de prueba
 *             project: proyecto 2021
 *             ubication:
 *                latitude: 2.0
 *                longitude: 1.0
 *             isActive: true
 *             isPublic: true
 *     responses:
 *       200:
 *         description: Channel updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Channel updated successfully
 *       304:
 *         description: No changes detected in the channel data. Channel was not updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No changes detected
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
 *         description: The requested resource was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Channel not found
 *       500:
 *         description: The request was not completed. The server met an unexpected condition.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error updating channel
 */

/**
 * @openapi
 * /channels/{id}:
 *   delete:
 *     summary: Delete a channel by id (Requires level 1 authentication)
 *     tags:
 *       - Channels
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the channel to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Channel deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Channel deleted
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
 *         description: The requested resource was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Channel not found
 *       500:
 *         description: The request was not completed. The server met an unexpected condition.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error deleting channel
 */

/**
 * @openapi
 * /users/{userId}/channels:
 *   get:
 *     summary: Get all channels of a user (Requires level 1 authentication)
 *     tags:
 *       - Channels
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path 
 *         name: userId
 *         schema:
 *           type: string
 *           example: 5f8d0f7a3f8d7a0f7d8a0f7d
 *         description: ID of the user to get the channels
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
 *         description: Returns a list of all channels of a user.
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
 *                   example: "/api/v1/users/5f8d0f7a3f8d7a0f7d8a0f7d/channels?page=2&page_size=10"
 *                 previous:
 *                   type: string
 *                   example: null
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Channel'
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
 *         description: The requested resource was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No channels found for this user
 *       500:
 *         description: The request was not completed. The server met an unexpected condition.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error Getting Channels
 */

/**
 * @openapi
 * /channels/{id}/access:
 *   post:
 *     summary: Give access to a user to a channel (Requires level 1 authentication)
 *     tags:
 *       - Channels
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path 
 *         name: id
 *         schema:
 *           type: string
 *           example: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         description: ID of the channel to give access
 *         required: true
 *     requestBody:
 *       description: Data to give access to a user to a channel. The "userId" field must be the id of the user to give access to the channel. The "expiration" field must be the date when the access will expire.
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 65836b51cbacc4a4dd5073d6
 *             expiration: 2023-12-22T00:00:00.000Z
 *     responses:
 *       200:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User access granted
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
 *       403:
 *         description: The user already has access to this channel.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User already has access to this channel
 *       404:
 *         description: The requested resource was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: The request was not completed. The server met an unexpected condition.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error giving user access to channel
 * 
 */



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