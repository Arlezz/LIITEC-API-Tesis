# Proyecto LIITEC API: Sistema para Recolección y Procesamiento de Datos de Sensores Ambientales 🌱📊

El proyecto es una API desarrollada con Express que maneja datos recopilados por sensores IoT, específicamente enfocados en monitorear variables ambientales. Proporciona una serie de endpoints que permiten gestionar usuarios, dispositivos y canales, además de autenticar a los diferentes tipos de usuarios mediante claves API. Esta API está diseñada para ofrecer un manejo eficiente y seguro de los datos ambientales, facilitando la integración y el control de sensores ambientales en diversas aplicaciones y sistemas.
## Descripción del Proyecto 📝

El proyecto tiene como objetivo principal desarrollar un sistema integral para la recolección y gestión de datos ambientales. Esto incluye la implementación de una API personalizada, una aplicación web para la visualización de datos y la documentación detallada del sistema.

## Estructura del Repositorio 📂

El repositorio se organiza de la siguiente manera:

- `/server`: Contiene el código fuente de la API desarrollada para la recolección de datos ambientales.
- `/liitec_platform`: Contiene la aplicación web desarrollada para visualizar los datos ambientales recopilados.
- `/ESP32Library`: Librería en c++ para conectar los sensores a la API.

## Tecnologías Utilizadas 💻

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, Next.js
- **Base de Datos**: MongoDB
- **Herramientas**: Postman, Docker


## Instalación y Uso 🚀
Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu entorno. Luego, sigue estos pasos:

* Clona este repositorio:

   ```bash
   git clone https://github.com/Arlezz/LIITEC-API-Tesis.git

### Instalación del Backend (API)

1. Dirígete a la carpeta `server`.
2. Instala las dependencias del proyecto ejecutando el siguiente comando:
    ```
    npm install
    ```
3. Configura el archivo `.env` con las variables de entorno necesarias (como las credenciales de MongoDB y las claves API).
4. Inicia el servidor de desarrollo con el siguiente comando:
    ```
    npm start
    ```

### Instalación del Frontend (Aplicación Web)

1. Dirígete a la carpeta `liitec_platform`.
2. Instala las dependencias del proyecto ejecutando el siguiente comando:
    ```
    npm install
    ```
3. Configura el archivo `.env` con las variables de entorno necesarias (por ejemplo, la URL de la API).
4. Inicia la aplicación en modo de desarrollo con el siguiente comando:
    ```
    npm run dev
    ```
    
### Uso de la Librería C++ (ESP32Library) 

1. Descarga la librería `ESP32Library` desde el repositorio.
2. Importa la librería en tus proyectos de Arduino.
3. Utiliza las funciones proporcionadas por la librería para conectar tus sensores a la API de LIITEC.

## Contacto 📧

Para cualquier duda o sugerencia, puedes contactarme a través de mi correo electrónico: antonyrodriguezc.2001@gmail.com
