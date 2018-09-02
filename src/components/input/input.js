import React from 'react';
import '../../App.css'

class Input extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value: ""
		}
	}

	handleChange = (e) => {
		this.setState({value: e.target.value});
	}

	onKeydown = (e) => {
		if(e.keyCode === 13){
			this.props.setLocation(this.state.value);
		}
	}

	componentWillMount(){
		document.addEventListener("keydown", this.onKeydown, false);
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.onKeydown, false);
	}

	render(){
		return(
			<div>
				<input className="form text mr-2" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Street, City"/>
				<button className="form button" onClick={() => {this.props.setLocation(this.state.value)}}>Go</button>
			</div>
		);
	}
}

export default Input;