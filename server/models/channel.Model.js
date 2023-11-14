const mongoose = require('mongoose');

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
            type: String,
            ref: 'userModel', // Reemplaza 'User' con el nombre de tu modelo de usuario
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