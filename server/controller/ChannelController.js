const channelSchema = require("../models/channel.Model");
const { v4: uuidv4 } = require("uuid");
const ObjectId = require("mongoose").Types.ObjectId;

const ChannelController = {

  getChannels: async (req, res) => {
    try {
      const data = await channelSchema.find({});
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message || "No Channels Found" });
    }
  },

  getChannelById: async (req, res) => {
    try {

      const { id } = req.params;

      const channel = await channelSchema.findOne({ channelId: id });

      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      var id1 = new ObjectId(req.user._id);
      var id2 = new ObjectId(channel.owner);

      if (!id1.equals(id2)) {
        return res.status(403).json({ error: "Access Forbidden" });
      }

      res.json(channel);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error Getting Channel" });
    }
  },

  getMyChannels: async (req, res) => {
    try {
      const { userId } = req.params;

      var id1 = new ObjectId(req.user._id);//ARREGLAR, LOS REQ.USER NO NECESITAN SER OBJETOS
      var id2 = new ObjectId(userId);


      if (!id1.equals(id2)) {
        return res.status(403).json({ error: "Access Forbidden" });
      }

      const channels = await channelSchema.find({ owner: id2 });

      if (!channels || channels.length === 0) {
        // Si no se encuentran canales para el propietario específico
        res.status(404).json({
          error: "No channels found for this user",
        });
      } else {
        // Devolver la respuesta exitosa con los canales encontrados
        res.status(200).json(channels);
      }
    } catch (error) {
      // Manejo de errores
      console.error(error);
      res.status(500).json({ error: "Error Getting Channels" });
    }
  },

  createChannel: async (req, res) => {
    try {
      const identifier = "ch-" + uuidv4();
      const { name, description, project, ubication, owner } = req.body;

      var id1 = new ObjectId(req.user._id);
      var id2 = new ObjectId(owner);

      if (!id1.equals(id2)) {
        return res.status(403).json({ error: "Access Forbidden" });
      }

      const newChannel = new channelSchema({
        channelId: identifier,
        name: name,
        description: description,
        owner: id2,
        project: project,
        ubication: ubication,
        createdOn: Date.now(),
      });

      const savedChannel = await newChannel.save();
      res.json(savedChannel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message || "Error creating channel" });
    }
  },

  updateChannel: async (req, res) => {
    try {

      const { name, description, project, ubication } = req.body;

      const { id } = req.params;

      const channel = await channelSchema.findOne({ channelId: id });

      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      var id1 = new ObjectId(req.user._id);
      var id2 = new ObjectId(channel.owner);

      if (!id1.equals(id2)) {
        return res.status(403).json({ error: "Access Forbidden" });
      }

      const hasChanges = (
        (name && channel.name !== name) ||
        (description && channel.description !== description) ||
        (project && channel.project !== project) ||
        (ubication && (channel.ubication.latitude !== ubication.latitude || channel.ubication.longitude !== ubication.longitude))
      );

      if (hasChanges) {
        if (name) {
          channel.name = name;
        }
        if (description) {
          channel.description = description;
        }
        if (project) {
          channel.project = project;
        }
        if (ubication) {
          channel.ubication = ubication;
        }

        await channel.save();
        res.json({ message: "Channel updated" });

      } else {
        res.json({ error: "No changes were made" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message || "Error updating channel" });
    }
  },

  deleteChannel: async (req, res) => {
    try {
      const { id } = req.params;

      const channel = await channelSchema.findOne({ channelId: id });

      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      var id1 = new ObjectId(req.user._id);
      var id2 = new ObjectId(channel.owner);

      if (!id1.equals(id2)) {
        return res.status(403).json({ error: "Access Forbidden" });
      }

      await channelSchema.deleteOne({ channelId: id });

      res.json({ message: "Channel deleted" });    
    
    } catch (error) {
      return res.status(500).json({ error: error.message || "Error deleting channel" });
    }
  },
};

module.exports = ChannelController;
