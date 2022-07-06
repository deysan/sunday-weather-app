import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  ClearRounded,
  DeleteOutlineRounded,
  LocationOnRounded,
  MoreHorizRounded,
  RefreshRounded,
} from '@mui/icons-material';
import { weatherByCity } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { removeCity, selectCityById } from '../../store/cities/cities-slice';
import { EntityId } from '@reduxjs/toolkit';
import { formatDateTime, formatDateToday } from '../../utils/format-date';

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

interface WeatherCardProps {
  cityId: EntityId;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ cityId }) => {
  const dispatch = useAppDispatch();
  const [weather, setWeather] = useState<WeatherProps | null>(null);

  const city = useAppSelector((state) => selectCityById(state, cityId));

  const fetchData = async (lat: number, lng: number) => {
    const response = await fetch(weatherByCity(lat, lng));
    const { current } = await response.json();
    setWeather(current);
  };

  const dateToday = weather && formatDateToday(weather?.dt);

  useEffect(() => {
    city && fetchData(city.lat, city.lng);
  }, [city]);

  return (
    <Card sx={{ height: 300, width: 240, padding: 2 }}>
      {!weather ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            display="grid"
            gridTemplateColumns="repeat(3, auto)"
            alignItems="start"
          >
            <Box textAlign="start">
              <Typography fontSize={20}>Today</Typography>
              <Typography fontSize={10}>{dateToday?.day}</Typography>
              <Typography fontSize={10}>{dateToday?.time}</Typography>
            </Box>
            <Box textAlign="center">
              <Tooltip title="Update Weather">
                <IconButton sx={{ padding: '4px' }}>
                  <RefreshRounded />
                </IconButton>
              </Tooltip>
            </Box>
            <Box textAlign="end">
              <Tooltip title="Delete City">
                <IconButton
                  onClick={() => dispatch(removeCity(cityId))}
                  sx={{ padding: '4px' }}
                >
                  <ClearRounded />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            alignItems="center"
            mt={2}
            mb={2}
          >
            <Box display="flex" alignItems="start">
              <Typography fontSize={60} fontWeight={700} lineHeight={1}>
                {Math.round(weather.temp)}
              </Typography>
              <Typography fontSize={25} color="#FFD059">
                °C
              </Typography>
            </Box>
            <Box>
              <CardMedia
                component="img"
                width="50"
                image={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocationOnRounded fontSize="small" color="warning" />
            <Typography fontSize={15}>{city?.fullName}</Typography>
          </Box>
          <Box>
            <Typography>Wind {weather.wind_speed} m/s</Typography>
            <Typography>Humidity {weather.humidity} %</Typography>
            <Typography>Pressure {weather.pressure} hPa</Typography>
          </Box>
        </>
      )}
    </Card>
  );
};
