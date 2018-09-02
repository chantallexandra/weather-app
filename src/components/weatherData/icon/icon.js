import React from 'react';

class Icon extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			icon : props.iconName
		}
	}

	render(){
		return(
			<div className="center mb-2">
				<img id="temp-icon" className="animatedhover" src={require(`./weather-icons/${this.state.icon}.svg`)} alt="weather icon"/> 
			</div>
		);
	}
}


export default Icon;