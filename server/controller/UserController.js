const userSchema = require("../models/user.Model");
const authorization = require("../auth/apiAuth");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;


const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await userSchema.find({});
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No Users Found" });
    }
  },

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
  
      const saltRounds = 10;//MODIFICAR MAS ADELANTE
  
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

  getUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userSchema.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      var id1 = new ObjectId(user._id);
      var id2 = new ObjectId(req.user._id);

      if (!id1.equals(id2)) {
        return res.status(403).json({ error: "Access Forbidden" });
      }

      res.json(user);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting user" });
    }
  },


  updateUser: async (req, res) => {
    const { name, lastName, password, regenerateApiKey } = req.body;
    const { id } = req.params;
  
    try {
      const newKey = authorization.genAPIKey();
  
      const user = await userSchema.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      var id1 = new ObjectId(user._id);
      var id2 = new ObjectId(req.user._id);

      if (!id1.equals(id2)) {
        return res.status(403).json({ error: "Access Forbidden" });
      }
      
      // Comprobar si hay cambios en los datos antes de actualizar
      const hasChanges = (
        (name && user.name !== name) ||
        (lastName && user.lastName !== lastName) ||
        (password && !(await bcrypt.compare(password, user.password))) ||
        (regenerateApiKey === true)
      );
  
      if (hasChanges) {
        if (name) {
          user.name = name;
        }
  
        if (lastName) {
          user.lastName = lastName;
        }
  
        if (password) {
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          const hash = await bcrypt.hash(password, salt);
          user.password = hash;
        }
  
        if (regenerateApiKey === true) {
          user.apiKey.key = newKey;
        }
  
        await user.save();
        res.json({ message: "User updated" });
      } else {
        res.json({ message: "No changes detected" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error editing user" });
    }
  },  

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userSchema.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await userSchema.findByIdAndDelete(id);
      
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  }
};

module.exports = UserController;
