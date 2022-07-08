import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  Container,
  Grid,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { Header, SearchCity, WeatherList } from 'components';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  const [openSearch, setOpenSearch] = useState(false);

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
          {openSearch ? (
            <SearchCity closeSearch={setOpenSearch} />
          ) : (
            <Typography variant="h3" component="h1">
              SunDay Weather App
            </Typography>
          )}
        </Header>

        <WeatherList>
          <Grid item xs={6} sm={4} md={3}>
            <Card sx={{ height: '300px' }}>
              <Tooltip title="Add City" TransitionComponent={Zoom} followCursor>
                <CardActionArea
                  sx={{ height: '100%', textAlign: 'center' }}
                  onClick={() => setOpenSearch(true)}
                  disabled={openSearch}
                >
                  <AddRounded sx={{ fontSize: 100 }} />
                </CardActionArea>
              </Tooltip>
            </Card>
          </Grid>
        </WeatherList>
      </Box>
    </Container>
  );
};

export default MainPage;
