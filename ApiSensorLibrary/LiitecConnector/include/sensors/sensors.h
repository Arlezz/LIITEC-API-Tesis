#ifndef SENSOR_H
#define SENSOR_H

#include <Arduino.h>
#include <device.h>
#include <map>


class Sensor : public Device
{
    private:
        int pin;
        std::map<String, float> values;
        int sensorType = 0;

    public:
        void setValue(String type, float value)
        {
            values[type] = value;
        }

        float getValue(String type)
        {
            if (values.count(type) > 0)
            {
                float value = values[type];
                return isnan(value) ? NAN : value;
            }
            else
            {
                return 0.0;
            }
        }

        int getPin()
        {
            return this->pin;
        }

        void setPin(int pin)
        {
            this->pin = pin;
            setValidPins(pin > -1);
            if (pin > -1) {
                enable();
            }
        }

        void setSensorType(int type)
        {
            this->sensorType = type;
        }

        int getSensorType()
        {
            return this->sensorType;
        }

        virtual void readSensorValue() = 0;
        //virtual void calibrateSensor() = 0; //TODO: implement calibration
        virtual void publish() = 0;
};

#endif // SENSOR_H