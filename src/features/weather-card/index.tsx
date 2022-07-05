import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material';
import { LocationOnRounded, MoreHorizRounded } from '@mui/icons-material';
import { weatherByCity } from '../../services/api';
import { useAppDispatch } from '../../hooks/hook';
import { addCity } from '../../store/cities/cities-slice';

interface WeatherProps {
  dt: number;
  temp: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  weather: {
    icon: string;
    description: string;
  }[];
}

export const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherProps | null>(null);
  // console.log(weather);

  const dispatch = useAppDispatch();

  const fetchData = async (lat = '50.4333', lon = '30.5167') => {
    const response = await fetch(weatherByCity(lat, lon));
    const { current } = await response.json();
    setWeather(current);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentCity = {
    name: 'Kyiv',
    lat: '50.4333',
    lng: '30.5167'
  };

  const handleDispatch = () => dispatch(addCity(currentCity));

  if (!weather) return <h1>Loading...</h1>;

  return (
    <Card sx={{ height: 300, width: 240, padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>{weather.dt}</Typography>

        <IconButton aria-label="setting" onClick={handleDispatch}>
          <MoreHorizRounded />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Box>
          <Typography>{weather.temp}</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <CardMedia
            component="img"
            width="50"
            image={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <LocationOnRounded />
        <Typography>Город</Typography>
      </Box>
      <Box>
        <Typography>Ветер {weather.wind_speed}</Typography>
        <Typography>Влажность {weather.humidity}</Typography>
        <Typography>Давление {weather.pressure}</Typography>
      </Box>
    </Card>
  );
};
