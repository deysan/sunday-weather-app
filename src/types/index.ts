export interface IWeather {
  dt: number;
  temp: number;
  clouds: number;
  feels_like: number;
  visibility: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  sunrise?: number;
  sunset?: number;
  uvi: number;
  weather: {
    icon: string;
    description: string;
  }[];
}
