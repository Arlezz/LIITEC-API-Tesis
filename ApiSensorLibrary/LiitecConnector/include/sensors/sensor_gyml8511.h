#ifndef sensor_gyml8511_h
#define sensor_gyml8511_h

#include <Arduino.h>
#include <settings.h>
#include <communication/mqttManager.h>
#include <sensors/sensor.h>

class GYML8511Sensor : public Sensor
{
    private:
        unsigned long timepoint = 0;
        MqttManager &mqttManager;

    public:
        GYML8511Sensor(MqttManager &manager);
        ~GYML8511Sensor();

        void setup(int pin = -1, int reference = -1, const char* topic = "/device/gyml8511", String name = "gyml8511");
        void loop(unsigned int timeout = 2000U);
        void update(StaticJsonDocument<200> doc) override;
        void readSensorValue() override;
        int averageAnalogRead(int pinToRead);
        float mapFloat(float x, float in_min, float in_max, float out_min, float out_max);

    private:
        void publish() override;
};

#endif // sensor_gyml8511_h