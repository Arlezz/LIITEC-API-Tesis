const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const channelRoutes = require('./v1/routes/channels.routes');
const dataRoutes = require('./v1/routes/data.routes');  
const deviceRoutes = require('./v1/routes/device.routes');
const userRoutes = require('./v1/routes/user.routes');
const keyRoutes = require('./v1/routes/key.routes');
const { swaggerDocs: V1SwaggerDocs } = require('./v1/swagger');

const app = express();

//settings
app.set('json spaces', 2);

//middleware
//handle json body request
app.use(cors());


app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1',userRoutes);
app.use('/api/v1',keyRoutes);
app.use('/api/v1',channelRoutes);
app.use('/api/v1',dataRoutes);
app.use('/api/v1',deviceRoutes);

// Middleware para Swagger
V1SwaggerDocs(app, 8081);

var createError = require('http-errors');

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message)

  res.status(err.status || 500);
  res.json(`error '${err.status || 500}' `);
});


module.exports = app;