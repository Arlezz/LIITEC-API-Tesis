const mqtt = require('mqtt');

class mqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'mosquitto';
    this.connected = false;
    //this.username = 'USERNAME';
    //this.password = 'PASSWORD';
  }
  
  connect() {
    console.log("mqtt_host 1: "+this.host);

    const options = {
      protocol: 'mqtt',
      host : this.host,
      port : 1883,
    }

    this.mqttClient = mqtt.connect(options);
  
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    this.mqttClient.on('connect', () => {
      this.connected = true;
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

  isConnected(){
    return this.connected;
  }

  sendMessage(message) {
    this.mqttClient.publish('{device}', message);
  }
}

module.exports = mqttHandler;