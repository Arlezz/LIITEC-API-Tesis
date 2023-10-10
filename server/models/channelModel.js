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
        topic: {
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
        sensors:[
            
        ]
    }
);
    
module.exports = mongoose.model('channel', channelSchema);