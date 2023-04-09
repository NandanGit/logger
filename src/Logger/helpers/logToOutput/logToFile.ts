import { $LogType, $SymbolMap, iFileOutput, iLoggerOptions } from '../../types';
import { logToStream } from './logToStream';

export const logToFile = (
  file: iFileOutput,
  options: iLoggerOptions,
  logLevel: $LogType,
  args: any[],
  SYMBOL_MAP: $SymbolMap
): void => {
  const allArgsArePrimitive = args.every((arg) => {
    return (
      typeof arg === 'string' ||
      typeof arg === 'number' ||
      typeof arg === 'boolean'
    );
  });

  const softOverrides: iLoggerOptions = {
    // Cause somethings should be logged to a file only if user is sure
    // This options are overridable by user only if they provide them in file options, not in logger options
    processArgs: allArgsArePrimitive ? options.processArgs : true,
    argProcessor: allArgsArePrimitive ? options.argProcessor : JSON.stringify,

    showTime: true,
  };

  const hardOverrides: iLoggerOptions = {
    // Cause somethings just shouldn't be logged to a file
    // This options are not overridable by user
    colorize: false, // Colors in files? Come on!
  };

  logToStream(
    file.target,
    { ...options, ...softOverrides, ...file.options, ...hardOverrides },
    logLevel,
    args,
    SYMBOL_MAP
  );
  return;
  options = { ...options, ...file.options };
  console.log(...args, '|', file, `[${logLevel}]`, options);
  // console.log(
  //   `FILE: ${file.path} ${
  //     doesFileExist(file.path) ? 'exists' : 'does not exist'
  //   }`
  // );
};
