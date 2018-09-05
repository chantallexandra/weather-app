const axios = require('axios');
const request = require('request');

const mapquestKey = process.env.MAPQUEST;

exports.get_locations = (req,res) => {

	var location = req.params.location

	axios.get("http://www.mapquestapi.com/geocoding/v1/address",{
		params: {
			key: mapquestKey,
			location: location,
			responseType: "json"
		}
	}).then((response)=>{
		//return top 10 mapquest results
		var locations = response.data.results[0].locations.slice(0,10);

		res.json(locations);

	}).catch((err) => {
		res.json({ok: false});

	});
};