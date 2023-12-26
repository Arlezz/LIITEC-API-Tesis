#include <sensors/sensor_gyml8511.h>

GYML8511Sensor::GYML8511Sensor(MqttManager &manager) : mqttManager(manager), Sensor()
{

}

GYML8511Sensor::~GYML8511Sensor()
{

}

void GYML8511Sensor::setup(int pin, int reference, String name)
{
    setPin("out",pin);
    setPin("ref",reference);
    setReference(reference);
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

    //pinMode(this->getPin("out"), INPUT);
    //pinMode(this->getPin("ref"), INPUT);

    this->setStatus(SensorStatus::OkSetup);
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
        //publish();
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

    mqttManager.publish(mqtt_topic_gyml8511, doc);
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

    int pin = this->getPin("out");
    int ref = this->getPin("ref");

    Serial.print("pin: ");
    Serial.println(pin);
    Serial.print("ref: ");
    Serial.println(ref);

    int uvLevel = averageAnalogRead(this->getPin("out"));
    int refLevel = averageAnalogRead(this->getPin("ref"));

    float outputVoltage = 3.3 / refLevel * uvLevel;

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
        Serial.print("Output Voltage: ");
        Serial.print(outputVoltage);
        Serial.println(" V");

        Serial.print("UV Level: ");
        Serial.print(uvLevel);
        Serial.println(" mV");

        Serial.print("Ref Level: ");
        Serial.print(refLevel);
        Serial.println(" mV");

        Serial.print("UV Intensity: ");
        Serial.print(uvIntensity);
        Serial.println(" mW/cm^2");
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