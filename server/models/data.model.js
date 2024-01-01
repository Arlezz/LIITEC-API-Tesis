const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * @openapi
 * components:
 *   schemas:
 *     Data:
 *       type: object
 *       properties:
 *         deviceId:
 *           type: string
 *           description: ID of the associated device
 *           example: dv-089f98d5-25f4-4150-ab4e-18be2f098da2
 *         measurement:
 *           type: string
 *           description: Type of measurement
 *           example: Temperature
 *         value:
 *           type: number
 *           description: Numeric value of the measurement
 *           example: 25.5
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Date and time of the measurement
 *           example: 2022-01-01T12:34:56.789Z
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: Date and time when the data was created
 *           example: 2022-01-01T12:34:56.789Z
 *       required:
 *         - deviceId
 *         - measurement
 *         - value
 *         - timestamp
 *         - createdOn
 *       example:
 *         deviceId: dv-089f98d5-25f4-4150-ab4e-18be2f098da2
 *         measurement: Temperature
 *         value: 25.5
 *         timestamp: 2022-01-01T12:34:56.789Z
 *         createdOn: 2022-01-01T12:34:56.789Z
 */


const dataSchema = new Schema(
  {
    deviceId: {
      type: String,
      ref: "device",
      required: true,
    },

    measurement: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "value",
      granularity: "seconds",
    },
  }
);

module.exports = mongoose.model("data", dataSchema);
