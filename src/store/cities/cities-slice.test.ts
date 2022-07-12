import { createMockCityData } from 'mocks';
import {
  addCity,
  citiesAdapter,
  citiesReducer,
  selectCityById,
  removeCity,
} from '.';

describe('Redux: cities-slice', () => {
  const initialState = citiesAdapter.getInitialState();
  const mockCity = createMockCityData();

  it('should return initial state when passing an empty action', () => {
    expect(citiesReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should add new city with "addCity" action', () => {
    expect(
      citiesReducer(initialState, addCity(mockCity)).entities[mockCity.name],
    ).toEqual(mockCity);
  });

  it('should remove city by id with "removeCity" action', () => {
    expect(
      citiesReducer(
        citiesAdapter.addOne(initialState, mockCity),
        removeCity(mockCity.name),
      ),
    ).toEqual(initialState);
  });

  it('should select city by id from state', () => {
    expect(
      selectCityById(
        {
          cities: {
            entities: { [mockCity.name]: mockCity },
            ids: [mockCity.name],
          },
          _persist: { version: -1, rehydrated: true },
        },
        mockCity.name,
      ),
    ).toEqual(mockCity);
  });
});
