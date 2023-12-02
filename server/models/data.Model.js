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
    data: {
      type: Number,
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
      timeField: "createdOn",
      metaField: "data",
      granularity: "seconds",
    },
  }
);

module.exports = mongoose.model("data", dataSchema);
