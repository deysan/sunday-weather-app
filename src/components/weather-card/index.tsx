import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  ClearRounded,
  CycloneRounded,
  GrainRounded,
  LocationOnRounded,
  RefreshRounded,
  WavesRounded,
} from '@mui/icons-material';
import { weatherByCity } from 'services/api';
import { useAppDispatch, useAppSelector } from 'hooks';
import { removeCity, selectCityById } from 'store/cities/cities-slice';
import { EntityId } from '@reduxjs/toolkit';
import { formatDateDay, formatDateTime } from 'utils';
import { Link } from 'react-router-dom';
import { Weather } from 'types';
import axios from 'axios';

interface WeatherCardProps {
  cityId: EntityId;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ cityId }) => {
  const dispatch = useAppDispatch();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [refetch, setRefetch] = useState<boolean>(false);

  const city = useAppSelector((state) => selectCityById(state, cityId));

  const getWeather = async (lat: number, lng: number) => {
    await axios
      .get(weatherByCity(lat, lng))
      .then((response) => response.data?.current)
      .then((data) => setWeather(data));
  };

  useEffect(() => {
    city && getWeather(city.lat, city.lng);

    if (refetch) {
      setTimeout(() => {
        setRefetch(false);
      }, 500);
    }
  }, [city, refetch]);

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card
        sx={{
          height: '300px',
        }}
      >
        <CardActionArea
          component={Link}
          to={`/city/${cityId}`}
          disabled={refetch ? true : false}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
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
                width="100%"
              >
                <Box textAlign="start">
                  <Typography fontSize={15}>Today</Typography>
                  <Typography fontSize={10}>
                    {formatDateDay(weather.dt)}
                  </Typography>
                  <Typography fontSize={10}>
                    {formatDateTime(weather.dt)}
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Tooltip title="Update Weather">
                    <IconButton
                      sx={{ padding: '4px' }}
                      onTouchStart={(event) => event.stopPropagation()}
                      onMouseDown={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.preventDefault();
                        setRefetch(true);
                      }}
                    >
                      <RefreshRounded />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box textAlign="end">
                  <Tooltip title="Delete City">
                    <IconButton
                      sx={{ padding: '4px' }}
                      onTouchStart={(event) => event.stopPropagation()}
                      onMouseDown={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(removeCity(cityId));
                      }}
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
                width="100%"
              >
                <Box display="flex" justifyContent="center" alignItems="start">
                  <Typography fontSize={60} fontWeight={700} lineHeight={1}>
                    {Math.round(weather.temp)}
                  </Typography>
                  <Typography fontSize={25} color="#FFD059">
                    °C
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <CardMedia
                    component="img"
                    sx={{
                      maxHeight: '100px',
                      maxWidth: '100px',
                    }}
                    image={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                    alt={weather.weather[0].description}
                  />
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5} width="100%">
                <LocationOnRounded fontSize="small" color="warning" />
                <Typography
                  fontSize={15}
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {city?.fullName || city?.name}
                </Typography>
              </Box>
              <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                width="100%"
              >
                <Box display="grid" gridTemplateColumns="repeat(2, auto)">
                  <CycloneRounded fontSize="small" />
                  <Box>
                    <Typography fontSize={10}>
                      {weather.wind_speed} m/s
                    </Typography>
                    <Typography fontSize={10} color="text.disabled">
                      Wind
                    </Typography>
                  </Box>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(2, auto)">
                  <GrainRounded fontSize="small" />
                  <Box>
                    <Typography fontSize={10}>{weather.humidity} %</Typography>
                    <Typography fontSize={10} color="text.disabled">
                      Humidity
                    </Typography>
                  </Box>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(2, auto)">
                  <WavesRounded fontSize="small" />
                  <Box>
                    <Typography fontSize={10}>
                      {weather.pressure} hPa
                    </Typography>
                    <Typography fontSize={10} color="text.disabled">
                      Pressure
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </CardActionArea>
      </Card>
    </Grid>
  );
};
