import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { formatDateTime } from 'utils';
import { selectCityById } from 'store/cities';
import { useAppSelector } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { Weather } from 'types';
import { weatherDetails } from 'services/api';
import {
  Box,
  Card,
  Grid,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowBackRounded,
  CycloneRounded,
  FilterDramaRounded,
  GrainRounded,
  RefreshRounded,
  SentimentSatisfiedRounded,
  SolarPowerRounded,
  VisibilityRounded,
  WavesRounded,
  WbSunnyRounded,
  WbTwilightRounded,
} from '@mui/icons-material';
import {
  Loader,
  WeatherChart,
  WeatherCurrent,
  WeatherDetailsCard,
} from 'components';

interface WeatherDetailsProps {
  cityId: EntityId;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ cityId }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<Weather | null>(null);
  const [hourly, setHourly] = useState<Weather[] | null>(null);
  const [refetch, setRefetch] = useState<boolean>(false);

  const city = useAppSelector((state) => selectCityById(state, cityId));

  const isTablet = useMediaQuery('(max-width:899px)');

  const fetchWeather = async (lat: number, lng: number) => {
    await axios
      .get(weatherDetails(lat, lng))
      .then((response) => response.data)
      .then((data) => {
        setCurrent(data.current);
        setHourly(data.hourly);
      });
  };

  const detailsCardData = [
    {
      title: 'Clouds',
      value: current?.clouds,
      params: '%',
      icon: <FilterDramaRounded fontSize="large" color="warning" />,
    },
    {
      title: 'Feels Like',
      value: Math.round(current?.feels_like || 0),
      params: '°C',
      icon: <SentimentSatisfiedRounded fontSize="large" color="warning" />,
    },
    {
      title: 'Visibility',
      value: ((current?.visibility || 0) / 1000).toFixed(1),
      params: 'km',
      icon: <VisibilityRounded fontSize="large" color="warning" />,
    },
    {
      title: 'Wind Speed',
      value: current?.wind_speed,
      params: 'm/s',
      icon: <CycloneRounded fontSize="large" color="warning" />,
    },
    {
      title: 'Humidity',
      value: current?.humidity,
      params: '%',
      icon: <GrainRounded fontSize="large" color="warning" />,
    },
    {
      title: 'Pressure',
      value: current?.pressure,
      params: 'hPa',
      icon: <WavesRounded fontSize="large" color="warning" />,
    },
    {
      title: 'Sunrise',
      value: formatDateTime(current?.sunrise || 0),
      icon: <WbSunnyRounded fontSize="large" color="warning" />,
    },
    {
      title: 'Sunset',
      value: formatDateTime(current?.sunset || 0),
      icon: <WbTwilightRounded fontSize="large" color="warning" />,
    },
    {
      title: 'UV Index',
      value: current?.uvi,
      icon: <SolarPowerRounded fontSize="large" color="warning" />,
    },
  ];

  useEffect(() => {
    if (city) {
      setTimeout(() => {
        fetchWeather(city.lat, city.lng);
        setRefetch(false);
      }, 500);
    }
  }, [city, refetch]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Tooltip title="Back">
          <IconButton
            onTouchStart={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}
          >
            <ArrowBackRounded sx={{ fontSize: 30 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Update Weather">
          <IconButton
            onTouchStart={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.preventDefault();
              setRefetch(true);
            }}
            disabled={refetch ? true : false}
          >
            <RefreshRounded sx={{ fontSize: 30 }} />
          </IconButton>
        </Tooltip>
      </Box>
      {!current || !hourly || refetch ? (
        <Loader />
      ) : (
        <Grid
          container
          sx={{
            overflow: 'auto',
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            padding={2}
            sx={
              !isTablet
                ? {
                    borderRightWidth: '1px',
                    borderRightStyle: 'solid',
                    borderRightColor: 'text.disabled',
                  }
                : {
                    marginBottom: '1rem',
                    paddingBottom: '1rem',
                    borderBottomWidth: '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: 'text.disabled',
                  }
            }
          >
            <WeatherCurrent current={current} />
          </Grid>

          <Grid item xs={12} md={8} padding={2}>
            <Box display="grid" gridTemplateRows="repeat(2, 1fr)">
              <WeatherChart data={hourly} />
              <Grid container spacing={2}>
                {isTablet
                  ? detailsCardData
                      .slice(0, 8)
                      .map((item) => (
                        <WeatherDetailsCard key={item.title} {...item} />
                      ))
                  : detailsCardData.map((item) => (
                      <WeatherDetailsCard key={item.title} {...item} />
                    ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </Card>
  );
};
