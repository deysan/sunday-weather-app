import React from 'react';
import { Header, WeatherDetails, Wrapper } from 'components';
import { LocationOnRounded } from '@mui/icons-material';
import { Navigate, useParams } from 'react-router-dom';
import { selectCityById } from 'store/cities';
import { Typography } from '@mui/material';
import { useAppSelector } from 'hooks/redux';

const DetailsPage: React.FC = () => {
  const { cityId = '' } = useParams();

  const city = useAppSelector((state) => selectCityById(state, cityId));

  if (!city) return <Navigate to="/" replace />;

  return (
    <Wrapper>
      <Header>
        <LocationOnRounded fontSize="large" color="warning" />
        <Typography
          variant="h3"
          component="h1"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {city.fullName}
        </Typography>
      </Header>

      <WeatherDetails cityId={cityId} />
    </Wrapper>
  );
};

export default DetailsPage;
