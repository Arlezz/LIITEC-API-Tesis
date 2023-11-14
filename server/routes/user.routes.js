const {Router} = require('express');
const router = Router();
const UserController = require('../controller/UserController');

//Middleware
const authorization = require('../auth/apiAuth');


router.get("/users", authorization.requireAPIKeyOfType('superUser'),UserController.getAllUsers);
router.put("/users/:email/key", authorization.requireAPIKeyOfType('superUser'),UserController.regenerateApiKey);
router.delete("/users/:email", authorization.requireAPIKeyOfType('superUser'),UserController.deleteUser);


module.exports = router;
