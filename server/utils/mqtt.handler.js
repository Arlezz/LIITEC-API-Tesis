const MqttHandler = require('../controller/broker.controller');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const { MQTT_HOST, MQTT_USER, MQTT_PASSWORD } = process.env;

const mqttClient = new MqttHandler(MQTT_HOST, MQTT_USER, MQTT_PASSWORD);

module.exports = mqttClient;
