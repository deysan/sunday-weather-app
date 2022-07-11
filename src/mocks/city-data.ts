import { City } from 'types';
import { faker } from '@faker-js/faker';

export const createMockCityData = (): City => ({
  name: faker.address.cityName(),
  fullName: `${faker.address.cityName()}, ${faker.address.country()}`,
  lat: Number(faker.address.latitude()),
  lng: Number(faker.address.longitude()),
});
