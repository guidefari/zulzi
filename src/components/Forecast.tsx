import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Forecast as ForecastType } from "../util/types";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type Props = {
  data: ForecastType;
};

const Forecast = ({ data }: Props) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <>
      <label className="text-2xl font-bold">5 Day Forecast</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 5).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="flex items-center h-10 px-5 py-1 m-1 rounded-md cursor-pointer bg-slate-300">
                  <img src={`icons/${item.weather[0].icon}.png`} className="w-10" alt="weather" />
                  <label className="flex-1 ml-4 font-semibold cursor-pointer text-slate-900">{forecastDays[idx]}</label>
                  <label className="flex-1 mr-4 text-right cursor-pointer">{item.weather[0].description}</label>
                  <label className="cursor-pointer text-slate-500">
                    {Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="grid flex-1 grid-cols-2 gap-4 px-4 py-1">
                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
