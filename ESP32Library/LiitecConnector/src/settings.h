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
#define dhtSensorPin 22         // Pin utilizado para el sensor de humedad y temperatura DHT
#define dhtSensorType DHT22     // Tipo de sensor DHT (DHT11 o DHT22)
#define gyml8511SensorPin 34    // Pin utilizado para el sensor de radiación UV GYML8511
#define gyml8511VoltagePin 33    // Voltaje de referencia del sensor GYML8511
#define mqSensorPin 32          // Pin utilizado para el sensor de gas MQ135
#define mqSensorType MQ135      // Tipo de sensor MQ (MQ135 o MQ7)

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
#define wifi_ssid "CasaExt"          // SSID (nombre) de tu red WiFi
#define wifi_password "Um7uwD6JA7q"  // Contraseña de tu red WiFi
//#define wifi_ssid "Antony"          // SSID (nombre) de tu red WiFi
//#define wifi_password "antony12345"  // Contraseña de tu red WiFi


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
//#define mqtt_server "172.24.96.1"   // Dirección IP o nombre de dominio del broker MQTT
#define mqtt_server "192.168.1.105"   // Dirección IP o nombre de dominio del broker MQTT
//#define mqtt_server "18.228.38.251"   // Dirección IP o nombre de dominio del broker MQTT
#define mqtt_port 1883                      // Puerto del broker MQTT
#define mqtt_user "avanzado"          // Nombre de usuario para la autenticación en el broker MQTT
#define mqtt_password "IluminadoAmado2024!"  // Contraseña para la autenticación en el broker MQTT


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
#define mqtt_topic_dht "/devices/dv-7a9b4d6c-6755-441f-81aa-ffdcd9147d81"                // Topic MQTT para el sensor de DHT (temperatura ambiente)
#define mqtt_topic_gyml8511 "/devices/dv-f0c54c00-5811-4402-9bee-84576517f571"           // Topic MQTT para el sensor de radiación UV GYML8511
#define mqtt_topic_mq135 "/devices/dv-17938483-b706-47c3-9249-cc9377505acf"                                                             // Topic MQTT para el sensor de gas MQ135




/***************************************************************
CONFIGURACION DEL CANAL ASOCIADO A LOS TOPICS MQTT
    Aviso:
        Esto es esencial para comprobar que los sensores estan habilitados en la plataforma.
    Descripción:
        Este bloque de código permite configurar el canal asociado a de los dispositivos en la plataforma.
    Instrucciones:
        Completa los campos con los datos correspondientes a tu broker MQTT.

****************************************************************/                        
#define channel_asigned "ch-2cf804f3-5290-412f-ace7-8df8bb8e74bb" // Canal asociado al que pertenecen los sensores



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