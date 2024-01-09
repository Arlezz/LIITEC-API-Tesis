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
        StaticJsonDocument<1024> user;
        StaticJsonDocument<1024> channels;//CAMBIAR TAMAÑO
        

    public:
        MqttManager();

        void setup();
        void loop();
        void publish(const char *topic, StaticJsonDocument<200> &message);
        void report(const char *topic, StaticJsonDocument<200> &message);
        void attach(Device *device) override;
        void detach(Device *device) override;
        void notify(char *topic, byte *payload, unsigned int length) override;
        bool isEnabledSensor(const char* name);


    private: 
        static bool isValidWifi();
        static bool isValidMqtt();
        static bool isValidNtp();
        const char *getEspId();
        void connectWiFi();
        void connectMQTT();
        void connectNTP(const char* ntpServer);
        void connectServer();
        void getUserChannels();
        void reconnect();

        Device *getDevice(const String &deviceName);

        void setChannels(StaticJsonDocument<2048> channels){
            this->channels = channels;
        }

        StaticJsonDocument<2048> getChannels(){
            return this->channels;
        }

        void setUser(StaticJsonDocument<1024> user){
            this->user = user;
        }

        StaticJsonDocument<1024> getUser(){
            return this->user;
        }
};

#endif