const mqtt = require("mqtt");
const dataSchema = require("../models/data.Model");

const batchInsertSize = 15;
let dataBatches = {};
let tz = "America/Santiago";
let _options = {
  timeZone: tz,
  timeZoneName: "longOffset",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  fractionalSecondDigits: 3,
};

function mqttHandler(host, email, password) {
  const options = {
    port: 1883,
    host: host,
    username: email,
    password: password,
  };

  const mqttClient = mqtt.connect(options);

  //Modulo de conexion a Mosquitto
  mqttClient.on("connect", () => {
    console.log("Connected to Mosquitto");
  });

  //Modulo de errores de conexion a Mosquitto
  mqttClient.on("error", (error) => {
    console.error("Mosquitto connection error:", error);
  });

  //Modulo de cierre de conexion a Mosquitto
  mqttClient.on("close", () => {
    console.log("Mosquitto closed connection");
    Object.keys(dataBatches).forEach((deviceId) => {
      if (dataBatches[deviceId].length > 0) {
        console.log(`Processing pending data for device ${deviceId}`);
        insertDataBatch(dataBatches[deviceId]);
        dataBatches[deviceId] = [];
      }
    });
  });

  mqttClient.on("message", (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());

      if (!topic.startsWith("/devices/") || topic.split("/").length !== 3) {
        throw new Error("Invalid topic format");
      }
      
      console.log(`Message arrived on topic ${topic}`);

      const deviceId = topic.split("/")[2];

      if (!dataBatches[deviceId]) {
        dataBatches[deviceId] = [];
      }

      if (!payload.data || !Array.isArray(payload.data)) {
        throw new Error(
          "Invalid payload format: 'data' field is missing or not an array"
        );
      }

      payload.data.forEach((item) => {
        if (!item.measurement || !item.value || !item.timestamp) {
          throw new Error(
            "Invalid item format: 'measurement', 'value', or 'timestamp' field is missing"
          );
        }
        
        const entry = {
          deviceId: deviceId,
          measurement: item.measurement,
          value: item.value,
          timestamp: (item.timestamp*1000),
          createdOn: Date.now(),
        };

        dataBatches[deviceId].push(entry);
      });

      //console.log(dataBatches[deviceId]);

      if (dataBatches[deviceId].length >= batchInsertSize) {
        insertDataBatch(dataBatches[deviceId]);
        dataBatches[deviceId] = [];
      }
    } catch (error) {
      console.error("Error processing MQTT message:", error.message);
    }
  });

  async function insertDataBatch(batch) {
    try {
      await dataSchema.insertMany(batch);
      console.log("Data batch successfully inserted");
    } catch (error) {
      console.error("Error inserting data batch:", error.message);
      console.error("Original batch:", batch);
      // Puedes agregar más información según tus necesidades, como el lote original.
    }
  }
  

  return mqttClient;
}

module.exports = mqttHandler;
