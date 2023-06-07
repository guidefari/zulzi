import { useState } from "react";
import Search from "./Search";
import { CurrentWeather as CurrentWeatherType, Forecast as ForecastType, SelectOption } from "../util/types";
import { fetchCurrentWeather, fetchForecast } from "../util/api-endpoints";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import Toast from "./Toast";

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastType | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("ad");

  const handleOnSearchChange = (selectedCity: SelectOption) => {
    const [lat, lon] = selectedCity.value.split(" ");

    setForecast(null);
    setCurrentWeather(null);
    setLoading(true);
    setErrorMessage("");

    Promise.all([fetchCurrentWeather(lat, lon), fetchForecast(lat, lon)])
      .then(async (response) => {
        const weatherResponse = response[0];
        const forcastResponse = response[1];

        if (typeof weatherResponse !== "string") {
          setCurrentWeather({ ...weatherResponse, city: selectedCity.label });
        } else {
          setErrorMessage(weatherResponse);
        }

        if (typeof forcastResponse !== "string") {
          setForecast({ ...forcastResponse, city: selectedCity.label });
        } else {
          setErrorMessage(forcastResponse);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="container p-5 mx-auto transition ease-in-out delay-150">
      <Search onSearchChange={handleOnSearchChange} />
      {loading && (
        <div className="w-8 mx-auto my-20 text-5xl text-blue-600 rounded-full aspect-square border-1 animate-spin">
          .
        </div>
      )}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      {errorMessage && <Toast message={errorMessage} />}
    </main>
  );
}

export default App;
