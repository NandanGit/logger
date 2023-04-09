import { $LogType, $SymbolMap, iFileOutput, iLoggerOptions } from '../../types';

export const logToFile = (
  file: iFileOutput,
  options: iLoggerOptions,
  logLevel: $LogType,
  args: any[],
  SYMBOL_MAP: $SymbolMap
): void => {
  return;
  options = { ...options, ...file.options };
  console.log(...args, '|', file, `[${logLevel}]`, options);
  // console.log(
  //   `FILE: ${file.path} ${
  //     doesFileExist(file.path) ? 'exists' : 'does not exist'
  //   }`
  // );
};
