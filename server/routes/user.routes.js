const {Router} = require('express');
const router = Router();
const UserController = require('../controller/UserController');

//Middleware
const authorization = require('../auth/apiAuth');


//Get all users
router.get("/users", authorization.requireAPIKeyOfType('superUser'),UserController.getAllUsers);

//Get a user by id
router.get("/users/:id", authorization.requireAPIKeyOfType('readUser'),UserController.getUser);

//Create a user
router.post('/users',authorization.requireAPIKeyOfType('superUser'),UserController.createUser);

//Update a user
router.put("/users/:id", authorization.requireAPIKeyOfType('advancedUser'),UserController.updateUser);

//Delete a user
router.delete("/users/:id", authorization.requireAPIKeyOfType('superUser'),UserController.deleteUser);

module.exports = router;
