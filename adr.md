# Architecture Decision Record

## GeoDB
- Using [GeoDB cities API](https://rapidapi.com/wirefreethought/api/geodb-cities/) to power the city search input box.
- This will give us latitude & longitude for selected city, which are required param's for weather search
- Sign up, and retrieve `X-RapidAPI-Key`. This will be the value for `VITE_RAPID_API_KEY`

## WeatherAPI
- This API gets us weather details, given a latitude & a longitude.
- Create an account with [OpenWeather API](https://home.openweathermap.org/)
- Get API key [here](https://home.openweathermap.org/api_keys)
- This will be the value for `VITE_WEATHER_API_KEY`

## If extra time
- Error boundary component - to avoid white screen of death