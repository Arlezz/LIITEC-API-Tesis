const mongoose = require('mongoose');

const { Schema } = mongoose;

const dataTemperatureSchema = new Schema(
    {
        channelAsociated: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
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
    },
    {
        timeseries:{
            timeField: 'timestamp',
            metaField: 'value',
            granularity: 'seconds'
        }
    }
);

    
module.exports = mongoose.model('device', dataTemperatureSchema);