import { City, ForecastResponse, SelectOption, WeatherResponse } from "../util/types";
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY || process.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || process.env.VITE_WEATHER_API_KEY;
export const fetchCities = async (inputValue: string): Promise<{ options: SelectOption[] }> => {
  if (!inputValue || inputValue.length === 0) return { options: [] };
  try {
    const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
    const json = await response.json();
    const options = json.data?.map((city: City) => {
      return {
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      };
    });
    if (!options) return { options: [] };

    return { options };
  } catch (error) {
    console.error(error);
    return { options: [] };
  }
};

export const fetchCurrentWeather = async (lat: string, lon: string): Promise<WeatherResponse | string> => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const json: WeatherResponse = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return "Error Fetching Weather";
  }
};

export const fetchForecast = async (lat: string, lon: string): Promise<ForecastResponse | string> => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const json: ForecastResponse = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return "Error Fetching Forecast";
  }
};
