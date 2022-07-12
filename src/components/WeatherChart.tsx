import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { formatDateTime } from 'utils';
import { Weather } from 'types';

interface WeatherChartProps {
  data: Weather[];
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const series = [
    {
      data: data.slice(0, 9).map((item) => Math.round(item.temp)),
    },
  ];

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    dataLabels: {
      enabled: true,
      style: {
        fontSize: '16px',
        fontFamily: 'Balsamiq Sans',
      },
      background: {
        padding: 8,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45,
        },
      },
    },

    stroke: {
      curve: 'smooth',
      colors: ['#FFD059'],
    },

    tooltip: {
      enabled: false,
    },

    grid: {
      borderColor: '#90A4AE',
      strokeDashArray: 1,
      position: 'back',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 20,
      },
    },

    xaxis: {
      categories: data.slice(0, 9).map((item) => formatDateTime(item.dt)),
      labels: {
        style: {
          colors: [
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
          ],
          fontSize: '14px',
          fontFamily: 'Balsamiq Sans',
        },
      },
    },

    yaxis: {
      show: false,
      logBase: 20,
      tickAmount: 3,
      labels: {
        style: {
          colors: [
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
          ],
          fontSize: '14px',
          fontFamily: 'Balsamiq Sans',
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="300"
    />
  );
};
