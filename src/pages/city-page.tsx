import { useParams, useSearchParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { WeatherDetails } from "../components/weather-details";
import { WeatherForecast } from "../components/weather-forecast";
import WeatherSkeleton from "@/components/skeleton";
import { CurrentWeather } from "@/components";
import { useAstroQuery, useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { FavoriteButton } from "@/components/favorite-button";

export function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const astroQuery = useAstroQuery(coordinates);

  const locationName = weatherQuery.data?.location;

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
        </h1>
        <div className="flex gap-2">
          <FavoriteButton
            data={weatherQuery.data}
          />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:flex-row ">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <WeatherDetails
            data={weatherQuery.data}
            astroData={astroQuery.data}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-1 items-start">
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}
