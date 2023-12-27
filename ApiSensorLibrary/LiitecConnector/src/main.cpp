#include <Arduino.h>
#include <settings.h>

#include <sensors/sensor_dht.h>
#include <sensors/sensor_gyml8511.h>
#include <communication/mqttManager.h>
#include <sensors/sensor_mq.h>

MqttManager mqttManager;

DHTSensor dhtSensor(mqttManager);
GYML8511Sensor gyml8511Sensor(mqttManager);
MQSensor mqSensor(mqttManager);


void setup() {
  Serial.begin(115200);

  if (log_enabled) {
      Serial.println("-----------------------");
      Serial.println("Starting...");
  }

  // mqtt configuration
  mqttManager.setup();

  // sensors configuration
  dhtSensor.setup(dhtSensorPin, dhtSensorType, mqtt_topic_dht);
  gyml8511Sensor.setup(gyml8511SensorPin, gyml8511VoltagePin, mqtt_topic_gyml8511);
  mqSensor.setup(mqSensorPin, mqSensorType, mqtt_topic_mq135);
  


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
  dhtSensor.loop(5000U);
  gyml8511Sensor.loop(5000U);
  mqSensor.loop(5000U);
}

