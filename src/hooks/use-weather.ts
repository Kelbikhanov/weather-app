import { Coordinates } from "@/api/types";
import { weatherApi } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  astro: (coords: Coordinates) => ["astro", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.getForecastWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useAstroQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.astro(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherApi.getAstroCity(coordinates) : null),
    enabled: !!coordinates,
  });
}

export function useSearchQuery(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => (query ? weatherApi.getSearchCity(query) : null),
    enabled: query.length >= 3,
  });
}
