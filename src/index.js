import React from "react"; // Add this line if missing
import ReactDOM from "react-dom"; // Add this line if missing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import HourlyForecast from "./HourlyForecast";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:date" element={<HourlyForecast />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
