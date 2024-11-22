import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";
import type { WeatherData } from "@/api/types";

interface WeatherDetailsProps {
  data: WeatherData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  astroData: any;
}

export function WeatherDetails({ data, astroData }: WeatherDetailsProps) {
  const { sunrise, sunset } = astroData.astronomy.astro;
  const { wind_dir, pressure_mb } = data.current;

  const details = [
    {
      title: "Sunrise",
      value: sunrise,
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: sunset,
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: wind_dir,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${pressure_mb} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card >
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
