import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
import * as mock from './mock.json';
import { formatDateTime, formatDateFullDay } from 'utils';
import { WeatherChart } from 'components/weather-chart';

export const WeatherDetails: React.FC = () => {
  const navigate = useNavigate();
  const { current, hourly } = mock;

  console.log(hourly);

  return (
    <Card
      sx={{
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
              navigate(-1);
            }}
          >
            <RefreshRounded sx={{ fontSize: 30 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            borderRightWidth: '1px',
            borderRightStyle: 'solid',
            borderRightColor: 'text.disabled',
          }}
        >
          <Typography my={2} fontSize={25} textAlign="center">
            How’s the temperature today
          </Typography>
          <Box textAlign="center">
            <Typography fontSize={40}>{formatDateTime(current.dt)}</Typography>
            <Typography fontSize={25}>
              {formatDateFullDay(current.dt)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <CardMedia
              component="img"
              sx={{
                maxHeight: '200px',
                maxWidth: '250px',
              }}
              image={`http://openweathermap.org/img/w/${current.weather[0].icon}.png`}
              alt={current.weather[0].description}
            />
          </Box>
          <Box textAlign="center">
            <Box display="flex" justifyContent="center" alignItems="start">
              <Typography fontSize={60} fontWeight={700} lineHeight={1}>
                {Math.round(current.temp)}
              </Typography>
              <Typography fontSize={25} color="#FFD059">
                °C
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={25} fontStyle="italic">
                {current.weather[0].description}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={8} padding={2}>
          <Box display="grid" gridTemplateRows="repeat(2, 1fr)">
            <WeatherChart data={hourly} />
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Card
                  sx={{
                    padding: 2,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'text.disabled',
                  }}
                >
                  <Typography color="text.disabled">Clouds</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="end"
                  >
                    <Typography fontSize={30} fontWeight={700} lineHeight={1}>
                      {current.clouds}{' '}
                      <Typography
                        component="span"
                        fontSize={20}
                        lineHeight={1}
                        color="text.disabled"
                      >
                        %
                      </Typography>
                    </Typography>
                    <FilterDramaRounded fontSize="large" color="warning" />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card
                  sx={{
                    padding: 2,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'text.disabled',
                  }}
                >
                  <Typography color="text.disabled">Feels Like</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="end"
                  >
                    <Typography fontSize={30} fontWeight={700} lineHeight={1}>
                      {Math.round(current.feels_like)}{' '}
                      <Typography
                        component="span"
                        fontSize={20}
                        lineHeight={1}
                        color="text.disabled"
                      >
                        °C
                      </Typography>
                    </Typography>
                    <SentimentSatisfiedRounded
                      fontSize="large"
                      color="warning"
                    />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card
                  sx={{
                    padding: 2,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'text.disabled',
                  }}
                >
                  <Typography color="text.disabled">Visibility</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="end"
                  >
                    <Typography fontSize={30} fontWeight={700} lineHeight={1}>
                      {(current.visibility / 1000).toFixed(1)}{' '}
                      <Typography
                        component="span"
                        fontSize={20}
                        lineHeight={1}
                        color="text.disabled"
                      >
                        km
                      </Typography>
                    </Typography>
                    <VisibilityRounded fontSize="large" color="warning" />
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={6} md={4}>
                <Card
                  sx={{
                    padding: 2,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'text.disabled',
                  }}
                >
                  <Typography color="text.disabled">Wind Speed</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="end"
                  >
                    <Typography fontSize={30} fontWeight={700} lineHeight={1}>
                      {current.wind_speed}{' '}
                      <Typography
                        component="span"
                        fontSize={20}
                        lineHeight={1}
                        color="text.disabled"
                      >
                        m/s
                      </Typography>
                    </Typography>
                    <CycloneRounded fontSize="large" color="warning" />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card
                  sx={{
                    padding: 2,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'text.disabled',
                  }}
                >
                  <Typography color="text.disabled">Humidity</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="end"
                  >
                    <Typography fontSize={30} fontWeight={700} lineHeight={1}>
                      {current.humidity}{' '}
                      <Typography
                        component="span"
                        fontSize={20}
                        lineHeight={1}
                        color="text.disabled"
                      >
                        %
                      </Typography>
                    </Typography>
                    <GrainRounded fontSize="large" color="warning" />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card
                  sx={{
                    padding: 2,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'text.disabled',
                  }}
                >
                  <Typography color="text.disabled">Pressure</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="end"
                  >
                    <Typography fontSize={30} fontWeight={700} lineHeight={1}>
                      {current.pressure}{' '}
                      <Typography
                        component="span"
                        fontSize={20}
                        lineHeight={1}
                        color="text.disabled"
                      >
                        hPa
                      </Typography>
                    </Typography>
                    <WavesRounded fontSize="large" color="warning" />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card
                  sx={{
                    padding: 2,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'text.disabled',
                  }}
                >
                  <Typography color="text.disabled">Sunrise</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="end"
                  >
                    <Typography fontSize={30} fontWeight={700} lineHeight={1}>
                      {formatDateTime(current.sunrise)}
                    </Typography>
                    <WbSunnyRounded fontSize="large" color="warning" />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card
                  sx={{
                    padding: 2,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'text.disabled',
                  }}
                >
                  <Typography color="text.disabled">Sunset</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="end"
                  >
                    <Typography fontSize={30} fontWeight={700} lineHeight={1}>
                      {formatDateTime(current.sunset)}
                    </Typography>
                    <WbTwilightRounded fontSize="large" color="warning" />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card
                  sx={{
                    padding: 2,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'text.disabled',
                  }}
                >
                  <Typography color="text.disabled">UV Index</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="end"
                  >
                    <Typography fontSize={30} fontWeight={700} lineHeight={1}>
                      {current.uvi}
                    </Typography>
                    <SolarPowerRounded fontSize="large" color="warning" />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};
