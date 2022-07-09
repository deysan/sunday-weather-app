import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import { formatDateFullDay, formatDateTime } from 'utils';
import { Weather } from 'types';

interface WeatherCurrentProps {
  current: Weather;
}

export const WeatherCurrent: React.FC<WeatherCurrentProps> = ({ current }) => {
  return (
    <Box position="sticky" top={0}>
      <Typography mb={2} fontSize={25} textAlign="center">
        How’s the temperature today
      </Typography>
      <Box textAlign="center">
        <Typography fontSize={40}>{formatDateTime(current.dt)}</Typography>
        <Typography fontSize={25}>{formatDateFullDay(current.dt)}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <CardMedia
          component="img"
          sx={{
            maxHeight: '200px',
            maxWidth: '250px',
          }}
          image={`http://openweathermap.org/img/w/${current.weather[0].icon}.png`}
          alt={current.weather[0].description}
        />
      </Box>
      <Box textAlign="center">
        <Box display="flex" justifyContent="center" alignItems="start">
          <Typography fontSize={60} fontWeight={700} lineHeight={1}>
            {Math.round(current.temp)}
          </Typography>
          <Typography fontSize={25} color="#FFD059">
            °C
          </Typography>
        </Box>
        <Box>
          <Typography fontSize={25} fontStyle="italic">
            {current.weather[0].description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
