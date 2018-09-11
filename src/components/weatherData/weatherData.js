import React, { Component } from 'react';
import Icon from '../icon/icon';
import Temperature from './temperature/temperature';
import Summary from './summary/summary';


class WeatherData extends Component {

  constructor(props){
    super(props);
    this.state = {
      data : props.data
    };
  }

  render() {
    const { data, tempSetting, changeSetting } = this.props;

    return (
      <div className="app container">
        <div className="row">
          <div className="col mt-4">
            <div className="mb-2"> 
              <Icon iconName={data.icon} classnames={"animatedhover temp-icon"}/>
            </div>
            <div>
              <Temperature temp={data.temperature} feelslike={data.feelslike} tempSetting={tempSetting} changeSetting={changeSetting}/>
            </div>
          </div>

          <div className="col">
            <Summary data={data}/>
          </div>

        </div>
      </div>
    );
  }
}

export default WeatherData;