import axios from 'axios';
import React, { useEffect } from 'react';
import { addCity, selectAllCities } from 'store/cities';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { WeatherCard } from 'components';

interface WeatherListProps {
  children: React.ReactNode;
}

export const WeatherList: React.FC<WeatherListProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectAllCities);

  const getGeolocation = async () => {
    try {
      const response = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IPGEOLOCATION_API_KEY}`,
      );
      dispatch(
        addCity({
          name: response.data.city,
          fullName: `${response.data.city}, ${response.data.country_name}`,
          lat: response.data.latitude,
          lng: response.data.longitude,
        }),
      );
    } catch (error) {
      console.error('Something went wrong getting Geolocation from API!');
    }
  };

  useEffect(() => {
    if (!cities.length) getGeolocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={3}>
      {cities && cities.map((city) => <WeatherCard key={city} cityId={city} />)}
      {children}
    </Grid>
  );
};
