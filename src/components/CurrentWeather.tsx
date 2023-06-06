import { CurrentWeather as CurrentWeatherType } from "../util/types";

type Props = {
  data: CurrentWeatherType;
};

const CurrentWeather = ({ data }: Props) => {
  return (
    <div className="max-w-sm px-5 pb-5 mx-auto mt-5 text-white rounded-md shadow-md bg-slate-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-5x">{data.city}</p>
          <p className="text-sm">{data.weather[0].description}</p>
        </div>
        <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
      </div>
      <div className="flex justify-between">
        <p className="font-bold text-7xl">{Math.round(data.main.temp)}°C</p>
        <div className="flex-grow pl-5">
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
