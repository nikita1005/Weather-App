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
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=180941f68139fba12f166dc35d9b688b`,
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
    <>
      <div className="App">
        <h1>Weather APP</h1>
      </div>
      {/* <div
        style={{ height: "5px", width: "100%", backgroundColor: "blue" }}
      ></div> */}
      <br />
      <div style={{ marginLeft: "25%" }}>
        <div className="weathercard">
          {new Date().toLocaleString()}
          <br />
          {city} Weather
          <br />
          {/* {Math.round(temperature * 100) / 100} ℉ */}
          {Math.round(temperature * 100) / 100} ℃ - {desc}
        </div>
        <br />
        
        <input
        style={{
          width: 235,
          height: 40,
          padding:10,
          borderColor: "#034e79",
          borderSpacing:10,
          fontSize:30,
          backgroundColor:"#b5d9ee"
          }}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          style={{
            width: 235,
            height: 40,
            padding:10,
            borderColor: "#034e79",
            borderSpacing:10,
            fontSize:30,
            backgroundColor:"#b5d9ee"
            }}
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
        style={{
          width: 150,
          height: 64,
          padding:10,
          borderColor: "#034e79",
          borderSpacing:10,
          fontSize:30,
          backgroundColor:"#639cbd"
          }}
          onClick={() => {
            getWeatherData(city, country);
          }}
        >
          GET
        </button>
      </div>
    </>
  );
}

export default App;
