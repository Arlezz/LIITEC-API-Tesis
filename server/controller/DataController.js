const dataSchema = require("../models/data.Model");
const deviceSchema = require("../models/device.Model");
const channelSchema = require("../models/channel.Model");


const DataController = {

    getDatas: async (req, res) => {
        console.log("user: ",process.env.MQTT_USER);

        try {
            const data = await dataSchema.find({});
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message || "No Data Found" });
        }
    },

    getDataFromDevice: async (req, res) => {
        try {
            const { deviceId } = req.params;
            console.log("query: ", req.query);

            const device = await deviceSchema.findOne({ deviceId: deviceId });

            if (!device) {
                return res.status(404).json({ error: "Device not found" });
            }

            const channelId = device.channelId;
            
            const channel = await channelSchema.findOne({ channelId: channelId });

            if (!channel) {
                return res.status(404).json({ error: "Channel not found" });
            }

            var id1 = req.user._id;
            var id2 = channel.owner;

            if (!id1.equals(id2)) {
                return res.status(403).json({ error: "Access Forbidden" });
            }

            //get data from device but _id and deviceId, and order by createdOn
            const data = await dataSchema.find({ deviceId: deviceId }, { _id: 0, deviceId: 0, __v: 0 }).sort({ createdOn: 1 });
        
            res.json(data);


        } catch (error) {
            res.status(500).json({ error: error.message || "No Data Found"});
        }
    },
}

module.exports = DataController;