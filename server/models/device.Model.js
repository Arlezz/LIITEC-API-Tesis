const mongoose = require('mongoose');


const { Schema } = mongoose;

const deviceSchema = new Schema(
    {
        channelId: {
            type: String,
            ref: 'channel', 
            required: true
        },
        deviceId: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        measures: {
            type: [String],
            required: true,
        },
        unity: {
            type: [String],
            required: true,
        },
        createdOn: {
            type: Date,
            default: Date.now,
            required: true
        }
    }
);

module.exports = mongoose.model('device', deviceSchema);