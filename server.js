var createError = require('http-errors')
var express = require('express');
var app = express();
const path = require('path');

require('dotenv').config();

var weatherRouter = require('./routes/weather');
var locationController = require('./controllers/locationController');

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.use('/location/:location', locationController.get_locations);

app.use('/weather', weatherRouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

module.exports = app;