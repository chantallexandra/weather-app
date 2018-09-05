import React from 'react';

class Result extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

	formatGeocode = (locationData) => {
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
			fulllocation = `${locationData.adminArea3}, ${locationData.adminArea1} (State)`;
		}else{
			//country
			fulllocation = `${locationData.adminArea1} (Country)`;
		}
		return fulllocation;
	}

	render(){
		var formattedLocation = this.formatGeocode(this.props.data)
		
		return(
			<div className="results" onClick={() => {this.props.selectLocation(this.props.id, formattedLocation)}}>
				{formattedLocation}
			</div>
		);
	}
}

export default Result;