const {Router} = require('express');
const router = Router();
const AuthController = require('../controller/AuthController');

//Middleware
const authorization = require('../auth/apiAuth');      
  

//Admin actions
router.post('/auth/signUp',authorization.requireAPIKeyOfType('superUser'),AuthController.createUser);




module.exports = router;