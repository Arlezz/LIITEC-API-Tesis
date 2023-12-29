const {Router} = require('express');
const router = Router();
var dotenv = require('dotenv');
dotenv.config({path: '.env'});
const UserController = require('../../controller/user.controller');

//User levels authorization
const { USER_LEVEL_0, USER_LEVEL_1, USER_LEVEL_2 } = process.env;

//Middleware
const authorization = require('../../auth/apiAuth');

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users (Requires level 2 authentication)
 *     tags:
 *       - Users
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: |
 *           This path returns all existing users in the system.
 *           Requires level 2 authentication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: '#/components/schemas/User'
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
 *         description: The requested resource (users) was not found on the server. This may be because there are no users currently registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Users not found
 */

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID (Requires level 0 authentication)
 *     tags:
 *       - Users
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path 
 *         name: id
 *         schema:
 *           type: string
 *           example: 5f8d0f7a3f8d7a0f7d8a0f7d
 *         description: ID of the user to return
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the user with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/User'
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
 *         description: The requested user was not found on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 */

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user (Requires level 2 authentication)
 *     tags:
 *       - Users
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       description: User data for creating a new user.
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: example_user
 *             name: John
 *             lastName: Doe
 *             email: john.doe@example.com
 *             password: Examplepassword123!
 *             type: advancedUser
 *             superuser: false
 *     responses:
 *       201:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Created
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User created successfully
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
 *       422:
 *         description: Unprocessable Entity. User data is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid user data
 */

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update a user (Requires level 1 authentication)
 *     tags:
 *       - Users
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: User successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/User'
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
 *         description: The requested user was not found on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       422:
 *         description: Unprocessable Entity. User data is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid user data
 */

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user (Requires level 2 authentication)
 *     tags:
 *       - Users
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: User successfully deleted.
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
 *         description: The requested user was not found on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 */



//Get all users
router.get("/users", authorization.requireAPIKeyOfType(USER_LEVEL_2),UserController.getUsers);

//Get a user by id
router.get("/users/:id", authorization.requireAPIKeyOfType(USER_LEVEL_0),UserController.getUser);

//Create a user
router.post('/users',authorization.requireAPIKeyOfType(USER_LEVEL_2),UserController.createUser);

//Update a user
router.put("/users/:id", authorization.requireAPIKeyOfType(USER_LEVEL_1),UserController.updateUser);

//Delete a user
router.delete("/users/:id", authorization.requireAPIKeyOfType(USER_LEVEL_2),UserController.deleteUser);

module.exports = router;
