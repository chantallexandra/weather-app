var createError = require('http-errors')
var express = require('express');
var app = express();
const path = require('path');

require('dotenv').config();

var locationRouter = require('./routes/location');

var port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'build')));

app.use('/weather', locationRouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

module.exports = app;