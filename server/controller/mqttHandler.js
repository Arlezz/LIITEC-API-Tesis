const mqtt = require('mqtt');

class MqttHandler {
  constructor(host, email, password) {
    this.mqttClient = null;
    this.host = host;
    this.connected = false;
    this.username = email;
    this.password = password;
    this.channels = {}; // Almacena los tópicos MQTT asociados a los canales
  }

  async connect() {
    const options = {
      protocol: 'mqtt',
      host: this.host,
      port: 1883,
      username: this.username,
      password: this.password,
    };

    this.mqttClient = mqtt.connect(options);

    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    this.mqttClient.on('connect', () => {
      this.connected = true;
      console.log(`mqtt client connected`);
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });

    this.mqttClient.on('message', async (topic, message) => {
      const channelId = this.channels[topic]; // Obtiene el ID del canal desde el tópico
      if (channelId) {
        const mensaje = message.toString();
        console.log(`Mensaje recibido en granja ${channelId}: ${mensaje}`);

        // Almacena el mensaje en la base de datos
        await Mensaje.create({
          canal: channelId,
          contenido: mensaje,
        });
      }else{
        const mensaje = message.toString();
        console.log(`Mensaje recibido desde afuer: ${mensaje}`);
      }
    });
  }

  async suscribeChannel(channelId) {
    // Crea un tópico MQTT único para cada canal y lo asocia al ID del canal
    const topic = `canal/${channelId}`;
    this.channels[topic] = channelId;

    // Suscribe el cliente MQTT al tópico asociado al canal
    this.mqttClient.subscribe(topic, { qos: 0 });
    console.log(`Suscrito a la granja ${channelId}`);
  }

  async sendMessage(channelId, message) {
    // Verifica si la granja está suscrita
    const topic = `granja/${channelId}`;
    if (this.channels[topic]) {
      // Publica el mensaje en el tópico asociado a la granja
      this.mqttClient.publish(topic, message);
      console.log(`Mensaje enviado al canal ${channelId}: ${message}`);
    } else {
      console.log(`Canal ${channelId} no está suscrita`);
    }
  }
}

module.exports = MqttHandler;