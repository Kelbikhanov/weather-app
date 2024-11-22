import { API_CONFIG } from "./config";

import type {
  Coordinates,
  SearchCity,
  WeatherData,
  WeatherForecastData,
} from "./types";

class WeatherApi {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      apiKey: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Api Error ${response.statusText}`);
    }

    return response.json();
  }

  /* получение погоды по текущему городу */
  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const qParam = `${lat.toString()}, ${lon.toString()}`;
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/current.json`, {
      key: API_CONFIG.API_KEY,
      q: qParam,
    });

    return this.fetchData<WeatherData>(url);
  }

  /* получение погоды на неделю */
  async getForecastWeather({
    lat,
    lon,
  }: Coordinates): Promise<WeatherForecastData> {
    const qParam = `${lat.toString()}, ${lon.toString()}`;
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast.json`, {
      key: API_CONFIG.API_KEY,
      q: qParam,
      days: 7,
    });

    return this.fetchData<WeatherForecastData>(url);
  }

  /* поиск по городам */
  async getSearchCity(query: string): Promise<SearchCity[]> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/search.json`, {
      key: API_CONFIG.API_KEY,
      q: query,
    });

    return this.fetchData<SearchCity[]>(url);
  }


  /* получение астрономических данных */
  async getAstroCity({ lat, lon }: Coordinates) {
    const qParam = `${lat.toString()}, ${lon.toString()}`;
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/astronomy.json`, {
      key: API_CONFIG.API_KEY,
      q: qParam,
    });

    return this.fetchData(url);
  }
}

export const weatherApi = new WeatherApi();
