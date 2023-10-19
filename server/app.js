const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('json spaces', 2);

//handle json body request
app.use(express.json());

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/',require('./routes/index'));
app.use('/api/user',require('./routes/user'));
app.use('/api/channels',require('./routes/channels'));
app.use('/api/broker',require('./routes/brokerMQTT'));
app.use('/api/auth',require('./routes/auth'));

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