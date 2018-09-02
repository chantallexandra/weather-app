const axios = require('axios');
const request = require('request');

const mapquestKey = process.env.MAPQUEST;
const darkskyKey = process.env.DARKSKY;

getWeather = (location, lat, long) => {

	return new Promise((resolve, reject) => {
		axios.get(`https://api.darksky.net/forecast/${darkskyKey}/${lat},${long}`)
		.then((response) => {
			var data = response.data.currently;

			var temperatureData = {
				ok: true,
				location,
				temperature: data.temperature,
				summary: data.summary,
				feelslike: data.apparentTemperature,
				precipitation: data.precipType,
				precipProb: data.precipProbability,
				icon: data.icon,
				humidity: data.humidity,
				wind: data.windSpeed,
				cloud: data.cloudCover
			};
			resolve(temperatureData);
		}).catch((err)=>{
			reject('Cannot GET weather');
		})
		
	});
}

//Formats location from Mapquest results
formatGeocode = (results) => {
	if(results.data.info.statuscode !== 0){
		throw new Error('Unable to find address.');
	}

	var locationData = results.data.results[0].locations[0];

	var fulllocation;

	if(locationData.street){
		//street and city
		fulllocation = `${locationData.street}, ${locationData.adminArea5}`;
	//if neighborhood
	}else if(locationData.adminArea6){
		//neighborhood and city
		fulllocation = `${locationData.adminArea6}, ${locationData.adminArea5}`;
	//if city
	}else if(locationData.adminArea5){
		//city and county or state
		fulllocation = locationData.adminArea4 ? `${locationData.adminArea5}, ${locationData.adminArea4}` : `${locationData.adminArea5}, ${locationData.adminArea3}`;
	//if county
	}else if(locationData.adminArea4){
		//county and state or country
		fulllocation = locationData.adminArea3 ? `${locationData.adminArea4}, ${locationData.adminArea3}` : `${locationData.adminArea4}, ${locationData.adminArea1}`;
	//if state
	}else if(locationData.adminArea3){
		//state and country
		fulllocation = `${locationData.adminArea3}, ${locationData.adminArea1}`;
	}else{
		//country
		fulllocation = locationData.adminArea1;
	}

	return fulllocation;
}

exports.weather_get_latlong = (req, res) => {
	var lat = req.query.lat;
	var long = req.query.long;

	axios.get("http://www.mapquestapi.com/geocoding/v1/reverse",{
		params: {
			key: mapquestKey,
			location: `${lat},${long}`,
			responseType: "json"
		}
	}).then((response)=>{
		var fulllocation = formatGeocode(response);
		return getWeather(fulllocation, lat, long);
	}).then((response)=>{
		res.json(response);

	}).catch((err) => {
		res.json({ok: false});

	});
}

exports.weather_get_location = (req,res) => {

	var location = req.params.location

	axios.get("http://www.mapquestapi.com/geocoding/v1/address",{
		params: {
			key: mapquestKey,
			location: location,
			responseType: "json"
		}
	}).then((response)=>{

		var latLng = response.data.results[0].locations[0].latLng;
		var lat = latLng.lat;
		var long = latLng.lng;

		var fulllocation = formatGeocode(response);
			
		return getWeather(fulllocation, lat, long);

	}).then((response)=>{

		res.json(response);

	}).catch((err) => {
		res.json({ok: false});

	});
};



