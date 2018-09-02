import React from 'react';
import moment from 'moment';

class Summary extends React.Component {

	formatNumber = (num) => {
		return Math.round(num);
	}

	render(){
		const data = this.props.data;

		const precipitation = data.precipitation ? `${this.formatNumber(data.precipProb)}% chance of ${data.precipitation}.` : `No precipitation.`

		const date = moment().format("dddd MMMM Do");

		return(
			<div>
				<p className="summary date">{date}</p>
				<h4 className="summary header mb-0">{data.summary}</h4>
				<p className="summary subheader mb-3">{precipitation}</p>
				<p className="mb-0">Wind: {this.formatNumber(data.wind)} mph</p>
				<p className="mb-0">Cloud Cover: {this.formatNumber(data.cloud * 100)}%</p>
				<p className="mb-0">Humidity: {this.formatNumber(data.humidity * 100)}%</p>
			</div>
		);
	}
}

export default Summary;