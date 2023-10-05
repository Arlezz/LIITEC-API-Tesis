const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 8081;

//const API = require('./auth/apiAuth');

//settings
app.set('json spaces', 2);

//handle json body request
app.use(express.json());

//middleware for logging
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use('/api/channels',require('./routes/channels'));


//starting the server
app.listen(port, function (err) {
  if (err) {
    console.error('Failure to launch server');
    return;
  }
  console.log(`Listening on port ${port}`);
});