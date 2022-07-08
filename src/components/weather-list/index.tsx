import React from 'react';
import { Grid } from '@mui/material';
import { useAppSelector } from 'hooks';
import { WeatherCard } from 'components';
import { selectAllCities } from 'store/cities';

interface WeatherListProps {
  children: React.ReactNode;
}

export const WeatherList: React.FC<WeatherListProps> = ({ children }) => {
  const cities = useAppSelector(selectAllCities);

  return (
    <Grid container spacing={3}>
      {cities && cities.map((city) => <WeatherCard key={city} cityId={city} />)}
      {children}
    </Grid>
  );
};
