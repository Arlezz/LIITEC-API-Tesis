const { Router } = require("express");
const router = Router();
var dotenv = require('dotenv');
dotenv.config({path: '.env'});
const AuthController = require("../../auth/auth.controller");


router.post("/login", AuthController.login);

module.exports = router;

