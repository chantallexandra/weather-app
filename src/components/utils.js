module.exports = {

	//converts temperature in Fahrenheit to Celcius
	convertFtoC: function(temp){
		return (temp - 32) * 5/9;
	},

	convertCtoF: function(temp){
			return (temp * 9/5) + 32;
	},

	formatNumber: function(temp){
		return Math.round(temp);
	}
}
