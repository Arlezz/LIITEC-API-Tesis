#include <sensors/sensor_dht.h>


DHTSensor::DHTSensor(MqttManager &manager) : mqttManager(manager), Sensor()
{
}

DHTSensor::~DHTSensor()
{
    delete dht;
}

void DHTSensor::setup(int pin, int sensorType, String name)
{
    setPin("out",pin);
    setSensorType(sensorType);
    setDeviceName(name);
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

    mqttManager.publish(mqtt_topic_dht, doc);
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
        Serial.print("Humidity = ");
        Serial.print(humidity);
        Serial.println(" %");
        Serial.print("Temperature = ");
        Serial.print(temperature);
        Serial.println(" °C");
        Serial.print("Timestamp = ");
        Serial.println(timestamp);
    }

    setValue("humidity", humidity);
    setValue("temperature", temperature);
    setTimestamp(timestamp);
    this->setStatus(SensorStatus::OkRead);
}
