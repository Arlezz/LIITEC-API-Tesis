const userSchema = require("../models/user.model");
const keySchema = require("../models/key.model");
const authorization = require("../auth/apiAuth");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;


const UserController = {
  getUsers: async (req, res) => {
    try {
      const result = await userSchema.find({}, { password: 0, __v: 0, "acls._id": 0 });
      res.status(200).json(result); // Cambiado a 200 OK
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting users" }); // Cambiado a 500 Internal Server Error
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
        return res.status(409).json({ error: "Email already in use" }); // Cambiado a 409 Conflict
      }
  
      const existingUsername = await userSchema.findOne({ username: username });
      if (existingUsername) {
        return res.status(409).json({ error: "Username already in use" }); // Cambiado a 409 Conflict
      }
  
      const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  
      if (!isStrongPassword) {
        return res.status(400).json({ error: "Weak password. Passwords must have at least 8 characters, including uppercase and lowercase letters, numbers, and special characters." }); // Cambiado a 400 Bad Request
      }
  
      const saltRounds = 10; // MODIFICAR MAS ADELANTE
  
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
  
      if (type !== "readUser") {
        // Si el usuario no es de solo lectura, se le asigna una API Key
        const newKey = new keySchema({
          key: authorization.genAPIKey(),
          type: type,
          user: newUser._id,
          createdOn: Date.now()
        });
  
        await newKey.save();
      }
  
      // No devolver detalles específicos en caso de éxito
      res.status(200).json({ message: "User created successfully" }); // Cambiado a 201 Created
    } catch (error) {
      console.error(error);
  
      // Evitar revelar detalles específicos en caso de error
      res.status(500).json({ error: "Error creating user" }); // Cambiado a 500 Internal Server Error
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
        return res.status(401).json({ error: "Access Forbidden" });
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
        return res.status(401).json({ error: "Access Forbidden" });
      }

      // Verificar si el usuario es de solo lectura
      if (user.type === "readUser" && regenerateApiKey) {
        return res.status(406).json({ error: "Cannot regenerate API key for read-only user" });
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
          // Verificar el tipo de usuario antes de regenerar la API key
          if (user.type !== "readUser") {
            const useKey = await keySchema.findOne({ user: user._id });
            useKey.key = newKey;
            useKey.updatedOne = Date.now();

            await useKey.save();
          } else {
            return res.status(406).json({ error: "Cannot regenerate API key for read-only user" });
          }
        }

        user.updatedOn = Date.now();
  
        await user.save();
        res.status(200).json({ message: "User updated" });
      } else {
        res.status(304).json({ message: "No changes detected" });
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
      
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  }

};

module.exports = UserController;
