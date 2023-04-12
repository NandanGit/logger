import { parsePeriod } from '../../utils/time';
import {
  iFileOutputOptions,
  iFileOutputOptionsArg,
  iLoggerOptions,
} from '../types';

export const processFileOptions = (
  options: iFileOutputOptionsArg | iLoggerOptions = {}
): iFileOutputOptions => {
  let { period } = options as iFileOutputOptionsArg;
  if (period) {
    period = parsePeriod(period);
  }
  const result: iFileOutputOptions = {
    ...options,
    period: period as number | undefined,
  };

  return result;
};
