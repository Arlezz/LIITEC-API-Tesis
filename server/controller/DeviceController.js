const deviceSchema = require("../models/device.Model");

const DeviceController = {

    createDevice : async (req, res) => {
        try {

            const { type, model, measures, unity } = req.body;
            
            const existingDevice = await deviceSchema.findOne({ model: model });

            if (existingDevice) {
                return res.status(400).json({ error: "Device already exist" });
            }

            const newDevice = new deviceSchema({
                type: type,
                model: model,
                measures: measures,
                unity: unity,
            });

            await newDevice.save();
            res.json({ message: "Device created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error creating device" });
        }
    },
}

module.exports = DeviceController;