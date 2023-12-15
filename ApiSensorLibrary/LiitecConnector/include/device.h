#ifndef DEVICE_H
#define DEVICE_H

#include <Arduino.h>

class Device
{
    private:
        bool enabled = false;
        bool validPins = true;
        String deviceName = "";

    public:
        void setValidPins(bool validPins)
        {
            this->validPins = validPins;
        }

        bool isValidPins()
        {
            return this->validPins;
        }

        void enable()
        {
            this->enabled = true;
        }

        void disable()
        {
            this->enabled = false;
        }

        void setDeviceName(String deviceName)
        {
            this->deviceName = deviceName;
        }

        bool isEnabled()
        {
            return this->enabled;
        }

        String getDeviceName()
        {
            return this->deviceName;
        }
};

#endif // DEVICE_H