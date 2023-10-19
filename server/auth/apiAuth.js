const User = require('../models/userModel');

//const MAX = 10; // max API calls per day


const genAPIKey = () => {
    //create a base-36 string that contains 30 chars in a-z,0-9
    return [...Array(30)]
      .map((e) => ((Math.random() * 36) | 0).toString(36))
      .join('');
};


const requireAPIKeyOfType = (minPermissionLevel) => {
    return async (req, res, next) => {
        try {
        const apiKey = req.header('Authorization');
        const user = await User.findOne({ 'apiKey.key': apiKey });

        if (!user) {
            return res.status(401).json({ "error": "Acceso no autorizado" });
        }

        // Determina el nivel de permiso del usuario y verifica si cumple con el mínimo requerido.
        const userPermissionLevel = user.apiKey.type;

        if (userPermissionLevel === 'superUser') {
            // Los super usuarios tienen acceso a todo, así que permite el acceso.
            next();
        } else if (userPermissionLevel === 'advancedUser' && minPermissionLevel !== 'superUser') {
            // Usuarios avanzados pueden acceder a rutas que requieren permisos desde 'advancedUser' hacia arriba.
            next();
        } else if (userPermissionLevel === 'readUser' && minPermissionLevel === 'readUser') {
            // Usuarios de solo lectura solo pueden acceder a rutas que requieren permisos de solo lectura.
            next();
        } else {
            // El usuario no tiene permisos suficientes.
            return res.status(403).json({ "error": "Acceso prohibido" });
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Error de autenticación" });
        }
    };
};
  



/*const authenticateKey = (req, res, next) => {
    let api_key = req.header("x-api-key"); //Add API key to headers
    let account = users.find((user) => user.api_key == api_key);
    // find() returns an object or undefined
    if (account) {
        //If API key matches
        //check the number of times the API has been used in a particular day
        let today = new Date().toISOString().split("T")[0];
        let usageCount = account.usage.findIndex((day) => day.date == today);
        if (usageCount >= 0) {
        //If API is already used today
        if (account.usage[usageCount].count >= MAX) {
            //stop if the usage exceeds max API calls
            res.status(429).send({
            error: {
                code: 429,
                message: "Max API calls exceeded.",
            },
            });
        } else {
            //have not hit todays max usage
            account.usage[usageCount].count++;
            console.log("Good API call", account.usage[usageCount]);
            next();
        }
        } else {
        //Push todays's date and count: 1 if there is a past date
        account.usage.push({ date: today, count: 1 });
        //ok to use again
        next();
        }
    } else {
        //Reject request if API key doesn't match
        res.status(403).send({ error: { code: 403, message: "You not allowed." } });
    }
};*/


  


module.exports = { genAPIKey, requireAPIKeyOfType };