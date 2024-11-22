export const API_CONFIG = {
  BASE_URL: 'https://api.weatherapi.com/v1',
  API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
  DEFAULT_PARAMS: {
    key: import.meta.env.VITE_WEATHER_API_KEY,
  }
}