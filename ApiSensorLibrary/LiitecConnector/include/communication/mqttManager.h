#ifndef MQTTMANAGER_H
#define MQTTMANAGER_H

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <settings.h>
#include <device.h>
#include <observer/subject.h>

class MqttManager : public Subject { 
    private: 
        WiFiClient wifiClient;
        PubSubClient client;
        String espId;
        std::vector<Device *> observers;


    public:
        MqttManager();

        void setup();
        void loop();
        void publish(const char *topic, StaticJsonDocument<200> &message);
        void report(const char *topic, StaticJsonDocument<200> &message);
        void attach(Device *device) override;
        void detach(Device *device) override;
        void notify(char *topic, byte *payload, unsigned int length) override;

    private: 
        static bool isValidWifi();
        static bool isValidMqtt();
        static bool isValidNtp();
        const char *getEspId();
        void connectWiFi();
        void connectMQTT();
        void connectNTP(const char* ntpServer);
        void reconnect();
        Device *getDevice(const String &deviceName);
};

#endif