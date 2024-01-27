const deviceSchema = require("../models/device.model");
const channelSchema = require("../models/channel.model");
const userSchema = require("../models/user.model");
const keySchema = require("../models/key.model");
const mqttClient = require("../utils/mqtt.handler");
const ObjectId = require("mongoose").Types.ObjectId;
const { v4: uuidv4 } = require("uuid");


const DeviceController = {

    getDevices : async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const page_size = parseInt(req.query.page_size) || 10; // Puedes ajustar el límite según tus necesidades

            // Obtener el total de dispositivos
            const totalDevices = await deviceSchema.countDocuments({});

            // Calcular el número total de páginas
            const totalPages = Math.ceil(totalDevices / page_size);

            // Calcular el índice de inicio para la paginación
            const startIndex = (page - 1) * page_size;

            const projection = { _id: 0, __v: 0, "measures._id": 0};

            // Obtener los dispositivos paginados
            const devices = await deviceSchema.find({},projection).skip(startIndex).limit(page_size);

            if (!devices || devices.length === 0) {
                return res.status(404).json({ error: "Devices not found" });
            }

            // Construir la respuesta de paginación
            const response = {
                count: totalDevices,
                totalPages: totalPages,
                next: page < totalPages ? `/api/v1/devices?page=${page + 1}&page_size=${page_size}` : null,
                previous: page > 1 ? `/api/v1/devices?page=${page - 1}&page_size=${page_size}` : null,
                results: devices,
            };

            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error getting devices" });
        }
    },
    
    createDevice : async (req, res) => {
        try {

            const identifier = "dv-"+uuidv4();

            const { channelId } = req.params;

            const { name, description , type, model, measures } = req.body;
            
            const channel = await channelSchema.findOne({ channelId: channelId });

            if (!channel) {
                return res.status(404).json({ error: "Channel not found" });
            }

            var id1 = req.user._id;
            var id2 = new ObjectId(channel.owner);

            if (!id1.equals(id2)) {
                return res.status(401).json({ error: "Access Forbidden" });
            }
        
            const newDevice = new deviceSchema({
                type: type,
                model: model,
                measures: measures,
                deviceId: identifier,
                channelId: channel.channelId,
                active: true,
                createdOn: Date.now(),
                updatedOn: Date.now(),
            });

            // Comprobar si name y description no son nulos antes de asignarlos a newDevice
            if (name !== null && name !== undefined) {
                newDevice.name = name;
            }

            if (description !== null && description !== undefined) {
                newDevice.description = description;
            }

            const user = await userSchema.findOne({ _id: id1 });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            
            user.acls.push({
                topic: "/devices/" + identifier,
                acc: 2,
            });

            await user.save();
            

            await newDevice.save();
            res.json({ message: "Device created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error creating device" });
        }
    },

    getMyDevices : async (req, res) => {
        try {
          const { channelId } = req.params;
          const page = parseInt(req.query.page) || 1;
          const page_size = parseInt(req.query.page_size) || 10; // Puedes ajustar el límite según tus necesidades
      
          const channel = await channelSchema.findOne({ channelId });
      
          if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
          }

          if (!channel.isPublic) {

            const user = req.user;

            if (user.apiKey.type === "readUser") {

                console.log("readUser");

                const key = await keySchema.findOne({ user: user._id, channelAccess: channelId });

                if (!key || key.expirationDate < new Date(Date.now())) {
                    return res.status(401).json({ error: "Access Forbidden" });
                }

            } else {

                const id1 = user._id;
                const id2 = new ObjectId(channel.owner);
            
                if (!id1.equals(id2)) {
                return res.status(401).json({ error: "Access Forbidden" });
                }
            }
          }
      
          // Obtener el total de dispositivos
          const totalDevices = await deviceSchema.countDocuments({ channelId });
      
          // Calcular el número total de páginas
          const totalPages = Math.ceil(totalDevices / page_size);
      
          // Calcular el índice de inicio para la paginación
          const startIndex = (page - 1) * page_size;
      
          const proyection = { _id: 0, __v: 0, "measures._id":0 };

          // Obtener los dispositivos paginados
          const devices = await deviceSchema.find({ channelId },proyection).skip(startIndex).limit(page_size);
      
          if (!devices || devices.length === 0) {
            return res.status(404).json({ error: "Devices not found" });
          }
      
          // Construir la respuesta de paginación
          const response = {
            count: totalDevices,
            totalPages: totalPages,
            next: page < totalPages ? `/api/v1/channels/${channelId}/devices?page=${page + 1}&page_size=${page_size}` : null,
            previous: page > 1 ? `/api/v1/channels/${channelId}/devices?page=${page - 1}&page_size=${page_size}` : null,
            results: devices,
          };
      
          res.json(response);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error getting devices" });
        }
      },

    getDeviceById : async (req, res) => {  
        try {
            const { channelId, deviceId } = req.params;

            const channel = await channelSchema.findOne({ channelId: channelId });

            if (!channel) {
                return res.status(404).json({ error: "Channel not found" });
            }

            if (!channel.isPublic) {
                const user = req.user;

                if (user.apiKey.type === "readUser") {

                    const key = await keySchema.findOne({ user: user._id, channelAccess: channelId });

                    if (!key || key.expirationDate < new Date(Date.now())) {
                        return res.status(401).json({ error: "Access Forbidden" });
                    }

                } else {

                    const id1 = user._id;
                    const id2 = new ObjectId(channel.owner);

                    if (!id1.equals(id2)) {
                        return res.status(401).json({ error: "Access Forbidden" });
                    }
                }
            }

            const proyection = { _id: 0, __v: 0 , "measures._id":0};

            const device = await deviceSchema.findOne({ deviceId: deviceId }, proyection);

            if (!device) {
                return res.status(404).json({ error: "Device not found" });
            }

            if (device.channelId !== channelId) {
                return res.status(401).json({ error: "Access Forbidden" });
            }

            res.json(device);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error getting device" });
        }
    },

    updateDevice : async (req, res) => {

        try {

            const { channelId, deviceId } = req.params;

            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ error: "No fields to update" });
            }

            const { name, description, isActive } = req.body;

            const channel = await channelSchema.findOne({ channelId: channelId });

            if (!channel) {
                return res.status(404).json({ error: "Channel not found" });
            }

            const user = req.user;
            
            const id1 = new ObjectId(user._id);
            const id2 = new ObjectId(channel.owner);

            if (!id1.equals(id2)) {
                return res.status(401).json({ error: "Access Forbidden" });
            }

            const device = await deviceSchema.findOne({ deviceId: deviceId });

            if (!device) {
                return res.status(404).json({ error: "Device not found" });
            }

            if (device.channelId !== channelId) {
                return res.status(401).json({ error: "Access Forbidden" });
            }

            const hasChanges = (
                (name !== undefined && device.name !== name) ||
                (description !== undefined && device.description !== description) ||
                (isActive !== undefined && device.isActive !== isActive)
            );
            

            if (!hasChanges) {
                console.log("No changes to detected");
                return res.status(400).json({ error: "No changes to detected" });
            }

            if (name !== undefined) {
                device.name = name;
            }
            
            if (description !== undefined) {
                device.description = description;
            }

            if (isActive !== undefined) {
                device.isActive = isActive;

                const topic = "/device/control/" + deviceId;

                const command = (isActive === "true" || isActive === true) ? "enable" : "disable";

                const payload = {
                    command: command
                }
                
                mqttClient.publishMessage(topic, payload);

            }

            device.updatedOn = Date.now();

            await device.save();

            res.json({ message: "Device successfully updated" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error updating device" });
        }


    },

    deleteDevice : async (req, res) => {
        try {
            const { channelId, deviceId } = req.params;

            const channel = await channelSchema.findOne({ channelId: channelId });

            if (!channel) {
                return res.status(404).json({ error: "Channel not found" });
            }

            var id1 = req.user._id;
            var id2 = new ObjectId(channel.owner);

            if (!id1.equals(id2)) {
                return res.status(401).json({ error: "Access Forbidden" });
            }

            const device = await deviceSchema.findOne({ deviceId: deviceId });

            console.log("device: ",device);

            if (!device) {
                return res.status(404).json({ error: "Device not found" });
            }

            if (device.channelId !== channelId) {
                return res.status(401).json({ error: "Access Forbidden" });
            }

            await userSchema.updateMany(
                { acls: { $elemMatch: { topic: "/devices/" + deviceId } } },
                { $pull: { acls: { topic: "/devices/" + deviceId } } }
            );

            await deviceSchema.deleteOne({ deviceId: deviceId });
            res.json({ message: "Device deleted successfully" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error deleting device" });
        }
    },

    
}

module.exports = DeviceController;