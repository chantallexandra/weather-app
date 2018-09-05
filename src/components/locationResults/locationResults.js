import React from 'react';
import Result from './result';

class LocationResults extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

	render(){
		const { results } = this.props
		var rows = [];
		for (var i = 0; i < results.length; i++) {
		    rows.push(<Result key={i} data={results[i]} id={i} selectLocation={this.props.selectLocation}/>);
		}
		
		return(
			<div>
				{rows}
			</div>
		);
	}
}

export default LocationResults;