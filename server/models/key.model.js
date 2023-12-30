const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const { Schema } = mongoose;

const keySchema = new Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: String,
            required: true
        },
        user: {
            type: ObjectId,
            ref: 'user', 
            required: true
        },
        channelAccess: {
            type: String
        },
        channelOwner: {
            type: ObjectId,
            ref: 'user'
        },
        expirationDate: {
            type: Date,
        },
        createdOn: {
            type: Date,
            default: Date.now,
            required: true
        },
        updatedOn: {
            type: Date,
            default: Date.now,
        }
    }
);

module.exports = mongoose.model('key', keySchema);