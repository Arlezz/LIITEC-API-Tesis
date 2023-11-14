const mongoose = require('mongoose');
const apiKeySchema = require('./apiKey.Model');

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
            type: apiKeySchema.schema,
            required: true
            
        }
    }
);
    
module.exports = mongoose.model('user', userSchema);