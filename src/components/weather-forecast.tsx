// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ArrowDown, ArrowUp, Wind } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import type { WeatherForecastData } from "@/api/types";

interface WeatherForecastProps {
  data: WeatherForecastData;
}

interface DailyForecast {
  date: string;
  temp_min: number;
  temp_max: number;
  wind: number;
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  const dailyForecasts = data.forecast.forecastday.reduce<WeatherForecastProps>((acc, forecast) => {
    if (!acc[forecast.date]) {
      acc[forecast.date] = {
        temp_min: forecast.day?.mintemp_c,
        temp_max: forecast.day?.maxtemp_c,
        wind: forecast.day?.maxwind_kph,
        date: forecast.date,
      };
    } else {
      acc[forecast.date].temp_min = Math.min(
        acc[forecast.date]?.temp_min,
        forecast.day?.mintemp_c
      );
      acc[forecast.date].temp_max = Math.max(
        acc[forecast.date]?.temp_max,
        forecast.day?.maxtemp_c
      );
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForecasts).slice(0, 7);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Прогноз на неделю</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">Дата: {day.date}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  Ветер {day.wind} m/s
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  мин. темп. {day.temp_min}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  макс. темп. {day.temp_max}
                </span>
              </div>

              <div className="flex justify-end gap-4">
                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{day.wind}m/s</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
