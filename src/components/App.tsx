import { useState } from "react";
import Search from "./Search";
import {
  CurrentWeather as CurrentWeatherType,
  Forecast,
  ForecastResponse,
  SelectOption,
  WeatherResponse,
} from "../util/types";
import { WEATHER_API_URL } from "../util/api-endpoints";
import CurrentWeather from "./CurrentWeather";

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);

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
        const weatherResponse: WeatherResponse = await response[0].json();
        const forcastResponse: ForecastResponse = await response[1].json();

        setCurrentWeather({ ...weatherResponse, city: selectedCity.label });
        setForecast({ ...forcastResponse, city: selectedCity.label });
      })
      .catch((e) => console.error(e));
  };

  return (
    <main className="container mx-auto">
      <h1 className="text-8xl">Weather Forecast</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </main>
  );
}

export default App;
