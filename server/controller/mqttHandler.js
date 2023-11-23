const mqtt = require('mqtt');


const brokerUrl = 'mqtt://localhost:1883';
const topic = '#';

/*const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('Conectado al servidor MQTT');

  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Suscrito a todos los temas: ${topic}`);
    } else {
      console.error(`Error al suscribirse: ${err}`);
    }
  });
});

client.on('message', (receivedTopic, message) => {
  console.log(`Mensaje recibido en el tema 
  ${receivedTopic}: ${message.toString()}`);
});

client.on('error', (err) => {
  console.error(`Error en el cliente MQTT: ${err}`);
});

client.on('close', () => {
  console.log('Conexión MQTT cerrada');
});

client.on('offline', () => {
  console.log('Cliente MQTT fuera de línea');
});*/
