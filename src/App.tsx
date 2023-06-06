import { useState } from "react";
import "./App.css";
import Search from "./Search";
import { SelectOption } from "./types";
import { WEATHER_API_URL } from "./api-endpoints";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (selectedCity: SelectOption) => {
    const [lat, lon] = selectedCity.value.split(" ");
    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || process.env.VITE_WEATHER_API_KEY;

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        console.log("response:", response);
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: selectedCity.label, ...weatherResponse });
        setForecast({ city: selectedCity.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  console.log("handleOnSearchChange:", handleOnSearchChange);
  return (
    <>
      <h1 className="text-8xl">Weather Forecast</h1>
      <Search onSearchChange={handleOnSearchChange} />
    </>
  );
}

export default App;
