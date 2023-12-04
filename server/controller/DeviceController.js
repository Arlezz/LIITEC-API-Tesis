const deviceSchema = require("../models/device.Model");
const channelSchema = require("../models/channel.Model");
const userSchema = require("../models/user.Model");
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

            const projection = { _id: 0, __v: 0 };

            // Obtener los dispositivos paginados
            const devices = await deviceSchema.find({},projection).skip(startIndex).limit(page_size);

            if (!devices || devices.length === 0) {
                return res.status(404).json({ error: "Devices not found" });
            }

            // Construir la respuesta de paginación
            const response = {
                count: totalDevices,
                totalPages: totalPages,
                next: page < totalPages ? `/api/devices?page=${page + 1}&page_size=${page_size}` : null,
                previous: page > 1 ? `/api/devices?page=${page - 1}&page_size=${page_size}` : null,
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

            const { type, model, measures, unity } = req.body;
            
            const channel = await channelSchema.findOne({ channelId: channelId });

            if (!channel) {
                return res.status(404).json({ error: "Channel not found" });
            }

            var id1 = req.user._id;
            var id2 = new ObjectId(channel.owner);

            if (!id1.equals(id2)) {
                return res.status(403).json({ error: "Access Forbidden" });
            }

            const newDevice = new deviceSchema({
                type: type,
                model: model,
                measures: measures,
                unity: unity,
                deviceId: identifier,
                channelId: channel.channelId,
            });

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
      
          const id1 = req.user._id;
          const id2 = new ObjectId(channel.owner);
      
          if (!id1.equals(id2)) {
            return res.status(403).json({ error: "Access Forbidden" });
          }
      
          // Obtener el total de dispositivos
          const totalDevices = await deviceSchema.countDocuments({ channelId });
      
          // Calcular el número total de páginas
          const totalPages = Math.ceil(totalDevices / page_size);
      
          // Calcular el índice de inicio para la paginación
          const startIndex = (page - 1) * page_size;
      
          // Obtener los dispositivos paginados
          const devices = await deviceSchema.find({ channelId }).skip(startIndex).limit(page_size);
      
          if (!devices || devices.length === 0) {
            return res.status(404).json({ error: "Devices not found" });
          }
      
          // Construir la respuesta de paginación
          const response = {
            count: totalDevices,
            totalPages: totalPages,
            next: page < totalPages ? `/api/devices/${channelId}?page=${page + 1}&page_size=${page_size}` : null,
            previous: page > 1 ? `/api/devices/${channelId}?page=${page - 1}&page_size=${page_size}` : null,
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

            var id1 = req.user._id;
            var id2 = new ObjectId(channel.owner);

            if (!id1.equals(id2)) {
                return res.status(403).json({ error: "Access Forbidden" });
            }

            const device = await deviceSchema.findOne({ deviceId: deviceId });

            if (!device) {
                return res.status(404).json({ error: "Device not found" });
            }

            if (device.channelId !== channelId) {
                return res.status(403).json({ error: "Access Forbidden" });
            }


            res.json(device);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error getting device" });
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
                return res.status(403).json({ error: "Access Forbidden" });
            }

            const device = await deviceSchema.findOne({ deviceId: deviceId });

            if (!device) {
                return res.status(404).json({ error: "Device not found" });
            }

            if (device.channelId !== channelId) {
                return res.status(403).json({ error: "Access Forbidden" });
            }

            await deviceSchema.deleteOne({ deviceId: deviceId });
            res.json({ message: "Device deleted successfully" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error deleting device" });
        }
    },

    
}

module.exports = DeviceController;