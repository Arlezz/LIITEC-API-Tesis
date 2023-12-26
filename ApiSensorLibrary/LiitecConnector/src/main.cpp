#include <Arduino.h>
#include <settings.h>

#include <sensors/sensor_dht.h>
#include <sensors/sensor_gyml8511.h>
#include <communication/mqttManager.h>

MqttManager mqttManager;

DHTSensor dhtSensor(mqttManager);
GYML8511Sensor gyml8511Sensor(mqttManager);

void setup() {
  Serial.begin(115200);

  if (log_enabled) {
      Serial.println("-----------------------");
      Serial.println("Starting...");
  }

  // mqtt configuration
  mqttManager.setup();

  // sensors configuration
  dhtSensor.setup(dhtSensorPin, dhtSensorType);
  gyml8511Sensor.setup(gyml8511SensorPin, gyml8511VoltagePin);


  if (log_enabled)
  {
      Serial.println("Started");
      Serial.println("-----------------------");
  }
}

void loop() {

  // mqtt loop
  mqttManager.loop();

  // sensors loop
  dhtSensor.loop();
  gyml8511Sensor.loop();
}

