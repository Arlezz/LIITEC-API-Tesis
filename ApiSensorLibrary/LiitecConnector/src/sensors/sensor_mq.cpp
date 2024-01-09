#include <sensors/sensor_mq.h>


MQSensor::MQSensor(MqttManager &manager) : mqttManager(manager)
{
}

MQSensor::~MQSensor()
{

}

void MQSensor::setup(int pin, int sensorType, const char* topic, String name)
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

    pinMode(this->getPin("out"), INPUT);

    this->setStatus(SensorStatus::OkSetup);

    if(mqttManager.isEnabledSensor(deviceName.c_str())){
        Serial.println("MQ enabled");  
        enable();
    } else{
        Serial.println("MQ disabled");
        disable();
        this->setStatus(SensorStatus::FailSetup);
    }
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

    unsigned long timestamp = getTime();

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
        Serial.println(getDeviceName());

        Serial.print("Model: MQ");
        Serial.println(getSensorType());
        
        Serial.print("Gas intensity: ");
        Serial.print(gasIntensity);
        Serial.println(" ppm");

        Serial.print("Timestamp: ");
        Serial.println(timestamp);

        Serial.println("-----------------------");

    }

    setValue("out", gasIntensity);
    setTimestamp(timestamp);
    this->setStatus(SensorStatus::OkRead);
}


void MQSensor::update(StaticJsonDocument<200> value)
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
        //TODO: check if pin wont be used by other sensor

        if (!isValidPins()){
            if (log_enabled)
                Serial.println("Invalid pins");
            return;
        }

        pinMode(this->getPin(), INPUT);
    }*/
    /*
    else if (strcmp(command, "get_status") == 0)
    {
        StaticJsonDocument<200> doc;
        JsonObject obj = doc.createNestedObject("sensor");

        obj["name"] = this->getDeviceName();
        obj["tds"] = getValue("tds");
        obj["status"] = this->getStatus();
        obj["pin"] = this->getPin();
        obj["type"] = this->getSensorType();
        obj["enabled"] = this->isEnabled();

        mqttManager.publish(getTopic(), doc);
    }*/
    //TODO: add other commands
}