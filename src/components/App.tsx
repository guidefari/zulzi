import { useState } from "react";
import Search from "./Search";
import {
  CurrentWeather as CurrentWeatherType,
  Forecast as ForecastType,
  ForecastResponse,
  SelectOption,
  WeatherResponse,
} from "../util/types";
import { WEATHER_API_URL } from "../util/api-endpoints";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOnSearchChange = (selectedCity: SelectOption) => {
    const [lat, lon] = selectedCity.value.split(" ");
    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || process.env.VITE_WEATHER_API_KEY;

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    setForecast(null);
    setCurrentWeather(null);
    setLoading(true);
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse: WeatherResponse = await response[0].json();
        const forcastResponse: ForecastResponse = await response[1].json();

        setCurrentWeather({ ...weatherResponse, city: selectedCity.label });
        setForecast({ ...forcastResponse, city: selectedCity.label });
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="container py-5 mx-auto transition ease-in-out delay-150">
      <Search onSearchChange={handleOnSearchChange} />
      {loading && (
        <div className="w-8 mx-auto my-20 text-5xl text-blue-600 rounded-full aspect-square border-1 animate-spin">
          .
        </div>
      )}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </main>
  );
}

export default App;
