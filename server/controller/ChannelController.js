const channelSchema = require("../models/channel.Model");
const { v4: uuidv4 } = require("uuid");

const ChannelController = {
  getChannels: async (req, res) => {
    try {
      const data = await channelSchema.find({});
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error desconocido" });
    }
  },

  createChannel: async (req, res) => {
    try {
      const identifier = "ch-" + uuidv4();
      const { name, description, project, ubication, email } = req.body;

      if (req.user.email !== email) {
        return res.status(403).json({ error: "Acceso prohibido" });
      }

      const newChannel = new channelSchema({
        channelId: identifier,
        name: name,
        description: description,
        owner: email,
        project: project,
        ubication: ubication,
        createdOn: Date.now(),
      });

      const savedChannel = await newChannel.save();
      res.json(savedChannel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message || "Error desconocido" });
    }
  },

  getChannelById: async (req, res) => {
    console.log("entre a by id");
    try {
      const data = await channelSchema.find({ channelId: req.params.id });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error desconocido" });
    }
  },

  getMyChannels: async (req, res) => {
    try {
      const userEmail = req.params.email;
      const user = req.user;

      if (userEmail !== user.email) {
        return res.status(403).json({ error: "Acceso prohibido" });
      }

      const data = await channelSchema.find({ owner: userEmail });

      if (!data || data.length === 0) {
        // Si no se encuentran canales para el propietario específico
        res.status(404).json({
          error: "No se encontraron canales para el propietario especificado",
        });
      } else {
        // Devolver la respuesta exitosa con los canales encontrados
        res.status(200).json(data);
      }
    } catch (error) {
      // Manejo de errores
      console.error(error);
      res.status(500).json({ error: "Error al obtener canales por email" });
    }
  },
};

module.exports = ChannelController;
