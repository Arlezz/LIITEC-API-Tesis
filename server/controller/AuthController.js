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
  
      // Verificar si el correo electrónico ya está en uso de manera asincrónica
      const existingUser = await userSchema.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }
  
      const saltRounds = 10;
  
      // Generar el salt y el hash del password de manera asincrónica
      const salt = await bcrypt.genSalt(saltRounds);
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
      await newUser.save();
  
      // No devolver detalles específicos en caso de éxito
      res.json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
  
      // Evitar revelar detalles específicos en caso de error
      res.status(500).json({ error: "Error creating user" });
    }
  },  
};

module.exports = AuthController;
