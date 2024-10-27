import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Update the path to your CSS file

const API_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const API_KEY = "fd48bdf8a8b87b3c140f17625f4e2d57";

const App = () => {
  const [inputValue, setInputValue] = useState("Yerevan");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the weather data for the input city
  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        // Group data by each day (every 3-hour intervals returned by API)
        const dailyData = data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setWeatherData(dailyData);
        setError(null);
      } else {
        setError(data.message);
        setWeatherData([]);
      }
    } catch (err) {
      setError("Error fetching weather data");
      setWeatherData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(inputValue);
  }, [inputValue]);

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle click on a day to navigate to the detailed hourly forecast
  const handleDayClick = (day) => {
    navigate(`/${day.dt_txt.split(" ")[0]}`, { state: { dayData: day } });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>5-Day Weather Forecast</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter city name"
        style={{ marginBottom: "20px", padding: "10px" }}
      />
      <button
        onClick={() => fetchWeather(inputValue)}
        style={{ padding: "10px" }}
      >
        Get Forecast
      </button>

      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="weather-container">
        {weatherData.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className="weather-card"
          >
            <h3>
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </h3>
            <img
              src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
            <p>{day.main.temp.toFixed(1)}°C</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
