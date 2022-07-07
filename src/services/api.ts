const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

// export const weatherByCity = (lat: number, lng: number) =>
//   BASE_URL +
//   `weather?lat=${lat}&lon=${lng}&units=metric&appid=` +
//   process.env.REACT_APP_WEATHER_API_KEY;

export const weatherByCity = (lat: number, lng: number) =>
  BASE_URL +
  `onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,daily,alerts&appid=` +
  process.env.REACT_APP_WEATHER_API_KEY;

export const searchCity = (search: string) =>
  BASE_URL +
  `find?q=${search}&units=metric&appid=` +
  process.env.REACT_APP_WEATHER_API_KEY;
