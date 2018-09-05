var express = require('express');
var router = express.Router();

var weather_controller = require('../controllers/weatherController');

router.get('/coords', weather_controller.weather_get_latlong);
router.get('/:location', weather_controller.weather_get_location);

module.exports = router;