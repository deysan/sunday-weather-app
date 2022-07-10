import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';

interface WeatherDetailsCardProps {
  title: string;
  value: number | string | undefined;
  params?: string;
  icon: JSX.Element;
}

export const WeatherDetailsCard: React.FC<WeatherDetailsCardProps> = ({
  title,
  value,
  params,
  icon,
}) => {
  return (
    <Grid item xs={6} md={4}>
      <Card
        sx={{
          padding: 2,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'text.disabled',
        }}
      >
        <Typography color="text.disabled">{title}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="end">
          <Typography fontSize={30} fontWeight={700} lineHeight={1}>
            {value}{' '}
            <Typography
              component="span"
              fontSize={20}
              lineHeight={1}
              color="text.disabled"
            >
              {params}
            </Typography>
          </Typography>
          {icon}
        </Box>
      </Card>
    </Grid>
  );
};
