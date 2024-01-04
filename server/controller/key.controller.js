const keySchema = require("../models/key.model");
const ObjectId = require("mongoose").Types.ObjectId;


const KeyController = {

    getKeys: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const page_size = parseInt(req.query.page_size) || 10;

            const totalKeys = await keySchema.countDocuments();

            const totalPages = Math.ceil(totalKeys / page_size);

            const startIndex = (page - 1) * page_size;

            const projection = {_id: 0, __v: 0 };

            const keys = await keySchema.find({}, projection)
                .skip(startIndex)
                .limit(page_size)

            if (!keys) {
                return res.status(404).json({ error: "Keys not found" });
            }

            const response = {
                count: totalKeys,
                totalPages: totalPages,
                next: page < totalPages ? `/api/v1/keys?page=${page + 1}&page_size=${page_size}` : null,
                previous: page > 1 ? `/api/v1/keys?page=${page - 1}&page_size=${page_size}` : null,
                results: keys
            };

            res.status(200).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error getting keys" });
        }
    },

    getKeyByUserId: async (req, res) => {
        try {

            const { userId } = req.params;

            const page = parseInt(req.query.page) || 1;
            const page_size = parseInt(req.query.page_size) || 10;

            var id1 = new ObjectId(userId);
            var id2 = new ObjectId(req.user._id);

            if (!id1.equals(id2)) {
                return res.status(401).json({ error: "Access Forbidden" });
            }

            const totalKeys = await keySchema.countDocuments({
                $or: [
                    { user: userId }, // Documentos con campo "user" igual a userId
                    { channelOwner: userId } // Documentos con campo "channelOwner" igual a userId
                ]
            });

            const totalPages = Math.ceil(totalKeys / page_size);

            const startIndex = (page - 1) * page_size;
        
            const projection = { _id: 0, __v: 0 };

            const key = await keySchema.find({
                $or: [
                    { user: userId }, // Documentos con campo "user" igual a userId
                    { channelOwner: userId } // Documentos con campo "channelOwner" igual a userId
                ]
            }, projection)
                .skip(startIndex)
                .limit(page_size);
    
            if (!key || key.length === 0) {
                return res.status(404).json({ error: "Keys not found" });
            }

            const response = {
                count: totalKeys,
                totalPages: totalPages,
                next: page < totalPages ? `/api/v1/keys/${userId}?page=${page + 1}&page_size=${page_size}` : null,
                previous: page > 1 ? `/api/v1/keys/${userId}?page=${page - 1}&page_size=${page_size}` : null,
                results: key
            };
    
            res.status(200).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error getting keys" });
        }
    },

};

module.exports = KeyController;