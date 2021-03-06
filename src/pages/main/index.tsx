import React, { useState } from 'react';
import { AddRounded } from '@mui/icons-material';
import { Header, SearchCity, WeatherList, Wrapper } from 'components';
import {
  Card,
  CardActionArea,
  Grid,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <Wrapper>
      <Header>
        {openSearch ? (
          <SearchCity closeSearch={setOpenSearch} />
        ) : (
          <Typography
            variant="h3"
            component="h1"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
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
    </Wrapper>
  );
};

export default MainPage;
