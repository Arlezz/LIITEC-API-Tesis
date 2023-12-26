const {Router} = require('express');
const router = Router();
var dotenv = require('dotenv');
dotenv.config({path: '.env'});
const UserController = require('../controller/user.controller');

//User levels authorization
const { USER_LEVEL_0, USER_LEVEL_1, USER_LEVEL_2 } = process.env;

//Middleware
const authorization = require('../auth/apiAuth');



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
