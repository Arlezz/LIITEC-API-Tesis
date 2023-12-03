const dataSchema = require("../models/data.Model");
const deviceSchema = require("../models/device.Model");
const channelSchema = require("../models/channel.Model");


const DataController = {

    getDatas: async (req, res) => {
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
            const { variable, order } = req.query; // Obtén el valor del parámetro "variable"

            const start = req.query.start ? new Date(req.query.start) : null;
            const end = req.query.end ? new Date(req.query.end) : null;
    
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
    
            let query = { deviceId: deviceId };

            if (start && !isNaN(start) && end && !isNaN(end)) {
                query.createdOn = { $gte: start, $lte: end };
            }

            // Obtén datos del dispositivo pero excluye _id, deviceId y __v, y ordénalos por createdOn
            const projection = { _id: 0, deviceId: 0, __v: 0 };
    
            if (variable) {
                // Agrega el filtro para la variable si está presente
                query.measurement = variable;
                // Excluye el campo relacionado a la query cuando se proporciona un valor para "variable"
                projection.measurement = 0;
            }
    
    
            const data = await dataSchema.find(query, projection).sort({ createdOn: order === "asc" ? 1 : order === "desc" ? -1 : -1 });    
            if (!data) {
                return res.status(404).json({ error: "Data not found" });
            } else if (data.length === 0) {
                return res.status(404).json({ error: "No data found for this device" });
            }
    
            res.json(data);
    
        } catch (error) {
            res.status(500).json({ error: error.message || "No Data Found" });
        }
    },  
    
    getDataFromDeviceWithAgregate : async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { variable } = req.query;

            let { operation }  = req.query;
            operation = operation || "avg";

            

            const start = req.query.start ? new Date(req.query.start) : null;
            const end = req.query.end ? new Date(req.query.end) : null;

            console.log("start: ", start);
            console.log("end: ", end);

            //verify if start or end are valid
            if (start && isNaN(start) && !end && !isNaN(end)) {
                return res.status(400).json({ error: "Empty end date" });
            } else if (!start && !isNaN(start) && end && isNaN(end)) {
                return res.status(400).json({ error: "Empty start date" });
            }

    
            const device = await deviceSchema.findOne({ deviceId: deviceId });
    
            if (!device) {
                return res.status(404).json({ error: "Device not found" });
            }

            console.log("marures: ", device.measures);
    
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

            let query = { deviceId: deviceId };

            if (variable) {
                // Agrega el filtro para la variable si está presente
                query.measurement = variable;
            }


            if (start && !isNaN(start) && end && !isNaN(end)) {
                query.createdOn = { $gte: start, $lte: end };
            }


            const data = await dataSchema.aggregate([
                {
                    $match: query
                },
                {
                    $group: {
                        _id: "$measurement",
                        [operation]: { ["$"+operation] : "$data" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0, // Excluir el campo _id del resultado
                        variable: "$_id", // Renombrar el campo _id a variable
                        [operation]: 1,
                        count: 1
                    }
                }
            ]);

            console.log(data.length > 1 ? data : data[0]);

            if (!data || data.length === 0) {
                return res.status(404).json({ error: "No data found for this device" });
            }

            res.json(data.length > 1 ? data : data[0]);


        } catch (error) {
            res.status(500).json({ error: error.message || "No Data Found" });
        }
    }
}

module.exports = DataController;