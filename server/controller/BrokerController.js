const mqtt = require("mqtt");
const dataSchema = require("../models/data.Model");

const batchInsertSize = 15; 
let dataBatches = {};
let tz = 'America/Santiago'
let _options = {
  timeZone:tz ,
  timeZoneName:'longOffset',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  fractionalSecondDigits: 3
}

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
    const payload = JSON.parse(message.toString());
    
    if (!topic.startsWith("/devices/") || topic.split("/").length !== 3) {
      console.error("Invalid topic format");
      return;
    }
    console.log(`Message arrived on topic ${topic}`);

    const deviceId = topic.split("/")[2];

    if (!dataBatches[deviceId]) {
      dataBatches[deviceId] = [];
    }
    

    Object.entries(payload).forEach(([measurement, { value, timestamp }]) => {
      const entry = {
        deviceId: deviceId,
        measurement: measurement,
        value: value,
        timestamp: new Date(timestamp*1000),//cambiar en un futuro
        createdOn: Date.now()
      };
    
      dataBatches[deviceId].push(entry);
    });


    if (dataBatches[deviceId].length >= batchInsertSize) {
      insertDataBatch(dataBatches[deviceId]);
      dataBatches[deviceId] = [];
    }
  });

  async function insertDataBatch(batch) {
    try {
      await dataSchema.insertMany(batch);
    } catch (error) {
      console.error("Insert error:", error);
    }
  }

  return mqttClient;
}

module.exports = mqttHandler;
