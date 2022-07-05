import React, { useState } from 'react';
import { Box, Card, CardActionArea, Container } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { SearchCity } from '../../features/search-city';
import { WeatherCard } from '../../features/weather-card';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        minHeight="100vh"
      >
        {openSearch && <SearchCity closeSearch={setOpenSearch} />}
        <WeatherCard />
        <Card>
          <CardActionArea
            sx={{ height: 332, width: 272, textAlign: 'center' }}
            onClick={() => !openSearch && setOpenSearch(true)}
          >
            <AddRounded sx={{ fontSize: 100 }} />
          </CardActionArea>
        </Card>
      </Box>
    </Container>
  );
};

export default MainPage;
