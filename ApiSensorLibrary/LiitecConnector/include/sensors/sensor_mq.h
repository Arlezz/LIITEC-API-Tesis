#ifndef sensor_mq_h
#define sensor_mq_h

#include <Arduino.h>
#include <settings.h>
#include <communication/mqttManager.h>
#include <sensors/sensor.h>
#include <mq_types.h>

class MQSensor : public Sensor
{
    private:
        unsigned long timepoint = 0;
        MqttManager &mqttManager;

    public:
        MQSensor(MqttManager &manager);
        ~MQSensor();

        void setup(int pin = -1, int type = MQ135, const char* topic = "/device/mq", String name = "mq");
        void loop(unsigned int timeout = 2000U);
        void update(StaticJsonDocument<200> doc) override;
        void readSensorValue() override;

    private:
        void publish() override;
};

#endif // sensor_mq_h