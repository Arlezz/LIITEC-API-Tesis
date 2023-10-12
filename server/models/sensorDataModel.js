const mongoose = require('mongoose');

const { Schema } = mongoose;

const sensorDataSchema = new Schema(
    {
        channelID: {
            type: String,
            required: true
        },
        deviceID: {
            type: String,
            required: true
        },
        value: [
            {
                name: {
                    type: String,
                    required: true
                },
                data: {
                    type: Number,
                    required: true,
                }
            }
        ],
        createdOn: {
            type: Date,
            default: Date.now,
            required: true
        }
    },
    {
        timeseries:{
            timeField: 'createdOn',
            metaField: 'value',
            granularity: 'seconds'
        }
    }
);

    
module.exports = mongoose.model('sensorData', sensorDataSchema);