#include <communication/mqttManager.h>
#include <sensors/sensor_dht.h>
#include <sensors/sensor_mq.h>
#include <sensors/sensor_gyml8511.h>
#include <HTTPClient.h>

MqttManager::MqttManager() : client(wifiClient) {
    espId = getEspId();
}

void MqttManager::setup()
{
    connectWiFi();
    connectMQTT();
    connectNTP(ntp_server);
    connectServer();
    //getUserChannels();
}

void MqttManager::loop()
{
    if (!isValidMqtt())
    {
        return;
    }

    if (!client.connected())
    {
        reconnect();
    }
    client.loop();
}

void MqttManager::publish(const char *topic, StaticJsonDocument<200> &doc)
{
    if (!isValidMqtt())
    {
        return;
    }

    char buffer[200];
    serializeJson(doc, buffer);
    client.publish(topic, buffer);
}

void MqttManager::report(const char *topic, StaticJsonDocument<200> &doc)
{
    if (!isValidMqtt())
    {
        return;
    }

    char buffer[200];
    serializeJson(doc, buffer);
    client.publish(topic, buffer);
}

bool MqttManager::isValidWifi() {
    return wifi_enabled && wifi_ssid && wifi_password;
}

bool MqttManager::isValidMqtt() {
    return isValidWifi() && mqtt_enabled && mqtt_server && mqtt_port;
}

bool MqttManager::isValidNtp() {
    return isValidWifi() && (ntp_server != "" || ntp_server != NULL) && (ntp_server[0] != '\0');
}

bool MqttManager::isEnabledSensor(const char* sensorName){

    if (log_enabled){
        Serial.println();
        Serial.println("Sensor: " + String(sensorName));
    }

    HTTPClient http;

    String key = getUser()["apiKey"]["key"];

    String url = "http://"+ String(mqtt_server) +":8081/api/v1/channels/"+String(channel_asigned) +"/devices/"+ sensorName;

    http.begin(url);
    http.addHeader("Authorization", key);

    int httpCode = http.GET();
    if (httpCode == HTTP_CODE_OK) {

        String payload = http.getString();

        StaticJsonDocument<1024> jsonDocument;
        DeserializationError jsonError = deserializeJson(jsonDocument, payload);

        if (jsonError) {

            if (log_enabled)
            {
                Serial.print("Error al deserializar JSON: ");
                Serial.println(jsonError.c_str());
            }

        } else {

            bool enabled = jsonDocument["isActive"]; 

            return enabled;
        }

        
    } else {

        if (log_enabled)
        {
            Serial.println("Error en la solicitud HTTP");
        }

        return false;
    }

    http.end();

    return false;
}




void MqttManager::connectWiFi() {
    if (!isValidWifi() || WiFi.status() == WL_CONNECTED)
    {
        return;
    }

    if (log_enabled)
    {
        Serial.println("Connecting to WiFi network: " + String(wifi_ssid) + " ...");
    }

    WiFi.begin(wifi_ssid, wifi_password);
    WiFi.mode(WIFI_STA);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(100);
    }

    if (log_enabled)
    {
        Serial.println("WiFi connected");
    }
}

void MqttManager::connectNTP(const char *ntpServer) {

    if (!isValidNtp())
    {
        ntpServer = "pool.ntp.org";
    }

    if (log_enabled)
    {
        Serial.println("Connecting to NTP server: " + String(ntpServer) + " ...");
    }

    configTime(0, 0, ntpServer);
    while (time(nullptr) <= 100000)
    {
        delay(100);
    }

    if (log_enabled)
    {
        Serial.println("NTP connected");
    }
}

void MqttManager::connectMQTT() {
    if (!isValidMqtt())
    {
        return;
    }

    if (log_enabled)
    {
        Serial.println("Connecting to MQTT broker: " + String(mqtt_server) + " ...");
    }

    client.setServer(mqtt_server, mqtt_port);
    client.setCallback([this](char *topic, byte *payload, unsigned int length)
                        { this->notify(topic, payload, length); });


    while (!client.connected())
    {
        if (mqtt_user  && mqtt_password )
        {
            if (client.connect(espId.c_str(), mqtt_user, mqtt_password))
            {
                break;
            }
        }
        else
        {
            if (client.connect(espId.c_str()))
            {
                break;
            }
        }

        if (log_enabled)
        {
            Serial.println("Failed to connect to MQTT broker. Retrying in 1 second...");
        }
        delay(1000);
    }

    if (client.connected())
    {
        String message = "device connected: " + espId;
        
        client.subscribe("/device/control/#");


        if (log_enabled)
        {
            Serial.println(message);
            Serial.println("MQTT connected");
        }
    }
}

