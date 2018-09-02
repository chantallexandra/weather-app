import React from 'react';

class Temperature extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			tempC : null,
			tempF : null,
			feelslikeC : null,
			feelslikeF : null,
			tempSetting : "C"
		}
	}

	//converts temperature in Fahrenheit to Celcius
	convertFtoC = (temp) => {
		return (temp - 32) * 5/9;
	}

	convertCtoF = (temp) => {
		return (temp * 9/5) + 32;
	}

	formatTemp = (temp) => {
		return Math.round(temp);
	}

	handleChange = (e) => {
		var id = e.target.id;

		if(this.state.tempSetting !== id){
			this.setState({tempSetting: e.target.id});
			var selectedTemp = document.getElementById(e.target.id);
			var deselectedTemp = e.target.id === "F" ? document.getElementById("C") : document.getElementById("F");

			selectedTemp.classList.remove("deselected");
			deselectedTemp.classList.add("deselected");		
		}
	}

	componentDidMount(){
		var far = this.formatTemp(this.props.temp);
		var cel = this.formatTemp(this.convertFtoC(this.props.temp));
		var feelF = this.formatTemp(this.props.feelslike);
		var feelC = this.formatTemp(this.convertFtoC(this.props.feelslike));
		this.setState({tempF: far, tempC: cel, feelslikeF: feelF, feelslikeC: feelC});
	}


	render(){
		var temperature = this.state.tempSetting === "F" ? this.state.tempF : this.state.tempC;
		var feelslike = this.state.tempSetting === "F" ? this.state.feelslikeF : this.state.feelslikeC;

		return(
			<div>
				<div className="left-column mx-auto">
					<div className="center temperature inline-block number">{temperature}</div><p className="form temperature inline">&deg;<span id="C" onClick={this.handleChange}>C</span> | <span className="deselected" id="F" onClick={this.handleChange}>F</span></p>
				</div>

				<div className="center left-column mx-auto">
					<div className="inline-block w-95">Feels like:</div><div className="inline-block w-70">&nbsp;{feelslike}&deg; {this.state.tempSetting}</div>
				</div>
			</div>
		);
	}
}

export default Temperature;