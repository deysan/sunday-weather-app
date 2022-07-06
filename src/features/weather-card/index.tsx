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
  AirRounded,
  ClearRounded,
  CycloneRounded,
  DeleteOutlineRounded,
  GrainRounded,
  LocationOnRounded,
  MoreHorizRounded,
  RefreshRounded,
  WavesRounded,
  WindPowerRounded,
} from '@mui/icons-material';
import { weatherByCity } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { removeCity, selectCityById } from '../../store/cities/cities-slice';
import { EntityId } from '@reduxjs/toolkit';
import { formatDateTime, formatDateToday } from '../../utils/format-date';
import * as mock from './mock.json';

interface WeatherProps {
  dt: number;
  name: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}
// interface WeatherProps {
//   dt: number;
//   temp: number;
//   humidity: number;
//   pressure: number;
//   wind_speed: number;
//   weather: {
//     icon: string;
//     description: string;
//   }[];
// }

interface WeatherCardProps {
  cityId: EntityId;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ cityId }) => {
  const dispatch = useAppDispatch();
  const [weather, setWeather] = useState<WeatherProps | null>(null);
  const [refetch, setRefetch] = useState<boolean>(false);

  const city = useAppSelector((state) => selectCityById(state, cityId));

  const fetchData = async (lat: number, lng: number) => {
    const response = await fetch(weatherByCity(lat, lng));
    const data = await response.json();
    setWeather(data);
  };

  const dateToday = weather && formatDateToday(weather?.dt);

  useEffect(() => {
    // setWeather(mock);
    city && fetchData(city.lat, city.lng);

    if (refetch) {
      setTimeout(() => {
        setRefetch(false);
      }, 500);
    }
  }, [city, refetch]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 300,
        width: 240,
        padding: 2,
      }}
    >
      {!weather || refetch ? (
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
                <IconButton
                  sx={{ padding: '4px' }}
                  onClick={() => setRefetch(true)}
                >
                  <RefreshRounded />
                </IconButton>
              </Tooltip>
            </Box>
            <Box textAlign="end">
              <Tooltip title="Delete City">
                <IconButton
                  sx={{ padding: '4px' }}
                  onClick={() => dispatch(removeCity(cityId))}
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
          >
            <Box display="flex" alignItems="start">
              <Typography fontSize={60} fontWeight={700} lineHeight={1}>
                {Math.round(weather.main.temp)}
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
            <Typography fontSize={15}>
              {city?.fullName || weather.name}
            </Typography>
          </Box>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)">
            <Box display="grid" gridTemplateColumns="repeat(2, auto)">
              <CycloneRounded fontSize="small" />
              <Box>
                <Typography fontSize={10}>{weather.wind.speed} m/s</Typography>
                <Typography fontSize={10} color="text.disabled">
                  Wind
                </Typography>
              </Box>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(2, auto)">
              <GrainRounded fontSize="small" />
              <Box>
                <Typography fontSize={10}>{weather.main.humidity} %</Typography>
                <Typography fontSize={10} color="text.disabled">
                  Humidity
                </Typography>
              </Box>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(2, auto)">
              <WavesRounded fontSize="small" />
              <Box>
                <Typography fontSize={10}>
                  {weather.main.pressure} hPa
                </Typography>
                <Typography fontSize={10} color="text.disabled">
                  Pressure
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
};
