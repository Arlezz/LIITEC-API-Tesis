const mongoose = require('mongoose');

const { Schema } = mongoose;

const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('apiKey', apiKeySchema);