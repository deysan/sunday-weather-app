import React from 'react';
import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/hook';
import { selectCityById } from '../../store/cities/cities-slice';
import { Navigate, useParams } from 'react-router-dom';

interface DetailsPageProps {}

const DetailsPage: React.FC<DetailsPageProps> = () => {
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
        >
          <Typography
            variant="h3"
            component="h1"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {city.fullName}
          </Typography>
        </Box>

        <Card
          sx={{
            height: '100%',
          }}
        ></Card>
      </Box>
    </Container>
  );
};

export default DetailsPage;
