const mongoose = require("mongoose");

const { Schema } = mongoose;

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
