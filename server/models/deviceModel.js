const mongoose = require('mongoose');

const { Schema } = mongoose;

const deviceSchema = new Schema(
    {
        channelAsociated: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        value: [
            {
                data: {
                    type: Number,
                },
                createdOn: {
                    type: Date,
                    default: Date.now,
                }
            }
        ],
        createdOn: {
            type: Date,
            default: Date.now,
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

    
module.exports = mongoose.model('device', deviceSchema);