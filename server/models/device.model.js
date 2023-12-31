const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @openapi
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       properties:
 *         channelId:
 *           type: string
 *           description: ID of the associated channel
 *           example: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         name:
 *           type: string
 *           description: Name of the device
 *           example: DeviceName
 *         description:
 *           type: string
 *           description: Description of the device
 *           example: Device description
 *         deviceId:
 *           type: string
 *           description: Unique identifier for the device
 *           example: dv-089f98d5-25f4-4150-ab4e-18be2f098da2
 *         type:
 *           type: string
 *           description: Type of the device
 *           example: Sensor
 *         model:
 *           type: string
 *           description: Model of the device
 *           example: DHT22
 *         measures:
 *           type: array
 *           description: Array of measures associated with the device
 *           items:
 *             type: object
 *             properties:
 *               variable:
 *                 type: string
 *                 description: Variable name
 *                 example: Temperature
 *               unit:
 *                 type: string
 *                 description: Unit of measurement for the variable
 *                 example: Celsius
 *         isActive:
 *           type: boolean
 *           description: Indicates if the device is active
 *           example: true
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: Date and time when the device was created
 *           example: 2022-01-01T12:34:56.789Z
 *         updatedOn:
 *           type: string
 *           format: date-time
 *           description: Date and time when the device was last updated
 *           example: 2022-01-02T01:23:45.678Z
 *       required:
 *         - channelId
 *         - deviceId
 *         - type
 *         - model
 *         - measures
 *         - createdOn
 *         - updatedOn
 *       example:
 *         channelId: ch-32e48add-c489-425e-bd48-fd7ffbd7d8f7
 *         name: DeviceName
 *         description: Device description
 *         deviceId: dv-089f98d5-25f4-4150-ab4e-18be2f098da2
 *         type: Sensor
 *         model: DHT22
 *         measures:
 *           - variable: Temperature
 *             unit: Celsius
 *           - variable: Humidity
 *             unit: Percentage
 *         isActive: true
 *         createdOn: 2022-01-01T12:34:56.789Z
 *         updatedOn: 2022-01-02T01:23:45.678Z
 */



const deviceSchema = new Schema(
    {
        channelId: {
            type: String,
            ref: 'channel', 
            required: true
        },
        name: {
            type: String
        },
        description : {
            type: String
        },
        deviceId: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        measures: [
            {
                variable: {
                    type: String,
                    required: true
                },
                unit: {
                    type: String,
                    required: true
                },
            }
        ],
        isActive: {
            type: Boolean,
            default: true
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

module.exports = mongoose.model('device', deviceSchema);