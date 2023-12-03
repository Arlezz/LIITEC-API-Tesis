const mqtt = require("mqtt");
const dataSchema = require("../models/data.Model");

const batchInsertSize = 15; // Número de lecturas que se agruparán antes de insertar en la base de datos
let dataBatches = {};

function mqttHandler(host, email, password) {
  const options = {
    port: 1883,
    host: host,
    username: email,
    password: password,
  };

  const mqttClient = mqtt.connect(options);

  mqttClient.on("connect", () => {
    console.log("Connected to Mosquitto");
  });

  mqttClient.on("error", (error) => {
    console.error("Mosquitto connection error:", error);
  });


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
    
    //validate topic format "/devices/{deviceId}"
    if (!topic.startsWith("/devices/") || topic.split("/").length !== 3) {
      console.error("Invalid topic format");
      return;
    }
    console.log(`Message arrived on topic ${topic}`);


    const deviceId = topic.split("/")[2];

    if (!dataBatches[deviceId]) {
      dataBatches[deviceId] = [];
    }

    // Crear una entrada para cada tipo de dato en el mensaje
    Object.entries(payload).forEach(([measurement, data]) => {
      const entry = {
        deviceId: deviceId,
        measurement: measurement,
        data: data,
        createdOn: Date.now(),
      };

      // Agregar la entrada al lote del usuario actual
      dataBatches[deviceId].push(entry);
    });

    // Verificar si el lote alcanzó el tamaño deseado
    if (dataBatches[deviceId].length >= batchInsertSize) {
      // Insertar el lote del usuario actual en la base de datos
      insertDataBatch(dataBatches[deviceId]);

      // Reiniciar el lote del usuario actual
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
