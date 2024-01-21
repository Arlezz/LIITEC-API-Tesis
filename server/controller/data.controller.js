const dataSchema = require("../models/data.model");
const deviceSchema = require("../models/device.model");
const channelSchema = require("../models/channel.model");
const keySchema = require("../models/key.model");
const fs = require('fs');
const Papa = require('papaparse');

const DataController = {
  getDatas: async (req, res) => {
    // Obtén todos los datos de la base de datos con paginacion
    try {
      const { page = 1, page_size = 10, order, variable } = req.query;

      const projection = { _id: 0, __v: 0 };

      let query = {};

      if (variable) {
        // Si se especifica una o varias variables, buscar por ellas
        query.measurement = variable;
      }

      const data = await dataSchema
        .find(query, projection)
        .sort({ createdOn: order === "asc" ? 1 : order === "desc" ? -1 : -1 })
        .limit(Number(page_size))
        .skip((Number(page) - 1) * Number(page_size));

      if (!data || data.length === 0) {
        return res.status(404).json({ error: "Data not found" });
      }

      const totalData = await dataSchema.countDocuments(query);
      const totalPages = Math.ceil(totalData / page_size);

      // Construir la respuesta de paginación
      const response = {
        count: totalData,
        totalPages: totalPages,
        next:
          page < totalPages
            ? `/api/v1/data?page=${parseInt(page, 10) + 1}&page_size=${page_size}`
            : null,
        previous:
          page > 1 ? `/api/v1/data?page=${parseInt(page, 10) - 1}&page_size=${page_size}` : null,
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

      if (!channel.isPublic) {
        const user = req.user;

        if (user.apiKey.type === "readUser") {
  
          const key = await keySchema.findOne({ user: user._id, channelAccess: channelId });
  
          if (!key || key.expirationDate < new Date(Date.now())) {
            return res.status(401).json({ error: "Access Forbidden" });
          }
        } else {
            const id1 = user._id;
            const id2 = channel.owner;
    
            if (!id1.equals(id2)) {
              return res.status(401).json({ error: "Access Forbidden" });
            } 
        }
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
        totalPages: totalPages,
        next:
          data.length === page_size
            ? `/api/v1/data/${deviceId}?page=${parseInt(page, 10) + 1}&page_size=${page_size}`
            : null,
        previous:
          page > 1
            ? `/api/v1/data/${deviceId}?page=${parseInt(page, 10) - 1}&page_size=${page_size}`
            : null,
        results: data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || "Error getting data" });
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

      if (!channel.isPublic) {
        const user = req.user;

        if (user.apiKey.type === "readUser") {
            
            const key = await keySchema.findOne({ user: user._id, channelAccess: channelId });
    
            if (!key || key.expirationDate < new Date(Date.now())) {
              return res.status(401).json({ error: "Access Forbidden" });
            }

        } else {
            const id1 = user._id;
            const id2 = channel.owner;

            if (!id1.equals(id2)) {
              return res.status(401).json({ error: "Access Forbidden" });
            }
        }
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
            [operation]: { ["$" + operation]: "$value" },
            count: { $sum: 1 },
          },
        },
        {
          $project: projection,
        },
      ]);

      if (!data || data.length === 0) {
        return res.status(404).json({ error: "No data found for this device" });
      }

      res.json(data.length > 1 ? data : data[0]);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error getting data" });
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

      if (!channel.isPublic) {
        const user = req.user;

        if (user.apiKey.type === "readUser") {
              
              const key = await keySchema.findOne({ user: user._id, channelAccess: channelId });
      
              if (!key || key.expirationDate < new Date(Date.now())) {
                return res.status(401).json({ error: "Access Forbidden" });
              }
    
        } else {
            const id1 = user._id;
            const id2 = channel.owner;
    
            if (!id1.equals(id2)) {
              return res.status(401).json({ error: "Access Forbidden" });
            }
        }
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
      res.status(500).json({ error: error.message || "Error getting data" });
    }
  },

  exportDataFromChannel: async (req, res) => {
      //export historical data from a channel, json to csv
    try {
      const { channelId } = req.params;

      const channel = await channelSchema.findOne({ channelId });

      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      const devices = await deviceSchema.find({ channelId });

      if (!devices || devices.length === 0) {
        return res.status(404).json({ error: "No devices found for this channel" });
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
            const id2 = channel.owner;
    
            if (!id1.equals(id2)) {
              return res.status(401).json({ error: "Access Forbidden" });
            }
        }
      }

      const csvData = [];

      for (const device of devices) {
        const data = await dataSchema.find({ deviceId: device.deviceId });

        if (data && data.length > 0) {
          for (const item of data) {
            csvData.push({
              deviceId: item.deviceId,
              measurement: item.measurement,
              value: item.value,
              timestamp: item.timestamp,
            });
          }
        }
      }

      if (!csvData || csvData.length === 0) {
        return res.status(404).json({ error: "No data found for this channel" });
      }

      const csv = Papa.unparse(csvData, {
        header: true
      });

      fs.writeFileSync(`${channelId}-data.csv`, csv);

      res.download(`${channelId}-data.csv`, `${channelId}-data.csv`, (err) => {
        if (err) {
          return res.status(500).json({ error: "Error downloading file" });
        }

        fs.unlinkSync(`${channelId}-data.csv`);
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message || "Error getting data" });
    } 
  },
  getVariablesFromChannel: async (req, res) => {
    
    try {
      const { channelId } = req.params;

      const channel = await channelSchema.findOne({ channelId });

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
            const id2 = channel.owner;
    
            if (!id1.equals(id2)) {
              return res.status(401).json({ error: "Access Forbidden" });
            }
        }
      }

      const variables = await deviceSchema.aggregate([
        {
          $match: {
            channelId: channelId
          }
        },
        {
          $unwind: '$measures'
        },
        {
          $group: {
            _id: null,
            variables: { $push: '$measures.variable' }
          }
        },
        {
          $project: {
            _id: 0,
            variables: 1
          }
        }
      ]);

      if (!variables || variables.length === 0) {
        return res.status(404).json({ error: "No data found for this channel" });
      }

      res.json(variables[0]);



    } catch (error) {
      res.status(500).json({ error: error.message || "Error getting data" });
    }
  }
};

module.exports = DataController;
