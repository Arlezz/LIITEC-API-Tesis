#ifndef SENSOR_H
#define SENSOR_H

#include <Arduino.h>
#include <device.h>
#include <map>
#include <status.h>
#include <time.h>

class Sensor : public Device
{
    private:
        int pin;
        std::map<String, float> values;
        unsigned long timestamp;
        SensorStatus status = SensorStatus::InProgress;
        int sensorType = 0;


    public:

        void setTimestamp(unsigned long timestamp)
        {
            this->timestamp = timestamp;
        }

        unsigned long getTimestamp()
        {
            return this->timestamp;
        }  

        unsigned long getTime(){
            time_t now;
            struct tm timeinfo;
            if (!getLocalTime(&timeinfo)) {
                return 0;
            }
            time(&now);
            return now;
        }  

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

        void setStatus(SensorStatus status)
        {
            this->status = status;
        }

        String getStatus()
        {
            return sensorStatusMap[this->status];
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
        virtual void publish() = 0;
        

};

#endif // SENSOR_H