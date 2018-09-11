import React, { Component } from 'react';
import Input from './components/input/input';
import WeatherData from './components/weatherData/weatherData';
import LocationResults from './components/locationResults/locationResults';
import Week from './components/week/week';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
        isLoading: true,
        error: false,
        data: null,
        chosenLocation: false,
        locationResults: null,
        tempSetting : "C"
    }

  }

  //Toggle between degrees F and C
  changeTempSetting = (e) => {
    var id = e.target.id;

    if(this.state.tempSetting !== id){
      this.setState({tempSetting: e.target.id});
      var selectedTemp = document.getElementById(e.target.id);
      var deselectedTemp = e.target.id === "F" ? document.getElementById("C") : document.getElementById("F");

      selectedTemp.classList.remove("deselected");
      deselectedTemp.classList.add("deselected");   
    }
  }

  //find weather from location chosen from list
  selectLocation = (id, location) => {
    var latLng = this.state.locationResults[id].latLng;
    this.setState({chosenLocation: true, isLoading: true});
    var params = `${location}?lat=${latLng.lat}&long=${latLng.lng}`;
    this.fetchWeather(params,"string");
  }

  //user input to get locations
  setLocation = (input) => {
    this.setState({isLoading: true, error: false});
    input = input.trim();
    //if user input is blank, find their current location
    if(input === ""){
      this.fetchUserLocation();
    }else{
      this.setState({chosenLocation: false});
      this.fetchPossibleLocations(input);
    }
  }

  //fetch weather from location given in specified format
  fetchWeather = (location, locationType) => {
    var url = locationType === "coords" ? `/weather/coords?${location}` : `weather/${location}`
    fetch(url)
    .then(response => response.json())
    .then(json => {
      if(json.ok){
          this.setState({data: json, isLoading: false, error: false, chosenLocation: true});
      }else{
          this.setState({isLoading: false, error: true});
      }
    }).catch((err) => {
      this.setState({isLoading: false, error: true});
    });
  }

  //calls api to get up to 10 possible locations corresponding to input
  fetchPossibleLocations = (userInput) => {
    var url = `/location/${userInput}`;
    fetch(url)
    .then(response => response.json())
    .then(json => {
      if(json.length === 0){
        this.setState({error: true});
      }else if(json.length === 1){
        var latLng = json[0].latLng
        var params = `lat=${latLng.lat}&long=${latLng.lng}`;
        this.fetchWeather(params, "coords");
      }else{
        this.setState({locationResults: json, isLoading: false, error: false});
      }
    }).catch((err) => {
      this.setState({isLoading: false, error: true});
    });
  }

  //use geolocation to find user's lat and long coords
  fetchUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        var params = `lat=${position.coords.latitude}&long=${position.coords.longitude}`;
        this.fetchWeather(params, "coords");
      });
    }else{
      this.setState({error: true, isLoading: false});
    }
  }

  componentDidMount(){
    this.fetchUserLocation();
  }

  render() {
    const { data, isLoading, error, chosenLocation, locationResults } = this.state;
    var inside;
    var weeklyWeather = null;
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
    }else if(!chosenLocation && locationResults && locationResults.length > 1){
      inside = 
      (<div className="center mt-2">
        <LocationResults results={locationResults} selectLocation={this.selectLocation}/>
      </div>)

    }else if(data){
      inside = (
        <div>
          <div className="mt-4">
            <p className="summary location m-0">{data.location}</p> 
            <hr className="mt-0 mb-0" /> 
          </div>      
          <WeatherData data={data} tempSetting={this.state.tempSetting} changeSetting={this.changeTempSetting}/>
        </div>);

      weeklyWeather = (
        <div className="row mt-5">
          <div className="col">
          </div>
          <div className="col-9">
            <Week data={this.state.data.weekly} tempSetting={this.state.tempSetting} changeSetting={this.changeTempSetting}/>
          </div>
          <div className="col">
          </div>
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
      {weeklyWeather}
      </div>
    );
  }
}

export default App;
