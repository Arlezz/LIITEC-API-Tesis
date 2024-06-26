const userSchema = require("../models/user.model");
const keySchema = require("../models/key.model");
const channelSchema = require("../models/channel.model");
const deviceSchema = require("../models/device.model");
const authorization = require("../utils/key.handler");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;


const UserController = {
  getUsers: async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const page_size = parseInt(req.query.page_size) || 10;

        const totalUsers = await userSchema.countDocuments();
        const totalPages = Math.ceil(totalUsers / page_size);
        const startIndex = (page - 1) * page_size;

        const projection = { password: 0, __v: 0, "acls._id": 0 };

        const users = await userSchema.aggregate([
            { $skip: startIndex },
            { $limit: page_size },
            {
                $lookup: {
                    from: "keys",
                    localField: "_id",
                    foreignField: "user",
                    as: "userKey"
                }
            },
            {
                $addFields: {
                    role: { $arrayElemAt: ["$userKey.type", 0] }
                }
            },
            {
                $project: {
                    userKey: 0
                }
            },
            { $unset: ["password", "__v", "acls._id"] }
        ]);

        if (!users || users.length === 0) {
            return res.status(404).json({ error: "Users not found" });
        }

        const response = {
            count: totalUsers,
            totalPages: totalPages,
            next: page < totalPages ? `/api/v1/users?page=${page + 1}&page_size=${page_size}` : null,
            previous: page > 1 ? `/api/v1/users?page=${page - 1}&page_size=${page_size}` : null,
            results: users
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting users" });
    }
},

  

  createUser: async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "User data is required" });
      }
  
      const { username, name, lastName, email, password, type, superuser } = req.body;

      // Verificar campos requeridos
      if (!username || !name || !lastName || !email || !password || !type) {
        return res.status(400).json({ error: "All required fields must be provided" });
     }
  
     console.log(req.body);

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
  
      //if (type !== "readUser") {
        // Si el usuario no es de solo lectura, se le asigna una API Key
        // Al usuario de lectura se le asigna key al momento de asignarle un canal
        const newKey = new keySchema({
          key: authorization.genAPIKey(),
          type: type,
          user: newUser._id,
          createdOn: Date.now()
        });
  
        await newKey.save();
        if (type !== "readUser") {
          const acls = {
            topic: "device/control/#",
            acc: 3
          };

          newUser.acls.push(acls);
        }

        

        await newUser.save();
      //}
  
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

        const user = await userSchema.findById(id, { password: 0, __v: 0, "acls._id": 0 });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const middleWareUser = req.user;

        if (middleWareUser.apiKey.type !== "superUser") {
          var id1 = new ObjectId(user._id);
          var id2 = new ObjectId(middleWareUser._id);

          if (!id1.equals(id2)) {
              return res.status(401).json({ error: "Access Forbidden" });
          }
        }

        // Utilizar agregación para obtener el rol del usuario desde el esquema Keys
        const userWithRole = await userSchema.aggregate([
            {
                $match: { _id: user._id }
            },
            {
                $lookup: {
                    from: "keys",
                    localField: "_id",
                    foreignField: "user",
                    as: "userKey"
                }
            },
            {
                $addFields: {
                    role: { $arrayElemAt: ["$userKey.type", 0] }
                }
            },
            {
                $project: {
                    userKey: 0, // Opcional: Excluir el campo userKey del resultado
                    __v: 0
                }
            }
        ]);

        // Si el usuario no tiene información en el esquema Keys, asignar null al rol
        if (!userWithRole || !userWithRole[0].role) {
            userWithRole[0].role = null;
        }

        res.json(userWithRole[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting user" });
    }
},



  updateUser: async (req, res) => {
      const { name, lastName, password, regenerateApiKey, type } = req.body;
      const { id } = req.params;

      try {
          const newKey = authorization.genAPIKey();

          const user = await userSchema.findById(id);

          if (!user) {
              return res.status(404).json({ error: "User not found" });
          }

          const middleWareUser = req.user;

          console.log(middleWareUser);

          if (middleWareUser.apiKey.type !== "superUser") {
            var id1 = new ObjectId(user._id);
            var id2 = new ObjectId(middleWareUser._id);

            if (!id1.equals(id2)) {
                return res.status(401).json({ error: "Access Forbidden" });
            }
          } 

          // Verificar si el usuario es de solo lectura
          if (user.type === "readUser" && regenerateApiKey) {
              return res.status(406).json({ error: "Cannot regenerate API key for read-only user" });
          }

          // Crear un objeto para almacenar los campos actualizados y sus valores
          const updatedFields = {};
          let passwordUpdated = false;

          // Comprobar si hay cambios en los datos antes de actualizar
          if (name && user.name !== name) {
              user.name = name;
              updatedFields.name = name;
          }

          if (lastName && user.lastName !== lastName) {
              user.lastName = lastName;
              updatedFields.lastName = lastName;
          }

          if (password && !(await bcrypt.compare(password, user.password))) {
              const saltRounds = 10;
              const salt = await bcrypt.genSalt(saltRounds);
              const hash = await bcrypt.hash(password, salt);
              user.password = hash;
              passwordUpdated = true;
          }

          if (regenerateApiKey) {
              // Verificar el tipo de usuario antes de regenerar la API key
              if (user.type !== "readUser") {
                  const useKey = await keySchema.findOne({ user: user._id });
                  useKey.key = newKey;
                  useKey.updatedOne = Date.now();

                  await useKey.save();
                  updatedFields.key = newKey;
              } else {
                  return res.status(406).json({ error: "Cannot regenerate API key for read-only user" });
              }
          }

          if ( middleWareUser.apiKey.type === "superUser") {
              const key = await keySchema.findOne({ user: user._id });

              if (!key) {
                return res.status(404).json({ error: "Key not found" });
              } 

              if (type && key.type !== type) {
                key.type = type;
                key.updatedOne = Date.now();
                await key.save();
                updatedFields.type = type;
              }
          } 


          if (Object.keys(updatedFields).length > 0 || passwordUpdated) {
              user.updatedOn = Date.now();
              await user.save();
              
              // Construir la respuesta final sin incluir la contraseña si ha sido actualizada
              const response = { message: "User updated", updatedFields };
              if (passwordUpdated) {
                  response.message += " (Password updated)";
              }
              res.status(200).json(response);
          } else {
              res.status(400).json({ message: "No changes detected" });
          }
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error editing user" });
      }
  },

 

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      // Buscar y eliminar al usuario
      const user = await userSchema.findByIdAndDelete(id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await keySchema.deleteMany({ 
        $or: [
            { user: user._id }, // Documentos con campo "user" igual a userId
            { channelOwner: user._id } // Documentos con campo "channelOwner" igual a userId
        ]
      });

      // Buscar los canales asociados al usuario
      const channelIds = await channelSchema.find({ owner: user._id }, { _id: 1 });

      // Eliminar los canales asociados al usuario
      await channelSchema.deleteMany({ owner: user._id });

      for (const channelId of channelIds) {
        // Eliminar los dispositivos asociados a los canales
        await deviceSchema.deleteMany({ channelId: channelId._id });
      }
      
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  }

};

module.exports = UserController;
