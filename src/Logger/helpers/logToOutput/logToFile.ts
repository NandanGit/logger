import { $LogType, $SymbolMap, iFileOutput, iLoggerOptions } from '../../types';

export const logToFile = (
  file: iFileOutput,
  options: iLoggerOptions,
  logLevel: $LogType,
  args: any[],
  SYMBOL_MAP: $SymbolMap
): void => {
  return;
  console.log(...args, '|', file, `[${logLevel}]`);
};