void MqttManager::connectServer() {
    
    HTTPClient http;

    StaticJsonDocument<256> jsonDocument;
    jsonDocument["credential"] = mqtt_user;
    jsonDocument["password"] = mqtt_password;

    String jsonBody;
    serializeJson(jsonDocument, jsonBody);

    String url = "http://"+ String(mqtt_server) +":8081/api/v1/login";

    http.begin(url);

    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST(jsonBody);

    if (httpCode == HTTP_CODE_OK) {

        String payload = http.getString();

        StaticJsonDocument<1024> jsonDocumentResponse;
        DeserializationError jsonError = deserializeJson(jsonDocumentResponse, payload);

        if (jsonError) {
            if (log_enabled)
            {
                Serial.print("Error al deserializar JSON: ");
                Serial.println(jsonError.c_str());
            }
        } else {
            // Extraer el valor de "_id" del JSON de respuesta
            const char* idValue = jsonDocumentResponse["_id"];

            // Convertir el valor de "_id" a una cadena String
            String idString = String(idValue);

            if (log_enabled)
            {
                // Imprimir la cadena String
                Serial.print("User logged in: ");
                Serial.println(idString);
            }

            // Ahora puedes utilizar 'idString' según tus necesidades
            setUser(jsonDocumentResponse); // Ejemplo de cómo podrías utilizarlo en tu función setUser
        }

        http.end();

    } else {

        if (log_enabled)
        {
            Serial.println("Error en la solicitud HTTP");
        }
        http.end();
        
        return;
    }
}



void MqttManager::notify(char *topic, byte *payload, unsigned int length) {
    
    
    if (!isValidMqtt())
    {
        return;
    }

    char message[length + 1];
    for (unsigned int i = 0; i < length; i++)
    {
        message[i] = (char)payload[i];
    }
    message[length] = '\0';




    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, message);
    if (error)
    {
        return;
    }

    if (log_enabled)
    {
        Serial.print("Message arrived in topic: ");
        Serial.println(topic);

        Serial.print("Message:");
        Serial.println(doc.as<String>());

        Serial.println("-----------------------");
    }

    String topicString = String(topic);
    int index = topicString.lastIndexOf("/");
    String deviceName = topicString.substring(index + 1);

    Device *device = getDevice(deviceName);

    if (device == nullptr)
    {
        if (log_enabled)
        {
            Serial.println("Device not found: " + deviceName);
        }
        return;
    }

    device->update(doc);

}

void MqttManager::reconnect() {
    if (!isValidMqtt())
    {
        return;
    }

    if (log_enabled)
    {
        Serial.println("Reconnecting to MQTT broker: " + String(mqtt_server) + " ...");
    }

    connectWiFi();

    while (!client.connected())
    {
        if (mqtt_user && mqtt_password)
        {
            if (client.connect(espId.c_str(), mqtt_user, mqtt_password))
            {
                break;
            }
        }
        else
        {
            if (client.connect(espId.c_str()))
            {
                break;
            }
        }

        if (log_enabled)
        {
            Serial.println("Failed to reconnect to MQTT broker. Retrying in 1 second...");
        }
        delay(1000);
    }

    if (client.connected())
    {
        String message = "device connected: " + espId;
        client.subscribe("/device/control/#");

        if (log_enabled)
        {
            Serial.println(message);
            Serial.println("MQTT connected");
        }
    }
}

const char *MqttManager::getEspId() {
    static char id[70];
    if (!String(mqtt_user).isEmpty())
    {
        snprintf(id, sizeof(id), "%s_%012X", mqtt_user, ESP.getEfuseMac());
    }
    else
    {
        snprintf(id, sizeof(id), "esp_%012X", ESP.getEfuseMac());
    }
    return id;
}

void MqttManager::attach(Device *observer)
{
    observers.push_back(observer);
}

void MqttManager::detach(Device *observer)
{
    auto it = std::find(observers.begin(), observers.end(), observer);
    if (it != observers.end())
    {
        observers.erase(it);
    }
}

Device* MqttManager::getDevice(const String &deviceName)
{
    for (Device *observer : observers)
    {
        if (observer->getDeviceName() == deviceName)
        {
            if (DHTSensor *sensor = (DHTSensor *)(observer))
            {
                return sensor;
            }
            else if (MQSensor *sensor = (MQSensor *)(observer))
            {
                return sensor;
            }
            else if (GYML8511Sensor *sensor = (GYML8511Sensor *)(observer))
            {
                return sensor;
            }
        }
    }

    return nullptr;
}