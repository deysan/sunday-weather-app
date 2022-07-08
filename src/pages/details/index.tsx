import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { LocationOnRounded } from '@mui/icons-material';
import { Header } from 'components';
import { WeatherDetails } from 'components';
import { selectCityById } from 'store/cities';
import { useAppSelector } from 'hooks';

const DetailsPage: React.FC = () => {
  const { cityId = '' } = useParams();

  const city = useAppSelector((state) => selectCityById(state, cityId));

  if (!city) return <Navigate to="/" replace />;

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        height="100vh"
        pb="100px"
      >
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
      </Box>
    </Container>
  );
};

export default DetailsPage;
