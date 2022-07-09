const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const weatherCurrent = (lat: number, lng: number) =>
  BASE_URL +
  `onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,hourly,daily,alerts&appid=` +
  process.env.REACT_APP_WEATHER_API_KEY;

export const weatherDetails = (lat: number, lng: number) =>
  BASE_URL +
  `onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,daily,alerts&appid=` +
  process.env.REACT_APP_WEATHER_API_KEY;
