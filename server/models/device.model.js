const mongoose = require('mongoose');
const { Schema } = mongoose;


const deviceSchema = new Schema(
    {
        channelId: {
            type: String,
            ref: 'channel', 
            required: true
        },
        name: {
            type: String
        },
        description : {
            type: String
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
        measures: [
            {
                variable: {
                    type: String,
                    required: true
                },
                unit: {
                    type: String,
                    required: true
                },
            }
        ],
        isActive: {
            type: Boolean,
            default: true
        },
        createdOn: {
            type: Date,
            default: Date.now,
            required: true
        },
        updatedOn: {
            type: Date,
            default: Date.now,
            required: true
        }
    }
);

module.exports = mongoose.model('device', deviceSchema);