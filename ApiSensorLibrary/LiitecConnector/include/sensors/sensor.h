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
        //int pin;
        int reference;
        std::map<String, float> values;
        std::map<String, int> pin;
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

        /*int getPin()
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
        }*/

        int getPin(String type)
        {
            if (pin.count(type) > 0)
            {
                return pin[type];
            }
            else
            {
                return -1;
            }
        }

        void setPin(String type, int pin)
        {
            this->pin[type] = pin;
            setValidPins(type, pin > -1);
            /*if (pin > -1) {
                enable();
            }*/
        }

        int getReference()
        {
            return this->reference;
        }

        void setReference(int reference)
        {
            this->reference = reference;
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