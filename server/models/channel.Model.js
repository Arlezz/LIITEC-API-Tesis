const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const { Schema } = mongoose;


const channelSchema = new Schema(
    {
        channelId: {
            type: String,
            required: true,
            unique: true
        },
        name: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        owner: {
            type: ObjectId,
            ref: 'user', 
            required: true
        },
        project: {
            type: String,
            required: true
        },
        ubication: {
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            }
        },
        createdOn: {
            type: Date,
            default: Date.now,
            required: true
        }
    }
);
    
module.exports = mongoose.model('channel', channelSchema);