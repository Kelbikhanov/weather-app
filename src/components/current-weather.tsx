import { Droplets, Wind } from "lucide-react";

import { Card, CardContent } from "./ui/card";

import type { FC } from "react";
import type { WeatherData, WeatherLocation } from "@/api/types";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName: WeatherLocation | undefined;
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({
  data,
  locationName,
}) => {
  const { temp_c, feelslike_c, humidity, wind_kph} = data.current;
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold tracking-tight">
                  {locationName?.name}
                </h2>
                {locationName?.region && (
                  <span className="text-muted-foreground">
                    , {locationName.region}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {locationName?.country}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-7xl font-bold tracking-tighter">
                {formatTemp(temp_c)}
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Ощущается как {formatTemp(feelslike_c)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Влажность</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Скорость ветра</p>
                  <p className="text-sm text-muted-foreground">{wind_kph} км/ч</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <img
                src={data.current.condition.icon}
                alt={data.current.condition.text}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">
                  {data.current.condition.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
