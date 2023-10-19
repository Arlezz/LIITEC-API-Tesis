const {Router} = require('express');
const router = Router();
const User = require('../models/userModel');
const auth = require('../auth/apiAuth');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

//Middleware
const authorization = require('../auth/apiAuth');      
  

//Admin actions
router.post('/register',authorization.requireAPIKeyOfType('superUser'), async (req, res) => {

    try {

        bcrypt.genSalt(saltRounds, async (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                const newUser = new User({
                    name:req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    createdOn: Date.now(),
                    apiKey:{
                        key: auth.genAPIKey(),
                        type: req.body.type
                    }
                });

                await newUser.save();
                res.json({ "message": "User created" });
            });
        });

    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({ "error": "Email already exists" });
        }else{
            console.error(error);
            res.status(500).json({ "error": "Error creating user" });
        }
    }
});

//Admin actions
router.get('/getAll', authorization.requireAPIKeyOfType('superUser'), async (req, res) => {
    try {
        const result = await User.find({});
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "no users found" });
    }
});

//Admin actions
router.delete('/deleteUser', authorization.requireAPIKeyOfType('superUser'), async (req, res) => {
    try {
        const user = await User.findOne({email:req.query.email});

        if (!user) {
            return res.status(404).json({ "error": "User not found" });
        }

        await User.deleteOne({email:req.query.email});
        res.json({ "message": "User deleted" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error deleting user" });
    }
});

//All users actions
router.put('/secretGenerator', authorization.requireAPIKeyOfType('readUser'), async (req, res) => {
    try{
        const newKey = auth.genAPIKey();

        const user = await User.findOne({email:req.query.email});

        if (!user) {
            return res.status(404).json({ "error": "User not found" });
        }

        user.apiKey.key = newKey;
        await user.save();

        res.json({ "message": "New secret generated"});
    } catch(error) {
        console.error(error);
        res.status(500).json({ "error": "Error editing user" });
    }
});


module.exports = router;