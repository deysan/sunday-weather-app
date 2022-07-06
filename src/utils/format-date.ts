import dayjs from 'dayjs';

export type DateToday = {
  day: string;
  time: string;
};

export const formatDateToday = (date: number): DateToday => {
  return {
    day: dayjs.unix(date).format('ddd, D MMM'),
    time: dayjs.unix(date).format('H:mm'),
  };
};

export const formatDateTime = (date: number): string =>
  dayjs.unix(date).format('h:mm a');
