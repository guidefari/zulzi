import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

test("App Renders:", () => {
  render(<App />);
  const searchInput = document.querySelector("#search-input");
  expect(searchInput).toBeTruthy();
});
