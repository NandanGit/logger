import { parsePeriod } from '../../utils/time';
import { iFileOptions, iFileOutputOptionsArg, iLoggerOptions } from '../types';

export const processFileOptions = (
  options: iFileOutputOptionsArg | iLoggerOptions = {}
): iFileOptions => {
  let { period } = options as iFileOutputOptionsArg;
  if (period) {
    period = parsePeriod(period);
  }
  const result: iFileOptions = {
    ...options,
    period: period as number | undefined,
  };

  return result;
};
