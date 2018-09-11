import React from 'react';
import { convertFtoC, formatNumber } from '../../utils'

class Temperature extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			tempC : null,
			tempF : null,
			feelslikeC : null,
			feelslikeF : null,
		}
	}

	componentDidMount(){
		var far = formatNumber(this.props.temp);
		var cel = formatNumber(convertFtoC(this.props.temp));
		var feelF = formatNumber(this.props.feelslike);
		var feelC = formatNumber(convertFtoC(this.props.feelslike));
		this.setState({tempF: far, tempC: cel, feelslikeF: feelF, feelslikeC: feelC});
	}


	render(){
		var temperature = this.props.tempSetting === "F" ? this.state.tempF : this.state.tempC;
		var feelslike = this.props.tempSetting === "F" ? this.state.feelslikeF : this.state.feelslikeC;

		return(
			<div>
				<div className="left-column mx-auto">
					<div className="center temperature inline-block number">{temperature}</div><p className="form temperature inline">&deg;<span id="C" onClick={this.props.changeSetting}>C</span> | <span className="deselected" id="F" onClick={this.props.changeSetting}>F</span></p>
				</div>

				<div className="center left-column mx-auto">
					<div className="inline-block w-95">Feels like:</div><div className="inline-block w-70">&nbsp;{feelslike}&deg; {this.state.tempSetting}</div>
				</div>
			</div>
		);
	}
}

export default Temperature;