const express = require('express');
const app = express(); // standard express setup
const helmet = require('helmet');
const morgan = require('morgan');
// const config = require('config'); // config file
const debug = require('debug')('app:development');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const mongoose = require('mongoose');

// connecting to database
mongoose
  .connect('mongodb://localhost/playground')
  .then(() => {
    debug('Connected to MongoDB!');
  })
  .catch(err => {
    debug('Not connected to MongoDB :(, Error:', err);
  });

app.use(express.json()); // adding middleware to parse JSON
app.use(logger);
app.set('view engine', 'pug');
app.use('/api/courses', courses); // delegate routes to a router
app.use('/', home);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan is enabled');
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
