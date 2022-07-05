import { RootState } from './../index';
import {
  createSlice,
  createEntityAdapter,
  PayloadAction
} from '@reduxjs/toolkit';

type City = {
  name: string;
  lat: string;
  lng: string;
};

const citiesAdapter = createEntityAdapter<City>({
  selectId: (city) => city.name
});

const citiesSlice = createSlice({
  name: 'cities',
  initialState: citiesAdapter.getInitialState(),
  reducers: {
    addCity: citiesAdapter.addOne
  }
});

export const { addCity } = citiesSlice.actions;

export const citiesReducer = citiesSlice.reducer;

export const cities = citiesAdapter.getSelectors<RootState>(
  (state) => state.cities
).selectIds;
