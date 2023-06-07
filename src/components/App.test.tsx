import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

test("App Renders:", () => {
  render(<App />);
  const searchInput = document.querySelector("#search-input");
  expect(searchInput).toBeTruthy();
});

// Given more time, I'd have covered test cases below using Playwright
// "No Network request on Search Input Focus"
// forecast loads & displays 5 accordions
// Get Today's day, ensure Forecast renders only the next 5 days
