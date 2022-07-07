import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import { LocationOnRounded } from '@mui/icons-material';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import axios from 'axios';
import { addCity } from '../../store/cities/cities-slice';
import { useAppDispatch } from '../../hooks/hook';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  place_id: string;
  description: string;
  structured_formatting: StructuredFormatting;
}

type Geocode = {
  lat: number;
  lng: number;
};

type SearchCityProps = {
  closeSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchCity: React.FC<SearchCityProps> = ({ closeSearch }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const loaded = useRef(false);

  console.log(value);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        200,
      ),
    [],
  );

  const handleCity = useMemo(
    () => async (cityId: string) => {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?place_id=${cityId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
        )
        .then((response) => response.data?.results?.[0]?.geometry?.location)
        .then((data: Geocode) =>
          dispatch(
            addCity({
              name: value?.structured_formatting.main_text || '',
              fullName: value?.description || '',
              ...data,
            }),
          ),
        );
    },
    [dispatch, value],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);

        if (value) {
          handleCity(value.place_id);
          setValue(null);
          closeSearch(false);
        }
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, closeSearch, handleCity]);

  return (
    <Autocomplete
      sx={{ width: '100%', maxWidth: '600px' }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      onBlur={() => closeSearch(false)}
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(_, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search City" fullWidth autoFocus />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnRounded}
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};
