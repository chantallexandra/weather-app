import React from 'react';
import Icon from '../icon/icon';
import { convertFtoC, formatNumber } from '../utils'
import moment from 'moment';

class Day extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			tempCmax : null,
			tempCmin : null,
			tempFmax : null,
			tempFmin : null
		}
	}

	componentDidMount(){
		const data = this.props.data;

		var farMax = formatNumber(data.temperatureMax);
		var celMax = formatNumber(convertFtoC(data.temperatureMax));
		var farMin = formatNumber(data.temperatureMin);
		var celMin = formatNumber(convertFtoC(data.temperatureMin));
		this.setState({tempFmax: farMax, tempFmin: farMin, tempCmax: celMax, tempCmin: celMin});
	}

	render(){
		const data = this.props.data;

		var max = this.props.tempSetting === "F" ? this.state.tempFmax : this.state.tempCmax;
		var min = this.props.tempSetting === "F" ? this.state.tempFmin : this.state.tempCmin;

		const dayWeek = moment.unix(data.time).format("ddd");
		const dateWeek = moment.unix(data.time).format("D/MM");
//				<div className="center weekly date">{dateWeek}</div>

		return(
			<div className="col">
				<div className="center weekly day">{dayWeek}</div>
				<div className="center"><Icon iconName={data.icon} classnames={"weekly icon animatedhover"}/></div>
				<div className="center weekly max">{max}</div>
				<div className="center weekly min">{min}</div>
			</div>
		);
	}
}

export default Day;