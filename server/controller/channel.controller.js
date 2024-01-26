const channelSchema = require("../models/channel.model");
const deviceSchema = require("../models/device.model");
const userSchema = require("../models/user.model");
const keySchema = require("../models/key.model");
const { v4: uuidv4 } = require("uuid");
const ObjectId = require("mongoose").Types.ObjectId;
const authorization = require("../utils/key.handler");

const ChannelController = {

  getChannels: async (req, res) => {
    try {
      const { page = 1, page_size = 10 } = req.query;

      const totalChannels = await channelSchema.countDocuments();

      const totalPages = Math.ceil(totalChannels / page_size);

      const channels = await channelSchema.aggregate([
        {
          $facet: {
            data: [
              {
                $lookup: {
                  from: 'devices',
                  localField: 'channelId',
                  foreignField: 'channelId',
                  as: 'myDevices',
                },
              },
              {
                $addFields: {
                  deviceCount: { $size: '$myDevices' },
                  devices: { $concat: ['/api/v1/channels/', '$channelId', '/devices'] },
                },
              },
              {
                $project: {
                  _id: 0,
                  __v: 0,
                  myDevices: 0,
                },
              },
              {
                $skip: (Number(page) - 1) * Number(page_size),
              },
              {
                $limit: Number(page_size),
              },
            ],
          },
        },
        {
          $unwind: '$data',
        },
        {
          $replaceRoot: { newRoot: '$data' },
        },
      ]);

      if (!channels || channels.length === 0) {
        return res.status(404).json({ error: "Channels not found" });
      }

      const response = {
        count: totalChannels,
        totalPages: totalPages,
        next:
          page < totalPages
            ? `/api/v1/channels?page=${parseInt(page, 10) + 1}&page_size=${page_size}`
            : null,
        previous:
          page > 1
            ? `/api/v1/channels?page=${parseInt(page, 10) - 1}&page_size=${page_size}`
            : null,
        results: channels,
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting channels" });
    }
  },

  getPublicChannels: async (req, res) => {

    try {
      const { page = 1, page_size = 10 } = req.query;

      const totalChannels = await channelSchema.countDocuments({ isPublic: true });

      const totalPages = Math.ceil(totalChannels / page_size);

      const channels = await channelSchema.aggregate([
        {
          $match: { isPublic: true },
        },
        {
          $facet: {
            data: [
              {
                $lookup: {
                  from: 'devices',
                  localField: 'channelId',
                  foreignField: 'channelId',
                  as: 'myDevices',
                },
              },
              {
                $addFields: {
                  deviceCount: { $size: '$myDevices' },
                  devices: { $concat: ['/api/v1/channels/', '$channelId', '/devices'] },
                },
              },
              {
                $project: {
                  _id: 0,
                  __v: 0,
                  myDevices: 0,
                },
              },
              {
                $skip: (Number(page) - 1) * Number(page_size),
              },
              {
                $limit: Number(page_size),
              },
            ],
          },
        },
        {
          $unwind: '$data',
        },
        {
          $replaceRoot: { newRoot: '$data' },
        },
      ]);

      if (!channels || channels.length === 0) {
        return res.status(404).json({ error: "Channels not found" });
      }

      const response = {
        count: totalChannels,
        totalPages: totalPages,
        next:
          page < totalPages
            ? `/api/v1/channels/public?page=${parseInt(page, 10) + 1}&page_size=${page_size}`
            : null,
        previous:
          page > 1
            ? `/api/v1/channels/public?page=${parseInt(page, 10) - 1}&page_size=${page_size}`
            : null,
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

      const channel = await channelSchema.aggregate([
        {
          $match: { channelId: id },
        },
        {
          $lookup: {
            from: 'devices',
            localField: 'channelId',
            foreignField: 'channelId',
            as: 'myDevices',
          },
        },
        {
          $addFields: {
            deviceCount: { $size: '$myDevices' },
            devices: { $concat: ['/api/v1/channels/', '$channelId', '/devices'] },

          },
        },
        {
          $project: {
            _id: 0,
            __v: 0,
            myDevices: 0
          },
        }
      ]);


      if (!channel[0] || channel[0].length === 0) {
        return res.status(404).json({ error: "Channel not found" });
      }

      if (channel[0].isPublic) {
        return res.status(200).json(channel[0]);      
      }
      
      const user = req.user;

      if (user.apiKey.type === "readUser") {

        const key = await keySchema.findOne({ user: user._id, channelAccess: id });

        if (!key || key.expirationDate < new Date(Date.now())) {
          return res.status(401).json({ error: "Access Forbidden" });
        }

      } else {

        var id1 = new ObjectId(user._id);
        var id2 = new ObjectId(channel[0].owner);
  
        if (!id1.equals(id2)) {
          return res.status(401).json({ error: "Access Forbidden" });
        }
      }
      
      res.json(channel[0]);
      
    } catch (error) {
      res.status(500).json({ error: error.message || "Error Getting Channel" });
    }
  },

  getMyChannels: async (req, res) => {
    try {
      const { userId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const page_size = parseInt(req.query.page_size) || 10;
  
      const id1 = req.user._id;
      const id2 = userId;
  
      if (!id1.equals(id2)) {
        return res.status(401).json({ error: "Access Forbidden" });
      }

      const totalChannels = await channelSchema.countDocuments({ owner: id2 });
      const totalPages = Math.ceil(totalChannels / page_size);
      const skip = (page - 1) * page_size;
  
      const channels = await channelSchema.aggregate([
        {
          $match: { owner: new ObjectId(id2) },
        },
        {
          $lookup: {
            from: "devices",
            localField: "channelId",
            foreignField: "channelId",
            as: "myDevices",
          },
        },
        {
          $addFields: {
            devicesCount: { $size: "$myDevices" },
            devices: { $concat: ["/api/v1/channels/", "$channelId", "/devices"] },
          },
        },
        {
          $project: {
            _id: 0,
            __v: 0,
            myDevices: 0,
          },
        },
        { $skip: skip },
        { $limit: page_size },
      ]);
  
      if (!channels || channels.length === 0) {
        return res.status(404).json({
          error: "No channels found for this user",
        });
      }
  
      res.status(200).json({
        count: channels.length,
        totalPages: totalPages,
        next: page < totalPages ? `/api/v1/users/${userId}/channels?page=${parseInt(page, 10) + 1}&page_size=${page_size}` : null,
        previous: page > 1 ? `/api/v1/users/${userId}/channels?page=${parseInt(page, 10) - 1}&page_size=${page_size}` : null,
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
        return res.status(401).json({ error: "Access Forbidden" });
      }

      const newChannel = new channelSchema({
        channelId: identifier,
        owner: id2,
        ubication: ubication,
        createdOn: Date.now(),
        updatedOn: Date.now(),
      });
      
      if (name !== undefined && name !== null) {
        newChannel.name = name;
      }

      if (description !== undefined && description !== null) {
        newChannel.description = description;
      }

      if (project !== undefined && project !== null) {
        newChannel.project = project;
      }

      await newChannel.save();
      
      res.json({ message: "Channel created successfully" });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message || "Error creating channel" });
    }
  },

  updateChannel: async (req, res) => {
    try {

      const { id } = req.params;

      const { name, description, project, ubication, isActive, isPublic } = req.body;

      const channel = await channelSchema.findOne({ channelId: id });

      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      var id1 = new ObjectId(req.user._id);
      var id2 = new ObjectId(channel.owner);

      if (!id1.equals(id2)) {
        return res.status(401).json({ error: "Access Forbidden" });
      }

      const hasChanges = (
        (name !== undefined && channel.name !== name) ||
        (description !== undefined && channel.description !== description) ||
        (project !== undefined && channel.project !== project) ||
        (ubication !== undefined && (
          channel.ubication.latitude !== (ubication.latitude !== undefined ? ubication.latitude : channel.ubication.latitude) ||
          channel.ubication.longitude !== (ubication.longitude !== undefined ? ubication.longitude : channel.ubication.longitude)
        )) ||
        (isActive !== undefined && channel.isActive !== isActive) ||
        (isPublic !== undefined && channel.isPublic !== isPublic)
      );

      if (hasChanges) {
        if (name !== undefined && name !== null) {
          channel.name = name;
        }
        
        if (description !== undefined) {
          channel.description = description;
        }
  
        if (project !== undefined) {
          channel.project = project;
        }
  
        if (ubication !== undefined) {
          if (ubication.latitude !== undefined) {
            channel.ubication.latitude = ubication.latitude;
          }
          if (ubication.longitude !== undefined) {
            channel.ubication.longitude = ubication.longitude;
          }
        }
  
        if (isActive !== undefined) {
          channel.isActive = isActive;
  
          if (!isActive) {
            await deviceSchema.updateMany({ channelId: id }, { isActive: false });
          }
        }
  
        if (isPublic !== undefined) {
          channel.isPublic = isPublic;
        }
  
        channel.updatedOn = Date.now();
  
        await channel.save();
  
        res.status(200).json({ message: "Channel updated successfully" });
      } else {
        console.log("no hubo cambios");
        return res.status(400).json({ message: "No changes detected" });
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
        return res.status(401).json({ error: "Access Forbidden" });
      }

      await channelSchema.deleteOne({ channelId: id });

      await deviceSchema.deleteMany({ channelId: id });

      res.json({ message: "Channel deleted" });    
    
    } catch (error) {
      return res.status(500).json({ error: error.message || "Error deleting channel" });
    }
  },

  giveUserAccessToChannel : async (req, res) => {
    try {

      const { id } = req.params;
      const { userId, expiration } = req.body;

      const channel = await channelSchema.findOne({ channelId: id });

      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      var id1 = new ObjectId(req.user._id);
      var id2 = new ObjectId(channel.owner);

      if (!id1.equals(id2)) {
        return res.status(401).json({ error: "Access Forbidden" });
      }

      const user = await userSchema.find({ _id: userId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const userKey = await keySchema.findOne({ user: userId, channelAccess: id });

      if (userKey) {
        return res.status(403).json({ error: "User already has access to this channel" });
      }

      const key = authorization.genAPIKey();
        
      const newKey = new keySchema({
        key: key,
        type: "readUser",
        expirationDate: expiration,
        user: userId,
        channelAccess: id,
        channelOwner: channel.owner,
      });

      await newKey.save();

      res.json({ message: "User access granted" });

    } catch (error) {
      return res.status(500).json({ error: error.message || "Error giving user access to channel" });
    }
  }
};

module.exports = ChannelController;
