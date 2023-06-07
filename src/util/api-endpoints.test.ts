import { test, expect } from "vitest";
import { fetchCities, fetchCurrentWeather, fetchForecast } from "./api-endpoints";

test("Searching Harare returns options", async () => {
  const result = await fetchCities("harare");
  expect(result.options.length).toBeGreaterThan(0);
  expect(result.options[0].value.length).toBeGreaterThan(0);
  expect(result.options[0].label).toBe("Harare, ZW");
});

const longitude = "-17.829166666";
const latitude = "31.052222222";

test("Weather API returns current weather given longitude & latitude", async () => {
  const result = await fetchCurrentWeather(longitude, latitude);
  expect(result).toBeTruthy();
});

test("Weather API returns forecast given longitude & latitude", async () => {
  const result = await fetchForecast(longitude, latitude);
  expect(result).toBeTruthy();
  console.log("result:", result);
});
