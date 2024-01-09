#ifndef observer_h
#define observer_h

#include <Arduino.h>
#include <ArduinoJson.h>

class MqttObserver
{
    public:
        virtual void update(StaticJsonDocument<200> doc) = 0;
};

#endif // observer_h