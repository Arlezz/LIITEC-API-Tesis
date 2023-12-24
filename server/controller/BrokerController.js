const mqtt = require("mqtt");
const dataSchema = require("../models/data.Model");
const mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config({path: '.env'});
const { MQTT_PORT, MQTT_BATCH_SIZE, MQTT_TOPIC_PREFIX, MQTT_SEND_INTERVAL } = process.env;

class MqttHandler {
  constructor(host, username, password) {
    this.dataBatches = {};
    this.sendTimer = null;

    this.options = {
      port: MQTT_PORT,
      host: host,
      username: username,
      password: password,
    };

    this.mqttClient = mqtt.connect(this.options);

    this.mqttClient.on("connect", () => {
      console.log("Connected to Mosquitto");
    });

    this.mqttClient.on("error", (error) => {
      console.error("Mosquitto connection error:", error);
    });

    this.mqttClient.on("reconnect", () => {
      console.log("Reconnecting to Mosquitto");
    });

    this.mqttClient.on("close", () => {
      console.log("Mosquitto closed connection");
      this.sendPendingData();
    });

    this.mqttClient.on("message", (topic, message) => {
      this.handleMqttMessage(topic, message);
    });
  }

  subscribeToTopic(topic) {
    if (this.mqttClient) {
      this.mqttClient.subscribe(topic, (err) => {
        if (err) {
          console.error(`Error subscribing to topic ${topic}: ${err}`);
        } else {
          console.log(`Subscribed to topic ${topic}`);
        }
      });
    }
  }

  async handleMqttMessage(topic, message) {
    try {
      const payload = JSON.parse(message.toString());

      this.validateTopicStructure(topic);

      console.log(`Message arrived on topic ${topic}`);
      const deviceId = topic.split(MQTT_TOPIC_PREFIX)[1];

      this.dataBatches[deviceId] = this.dataBatches[deviceId] || [];
      this.validatePayloadStructure(payload);

      payload.data.forEach((item) => {
        this.validateItemStructure(item);
        const entry = {
          deviceId,
          measurement: item.measurement,
          value: item.value,
          timestamp: item.timestamp * 1000,
          createdOn: Date.now(),
        };
        this.dataBatches[deviceId].push(entry);
      });

      if (this.dataBatches[deviceId].length >= MQTT_BATCH_SIZE) {
        await this.sendPendingData();
      } else {
        this.restartSendTimer();
      }
    } catch (error) {
      console.error("Error processing MQTT message:", error.message);
    }
  }

  async insertDataBatch(batch) {
    try {
      await dataSchema.insertMany(batch);
      console.log("Data batch successfully inserted");
    } catch (error) {
      console.error("Error inserting data batch:", error.message);
      console.error("Original batch:", batch);
    }
  }
  

  async sendPendingData() {
    for (const deviceId of Object.keys(this.dataBatches)) {
      console.log(`Processing pending data for the device ${deviceId}`);
      if (this.dataBatches[deviceId].length > 0) {
        console.log("Sending pending data for the device", deviceId);
        console.log("Checking MongoDB connection status:", mongoose.connection.readyState);

        await this.insertDataBatch(this.dataBatches[deviceId]);
        this.dataBatches[deviceId] = [];
      }
    }
  }

  validateTopicStructure(topic) {
    if (!topic.startsWith(MQTT_TOPIC_PREFIX) || topic.split("/").length !== 3) {
      throw new Error("Invalid topic format");
    }
  }

  validatePayloadStructure(payload) {
    if (!payload.data || !Array.isArray(payload.data)) {
      throw new Error("Invalid payload format: 'data' field missing or not an array");
    }
  }

  validateItemStructure(item) {
    if (!item.measurement || !item.value || !item.timestamp) {
      throw new Error(
        "Invalid element format: missing field 'measurement', 'value' or 'timestamp'."
      );
    }
  }

  restartSendTimer() {
    // Reiniciar el temporizador si ya estaba activo
    if (this.sendTimer) {
      clearTimeout(this.sendTimer);
    }

    // Establece un nuevo temporizador para enviar datos después de MQTT_SEND_INTERVAL milisegundos
    this.sendTimer = setTimeout(() => {
      this.sendPendingData();
      this.sendTimer = null; // Limpiar el temporizador después de enviar los datos
    }, MQTT_SEND_INTERVAL);
  }

  async closeConnection() {
    if (this.mqttClient) {
      this.mqttClient.end();

      // Envía los datos pendientes antes de cerrar la conexión
      await this.sendPendingData();
    }
  }
}


module.exports = MqttHandler;
