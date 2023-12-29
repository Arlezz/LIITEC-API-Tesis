const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Metadata info about our API
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LIITEC API',
            version: '1.0.0',
            description: 'Official documentation of the LIITEC API',
            contact: {
                name: 'Antony Rodriguez',
                email: 'antony.rodriguez@userena.cl',
                url: 'https://github.com/Arlezz'
            }
        },
        components: {
            securitySchemes: {
                ApiKeyAuth: {  
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer token for authorization'
                }
            }
        },
        security: [
            {
                ApiKeyAuth: []  
            }
        ],
        servers: [
            {
                url: 'http://localhost:8081/api/v1',
                description: 'Local server'
            },
            {
                url: 'http://18.228.38.251:8081/api/v1',
                description: 'Live server'
            }
        ],
        
    },
    apis: ['./v1/routes/*.routes.js', './models/*.model.js']
};

//Docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

//Function to setup our docs

const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`📚  Docs available at http://localhost:${port}/api/v1/docs`);
}

module.exports = { swaggerDocs };