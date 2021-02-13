import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { Card, Box, Typography } from "@material-ui/core/";


function App() {
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("Melbourne");
  const [country, setCountry] = useState("AU");

  const getWeatherData = (city, country) => {
    axios({
      method: "GET",
      // 180941f68139fba12f166dc35d9b688b
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=c96b1cf6f53ca735de8f301090551ef3`,
    })
      .then((response) => {
        console.log(response.data.main.temp);
        // Kelvin to Fahrenheit
        // setTemperature((response.data.main.temp - 273.15) * 1.8 + 32);

        // Kelvin to Celsius
        setTemperature(response.data.main.temp - 273.15);
        // console.log(response.data);
        setDesc(response.data.weather[0].main);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <h1>Weather App</h1>
      <div style={{marginLeft:"0%"}}>
      <form className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
        type="text"
        value={country}
        onChange={(e)=> setCountry(e.target.value)}
        />
        <button style={{ backgroundColor: "#2174a3" },{width:255},{height:30}}
        onClick={()=>{
          getWeatherData(city,country);
        }}>
          <Typography variant="h4" align="center" style={{textDecorationColor:"#FFFFFF"}}>
          GET
          </Typography>
        </button>
        </form>
        <div className="weathercard">
           {new Date().toLocaleString()}
          <br />
          {city} Weather
          <br/>
        {Math.round(temperature * 100)/100} °C -{desc}
        </div>
        <br/>
        
      </div>
      
    </div>
  );
}

export default App;
