const User = require("../models/user.model");
const Key = require("../models/key.model");


const requireAPIKeyOfType = (minPermissionLevel) => {
  return async (req, res, next) => {
    try {
      const apiKey = req.header("Authorization");

      //decodificar el token y buscar key en la base de datos

      if (!apiKey) {
        return res.status(401).json({ error: "Access Forbbiden" });
      }

      const keyProjection = { _id: 0, __v: 0 };
      
      const key = await Key.findOne({ key: apiKey}, keyProjection);

      if (!key) {
        return res.status(401).json({ error: "Access Forbbiden" });
      }

      const userProjection = { __v: 0, password: 0 };
      
      const user = await User.findById(key.user, userProjection);

      if (!user) {
        return res.status(401).json({ error: "Access Forbbiden" });
      }
      
      const localUser = {
        _id: user._id,
        username: user.username,
        superuser: user.superuser,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        createdOn: user.createdOn,
        acls: user.acls,
        apiKey: key
      };
            
      req.user = localUser;
      
      if (!user) {
        return res.status(401).json({ error: "Access Forbbiden" });
      }

      const userPermissionLevel = localUser.apiKey.type;

      if (
        userPermissionLevel === "superUser" ||
        (userPermissionLevel === "advancedUser" &&
          minPermissionLevel !== "superUser") ||
        (userPermissionLevel === "readUser" &&
          minPermissionLevel === "readUser")
      ) {
        next();
      } else {
        return res.status(401).json({ error: "Access Forbbiden" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error validating API key"});
    }
  };
};


module.exports = { requireAPIKeyOfType };
