import React, { useState } from 'react';
import { Box, Card, CardActionArea, Container } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { SearchCity } from '../../features/search-city';
import { WeatherCard } from '../../features/weather-card';
import { useAppSelector } from '../../hooks/hook';
import { selectAllCities } from '../../store/cities/cities-slice';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const cities = useAppSelector(selectAllCities);

  console.log(cities);

  return (
    <Container
      sx={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={100}
        >
          {openSearch && <SearchCity closeSearch={setOpenSearch} />}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={3}
          mb={20}
        >
          {cities &&
            cities.map((city) => <WeatherCard key={city} cityId={city} />)}
          <Card sx={{ height: 300, width: 240 }}>
            <CardActionArea
              sx={{ height: '100%', textAlign: 'center' }}
              onClick={() => !openSearch && setOpenSearch(true)}
            >
              <AddRounded sx={{ fontSize: 100 }} />
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default MainPage;
