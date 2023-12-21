/**************************************************************
CONFIGURACIÓN DE LOS SENSORES
    Descripción:
        - Este bloque de código permite configurar los sensores utilizados en el sistema.
        - Los sensores pueden ser activados o desactivados mediante la asignación de
        un valor al pin correspondiente.
    Instrucciones:
        - Para desactivar un sensor, establece el valor -1 en el pin del sensor.
        - Para activar un sensor, establece un valor mayor a 0 en el pin del sensor,
        donde el valor representa el número de pin utilizado por el sensor.
**************************************************************/
//#define waterLevelSensorPin 1   // Pin utilizado para el sensor de nivel de agua
//#define turbiditySensorPin 2    // Pin utilizado para el sensor de turbidez
//#define tdsSensorPin 3          // Pin utilizado para el sensor de TDS (Total Dissolved Solids)
//#define temperatureSensorPin 4  // Pin utilizado para el sensor de temperatura
//#define phSensorPin 5           // Pin utilizado para el sensor de pH

#define dhtSensorPin 22         // Pin utilizado para el sensor de humedad y temperatura DHT
#define dhtSensorType DHT22     // Tipo de sensor DHT (DHT11 o DHT22)

/**
OPCIONAL
    - Agrega en este espacio pines adicionales en caso de que los necesites.
    - Puedes agregar tantos pines como necesites (o tenga tu placa).
**/



/**************************************************************
CONFIGURACIÓN DEL WIFI
    Aviso:
        Si se desactiva la conexión WiFi, se desactiva la conexión con el broker MQTT.
    Descripción:
        Este bloque de código permite configurar los parámetros de conexión WiFi.
    Instrucciones:
        Completa los campos con los datos correspondientes a tu red WiFi.
**************************************************************/
#define wifi_enabled true                   // Activa o desactiva la conexión WiFi (true o false)
#define wifi_ssid "Antony"          // SSID (nombre) de tu red WiFi
#define wifi_password "antony12345"  // Contraseña de tu red WiFi

/**************************************************************
CONFIGURACIÓN DEL BROKER MQTT
    Aviso:
        Si se desactiva la conexión con el broker MQTT, se desactiva la conexión WiFi.
    Descripción:
        Este bloque de código permite configurar la conexión con el broker MQTT.
    Instrucciones:
        Completa los campos con los datos de tu broker MQTT.
**************************************************************/
#define mqtt_enabled true                   // Activa o desactiva la conexión con el broker MQTT (true o false)
#define mqtt_server "172.20.10.14"   // Dirección IP o nombre de dominio del broker MQTT
#define mqtt_port 1883                      // Puerto del broker MQTT
#define mqtt_user "arodrig"          // Nombre de usuario para la autenticación en el broker MQTT
#define mqtt_password "LiitecLab2024!"  // Contraseña para la autenticación en el broker MQTT

/**************************************************************
CONFIGURACIÓN DE LOS TOPICS MQTT
    Aviso:
        Solo funcionara si se ha configurado la conexión con el broker MQTT.
    Descripción:
        Este bloque de código permite configurar los topics MQTT utilizados en el sistema.
    Instrucciones:
        Completa los campos con los datos correspondientes a tu broker MQTT.
**************************************************************/

// los topicos de sensores deben comensar con "devices/", los de actuadores con "actuators/" y los de logs con "logs/"
//#define mqtt_topic_water_level "sensor/water_level"                                      // Topic MQTT para el sensor de nivel de agua
//#define mqtt_topic_turbidity "sensor/turbidity"                                          // Topic MQTT para el sensor de turbidez
//#define mqtt_topic_water_temperature "sensor/water_temperature"                          // Topic MQTT para el sensor de temperatura del agua
//#define mqtt_topic_tds "sensor/tds"                                                      // Topic MQTT para el sensor de TDS (Total Dissolved Solids)
#define mqtt_topic_dht "/devices/dv-089f98d5-25f4-4150-ab4e-18be2f098da2"                // Topic MQTT para el sensor de DHT (temperatura ambiente)

/**************************************************************
CONFIGURACIÓN DEL SERVER NTP

    Descripción:
        Este bloque de código permite configurar el servidor NTP para obtener
        la fecha exacta en que los sensores capturaron el dato.
    Instrucciones:
        - Completa el campo con la url del servidor NTP.
        - Si deseas utilizar el servidor NTP por defecto ("pool.ntp.org"), dejar vacío el campo.
**************************************************************/
#define ntp_server "2.cl.pool.ntp.org"                   // URL del servidor NTP

/**************************************************************
CONFIGURACIÓN DEL REGISTRO (LOGS)
    Descripción:
        Este bloque de código permite configurar el registro de datos.
    Instrucciones:
        Completa los campos con los siguientes datos.
**************************************************************/
#define log_enabled true            // Activa o desactiva el registro de datos (true o false)

/*************************************************************/