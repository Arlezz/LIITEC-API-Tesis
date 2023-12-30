const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const { Schema } = mongoose;


/**
 * @swagger
 * components:
 *   schemas:
 *     Channel:
 *       type: object
 *       properties:
 *         channelId:
 *           type: string
 *           description: Unique identifier for the channel
 *           example: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         name:
 *           type: string
 *           description: Name of the channel
 *           example: ChannelName
 *         isActive:
 *           type: boolean
 *           description: Indicates if the channel is active
 *           example: true
 *         isPublic:
 *           type: boolean
 *           description: Indicates if the channel is public
 *           example: false
 *         description:
 *           type: string
 *           description: Description of the channel
 *           example: Channel description
 *         owner:
 *           type: string
 *           description: ID of the owner user
 *           example: 658355548398f5fa3b69e862
 *         project:
 *           type: string
 *           description: Project associated with the channel
 *           example: ProjectName
 *         ubication:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: Latitude coordinate of the channel's location
 *               example: 123.456
 *             longitude:
 *               type: number
 *               description: Longitude coordinate of the channel's location
 *               example: -45.678
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: Date and time when the channel was created
 *           example: 2022-01-01T12:34:56.789Z
 *         updatedOn:
 *           type: string
 *           format: date-time
 *           description: Date and time when the channel was last updated
 *           example: 2022-01-02T01:23:45.678Z
 *       required:
 *         - channelId
 *         - owner
 *         - createdOn
 *         - updatedOn
 *       example:
 *         channelId: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         name: ChannelName
 *         isActive: true
 *         isPublic: false
 *         description: Channel description
 *         owner: 658355548398f5fa3b69e862
 *         project: ProjectName
 *         ubication:
 *           latitude: 123.456
 *           longitude: -45.678
 *         createdOn: 2022-01-01T12:34:56.789Z
 *         updatedOn: 2022-01-02T01:23:45.678Z
 */


const channelSchema = new Schema(
    {
        channelId: {
            type: String,
            required: true,
            unique: true
        },
        name: { 
            type: String, 
            //required: true 
        },
        isActive: { 
            type: Boolean, 
            default: true 
        },
        isPublic: { 
            type: Boolean, 
            default: false 
        },
        description: { 
            type: String, 
            //required: true 
        },
        owner: {
            type: ObjectId,
            ref: 'user', 
            required: true
        },
        project: {
            type: String,
            //required: true
        },
        ubication: {
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            }
        },
        createdOn: {
            type: Date,
            default: Date.now,
            required: true
        },
        updatedOn: {
            type: Date,
            default: Date.now,
            required: true
        }
    }
);
    
module.exports = mongoose.model('channel', channelSchema);