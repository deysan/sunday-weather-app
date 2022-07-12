import dayjs from 'dayjs';

export const formatDateDay = (date: number): string =>
  dayjs.unix(date).format('ddd, D MMM');

export const formatDateFullDay = (date: number): string =>
  dayjs.unix(date).format('dddd, D MMMM');

export const formatDateTime = (date: number): string =>
  dayjs.unix(date).format('H:mm');
