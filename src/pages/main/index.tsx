import React, { useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { SearchCity } from '../../features/search-city';
import { WeatherCard } from '../../features/weather-card';
import { useAppSelector } from '../../hooks/hook';
import { selectAllCities } from '../../store/cities/cities-slice';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const cities = useAppSelector(selectAllCities);

  return (
    <Container
    // sx={{
    //   display: 'flex',
    //   minHeight: '100vh',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // }}
    >
      <Box display="flex" flexDirection="column" width="100%">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
        >
          {openSearch ? (
            <SearchCity closeSearch={setOpenSearch} />
          ) : (
            <Typography variant="h3" component="h1">
              SunDay Weather App
            </Typography>
          )}
        </Box>
        {/* <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={3}
          mb={20}
        > */}
        <Grid container spacing={3}>
          {cities &&
            cities.map((city) => <WeatherCard key={city} cityId={city} />)}
          <Grid item xs={6} sm={4} md={3}>
            <Card sx={{ height: '300px' }}>
              <CardActionArea
                sx={{ height: '100%', textAlign: 'center' }}
                onClick={() => setOpenSearch(true)}
                disabled={openSearch}
              >
                <AddRounded sx={{ fontSize: 100 }} />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        {/* </Box> */}
      </Box>
    </Container>
  );
};

export default MainPage;
