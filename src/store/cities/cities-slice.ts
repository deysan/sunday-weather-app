import { City } from 'types';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

const citiesAdapter = createEntityAdapter<City>({
  selectId: (city) => city.name,
});

const citiesSlice = createSlice({
  name: 'cities',
  initialState: citiesAdapter.getInitialState(),
  reducers: {
    addCity: citiesAdapter.addOne,
    removeCity: citiesAdapter.removeOne,
  },
});

export const { addCity, removeCity } = citiesSlice.actions;

export const citiesReducer = citiesSlice.reducer;

export const selectAllCities = citiesAdapter.getSelectors<RootState>(
  (state) => state.cities,
).selectIds;

export const selectCityById = citiesAdapter.getSelectors<RootState>(
  (state) => state.cities,
).selectById;
