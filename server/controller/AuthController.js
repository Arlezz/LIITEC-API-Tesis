const userSchema = require("../models/user.Model");
const bcrypt = require("bcryptjs");

const authorization = require("../auth/apiAuth");

const AuthController = {
  createUser: async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "User data is required" });
      }

      const { name, lastName, email, password, type } = req.body;

      const saltRounds = 10;

      // Generar el salt de manera asincrónica
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash del password de manera asincrónica
      const hash = await bcrypt.hash(password, salt);

      const newUser = new userSchema({
        name: name,
        lastName: lastName,
        email: email,
        password: hash,
        createdOn: Date.now(),
        apiKey: {
          key: authorization.genAPIKey(),
          type: type,
        },
      });

      // Guardar el nuevo usuario de manera asincrónica
      const savedUser = await newUser.save();

      res.json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || "Error desconocido" });
    }
  },
};

module.exports = AuthController;
