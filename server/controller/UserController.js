const userSchema = require("../models/user.Model");
const keySchema = require("../models/keyModel");
const authorization = require("../auth/apiAuth");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;


const UserController = {
  getUsers: async (req, res) => {
    try {
      const result = await userSchema.find({}, { password: 0, __v: 0, "acls._id" : 0 });
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
  
      const { username, name, lastName, email, password, type, superuser } = req.body;
  
      // Verificar si el correo electrónico ya está en uso de manera asincrónica
      const existingUser = await userSchema.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const existingUsername = await userSchema.findOne({ username: username });
      if (existingUsername) {
        return res.status(400).json({ error: "Username already in use" });
      }

      const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

      if (!isStrongPassword) {
        return res.status(400).json({ error: "Weak password. Passwords must have at least 8 characters, including uppercase and lowercase letters, numbers, and special characters." });
      }
  
      const saltRounds = 10;//MODIFICAR MAS ADELANTE
      
  
      // Generar el salt y el hash del password de manera asincrónica
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);


      const newUser = new userSchema({
        username: username,
        name: name,
        lastName: lastName,
        email: email,
        password: hash,
        superuser: superuser,
        createdOn: Date.now()
      });
  
      // Guardar el nuevo usuario de manera asincrónica
      await newUser.save();

      if (type !== "readUser") { //Si el usuario no es de solo lectura, se le asigna una API Key
        const newKey = new keySchema({
          key: authorization.genAPIKey(),
          type: type,
          user: newUser._id,
          createdOn: Date.now()
        });

        await newKey.save();
      }  

  
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

      const user = await userSchema.findById(id, { password: 0, __v: 0, "acls._id" : 0 });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      var id1 = new ObjectId(user._id);
      var id2 = new ObjectId(req.user._id);

      if (!id1.equals(id2)) {
        return res.status(403).json({ error: "Access Forbiden" });
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
        return res.status(403).json({ error: "Access Forbiden" });
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
