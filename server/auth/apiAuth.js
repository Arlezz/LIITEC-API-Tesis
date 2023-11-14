const User = require("../models/user.Model");

//const MAX = 10; // max API calls per day

const genAPIKey = () => {
  //create a base-36 string that contains 30 chars in a-z,0-9
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join("");
};

const requireAPIKeyOfType = (minPermissionLevel) => {
  return async (req, res, next) => {
    try {
      const apiKey = req.header("Authorization");
      const user = await User.findOne({ "apiKey.key": apiKey });
      req.user = user;
      
      if (!user) {
        return res.status(401).json({ error: "Acceso no autorizado" });
      }

      const userPermissionLevel = user.apiKey.type;

      if (
        userPermissionLevel === "superUser" ||
        (userPermissionLevel === "advancedUser" &&
          minPermissionLevel !== "superUser") ||
        (userPermissionLevel === "readUser" &&
          minPermissionLevel === "readUser")
      ) {
        next();
      } else {
        return res.status(403).json({ error: "Acceso prohibido" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error de autenticación" });
    }
  };
};

module.exports = { genAPIKey, requireAPIKeyOfType };
