const dataSchema = require("../models/data.Model");
const deviceSchema = require("../models/device.Model");
const channelSchema = require("../models/channel.Model");

const DataController = {
  getDatas: async (req, res) => {
    // Obtén todos los datos de la base de datos con paginacion
    try {
      console.log("getDatas");
      const { page = 1, page_size = 10 } = req.query;

      const totalData = await dataSchema.countDocuments();
      const totalPages = Math.ceil(totalData / page_size);

      const projection = { _id: 0, deviceId: 0, __v: 0 };

      const data = await dataSchema
        .find({}, projection)
        .limit(Number(page_size))
        .skip((Number(page) - 1) * Number(page_size));

      if (!data || data.length === 0) {
        return res.status(404).json({ error: "Data not found" });
      }

      // Construir la respuesta de paginación
      const response = {
        count: totalData,
        totalPages: totalPages,
        next:
          page < totalPages
            ? `/api/data?page=${page + 1}&page_size=${page_size}`
            : null,
        previous:
          page > 1 ? `/api/data?page=${page - 1}&page_size=${page_size}` : null,
        results: data,
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting data" });
    }
  },

  getDataFromDevice: async (req, res) => {
    try {
      const { deviceId } = req.params;
      const { variable, order } = req.query;

      const start = req.query.start ? new Date(req.query.start) : null;
      const end = req.query.end ? new Date(req.query.end) : null;

      const device = await deviceSchema.findOne({ deviceId });

      if (!device) {
        return res.status(404).json({ error: "Device not found" });
      }

      const channelId = device.channelId;

      const channel = await channelSchema.findOne({ channelId });

      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      const id1 = req.user._id;
      const id2 = channel.owner;

      if (!id1.equals(id2)) {
        return res.status(403).json({ error: "Access Forbidden" });
      }

      let query = { deviceId };

      if (start && !isNaN(start) && end && !isNaN(end)) {
        query.createdOn = { $gte: start, $lte: end };
      }

      const projection = { _id: 0, deviceId: 0, __v: 0 };

      if (variable) {
        query.measurement = variable;
      }

      const page = parseInt(req.query.page) || 1;
      const page_size = parseInt(req.query.page_size) || 10; // Puedes ajustar el límite según tus necesidades

      const skip = (page - 1) * page_size;

      const totalResults = await dataSchema.countDocuments(query);

      const totalPages = Math.ceil(totalResults / page_size);

      const data = await dataSchema
        .find(query, projection)
        .sort({ createdOn: order === "asc" ? 1 : order === "desc" ? -1 : -1 })
        .skip(skip)
        .limit(page_size);

      if (!data || data.length === 0) {
        return res.status(404).json({ error: "No data found for this device" });
      }

      res.json({
        count: data.length,
        total_pages: totalPages,
        next:
          data.length === page_size
            ? `/api/data/${deviceId}?page=${page + 1}&page_size=${page_size}`
            : null,
        previous:
          page > 1
            ? `/api/data/${deviceId}?page=${page - 1}&page_size=${page_size}`
            : null,
        results: data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || "No Data Found" });
    }
  },

  getDataFromDeviceWithAgregate: async (req, res) => {
    try {
      const { deviceId } = req.params;
      const { variable } = req.query;

      let { operation } = req.query;
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

      const projection = { _id: 0, variable: "$_id", [operation]: 1, count: 1 };

      if (variable) {
        // Agrega el filtro para la variable si está presente
        query.measurement = variable;
      }

      if (start && !isNaN(start) && end && !isNaN(end)) {
        query.createdOn = { $gte: start, $lte: end };
      }

      const data = await dataSchema.aggregate([
        {
          $match: query,
        },
        {
          $group: {
            _id: "$measurement",
            [operation]: { ["$" + operation]: "$data" },
            count: { $sum: 1 },
          },
        },
        {
          $project: projection,
        },
      ]);

      console.log(data.length > 1 ? data : data[0]);

      if (!data || data.length === 0) {
        return res.status(404).json({ error: "No data found for this device" });
      }

      res.json(data.length > 1 ? data : data[0]);
    } catch (error) {
      res.status(500).json({ error: error.message || "No Data Found" });
    }
  },

  getLastDataFromDevice: async (req, res) => {
    try {
      const { deviceId } = req.params;
      const { variable } = req.query;

      const device = await deviceSchema.findOne({ deviceId });

      if (!device) {
        return res.status(404).json({ error: "Device not found" });
      }

      const channelId = device.channelId;

      const channel = await channelSchema.findOne({ channelId });

      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      // Verificar acceso
      const id1 = req.user._id;
      const id2 = channel.owner;

      if (!id1.equals(id2)) {
        return res.status(403).json({ error: "Access Forbidden" });
      }

      let query = { deviceId };

      if (variable) {
        // Si se especifica una o varias variables, buscar por ellas
        query.measurement = Array.isArray(variable)
          ? { $in: variable }
          : variable;
      }

      const projection = {
        _id: 0,
        deviceId: 0,
        __v: 0,
        "latestMeasurement._id": 0,
        "latestMeasurement.deviceId": 0,
        "latestMeasurement.__v": 0,
      };

      // Obtener las últimas mediciones para cada variable
      const latestData = await dataSchema.aggregate([
        { $match: query },
        { $sort: { createdOn: -1 } },
        {
          $group: {
            _id: "$measurement",
            latestMeasurement: { $first: "$$ROOT" },
          },
        },
        { $project: projection },
      ]);

      if (!latestData || latestData.length === 0) {
        return res.status(404).json({ error: "No data found for this device" });
      }

      res.json(latestData.map((item) => item.latestMeasurement));
    } catch (error) {
      res.status(500).json({ error: error.message || "No Data Found" });
    }
  },
};

module.exports = DataController;
