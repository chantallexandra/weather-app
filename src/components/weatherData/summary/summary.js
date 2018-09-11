import React from 'react';
import moment from 'moment';
import { formatNumber } from '../../utils';

class Summary extends React.Component {

	render(){
		const data = this.props.data;

		const precipitation = data.precipitation ? `${formatNumber(data.precipProb)}% chance of ${data.precipitation}.` : `No precipitation.`

		const date = moment().format("dddd MMMM Do");

		return(
			<div>
				<p className="summary date">{date}</p>
				<h4 className="summary header mb-0">{data.summary}</h4>
				<p className="summary subheader mb-3">{precipitation}</p>
				<p className="mb-0">Wind: {formatNumber(data.wind)} mph</p>
				<p className="mb-0">Cloud Cover: {formatNumber(data.cloud * 100)}%</p>
				<p className="mb-0">Humidity: {formatNumber(data.humidity * 100)}%</p>
			</div>
		);
	}
}

export default Summary;