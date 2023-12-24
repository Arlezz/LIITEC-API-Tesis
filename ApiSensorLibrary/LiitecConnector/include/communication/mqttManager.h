#ifndef MQTTMANAGER_H
#define MQTTMANAGER_H

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <settings.h>

class MqttManager{
    private: 
        WiFiClient wifiClient;
        PubSubClient client;
        String espId;

    public:
        MqttManager();

        void setup();
        void loop();
        void publish(const char *topic, StaticJsonDocument<200> &message);
        void notify(char *topic, byte *payload, unsigned int length);

    private: 
        static bool isValidWifi();
        static bool isValidMqtt();
        static bool isValidNtp();
        const char *getEspId();
        void connectWiFi();
        void connectMQTT();
        void connectNTP(const char* ntpServer);
        void reconnect();
};

#endif