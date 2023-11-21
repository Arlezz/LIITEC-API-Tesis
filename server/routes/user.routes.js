const {Router} = require('express');
const router = Router();
const UserController = require('../controller/UserController');

//Middleware
const authorization = require('../auth/apiAuth');

router.get("/users", authorization.requireAPIKeyOfType('superUser'),UserController.getAllUsers);
router.get("/users/:id", authorization.requireAPIKeyOfType('readUser'),UserController.getUser);
router.post('/users',authorization.requireAPIKeyOfType('superUser'),UserController.createUser);
router.put("/users/:id", authorization.requireAPIKeyOfType('advancedUser'),UserController.updateUser);
router.delete("/users/:id", authorization.requireAPIKeyOfType('superUser'),UserController.deleteUser);

module.exports = router;
