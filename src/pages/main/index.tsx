import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  IconButton,
  Typography
} from '@mui/material';
import {
  AddRounded,
  LocationOnRounded,
  MoreHorizRounded
} from '@mui/icons-material';
import { Search } from '../../components/search';
import { weatherByCity } from '../../services/api';

interface MainPageProps {}

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

const MainPage: React.FC<MainPageProps> = () => {
  const [weather, setWeather] = useState<WeatherProps | null>(null);
  console.log(weather);

  const fetchData = async (lat = '50.4333', lon = '30.5167') => {
    const response = await fetch(weatherByCity(lat, lon));
    const { current } = await response.json();
    setWeather(current);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!weather) return <h1>Loading...</h1>;

  return (
    <Container>
      <Search />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        minHeight="100vh"
      >
        <Card sx={{ height: 300, width: 240, padding: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{weather.dt}</Typography>

            <IconButton aria-label="setting">
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
        <Card>
          <CardActionArea sx={{ height: 332, width: 272, textAlign: 'center' }}>
            <AddRounded sx={{ fontSize: 100 }} />
          </CardActionArea>
        </Card>
      </Box>
    </Container>
  );
};

export default MainPage;
