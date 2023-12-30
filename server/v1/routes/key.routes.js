const { Router } = require("express");
const router = Router();
var dotenv = require('dotenv');
dotenv.config({path: '.env'});
const KeyController = require("../../controller/key.controller");

//User levels authorization
const { USER_LEVEL_1, USER_LEVEL_2 } = process.env;

//Middleware
const authorization = require("../../auth/apiAuth");

// Get all keys
router.get("/keys", authorization.requireAPIKeyOfType(USER_LEVEL_2), KeyController.getKeys);

// Create key
router.post("/keys", authorization.requireAPIKeyOfType(USER_LEVEL_1), KeyController.createKey);

// Get key by user id
router.get("/keys/:userId", authorization.requireAPIKeyOfType(USER_LEVEL_2), KeyController.getKeyByUserId);

