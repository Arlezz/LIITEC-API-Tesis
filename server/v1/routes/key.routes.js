const { Router } = require("express");
const router = Router();
var dotenv = require('dotenv');
dotenv.config({path: '.env'});
const KeyController = require("../../controller/key.controller");

//User levels authorization
const { USER_LEVEL_0, USER_LEVEL_2 } = process.env;

//Middleware
const authorization = require("../../auth/apiAuth");


/**
 * @openapi
 * /keys:
 *   get:
 *     summary: Get all keys (Requires level 2 authentication)
 *     tags:
 *       - Keys
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
 *           This path returns all existing keys in the system.
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
 *                   example: "/api/v1/keys?page=1&page_size=10"
 *                 previous:
 *                   type: string
 *                   example: null
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Key'
 *       404:
 *         description: The requested data were not found on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Keys not found
 *       500:
 *         description: There was an error getting the keys from the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting keys
 */

/**
 * @openapi
 * /keys/{userId}:
 *   get:
 *     summary: Get all keys from a user (Requires level 0 authentication)
 *     tags:
 *       - Keys
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path 
 *         name: userId
 *         schema:
 *           type: string
 *           example: 658355548398f5fa3b69e862
 *         description: ID of the user from whom to obtain the keys
 *         required: true
 *     responses:
 *       200:
 *         description: 
 *           This path returns all existing keys for the user.
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
 *                   example: "/api/v1/keys/65836b51cbacc4a4dd5073d6?page=1&page_size=10"
 *                 previous:
 *                   type: string
 *                   example: null
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Key'
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
 *                   example: Keys not found
 *       500:
 *         description: There was an error getting the keys from the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error getting keys
 */

// Get all keys
router.get("/keys", authorization.requireAPIKeyOfType(USER_LEVEL_2), KeyController.getKeys);

// Get key by user id
router.get("/keys/:userId", authorization.requireAPIKeyOfType(USER_LEVEL_0), KeyController.getKeyByUserId);


module.exports = router;

