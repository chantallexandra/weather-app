import React from 'react';
import Day from './day';

class Week extends React.Component {


	render(){
		const data = this.props.data;

		var rows = [];
		var datelimit = data.length > 7 ? 7 : data.length
		for (var i = 1; i < datelimit; i++) {
		    rows.push(<Day key={i} data={data[i]} tempSetting={this.props.tempSetting} changeSetting={this.props.changeSetting}/>);
		}
		
		return(
			<div className="container">
			  <div className="row">
			    {rows}
			  </div>
			</div>
		);

	}
}

export default Week;