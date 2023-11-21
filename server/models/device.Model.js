const mongoose = require('mongoose');

const { Schema } = mongoose;

const deviceSchema = new Schema(
    {
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
    }
);

module.exports = mongoose.model('device', deviceSchema);