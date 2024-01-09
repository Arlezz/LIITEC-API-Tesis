#include <sensors/sensor_gyml8511.h>

GYML8511Sensor::GYML8511Sensor(MqttManager &manager) : mqttManager(manager), Sensor()
{

}

GYML8511Sensor::~GYML8511Sensor()
{

}

void GYML8511Sensor::setup(int pin, int reference, const char* topic, String name)
{
    String topicString = String(topic);
    int index = topicString.indexOf("/", 1);
    String deviceName = topicString.substring(index + 1);

    setPin("out",pin);
    setPin("ref",reference);
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

    pinMode(this->getPin("out"), INPUT);
    pinMode(this->getPin("ref"), INPUT);

    this->setStatus(SensorStatus::OkSetup);

    if(mqttManager.isEnabledSensor(deviceName.c_str())){
        Serial.println("GYML enabled");
        enable();
    } else{
        Serial.println("GYML disabled");
        disable();
        this->setStatus(SensorStatus::FailSetup);
    }
}

void GYML8511Sensor::loop(unsigned int timeout)
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

void GYML8511Sensor::publish()
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

    float uv = getValue("uv");
    int timestamp = getTimestamp();

    StaticJsonDocument<200> doc;
    JsonArray obj = doc.createNestedArray("data");
   
    JsonObject uvObject = obj.createNestedObject();
    uvObject["measurement"] = "uv";
    uvObject["value"] = uv;
    uvObject["timestamp"] = timestamp;

    mqttManager.publish(getTopic(), doc);
}

void GYML8511Sensor::readSensorValue()
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


    int uvLevel = averageAnalogRead(this->getPin("out"));
    int refLevel = averageAnalogRead(this->getPin("ref"));

    float outputVoltage = (3.3 / refLevel * uvLevel);

    float uvIntensity = mapFloat(outputVoltage, 0.99, 2.8, 0.0, 15.0);

    unsigned long timestamp = getTime();

    if (isnan(uvIntensity))
    {
        if (log_enabled)
            Serial.println("Failed to read from GYML sensor!");
        setValue("uv", NAN);
        setTimestamp(0);
        this->setStatus(SensorStatus::FailedRead);
        return;
    }

    if (log_enabled)
    {
        /*Serial.print("Output Voltage: ");
        Serial.print(outputVoltage);
        Serial.println(" V");

        Serial.print("UV Level: ");
        Serial.print(uvLevel);
        Serial.println(" mV");

        Serial.print("Ref Level: ");
        Serial.print(refLevel);
        Serial.println(" mV");*/

        Serial.println("-----------------------");
        Serial.print("Device: ");
        Serial.println(getDeviceName());

        Serial.println("Model: GYML8511");

        Serial.print("UV Intensity: ");
        Serial.print(uvIntensity);
        Serial.println(" mW/cm^2");

        Serial.print("Timestamp: ");
        Serial.println(timestamp);

        Serial.println("-----------------------");

    }

    setValue("uv", uvIntensity);
    setTimestamp(timestamp);
    this->setStatus(SensorStatus::OkRead);
}

int GYML8511Sensor::averageAnalogRead(int pinToRead)
{
    byte numberOfReadings = 8;
    unsigned int runningValue = 0;

    for (int x = 0 ; x < numberOfReadings ; x++)
        runningValue += analogRead(pinToRead);
    runningValue /= numberOfReadings;

    return runningValue;
}

float GYML8511Sensor::mapFloat(float x, float in_min, float in_max, float out_min, float out_max)
{
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void GYML8511Sensor::update(StaticJsonDocument<200> value)
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

    /*else if (strcmp(command, "set_pin") == 0)
    {
        int pin = value["pin"];
        this->setPin(pin);
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

        dht = new DHT(this->getPin(), this->getSensorType());
        dht->begin();
    }*/

    /*
    else if (strcmp(command, "get_status") == 0)
    {
        StaticJsonDocument<200> doc;*/
        /*JsonObject obj = doc.createNestedObject("sensor");
        obj["name"] = this->getDeviceName();
        obj["dht_humidity"] = getValue("humidity");
        obj["dht_temperature"] = getValue("temperature");
        obj["status"] = this->getStatus();
        obj["pin"] = this->getPin();
        obj["type"] = this->getSensorType();
        obj["enabled"] = this->isEnabled();*/

    /*    mqttManager.publish(mqtt_topic_gyml8511, doc);
    }
    */
    // TODO: add other commands
}