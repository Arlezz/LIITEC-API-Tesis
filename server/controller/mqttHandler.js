const mqtt = require('mqtt');

class mqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'mqtt://localhost';
    //this.username = 'USERNAME';
    //this.password = 'PASSWORD';
  }
  
  connect() {
    console.log(this.host);
    this.mqttClient = mqtt.connect(this.host);

    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    this.mqttClient.subscribe('{device}', {qos: 0});

    this.mqttClient.on('message', function (topic, message) {
      console.log(message.toString());
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  sendMessage(message) {
    this.mqttClient.publish('{device}', message);
  }
}

module.exports = mqttHandler;