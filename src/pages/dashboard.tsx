import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import WeatherSkeleton from "@/components/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useAstroQuery,
  useForecastQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { CurrentWeather, WeatherDetails, WeatherForecast } from "@/components";
import { FavoriteCities } from "@/components/favorite-cityes";

export const Dashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const astroQuery = useAstroQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      astroQuery.refetch();
    }
  };

  const locationName = weatherQuery.data?.location;

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      <FavoriteCities />
      <div className="flex items-center justify-between">

        <h1 className="text-xl font-bold tracking-tight">Мое местоположение</h1>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
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
};
