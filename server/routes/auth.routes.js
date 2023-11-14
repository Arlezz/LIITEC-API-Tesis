const {Router} = require('express');
const router = Router();
const AuthController = require('../controller/AuthController');

//Middleware
const authorization = require('../auth/apiAuth');      
  

//Admin actions
router.post('/auth/signUp',authorization.requireAPIKeyOfType('superUser'),AuthController.createUser);

//All users actions
router.put('/secretGenerator', authorization.requireAPIKeyOfType('readUser'), async (req, res) => {
    try{
        const newKey = authorization.genAPIKey();

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




module.exports = router;