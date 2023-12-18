#include <Arduino.h>
#include <settings.h>

#include <sensors/sensor_dht.h>
#include <communication/mqttManager.h>

MqttManager mqttManager;

DHTSensor dhtSensor(mqttManager);

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
}

