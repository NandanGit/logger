export const COLOR_MAP = {
  default: '\x1b[0m',
  success: '\x1b[32m',
  info: '\x1b[34m',
  warning: '\x1b[33m',
  error: '\x1b[31m',
  debug: '\x1b[35m',
};

export const DEFAULT_SYMBOLS = {
  default: '••',
  success: '✅',
  info: '🥁',
  warning: '🚧',
  error: '❌',
  debug: '🐞',
};

export const DEFAULT_PERIOD_START = new Date(-19800000);

export const DEFAULT_FILE_NAME_FORMATTER = (
  localStart: Date,
  localEnd: Date,
  fullName: boolean = false
): string => {
  const start = localStart
    .toLocaleString('in')
    .replace(',', '')
    .replace(/\//g, '-');
  if (fullName) {
    const end = localEnd
      .toLocaleString('in')
      .replace(',', '')
      .replace(/\//g, '-');
    return `${start} - ${end}`;
  }
  return start;
};
