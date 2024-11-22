// src/components/weather/favorite-button.tsx
import { Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorite";

import type { WeatherData } from "@/api/types";

interface FavoriteButtonProps {
  data: WeatherData;
}

export function FavoriteButton({ data }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(data.location.lat, data.location.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.location.lat}-${data.location.lon}`);
      toast.error(`Removed ${data.location.name} from Favorites`);
    } else {
      addFavorite.mutate({
        name: data.location.name,
        lat: data.location.lat,
        lon: data.location.lon,
        country: data.location.country,
      });
      toast.success(`Added ${data.location.name} to Favorites`);
    }
  };

  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
}