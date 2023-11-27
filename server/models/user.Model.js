const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        superuser: {
            type: Boolean,
            default: false
        },
        acls: [
            {
                topic: {
                    type: String,
                    required: true
                },
                acc: {
                    type: Number,
                    required: true
                }
            }
        ],
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        apiKey: {
            key: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            }
        },
        createdOn: {
            type: Date,
            default: Date.now,
            required: true
        }
    }
);

    
module.exports = mongoose.model('user', userSchema);