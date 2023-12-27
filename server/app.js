const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const channelRoutes = require('./routes/channels.routes');
const userRoutes = require('./routes/user.routes');
const deviceRoutes = require('./routes/device.routes');
const dataRoutes = require('./routes/data.routes');



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
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to LiitecApi'
  });
});
app.use('/api',userRoutes);
app.use('/api',channelRoutes);
app.use('/api',dataRoutes);
app.use('/api',deviceRoutes);


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