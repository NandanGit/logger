const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const REGEX_MAP = {
  YYYY: (time: Date) => time.getFullYear().toString(),
  YY: (time: Date) => time.getFullYear().toString().slice(-2),
  MMMM: (time: Date) => MONTHS[time.getMonth()].toUpperCase(),
  Mmmm: (time: Date) => MONTHS[time.getMonth()],
  mmmm: (time: Date) => MONTHS[time.getMonth()].toLowerCase(),
  MMM: (time: Date) => MONTHS[time.getMonth()].slice(0, 3).toUpperCase(),
  Mmm: (time: Date) => MONTHS[time.getMonth()].slice(0, 3),
  mmm: (time: Date) => MONTHS[time.getMonth()].slice(0, 3).toLowerCase(),
  MM: (time: Date) => time.getMonth().toString().padStart(2, '0'),
  M: (time: Date) => time.getMonth().toString(),
  DDDD: (time: Date) => DAYS[time.getDay()].toUpperCase(),
  Dddd: (time: Date) => DAYS[time.getDay()],
  dddd: (time: Date) => DAYS[time.getDay()].toLowerCase(),
  DDD: (time: Date) => DAYS[time.getDay()].slice(0, 3).toUpperCase(),
  Ddd: (time: Date) => DAYS[time.getDay()].slice(0, 3),
  ddd: (time: Date) => DAYS[time.getDay()].slice(0, 3).toLowerCase(),
  DD: (time: Date) => time.getDate().toString().padStart(2, '0'),
  D: (time: Date) => time.getDate().toString(),
  HH: (time: Date) => time.getHours().toString().padStart(2, '0'),
  H: (time: Date) => time.getHours().toString(),
  hh: (time: Date) => (time.getHours() % 12).toString().padStart(2, '0'),
  h: (time: Date) => (time.getHours() % 12).toString(),
  A: (time: Date) => (time.getHours() >= 12 ? 'PM' : 'AM'),
  a: (time: Date) => (time.getHours() >= 12 ? 'pm' : 'am'),
  mm: (time: Date) => time.getMinutes().toString().padStart(2, '0'),
  m: (time: Date) => time.getMinutes().toString(),
  ss: (time: Date) => time.getSeconds().toString().padStart(2, '0'),
  s: (time: Date) => time.getSeconds().toString(),
  SSS: (time: Date) => time.getMilliseconds().toString().padStart(3, '0'),
  S: (time: Date) => time.getMilliseconds().toString(),
};
const DATE_TIME_REGEX = new RegExp(Object.keys(REGEX_MAP).join('|'), 'g');
export const formatTime = (time: Date, formatString: string): string => {
  return formatString.replace(DATE_TIME_REGEX, (match) =>
    (REGEX_MAP as any)[match](time)
  );
};
