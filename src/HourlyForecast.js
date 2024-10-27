import React from "react";
import { useLocation } from "react-router-dom";
import "./HourlyForecast.css";

const HourlyForecast = () => {
  const location = useLocation();
  const { dayData } = location.state;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>
        Hourly Forecast for {new Date(dayData.dt_txt).toLocaleDateString()}
      </h2>
      <img
        src={`http://openweathermap.org/img/w/${dayData.weather[0].icon}.png`}
        alt={dayData.weather[0].description}
      />
      <p>{dayData.weather[0].description}</p>
      <h3>Temperature: {dayData.main.temp}°C</h3>
      <h3>Feels like: {dayData.main.feels_like}°C</h3>
      <button
        onClick={() => window.history.back()}
        style={{ padding: "10px", marginTop: "20px" }}
      >
        Back to 5-Day Forecast
      </button>
    </div>
  );
};

export default HourlyForecast;
