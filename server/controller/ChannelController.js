const channelSchema = require("../models/channel.Model");
const { v4: uuidv4 } = require("uuid");
const ObjectId = require("mongoose").Types.ObjectId;

const ChannelController = {

  getChannels: async (req, res) => {
    //get all channels with pagination
    try {
      const { page = 1, page_size = 10 } = req.query;

      const totalChannels = await channelSchema.countDocuments();

      const totalPages = Math.ceil(totalChannels / page_size);

      const projection = { _id: 0, __v: 0 };

      const channels = await channelSchema
        .find({}, projection)
        .limit(Number(page_size))
        .skip((Number(page) - 1) * Number(page_size));

      if (!channels || channels.length === 0) {
        return res.status(404).json({ error: "Channels not found" });
      }

      const response = {
        count: totalChannels,
        totalPages: totalPages,
        next:
          page < totalPages
            ? `/api/channels?page=${page + 1}&page_size=${page_size}`
            : null,
        previous:
          page > 1 ? `/api/channels?page=${page - 1}&page_size=${page_size}` : null,
        results: channels,
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting channels" });
    }
  },

  getChannelById: async (req, res) => {
    try {

      const { id } = req.params;

      const proyection = { _id: 0, __v: 0 };

      const channel = await channelSchema.findOne({ channelId: id }, proyection);

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

  getMyChannels : async (req, res) => {
    try {
      const { userId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const page_size = parseInt(req.query.page_size) || 10; // Ahora se usa page_size en lugar de limit
  
      const id1 = req.user._id;
      const id2 = userId;
  
      if (!id1.equals(id2)) {
        return res.status(403).json({ error: "Access Forbidden" });
      }
  
      const totalChannels = await channelSchema.countDocuments({ owner: id2 });
  
      const total_pages = Math.ceil(totalChannels / page_size);
  
      const skip = (page - 1) * page_size;

      const projection = { _id: 0, __v: 0 };
  
      const channels = await channelSchema.find({ owner: id2 },projection).skip(skip).limit(page_size);
  
      if (!channels || channels.length === 0) {
        return res.status(404).json({
          error: "No channels found for this user",
        });
      }
  
      res.status(200).json({
        count: channels.length,
        total_pages: total_pages,
        next: page < total_pages ? `/api/users/${userId}/channels?page=${page + 1}&page_size=${page_size}` : null,
        previous: page > 1 ? `/api/users/${userId}/channels?page=${page - 1}&page_size=${page_size}` : null,
        results: channels,
      });
    } catch (error) {
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
