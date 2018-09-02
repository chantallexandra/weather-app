import React, { Component } from 'react';
import Input from './components/input/input';
import WeatherData from './components/weatherData/weatherData';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/animate.css'
import './App.css';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
        isLoading: true,
        error: false,
        data: null
    }

  }

  setLocation = (input) => {
    this.setState({isLoading: true, error: false});
   
    input = input.trim();

    if(input === ""){
      this.fetchLocation();
    }else{
      this.fetchWeather(input, "string");
  
    }
  }

  fetchWeather = (location, locationType) => {
    var url = locationType === "coords" ? `/weather/coords?${location}` : `/weather/${location}`

    fetch(url)
    .then(response => response.json())
    .then(response => {
      if(response.ok){
          this.setState({data: response, isLoading: false, error: false});
      }else{
          this.setState({isLoading: false, error: true});
      }
    }).catch((err) => {
      this.setState({isLoading: false, error: true});
    });
    

  }

  //use geolocation to find user's lat and long coords
  fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        var location = `lat=${position.coords.latitude}&long=${position.coords.longitude}`;
        this.fetchWeather(location, "coords");
        
      });
    }else{
      this.setState({error: true});
    }
  }

  componentDidMount(){
    this.fetchLocation();
  }


  render() {
    const { data, isLoading, error } = this.state;
    var inside;

    if(error){
      inside = 
      (<div className="center">
              <h3 className="mt-5">Cannot Find Location</h3>
            </div>);
    }else if(isLoading){
      inside =
     (<div className="center">
               <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
                   <circle id="loading-inner" cx="75" cy="75" r="60"/>
                </svg>
           </div>);
    }else if(data){
      inside = (
        <div>
          <div className="mt-4">
            <p className="summary location m-0">{data.location}</p> 
            <hr className="mt-0 mb-0" /> 
          </div>      
          <WeatherData data={data}/>
        </div>);

    }else{
      inside = 
      (<div className="center">
              <h3 className="mt-5">Cannot Find Location</h3>
      </div>);
    }

    return (
      <div className="app container">
        <div className="row">
          <div className="col">
          </div>
          <div className="col-9">
             <div className="mt-4 center">
                <Input setLocation={this.setLocation}/>
             </div>

             {inside}
          
          </div>
          <div className="col">
          </div>
      </div>
      </div>
    );
  }
}

export default App;
