import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import { LocationOnRounded, MoreHorizRounded } from '@mui/icons-material';
import { weatherByCity } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { removeCity, selectCityById } from '../../store/cities/cities-slice';
import { EntityId } from '@reduxjs/toolkit';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const city = useAppSelector((state) => selectCityById(state, cityId));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchData = async (lat: number, lng: number) => {
    const response = await fetch(weatherByCity(lat, lng));
    const { current } = await response.json();
    setWeather(current);
  };

  useEffect(() => {
    city && fetchData(city.lat, city.lng);
  }, [city]);

  const handleDispatch = () => {
    dispatch(removeCity(cityId));
    handleClose();
  };

  if (!weather) return <h1>Loading...</h1>;

  return (
    <Card sx={{ height: 300, width: 240, padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>{weather.dt}</Typography>

        <IconButton
          aria-label="setting"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreHorizRounded />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={handleDispatch}>Remove City</MenuItem>
        </Menu>
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
        <Typography>{city?.name}</Typography>
      </Box>
      <Box>
        <Typography>Wind {weather.wind_speed} m/s</Typography>
        <Typography>Humidity {weather.humidity} %</Typography>
        <Typography>Pressure {weather.pressure} hPa</Typography>
      </Box>
    </Card>
  );
};
