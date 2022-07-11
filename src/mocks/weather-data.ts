import { faker } from '@faker-js/faker';
import { Weather } from 'types';

export const createMockWeatherData = (): Weather => ({
  clouds: faker.datatype.number({ min: 0, max: 100, precision: 1 }),
  dt: faker.date.recent().setUTCMilliseconds(0),
  feels_like: faker.datatype.number({ min: -50, max: 50, precision: 0.01 }),
  humidity: faker.datatype.number({ min: 0, max: 100, precision: 1 }),
  pressure: faker.datatype.number({ min: 800, max: 1200, precision: 1 }),
  temp: faker.datatype.number({ min: -50, max: 50, precision: 0.01 }),
  uvi: faker.datatype.number({ min: 0, max: 10, precision: 0.01 }),
  visibility: faker.datatype.number({ min: 1000, max: 10000, precision: 1 }),
  weather: [
    {
      description: 'scattered clouds',
      icon: '03d',
    },
  ],
  wind_speed: faker.datatype.number({ min: 0, max: 10, precision: 0.01 }),
  sunrise: faker.date.recent().setUTCMilliseconds(0),
  sunset: faker.date.soon().setUTCMilliseconds(0),
});

export const createMockWeatherArray = (): Weather[] =>
  new Array(faker.datatype.number(10))
    .fill(null)
    .map(() => createMockWeatherData());
