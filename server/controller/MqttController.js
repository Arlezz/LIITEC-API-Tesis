const mqtt = require('mqtt');

function mqttHandler(host, email, password) {
  const options = {
    port: 1883,
    host: host,
    username: email,
    password: password,
  };

  const mqttClient = mqtt.connect(options);

  mqttClient.on('connect', () => {
    console.log('Conectado a Mosquitto');
    // Puedes agregar lógica adicional aquí después de la conexión exitosa.
  });

  mqttClient.on('error', (error) => {
    console.error('Error de conexión a Mosquitto:', error);
    // Puedes manejar el error de conexión aquí.
  });

  mqttClient.on('close', () => {
    console.log('Conexión cerrada');
    // Puedes agregar lógica adicional aquí después de que se cierre la conexión.
  });

  mqttClient.on('message', (topic, message) => {
    const payload = message.toString();
    console.log(`Mensaje recibido en el tópico ${topic}: ${payload}`);
    // Puedes agregar lógica adicional aquí para manejar el mensaje recibido.
  });

  return mqttClient;
}

module.exports = mqttHandler;

