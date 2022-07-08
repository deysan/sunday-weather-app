import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { formatDateTime } from '../../utils/format-date';
import { WeatherProps } from '../weather-card';

const CustomizedLabel: React.FC<any> = (props: any) => {
  const { x, y, value } = props;

  return (
    <text
      x={x}
      y={y}
      dy={-4}
      fill="#fff"
      fontSize={20}
      fontWeight={700}
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

const CustomizedAxisTick: React.FC<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

interface ChartProps {
  data: WeatherProps[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const dataChart = data.slice(0, 9).map((item) => {
    return { dt: formatDateTime(item.dt), temp: Math.round(item.temp) };
  });

  return (
    <ResponsiveContainer>
      <AreaChart
        data={dataChart}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFD059" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#FFD059" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="1 10" />
        <XAxis dataKey="dt" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Area
          type="monotone"
          dataKey="temp"
          stroke="#FFD059"
          fillOpacity={1}
          fill="url(#colorTemp)"
        >
          <LabelList content={<CustomizedLabel />} />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );
};
