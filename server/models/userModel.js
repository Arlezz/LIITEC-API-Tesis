const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        createdOn: {
            type: Date,
            default: Date.now,
            required: true
        },
        apiKey:{
            key:{
                type: String,
                required: true,
                unique: true
            },
            type:{
                type: String,
                required: true
            }
        },
        channels: [{
            channelId:{
                type: String,
                required: true
            },
            createdOn: {
                type: Date,
                default: Date.now,
                required: true
            }
        }]
    }
);
    
module.exports = mongoose.model('user', userSchema);