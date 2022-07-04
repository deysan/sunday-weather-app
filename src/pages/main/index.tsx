import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Container,
  IconButton,
  Typography
} from '@mui/material';
import { LocationOnRounded, MoreHorizRounded } from '@mui/icons-material';

interface MainPageProps {}

interface WeatherProps {
  id: number;
  dt: number;
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

const MainPage: React.FC<MainPageProps> = () => {
  const [weather, setWeather] = useState<WeatherProps | null>(null);
  console.log(weather);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=kyiv&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    const data = await response.json();
    setWeather(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!weather) return <h1>Loading...</h1>;

  return (
    <Container>
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
              <Typography>{weather.main.temp}</Typography>
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
            <Typography>{weather.name}</Typography>
          </Box>
          <Box>
            <Typography>Ветер {weather.wind.speed}</Typography>
            <Typography>Влажность {weather.main.humidity}</Typography>
            <Typography>Давление {weather.main.pressure}</Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default MainPage;
