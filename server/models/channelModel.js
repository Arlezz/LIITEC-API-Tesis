const mongoose = require('mongoose');

const { Schema } = mongoose;

const dataSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    granularity: {
        type: Number,
        required: true,
    },
});

const channelSchema = new Schema({
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
    timeseries: [dataSchema],
});
    
module.exports = mongoose.model('channel', channelSchema);