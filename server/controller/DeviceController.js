const deviceSchema = require("../models/device.Model");
const channelSchema = require("../models/channel.Model");
const userSchema = require("../models/user.Model");
const ObjectId = require("mongoose").Types.ObjectId;
const { v4: uuidv4 } = require("uuid");


const DeviceController = {
    
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

            const channel = await channelSchema.findOne({ channelId: channelId });

            if (!channel) {
                return res.status(404).json({ error: "Channel not found" });
            }

            var id1 = req.user._id;
            var id2 = new ObjectId(channel.owner);

            if (!id1.equals(id2)) {
                return res.status(403).json({ error: "Access Forbidden" });
            }

            const devices = await deviceSchema.find({ channelId: channelId });
            
            if (!devices) {
                return res.status(404).json({ error: "Devices not found" });
            }

            res.json(devices);
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