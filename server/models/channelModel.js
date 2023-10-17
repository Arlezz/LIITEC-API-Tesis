const mongoose = require('mongoose');

const { Schema } = mongoose;


const channelSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        owner: { 
            type: String, 
            required: true 
        },
        project: {
            type: String,
            required: true
        },
        ubication: {
            latitude: {
                type: String,
            },
            longitude: {
                type: String,
            },
        },
        createdOn: {
            type: Date,
            default: Date.now,
            required: true
        },
        devices:[
            {
                deviceId:{
                    type: String,
                    required: true
                },
                model:{
                    type: String,
                    required: true
                },
                unity:{
                    
                },
                createdOn: {
                    type: Date,
                    default: Date.now,
                    required: true
                },
            }
        ]
    }
);
    
module.exports = mongoose.model('channel', channelSchema);