const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const weatherByCity = (lat: string, lon: string) =>
  BASE_URL +
  `onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily,alerts&appid=` +
  process.env.REACT_APP_API_KEY;

export const searchCity = (search: string) =>
  BASE_URL +
  `find?q=${search}&units=metric&appid=` +
  process.env.REACT_APP_API_KEY;
