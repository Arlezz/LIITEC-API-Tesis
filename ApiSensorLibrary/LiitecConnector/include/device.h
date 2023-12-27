#ifndef DEVICE_H
#define DEVICE_H

#include <Arduino.h>
#include <map>

class Device
{
    private:
        bool enabled = false;
        std::map<String, bool> validPins;
        String deviceName = "";

    public:
        void setValidPins(String type, bool validPins)
        {
            this->validPins[type] = validPins;
        }

        bool isValidPins()
        {
            bool valid = true;
            for (auto const& x : this->validPins)
            {
                valid = valid && x.second;
            }
            
            if (valid)
                this->enable();

            return valid;
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