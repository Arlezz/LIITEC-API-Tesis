#include <sensors/sensor_mq.h>


MQSensor::MQSensor(MqttManager &manager) : mqttManager(manager)
{
}

MQSensor::~MQSensor()
{

}

void MQSensor::setup(int pin, int sensorType, const char* topic, String name)
{
    setPin("out",pin);
    setSensorType(sensorType);
    setDeviceName(name);
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

    this->setStatus(SensorStatus::OkSetup);
}

void MQSensor::loop(unsigned int timeout)
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

void MQSensor::publish()
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

    float gasIntensity = getValue("out");
    int timestamp = getTimestamp();

    StaticJsonDocument<200> doc;
    JsonArray obj = doc.createNestedArray("data");

    JsonObject gasIntensityObject = obj.createNestedObject();
    gasIntensityObject["measurement"] = "gas intensity";
    gasIntensityObject["value"] = gasIntensity;
    gasIntensityObject["timestamp"] = timestamp;



    mqttManager.publish(getTopic(), doc);
}

void MQSensor::readSensorValue()
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

    float gasIntensity = analogRead(this->getPin("out"));

    if (isnan(gasIntensity))
    {
        if (log_enabled){
            Serial.print("Failed to read from MQ");
            Serial.print(getSensorType());
            Serial.println(" sensor!");
        }
        setValue("mq", NAN);
        this->setStatus(SensorStatus::FailedRead);
        return;
    }


    if (log_enabled)
    {

        Serial.println("-----------------------");
        
        Serial.print("Device: ");
        Serial.print("MQ");
        Serial.println(getSensorType());
        
        Serial.print("Gas intensity: ");
        Serial.print(gasIntensity);
        Serial.println(" ppm");

        Serial.println("-----------------------");

    }

    setValue("out", gasIntensity);
    setTimestamp(getTime());
    this->setStatus(SensorStatus::OkRead);
}