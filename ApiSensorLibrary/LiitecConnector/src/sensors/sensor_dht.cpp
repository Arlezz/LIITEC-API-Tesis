#include <sensors/sensor_dht.h>


DHTSensor::DHTSensor(MqttManager &manager) : mqttManager(manager), Sensor()
{
}

DHTSensor::~DHTSensor()
{
    delete dht;
}

void DHTSensor::setup(int pin, int sensorType, const char* topic, String name)
{

    String topicString = String(topic);
    int index = topicString.indexOf("/", 1);
    String deviceName = topicString.substring(index + 1);

    setPin("out",pin);
    setSensorType(sensorType);
    setDeviceName(deviceName);
    setTopic(topic);

    if (!isValidPins() || !isEnabled())
    {
        if (isEnabled() && log_enabled)
        {
            Serial.println("Invalid pins");
            this->setStatus(SensorStatus::InvalidPins);
        }
        return;
    }

    dht = new DHT(this->getPin("out"), this->getSensorType());
    dht->begin();
    this->setStatus(SensorStatus::OkSetup);


    if(mqttManager.isEnabledSensor(deviceName.c_str())){
        Serial.println("DHT enabled");
        enable();
    } else{
        Serial.println("DHT disabled");
        disable();
        this->setStatus(SensorStatus::FailSetup);
    }
}

void DHTSensor::loop(unsigned int timeout)
{

    

    if (millis() - timepoint > timeout)
    {
        if (!isValidPins() || !isEnabled())
        {
            if (isEnabled() && log_enabled)
            {
                Serial.println("Invalid pins");
                this->setStatus(SensorStatus::InvalidPins);
            }
            return;
        }

        readSensorValue();
        publish();
        this->setStatus(SensorStatus::OkLoop);
        timepoint = millis();
    }
}

void DHTSensor::publish()
{
    if (!isValidPins() || !isEnabled())
    {
        if (isEnabled() && log_enabled)
        {
            Serial.println("Invalid pins");
            this->setStatus(SensorStatus::InvalidPins);
        }
        return;
    }

    float humidity = getValue("humidity");
    float temperature = getValue("temperature");
    int timestamp = getTimestamp();

    StaticJsonDocument<200> doc;
    JsonArray obj = doc.createNestedArray("data");

    JsonObject tempObject = obj.createNestedObject();
    tempObject["measurement"] = "temperature";
    tempObject["value"] = temperature;
    tempObject["timestamp"] = timestamp;

    JsonObject humObject = obj.createNestedObject();
    humObject["measurement"] = "humidity";
    humObject["value"] = humidity;
    humObject["timestamp"] = timestamp;

    mqttManager.publish(getTopic(), doc);
}

void DHTSensor::readSensorValue()
{
    if (!isValidPins() || !isEnabled())
    {
        if (isEnabled() && log_enabled)
        {
            Serial.println("Invalid pins");
            this->setStatus(SensorStatus::InvalidPins);
        }
        return;
    }

    float humidity = dht->readHumidity();
    float temperature = dht->readTemperature();    
    unsigned long timestamp = getTime();

    if (isnan(humidity) || isnan(temperature))
    {
        if (log_enabled)
            Serial.println("Failed to read from DHT sensor!");
        setValue("humidity", NAN);
        setValue("temperature", NAN);
        setTimestamp(0);
        this->setStatus(SensorStatus::FailedRead);
        return;
    }

    if (log_enabled)
    {

        Serial.println("-----------------------");
        Serial.print("Device: ");
        Serial.println(getDeviceName());

        Serial.print("Model: DHT");
        Serial.println(getSensorType());

        Serial.print("Humidity = ");
        Serial.print(humidity);
        Serial.println(" %");
        Serial.print("Temperature = ");
        Serial.print(temperature);
        Serial.println(" °C");
        Serial.print("Timestamp = ");
        Serial.println(timestamp);

        Serial.println("-----------------------");
    }

    setValue("humidity", humidity);
    setValue("temperature", temperature);
    setTimestamp(timestamp);
    this->setStatus(SensorStatus::OkRead);
}

void DHTSensor::update(StaticJsonDocument<200> value)
{
    if (!value.containsKey("command"))
    {
        if (log_enabled)
            Serial.println("No command in message");
        return;
    }

    const char *command = value["command"];

    if (strcmp(command, "enable") == 0)
    {
        this->enable();
    }
    else if (strcmp(command, "disable") == 0)
    {
        this->disable();
    }
    else if (log_enabled)
    {
        Serial.println("Invalid command " + String(command));
    }

    /*
    else if (strcmp(command, "set_pin") == 0)
    {
        int pin = value["pin"];
        this->setPin("out",pin);
        // TODO: check if pin wont be used by other sensor

        if (!isValidPins())
        {
            if (log_enabled)
                Serial.println("Invalid pins");
            this->setStatus(SensorStatus::InvalidPins);
            return;
        }

        if (dht != nullptr)
            delete dht;

        dht = new DHT(this->getPin("out"), this->getSensorType());
        dht->begin();
    }
    else if (strcmp(command, "get_status") == 0)
    {
        StaticJsonDocument<200> doc;
        JsonObject obj = doc.createNestedObject("sensor");
        obj["name"] = this->getDeviceName();
        obj["dht_humidity"] = getValue("humidity");
        obj["dht_temperature"] = getValue("temperature");
        obj["status"] = this->getStatus();
        obj["pin"] = this->getPin("out");
        obj["type"] = this->getSensorType();
        obj["enabled"] = this->isEnabled();

        mqttManager.publish(mqtt_topic_dht, doc);
    }
    */
    // TODO: add other commands
}
