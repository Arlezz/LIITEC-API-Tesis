const express = require('express');
const app = express();
const morgan = require('morgan');
const channelRoutes = require('./routes/channels.routes');
const userRoutes = require('./routes/user.routes');
const brokerRoutes = require('./routes/brokerMQTT');
const authRoutes = require('./routes/auth.routes');


//settings
app.set('json spaces', 2);

//middleware
//handle json body request
app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api',userRoutes);
app.use('/api',channelRoutes);
app.use('/api',brokerRoutes);
app.use('/api',authRoutes);

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