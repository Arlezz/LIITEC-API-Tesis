const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const { Schema } = mongoose;


/**
 * @openapi
 * components:
 *   schemas:
 *     Key:
 *       type: object
 *       properties:
 *         key:
 *           type: string
 *           description: Unique identifier for the key
 *           example: abcdef123456
 *         type:
 *           type: string
 *           description: Type of the key
 *           example: readUser
 *         user:
 *           type: string
 *           description: ID of the associated user
 *           example: 5f8d0f7a3f8d7a0f7d8a0f7d
 *         channelAccess:
 *           type: string
 *           description: ID of the channel associated with the key
 *           example: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         channelOwner:
 *           type: string
 *           description: ID of the user who owns the channel
 *           example: 5f8d0f7a3f8d7a0f7d8a0f7d
 *         expirationDate:
 *           type: string
 *           format: date-time
 *           description: Date and time when the key expires
 *           example: 2023-01-01T12:34:56.789Z
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: Date and time when the key was created
 *           example: 2022-01-01T12:34:56.789Z
 *         updatedOn:
 *           type: string
 *           format: date-time
 *           description: Date and time when the key was last updated
 *           example: 2022-01-02T01:23:45.678Z
 *       required:
 *         - key
 *         - type
 *         - user
 *         - createdOn
 *       example:
 *         key: 6137ol4o5rndl22cr3mux0z1p4ktlo
 *         type: readUser
 *         user: 65836b51cbacc4a4dd5073d6
 *         createdOn: 2022-01-01T12:34:56.789Z
 *         updatedOn: 2022-01-02T01:23:45.678Z
 */



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