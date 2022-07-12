import { Geocode } from './geocode';

export interface City extends Geocode {
  name: string;
  fullName: string;
}
